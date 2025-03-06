<script lang="ts">
  import type { Task } from '../types';
  
  export let tasks: Task[];
  
  $: completedTasks = tasks.filter(t => t.status === 'done').length;
  $: totalTime = tasks.reduce((acc, t) => acc + t.timeSpent, 0);
  $: progress = (completedTasks / tasks.length) * 100;
</script>

<div class="bg-white rounded-lg p-4">
  <h2 class="text-xl font-semibold mb-4">Project Statistics</h2>
  <div class="grid grid-cols-3 gap-4">
    <div class="text-center">
      <div class="text-2xl font-bold">{tasks.length}</div>
      <div class="text-gray-500">Total Tasks</div>
    </div>
    <div class="text-center">
      <div class="text-2xl font-bold">{completedTasks}</div>
      <div class="text-gray-500">Completed</div>
    </div>
    <div class="text-center">
      <div class="text-2xl font-bold">{totalTime}h</div>
      <div class="text-gray-500">Time Spent</div>
    </div>
  </div>
  <div class="mt-4">
    <div class="text-sm text-gray-600 mb-1">Progress</div>
    <div class="w-full bg-gray-200 rounded-full h-2.5">
      <div class="bg-blue-600 h-2.5 rounded-full" style="width: {progress}%"></div>
    </div>
  </div>
</div>