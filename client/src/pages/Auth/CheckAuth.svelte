<script>
import { onMount } from 'svelte';

export let isAuthenticated = false;

export const checkAuth = async () => {
  const response = await fetch('http://localhost:8080/api/auth/check');
  const data = await response.json();
  isAuthenticated = data.isAuthenticated;
  console.log(data.data.isAuthenticated);
  console.log(isAuthenticated);
  };

  onMount(checkAuth);

</script>
<div>
    {#if isAuthenticated}
      <p>User is authenticated</p>
    {:else}
      <p>User is not authenticated</p>
    {/if}
  </div>
