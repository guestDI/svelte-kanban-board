<script lang="ts">
  import type { Task } from '../types';
  import {users} from "../mockData";
  import TaskDetails from "./TaskDetails.svelte";
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher<{
    updateTasks: { tasks: Task[] };
  }>();
  
  export let tasks: Task[];
  export let selectedTask: Task | null = null;
  
  const statuses = ['todo', 'in-progress', 'review', 'done'] as const;
  type Status = typeof statuses[number];

  function getAssignee(task: Task) {
    return users.find(u => u.id === task.assignee);
  }

  function getTasksByStatus(status: Status) {
    return tasks.filter(task => task.status === status);
  }

  let draggedTask: Task | null = null;
  let draggedTaskStatus: Status | null = null;

  function handleDragStart(task: Task, status: Status) {
    draggedTask = task;
    draggedTaskStatus = status;
  }

  function selectTask(task: Task) {
    selectedTask = task;
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    target.classList.add('bg-gray-200');
  }

  function handleDragLeave(event: DragEvent) {
    const target = event.currentTarget as HTMLElement;
    target.classList.remove('bg-gray-200');
  }

  function handleDrop(event: DragEvent, newStatus: Status) {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    target.classList.remove('bg-gray-200');
    
    if (!draggedTask || draggedTaskStatus === newStatus) return;

    const updatedTasks = tasks.map(t => 
      t.id === draggedTask!.id 
        ? { ...t, status: newStatus }
        : t
    );
    
    dispatch('updateTasks', { tasks: updatedTasks });

    draggedTask = null;
    draggedTaskStatus = null;
  }

  function handleTaskUpdate({ detail }: CustomEvent<{ task: Task }>) {
    const updatedTasks = tasks.map(t => 
      t.id === detail.task.id ? detail.task : t
    );
    
    dispatch('updateTasks', { tasks: updatedTasks });
    selectedTask = detail.task;
  }

  function handlePanelClose() {
    selectedTask = null;
  }
</script>

<div class="flex">
  {#key tasks}
    <div class="flex-grow grid grid-cols-4 gap-4 p-4">
      {#each statuses as status}
        <div
          class="bg-gray-100 p-4 rounded-lg transition-colors"
          role="region"
          aria-label={`${status} tasks`}
          on:dragover={handleDragOver}
          on:dragleave={handleDragLeave}
          on:drop={(e) => handleDrop(e, status)}
        >
          <h3 class="text-lg font-semibold mb-4 capitalize">{status}</h3>
          <div class="space-y-2">
            {#each getTasksByStatus(status) as task}
              <div
                      class="bg-white p-3 rounded shadow cursor-move hover:shadow-md transition-shadow"
                      draggable="true"
                      role="button"
                      tabindex="0"
                      on:dragstart={() => handleDragStart(task, status)}
                      on:click={() => selectTask(task)}
                      on:keydown={(e) => e.key === 'Enter' && selectTask(task)}
              >
                <div class="flex items justify-between">
                  <h4 class="font-medium">{task.title}</h4>
                  {#if getAssignee(task)}
                    <img src={getAssignee(task)?.avatar} alt={getAssignee(task)?.name} class="w-7 h-7 rounded-full">
                  {/if}
                </div>
                <p class="text-sm text-gray-600">{task.description}</p>
                <div class="mt-2 text-sm text-gray-500">
                  {#if task.label && task.label.length > 0}
                    <div class="flex flex-wrap gap-1">
                      {#each task.label as label}
        <span class="px-2 py-1 rounded-full text-white text-xs" style="background-color: {`#${Math.floor(Math.random()*16777215).toString(16)}`}">
          {label}
        </span>
                      {/each}
                    </div>
                  {/if}
                </div>
                <div class="mt-2 text-sm text-gray-500">
                  Priority: {task.priority}
                </div>
                <div class="mt-2 text-sm text-gray-500">
                  Time: {task.timeSpent}/{task.timeEstimate}h
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/key}

  {#if selectedTask}
    <div class="w-1/3 flex-shrink-0">
      <TaskDetails
        {selectedTask}
        on:updateTask={handleTaskUpdate}
        on:close={handlePanelClose}
      />
    </div>
  {/if}
</div>

<style>
  [draggable="true"] {
    user-select: none;
  }
</style>