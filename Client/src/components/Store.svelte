<script>
  import Login from "../screens/Login.svelte";

  import { onMount } from "svelte";

  import Book from "./Book.svelte";
  import Loader from "./Loader.svelte";

  let books = [];

  onMount(async () => {
    const response = await fetch("/api/books");
    const data = await response.json();
    books = data;
    console.log(data);
  });
</script>

<div class="store w3-mobile">
  {#each books as book (book._id)}
    <Book {book} />
  {:else}
    <div>
      <Loader />
    </div>
  {/each}
</div>

<style>
  .store {
    padding: 100px 50px;
    display: grid;
    row-gap: 50px;
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width: 600px) {
    .store {
      grid-template-columns: 1fr;
    }
  }
  @media screen and (max-width: 1150px) and (min-width: 600px) {
    .store {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
