<script lang="ts">
  import { project } from './mockData';
  import KanbanBoard from './lib/KanbanBoard.svelte';
  import TeamMembers from './lib/TeamMembers.svelte';
  import ProjectStats from './lib/ProjectStats.svelte';

  let tasks = project.tasks;
</script>

<main class="min-h-screen bg-gray-50">
  <div class="container mx-auto px-4 py-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold">{project.name}</h1>
      <p class="text-gray-600">{project.description}</p>
    </header>

    <div class="grid grid-cols-4 gap-6">
      <div class="col-span-3">
        <div class="bg-white rounded-lg shadow mb-6">
          <KanbanBoard bind:tasks />
        </div>
      </div>
      <div class="space-y-6">
        <ProjectStats {tasks} />
        <TeamMembers members={project.members} />
      </div>
    </div>
  </div>
</main>