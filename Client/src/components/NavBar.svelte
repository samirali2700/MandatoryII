<script>
  import { user, userLoggedIn, adminLoggedIn, admin } from "../stores";
  import { link, useLocation } from "svelte-navigator";

  let location = useLocation();
  $: console.log($location.pathname);
  let current;

  $: current = $location.pathname;

  async function handleLogout() {
    await fetch("/Auth/logout", { method: "DELETE" });
    navigate("/login");
  }
</script>

<header class="w3-bottombar" style="margin:0 50px;">
  <div class="nav  w3-padding-16 ">
    {#if $userLoggedIn || $adminLoggedIn}
      <div class="links w3-bar-item w3-left ">
        <a href="/" class="link" class:current={current === "/"} use:link
          >Home</a
        >
        <a
          href="/shop"
          class="link"
          class:current={current === "/shop"}
          use:link>Shop</a
        >
        {#if $adminLoggedIn}
          <a
            href="/adminpage"
            class="link"
            class:current={current === "/adminpage"}
            use:link>Admin</a
          >
        {/if}
      </div>
      <div class="user-links w3-bar-item w3-right ">
        <span
          class=""
          style="margin-left:15px; user-select:none; font-size:16px; color:#cecece;"
          >Welcome, {$user.email || $admin.name}</span
        >
        <a href="/" class="link" on:click={handleLogout}>Logout</a>
      </div>
    {:else}
      <div style="margin-left:auto;">
        <a
          href="/login"
          class="link"
          class:current={current === "/login"}
          use:link>Login</a
        >
        <a
          href="/register"
          class="link"
          class:current={current === "/register"}
          use:link>Register</a
        >
        <a
          href="/admin"
          class="link"
          class:current={current === "/admin"}
          use:link>Admin</a
        >
      </div>
    {/if}
  </div>
</header>

<style>
  .current {
    color: #fff;
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
  }
  .link:hover {
    text-decoration: none;
    color: #fff;
  }
  a {
    display: inline-block;
    height: 100%;
    color: #0080ff;
  }
</style>
