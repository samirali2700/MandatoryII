<script>
  import { Route } from "svelte-navigator";
  import PrivateRouteGuard from "./PrivateRouteGuard.svelte";

  export let path;
</script>

<Route {path} let:params let:navigate let:location>
  <PrivateRouteGuard>
    <slot {params} {navigate} {location} />
  </PrivateRouteGuard>
</Route>
