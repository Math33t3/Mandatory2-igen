<script>
  let username = '';
  let password = '';
  let email = '';

  async function handleRegistration() {
    const response = await fetch('http://localhost:8080/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        email
      })
    });

    if (response.ok) {
      console.log('Registration successful!');
    } else {
      console.error('Registration failed.');
    }
  }
</script>

<h4>Register</h4>
<form on:submit|preventDefault={handleRegistration}>
  <label>
    Username:
    <input type="text" bind:value={username} required>
  </label>

  <label>
    Password:
    <input type="password" bind:value={password} required>
  </label>

  <label>
    Email:
    <input type="email" bind:value={email} required>
  </label>

  <button type="submit">Register</button>
</form>