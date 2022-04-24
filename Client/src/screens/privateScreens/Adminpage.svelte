<script>
  import Button from "../../components/Button.svelte";
  import Store from "../../components/Store.svelte";
  export let location;
  export let navigate;

  let selected = "Show Books";

  let buttons = [
    { name: "Show Books", isClicked: true },
    { name: "Show Users", isClicked: false },
  ];
</script>

<div class="hero w3-border w3-container w3-padding-16 w3-border-blue">
  {#each buttons as button, index}
    <Button
      on:click={() => (selected = button.name)}
      {button}
      borderLess={index > 1 ? true : false}
      {selected}
    />
  {/each}
</div>

<div class="hero">
  {#if selected === "Show Books"}
    <h1>Show Books</h1>
    <Store />
  {:else if selected === "Show Users"}
    <h1>Show Users</h1>
  {/if}
</div>

<style>
  .hero {
    margin: 50px 50px;
  }
</style>
