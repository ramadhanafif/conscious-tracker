<script lang="ts">
	import { Check, LoaderCircle, X } from '@lucide/svelte';

	let submitData: { title: string; description: string; status: string } = {
		title: '',
		description: '',
		status: 'ongoing'
	};

	let submitStatus: 'wait' | 'done' | 'fail' | 'idle' = 'idle';

	async function onsubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();

		console.debug({ submitData, submitStatus });

		submitStatus = 'wait';
	}
</script>

<div class="flex items-center justify-center">
	<form {onsubmit} class="lg: min-w-xl">
		<fieldset class="fieldset">
			<div>
				<legend class="fieldset-legend text-xl">Activity</legend><span class="text-error text-sm"
					>*</span
				>
				<sm class="text-base-content/50">Title of your activity</sm>
			</div>
			<input
				bind:value={submitData.title}
				type="text"
				class="input w-full"
				name="activity"
				placeholder="Type activity here"
				required
			/>
		</fieldset>

		<fieldset class="fieldset">
			<legend class="fieldset-legend text-xl">Description</legend>
			<textarea
				bind:value={submitData.description}
				class="input w-full"
				name="description"
				placeholder="Type description here"
			></textarea>
		</fieldset>

		<div class="mt-4 flex w-full flex-row-reverse items-center gap-4 px-8">
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
