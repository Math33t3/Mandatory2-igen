<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Registration from "./pages/Registration/Registration.svelte";
  import Birds from "./pages/Birds/Birds.svelte";
  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";
  import PrivateRoute from "./pages/Auth/PrivateRoute.svelte";
  import Login from "./pages/Login/Login.svelte";
  import { isAuthenticated } from './auth.js';

  const handleLogin = ({ detail }) => {
    isAuthenticated.set(detail.isAuthenticated);
    console.log("login attempted");
  };

  onMount(async () => {
    const response = await fetch('http://localhost:8080/api/auth/check', {
      credentials: 'include',
    });
    const data = await response.json();
    isAuthenticated.set(data.data);
  });

  const handleLogout = async () => {
    const response = await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    isAuthenticated.set(false);
    navigate("/");
  };

  let authenticated = isAuthenticated;
</script>

<div class="hidden" tabindex="-1"></div>

<Router>
  <nav>
    <ul>
      {#if !authenticated}
        <h1>Welcome</h1>
        <Route path="/">
          <Login />
          <Registration />
        </Route>
        <Route path="/login">
          <Login on:login={handleLogin} />
        </Route>
      {:else}
        <li>
          <PrivateRoute path="/Birds" component={Birds}>
            <Birds
              title="European Swallow"
              imageSrc="./Swallow.jpg"
              description="Knightly Bird. Not to be confused with its African cousin"
            />
          </PrivateRoute>
          <button on:click={handleLogout}>Logout</button>
        </li>
      {/if}
    </ul>
  </nav>
</Router>


        <!--<li>
          <PrivateRoute path="/" component={Birds} />
        </li>
       {/if}-->