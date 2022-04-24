<script>
  import { Router, Route } from "svelte-navigator";
  import Login from "./screens/Login.svelte";
  import Register from "./screens/Register.svelte";
  import Home from "./screens/privateScreens/Home.svelte";
  import Admin from "./screens/Admin.svelte";
  import Adminpage from "./screens/privateScreens/Adminpage.svelte";
  import Blog from "./screens/privateScreens/Shop.svelte";
  import PrivateRoute from "./PrivateRoute.svelte";
  import Loader from "./components/Loader.svelte";
  import Footer from "./components/Footer.svelte";
  import { admin, adminLoggedIn, userLoggedIn } from "./stores";
  import { navigate } from "svelte-navigator";

  import NavBar from "./components/NavBar.svelte";

  export let _user;

  $: if ($adminLoggedIn) {
    navigate("/adminpage");
  } else if (!$userLoggedIn) {
    navigate("/login");
  }
</script>

{#if _user !== null}
  <Router primary={false}>
    <NavBar />
    <main>
      <div class="hero">
        {#if $userLoggedIn || $adminLoggedIn}
          <PrivateRoute path="/" let:location>
            <Home />
          </PrivateRoute>
          <PrivateRoute path="shop" let:location>
            <Blog />
          </PrivateRoute>
          {#if $adminLoggedIn}
            <Route path="adminpage" component={Adminpage} />
          {/if}
        {:else}
          <Route path="login" component={Login} />
          <Route path="register" component={Register} />
          <Route path="admin" component={Admin} />
        {/if}
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
  .hero {
    min-height: calc(100vh - 225px);
    min-width: 450px;
  }
</style>
