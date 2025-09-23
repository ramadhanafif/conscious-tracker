<script lang="ts">
	import { pb, pbTimeFormat } from '$lib';
	import { Check, LoaderCircle, X } from '@lucide/svelte';

	const TIME_STATUS_DELAY_MS = 3000;

	let submitData: { title: string; description: string } = { title: '', description: '' };
	let submitStatus: 'wait' | 'done' | 'fail' | 'idle' = 'idle';

	async function onsubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();

		console.debug({ submitData, submitStatus });

		submitStatus = 'wait';
		await pb
			.collection('activity')
			.create(submitData)
			.then((activityRecord) => {
				const data = {
					activity_id: activityRecord.id,
					time_data: pbTimeFormat(new Date()),
					type: 'start'
				};

				console.debug(data);

				return pb.collection('timer_events').create(data);
			})
			.then(() => {
				submitStatus = 'done';
				setTimeout(() => {
					submitStatus = 'idle';
				}, TIME_STATUS_DELAY_MS);
			})
			.catch((err) => {
				submitStatus = 'fail';

				setTimeout(() => {
					submitStatus = 'idle';
				}, TIME_STATUS_DELAY_MS);
				console.debug(err);
			});
		console.debug(submitStatus);
	}
</script>

<div class="flex items-center justify-center">
	<form {onsubmit} class="w-full">
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Activity</legend>
			<input
				bind:value={submitData.title}
				type="text"
				class="input"
				name="activity"
				placeholder="Type activity here"
				required
			/>
		</fieldset>

		<fieldset class="fieldset">
			<legend class="fieldset-legend">Description</legend>
			<textarea
				bind:value={submitData.description}
				class="input"
				name="description"
				rows="2"
				placeholder="Type description here"
			></textarea>
		</fieldset>

		<div class="mt-4 flex items-center flex-row-reverse w-full gap-4 px-8">
			<button class="btn btn-primary" type="submit" disabled={submitStatus !== 'idle'}>Start</button
			>
			<button class="btn btn-secondary" type="reset" disabled={submitStatus !== 'idle'}
				>Cancel</button
			>
			<small class="block">
				{#if submitStatus === 'wait'}
					<LoaderCircle class="animate-spin" />
				{:else if submitStatus === 'fail'}
					<X class="text-error" />
				{:else if submitStatus === 'done'}
					<Check class="text-success" />
				{:else}{/if}
			</small>
		</div>
	</form>
</div>
