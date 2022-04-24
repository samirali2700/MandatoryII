<script>
  import Button from "./Button.svelte";
  import SearchBar from "./SearchBar.svelte";

  export let buttons = [];
  buttons.forEach((b) => (b.isClicked = false));
  buttons[0].isClicked = true;

  let selected;
</script>

<div class="store-bar">
  <div class="sorting">
    {#each buttons as button, index}
      <Button
        {selected}
        {button}
        borderLess={index > 1 ? true : false}
        on:click={() => (selected = button.name)}
      />
    {/each}
  </div>
  <div id="search">
    <SearchBar />
  </div>
</div>

<style>
  .store-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 50px;
    padding-right: 140px;
    margin: 50px auto;
  }
  .sorting {
    display: flex;
    align-items: center;
  }
  @media screen and (max-width: 600px) {
    .store-bar {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid red;
      padding: 0;
    }
  }

  @media screen and (max-width: 900px) and (min-width: 600px) {
    .store-bar {
      padding-right: 115px;
    }
  }
</style>
