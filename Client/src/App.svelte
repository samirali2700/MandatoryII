<script>
  import { Router, link, Route, navigate } from "svelte-navigator";
  import Login from "./screens/Login.svelte";
  import Register from "./screens/Register.svelte";
  import Home from "./screens/privateScreens/Home.svelte";
  import Blog from "./screens/privateScreens/Shop.svelte";
  import PrivateRoute from "./PrivateRoute.svelte";
  import Loader from "./components/Loader.svelte";
  import Footer from "./components/Footer.svelte";
  import { user, userLoggedIn } from "./stores";

  export let _user;

  async function handleLogout() {
    await fetch("/Auth/logout", { method: "DELETE" });
    navigate("/login", {
      state: { from: location.pathname },
      replace: true,
    });
  }
</script>

{#if _user !== null}
  <Router primary={false}>
    <header class="w3-card" style="margin:0 50px;">
      <div class="nav w3-bottombar w3-padding-16 ">
        {#if $userLoggedIn}
          <div class="links w3-bar-item w3-left ">
            <a href="/" class="link" use:link>Home</a>
            <a href="/blog" class="link" use:link>Shop</a>
          </div>
          <div class="user-links w3-bar-item w3-right ">
            <span
              class=""
              style="margin-left:15px; user-select:none; font-size:16px; color:#cecece;"
              >Welcome, {$user.email}</span
            >
            <a href="/" class="link" on:click={handleLogout}>Logout</a>
          </div>
        {:else}
          <div style="margin-left:auto;">
            <a href="/login" class="link" use:link>Login</a>
            <a href="/register" class="link" use:link>Register</a>
          </div>
        {/if}
      </div>
    </header>

    <main>
      {#if $userLoggedIn}
        <PrivateRoute path="/" let:location>
          <Home />
        </PrivateRoute>
        <PrivateRoute path="blog" let:location>
          <Blog />
        </PrivateRoute>
      {:else}
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
      {/if}

      <Route component={Login} />
    </main>

    <Footer />
  </Router>
{:else}
  <Loader />
{/if}

<style>
  .nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #000;
  }
  .link {
    font-family: "Comic sans MS", bold;
    font-size: 22px;
    padding: 10px 0;
    width: 120px;
    text-align: center;
    color: #0080ff;
  }
  .link:hover {
    text-decoration: none;
    color: #fff;
  }
  a {
    display: inline-block;
    height: 100%;
  }
  main {
    height: 100%;
  }

  @media (min-width: 640px) {
  }
</style>
