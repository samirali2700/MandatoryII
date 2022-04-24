<script>
  import { rememberMe, user, userLoggedIn } from "../stores";
  export let navigate;
  export let location;

  let email;
  let password;
  let checked = false;

  async function handleLogin() {
    $rememberMe = checked;
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        rememberMe: checked,
      }),
    };

    fetch("/Auth/login", options)
      .then((response) => response.json())
      .then((result) => {
        //if result message is not undefined, that means there is an error
        if (result.message) {
          toastr.error(result.message, "Error", {
            timeOut: 2500,
            positionClass: "toast-top-center",
            closeButton: true,
          });
        } else {
          toastr.success(`Welcome ${result.user.name}`, "Success", {
            timeOut: 2500,
            positionClass: "toast-top-center",
            closeButton: true,
          });
          $user = result.user;

          navigate("/", {
            state: { from: location.pathname },
            replace: true,
          });
        }
      })
      .catch((e) => console.log(e));
  }

  function resetPass() {
    fetch("/Auth/forgot", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          toastr.success(result.success, "Success", {
            timeOut: 2500,
            positionClass: "toast-top-center",
            closeButton: true,
          });
          document.getElementById("id01").style.display = "none";
        } else {
          toastr.error(result.fail, "Error", {
            timeOut: 2500,
            positionClass: "toast-top-center",
            closeButton: true,
          });
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  }
</script>

{#if !$userLoggedIn}
  <div class="w3-mobile w3-card container">
    <h1>Login</h1>
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
      <div class="remember-me-container">
        <input
          type="checkbox"
          class="rememberMe"
          id="rememberMe"
          bind:checked
        />
        <label for="rememberMe">Remember me?</label>
      </div>
      <div class="remember-me-container">
        <div>
          <p
            onclick="document.getElementById('id01').style.display='block'"
            style="color:#0088ff;"
          >
            Forgot password?
          </p>
          <span>This will only send email, with a none working link</span>
          <span class="w3-spin">....</span>

          <div id="id01" class="w3-modal ">
            <div
              class="w3-modal-content  w3-animate-zoom w3-card-4 w3-round-xlarge"
              style="padding:25px 10px; max-width:650px;"
            >
              <div class="w3-container w3-padding-16 w3-center w3-section">
                <span
                  onclick="document.getElementById('id01').style.display='none'"
                  class="w3-button w3-display-topright w3-red">&times;</span
                >
                <p>
                  You will receive an email with instructions on how to reset
                  your password
                </p>
                <input
                  style="width:100%; "
                  type="text"
                  bind:value={email}
                  class="w3-section"
                />
                <p
                  on:click={resetPass}
                  class="w3-button w3-blue w3-round-xlarge"
                  style="width:100%;"
                >
                  Reset password
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
{/if}

<style>
  .remember-me-container {
    display: flex;
    align-items: center;
    column-gap: 5px;
    width: 100%;
    font-size: 11px;
    color: rgb(93, 93, 93);
  }
  .rememberMe {
    width: 15px;
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
  @media screen and (max-width: 640px) {
    .container {
      min-width: 180px;
    }
  }
</style>
