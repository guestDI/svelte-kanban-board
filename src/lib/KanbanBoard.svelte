<script lang="ts">
  import type { Task } from '../types';
  
  export let tasks: Task[];
  
  const statuses = ['todo', 'in-progress', 'review', 'done'];
  
  function getTasksByStatus(status: string) {
    return tasks.filter(task => task.status === status);
  }

  let draggedTask: Task | null = null;
  let draggedTaskStatus: string | null = null;

  function handleDragStart(task: Task, status: string) {
    draggedTask = task;
    draggedTaskStatus = status;
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  function handleDrop(event: DragEvent, newStatus: string) {
    event.preventDefault();
    if (!draggedTask || draggedTaskStatus === newStatus) return;

    const taskIndex = tasks.findIndex(t => t.id === draggedTask!.id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], status: newStatus };
      tasks = [...tasks]; // Trigger reactivity
    }

    draggedTask = null;
    draggedTaskStatus = null;
  }
</script>

<div class="grid grid-cols-4 gap-4 p-4">
  {#each statuses as status}
    <div 
      class="bg-gray-100 p-4 rounded-lg"
      on:dragover={handleDragOver}
      on:drop={(e) => handleDrop(e, status)}
    >
      <h3 class="text-lg font-semibold mb-4 capitalize">{status}</h3>
      <div class="space-y-2">
        {#each getTasksByStatus(status) as task}
          <div 
            class="bg-white p-3 rounded shadow cursor-move hover:shadow-md transition-shadow"
            draggable="true"
            on:dragstart={() => handleDragStart(task, status)}
          >
            <h4 class="font-medium">{task.title}</h4>
            <p class="text-sm text-gray-600">{task.description}</p>
            <div class="mt-2 text-sm text-gray-500">
              Time: {task.timeSpent}/{task.timeEstimate}h
            </div>
          </div>
        {/each}
        }
      </div>
    </div>
  {/each}
  }
</div>

<style>
  [draggable="true"] {
    user-select: none;
  }
</style>