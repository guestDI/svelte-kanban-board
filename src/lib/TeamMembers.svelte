<script lang="ts">
  import type { User } from '../types';
  
  export let members: User[];
</script>

<div class="bg-white rounded-lg p-4">
  <h2 class="text-xl font-semibold mb-4">Team Members</h2>
  <div class="space-y-3">
    {#each members as member}
      <div class="flex items-center space-x-3">
        <img src={member.avatar} alt={member.name} class="w-10 h-10 rounded-full">
        <div>
          <div class="font-medium">{member.name}</div>
          <div class="text-sm text-gray-500">{member.role}</div>
        </div>
      </div>
    {/each}
    }
  </div>
</div>