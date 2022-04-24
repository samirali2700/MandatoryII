<script>
  import { admin } from "../stores";
  export let location;
  export let navigate;

  let email;
  let password;

  async function handleLogin() {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    const response = await fetch("/Auth/admin", options);
    const data = await response.json();

    admin.set(data.admin);

    navigate("/adminpage", {
      state: { from: location.pathname },
      replace: true,
    });
  }
</script>

<div class="w3-mobile w3-card container">
  <h1>Admin Login</h1>
  <form on:submit|preventDefault={handleLogin}>
    <input
      type="email"
      id="email"
      name="email"
      bind:value={email}
      placeholder="Email address"
      required
    />
    <input
      type="password"
      id="password"
      name="password"
      bind:value={password}
      placeholder="Password"
      required
    />
    <button type="submit">Login</button>
  </form>
</div>

<style>
  .container {
    width: 40%;
    margin: 100px auto 0 auto;
    background-color: #fff;
    padding: 25px;
    border-radius: 20px;
  }
  form {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
  }
  h1 {
    margin-bottom: 15px;
    color: #0080ff;
    font-family: "Comic sans MS", cursive;
    padding-left: 15px;
    user-select: none;
  }
  input {
    height: 40px;
    padding-left: 15px;
  }
  input:focus {
    outline: none;
    color: #0080ff;
  }
  button {
    height: 40px;
    width: 100%;
    display: block;
    margin: 15px 0;
    background-color: #0080ff;
    color: #fff;
    border-radius: 20px;
  }
  button:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 640px) {
    .container {
      min-width: 180px;
    }
  }
</style>
