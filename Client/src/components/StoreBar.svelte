<script>
  import Button from "./Button.svelte";
  import SearchBar from "./SearchBar.svelte";
</script>

<div class="store-bar">
  <div class="sorting">
    <Button selected={true} name="New" />
    <Button selected={false} name="Popular" />
    <Button selected={false} name="Collections" />
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
    padding-right: 158px;
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
