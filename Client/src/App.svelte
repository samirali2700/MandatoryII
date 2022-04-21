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

  import NavBar from "./components/NavBar.svelte";

  export let _user;
</script>

{#if _user !== null}
  <Router primary={false}>
    <NavBar />
    <main>
      <div class="hero">
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
      </div>
    </main>
    <Footer />
  </Router>
{:else}
  <Loader />
{/if}

<style>
  main {
    max-width: 1450px;
    margin: 0 auto;
  }
  .nav {
    margin: 0 auto;
    max-width: 1250px;
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
  .hero {
    min-height: calc(100vh - 225px);

    min-width: 450px;
  }
</style>
