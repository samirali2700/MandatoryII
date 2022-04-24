<script>
  import Store from "../../components/Store.svelte";
  import StoreBar from "../../components/StoreBar.svelte";
  let buttons = [{ name: "Books" }, { name: "E-books" }];
</script>

<div>
  <StoreBar {buttons} />
  <Store />
</div>
