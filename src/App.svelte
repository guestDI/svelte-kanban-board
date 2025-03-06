<script lang="ts">
  import { project } from './mockData';
  import KanbanBoard from './lib/KanbanBoard.svelte';
  import TeamMembers from './lib/TeamMembers.svelte';
  import ProjectStats from './lib/ProjectStats.svelte';
  import TaskDetails from './lib/TaskDetails.svelte';
  import type {Task} from "./types";

  let tasks: Task[] = project.tasks;
  let selectedTask: Task | null = null;
</script>

<main class="min-h-screen bg-gray-50">
  <div class="container-fluid mx-auto px-4 py-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold">{project.name}</h1>
      <p class="text-gray-600">{project.description}</p>
    </header>

    <div class="">
      <div class="col-span-3">
        <div class="space-y-6 mb-6">
          <ProjectStats {tasks} />
        </div>
        <div class="bg-white rounded-lg shadow mb-6">
          <KanbanBoard 
            {tasks}
            {selectedTask}
            on:updateTasks={({ detail }) => {
              tasks = detail.tasks;
            }}
          />
        </div>
        <div class="space-y-6">
          <TeamMembers members={project.members} />
        </div>
      </div>
    </div>
  </div>
</main>