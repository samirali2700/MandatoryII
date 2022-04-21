<script>
  import { user, userLoggedIn } from "../stores";
  import { link } from "svelte-navigator";

  async function handleLogout() {
    await fetch("/Auth/logout", { method: "DELETE" });
    navigate("/login", {
      state: { from: location.pathname },
      replace: true,
    });
  }
</script>

<header class="w3-bottombar" style="margin:0 50px;">
  <div class="nav  w3-padding-16 ">
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

<style>
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
</style>
