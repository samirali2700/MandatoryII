<script>
  export let navigate;
  export let location;
  import { user } from "../stores";

  let name;
  let email;
  let password;
  let message = "";

  function handleSubmit() {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    };

    fetch("/Auth/signup", options)
      .then((response) => response.json())
      .then((result) => {
        //if result message is not undefined, that means there is an error
        if (result.message) {
          message = result.message;
        } else {
          message = "";

          $user = result.user;
          console.log(result);
          navigate("/", {
            state: { from: location.pathname },
            replace: true,
          });
        }
      })
      .catch((e) => console.log(e));
  }
</script>

<div class="w3-mobile w3-card container">
  <h1>Register</h1>
  <p class="response">{message}</p>
  <form on:submit|preventDefault={handleSubmit}>
    <input
      type="name"
      id="name"
      name="name"
      bind:value={name}
      placeholder="Name"
    />

    <input
      type="email"
      id="email"
      name="email"
      bind:value={email}
      placeholder="Email address"
    />

    <input
      type="password"
      id="password"
      name="password"
      bind:value={password}
      placeholder="Password"
    />

    <button>Register</button>
  </form>
</div>

<style>
  .response {
    color: red;
    padding-left: 15px;
    display: block;
    height: 25px;
  }
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
</style>
