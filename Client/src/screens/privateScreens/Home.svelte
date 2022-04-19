<script>
  import { user, rememberMe } from "../../stores";
  import { useLocation } from "svelte-navigator";
  let location = useLocation();
</script>

<h1>Home</h1>
<h1>Welcome {$user.name}</h1>
<p>Remember me: {$rememberMe}</p>

<h2>{JSON.stringify($user)}</h2>
