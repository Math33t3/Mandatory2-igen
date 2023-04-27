<!--<script>
  import { Route } from "svelte-navigator";
  import { onMount } from "svelte";
  import { isAuthenticated } from "../../auth.js";

  
  export let path;
  export let component;

  let supportedRouteProps = {
    path,
    component,
    exact: undefined,
    queryParams: undefined,
    withActivatedRoute: undefined,
  };
</script>

{#if $isAuthenticated}
  <Route {...supportedRouteProps} />
{:else}
  <Route path={path}>
    <slot />
  </Route>
{/if}
-->

<script>
  import { Route } from "svelte-routing";
  import { isLoggedIn } from "./auth.js";

  export let path;
  export let component;

  let isAuthenticated = isLoggedIn();
  let isNavigating = false;

  $: {
    isAuthenticated = isLoggedIn();
  }

  function navigateToLogin() {
    if (!isNavigating) {
      isNavigating = true;
      window.location.href = "/";
    }
  }
</script>

{#if isAuthenticated}
  <Route path={path} component={component} />
{:else}
  {#if !isNavigating}
    {#await navigateToLogin()}
      <p>Redirecting to login page...</p>
    {/await}
  {/if}
{/if}