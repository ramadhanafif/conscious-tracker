<script lang="ts">
	import { pb, pbTimeFormat } from '$lib';

	async function timerAction(
		activityId: string,
		activityRecord: string,
		action: 'stop' | 'break' | 'unbreak'
	) {
		const data = {
			activity_id: activityId,
			time_data: pbTimeFormat(new Date()),
			type: action
		};
		const actions = [pb.collection('timer_events').create(data)];

		if (action === 'stop')
			actions.push(pb.collection('activities').update(activityRecord, { status: 'stopped' }));

		await Promise.all(actions)
			.then(() => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
				alert(`Error in handling ${action} action!`);
			});
	}
</script>

<a href="/input" class=" btn btn-primary btn-block mt-8"> New Activity </a>

<div class="my-16">
	<h2 class="text-2xl font-bold">Ongoing Activity</h2>

	<div id="activity-card" class="mt-4 flex flex-wrap gap-4">
		{#await pb.collection('activities').getFullList({ expand: 'category' }) then activities}
			{#each activities as act (act.id)}
				{#if act.status !== 'stopped'}
					<!-- {JSON.stringify(act, null, 2)} -->
					<div class="card bg-base-200 flex-1">
						<div class="card-body">
							<div class="flex items-center justify-between gap-4">
								<h3 class="card-title text-primary">
									<span class="status status-success animate-bounce"></span>
									{act.title}
								</h3>
								<div class="badge badge-secondary">{act.expand!.category.category}</div>
							</div>
							<p>{act.description}</p>

							<div class="card-actions justify-end">
								{#if act.status === 'ongoing'}
									<button
										onclick={() => timerAction(act.id, act.id, 'break')}
										class="btn btn-sm btn-secondary">Break</button
									>
									<button
										onclick={() => timerAction(act.id, act.id, 'stop')}
										class="btn btn-sm btn-error">Stop</button
									>
								{/if}
							</div>
						</div>
					</div>
				{/if}
			{/each}
		{/await}
	</div>
</div>
