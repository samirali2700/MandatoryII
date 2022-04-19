<script>
  import { Route, Link, useFocus } from "svelte-navigator";

  // Provide a custom element to focus when this Route is navigated to
  const registerFocus = useFocus();

  function skipNavigation() {
    /* ... */

    console.log("Something is happeinng");
  }
</script>

<h1>Blog</h1>
<button use:registerFocus on:click={skipNavigation}> Skip navigation </button>

<Link to="svelte">Go to /blog/svelte</Link>
<Link to="navigator">Go to /blog/navigator</Link>

<Route path="svelte">Yeah, Svelte!</Route>
<Route path="navigator">Yeah, Routing!</Route>
