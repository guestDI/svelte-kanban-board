<script lang="ts">
    import type { Task } from '../types';
    import {users} from "../mockData";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher<{
        updateTask: { task: Task };
        close: void;
    }>();

    export let selectedTask: Task;
    let timeSpentInput: number | null = null;
    let newComment: string = '';

    function updateTimeSpent() {
        if (timeSpentInput !== null) {
            const updatedTask = {
                ...selectedTask,
                timeSpent: timeSpentInput
            };
            dispatch('updateTask', { task: updatedTask });
        }
    }

    function addComment() {
        if (newComment.trim()) {
            const updatedTask = {
                ...selectedTask,
                comments: [...selectedTask.comments, {
                    id: Date.now(),
                    text: newComment.trim(),
                    author: 'Current User', // Replace with actual user
                    date: new Date()
                }]
            };

            dispatch('updateTask', { task: updatedTask });
            newComment = '';
            console.log(updatedTask);
        }
    }

    function closePanel() {
        dispatch('close');
    }

</script>

{#key selectedTask}
<div class="w-80 bg-white border-l border-gray-200 p-4 h-screen overflow-y-auto">
    <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">{selectedTask.title}</h2>
        <button
                class="text-gray-500 hover:text-gray-700"
                on:click={closePanel}
                aria-label="Close panel"
        >
            ✕
        </button>
    </div>

    <div class="mb-4">
        <h3 class="font-medium mb-2">Description</h3>
        <p class="text-gray-700">{selectedTask.description}</p>
    </div>

    <div class="mb-4">
        <h3 class="font-medium mb-2">Status</h3>
        <div class="bg-gray-100 px-2 py-1 rounded inline-block capitalize">{selectedTask.status}</div>
    </div>

    <div class="mb-4">
        <h3 class="font-medium mb-2">Assignee</h3>
        <div>{users.find(u => u.id === selectedTask.assignee)?.name || 'Unassigned'}</div>
    </div>

    <div class="mb-4">
        <h3 class="font-medium mb-2">Time Tracking</h3>
        <div class="flex items-center gap-2">
            <input
                    type="number"
                    bind:value={timeSpentInput}
                    min="0"
                    step="0.5"
                    class="border rounded px-2 py-1 w-16"
            />
            <span>/ {selectedTask.timeEstimate}h</span>
            <button
                    class="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                    on:click={updateTimeSpent}
            >
                Update
            </button>
        </div>
    </div>

    <div class="mb-4">
        <h3 class="font-medium mb-2">Comments</h3>
        <div class="space-y-2 mb-2">
            {#if selectedTask.comments && selectedTask.comments.length > 0}
                {#each selectedTask.comments as comment}
                    <div class="bg-gray-50 p-2 rounded">
                        <div class="flex justify-between text-xs text-gray-500 mb-1">
                            <span>{comment.author}</span>
                            <span>{new Date(comment.date).toLocaleString()}</span>
                        </div>
                        <p class="text-sm">{comment.text}</p>
                    </div>
                {/each}
            {:else}
                <p class="text-sm text-gray-500">No comments yet</p>
            {/if}
        </div>

        <div class="mt-2">
          <textarea
                  bind:value={newComment}
                  placeholder="Add a comment..."
                  class="w-full border rounded p-2 text-sm"
                  rows="3"
          ></textarea>
            <button
                    class="bg-blue-500 text-white px-3 py-1 rounded text-sm mt-2"
                    on:click={addComment}
                    disabled={!newComment.trim()}
            >
                Add Comment
            </button>
        </div>
    </div>
</div>
{/key}