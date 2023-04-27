<script>
  import { createEventDispatcher } from 'svelte';
  import { navigate } from 'svelte-navigator';
  import { isAuthenticated } from "../../auth.js";
  
  //const dispatch = createEventDispatcher();
  let username = '';
  let password = '';
  
  async function handleLogin(event) {
  event.preventDefault();

  const response = await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  if (response.ok) {
    console.log('Login successful!');
    isAuthenticated.set(true);
    navigate('/Birds');
  } else {
    console.error('Login failed.');
  }
}
</script>
  
<h4>Login</h4>
<form on:submit={handleLogin}>
  <label for="username">Username</label>
  <input type="text" id="username" bind:value={username} />
  
  <label for="password">Password</label>
  <input type="password" id="password" bind:value={password} />
  
  <button type="submit">Log in</button>
</form>

