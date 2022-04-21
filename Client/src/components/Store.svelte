<script>
  import Book from "./Book.svelte";

  export let books = [
    {
      id: 1,
      title: "The King Of Drugs",
      src: "https://totil.net/live_book_cover/xUDty98MYq8lWn7nGkq7V29cNKbTppcWxPrikYps.jpg",
      Author: "Nora Barret",
    },
    {
      id: 2,
      title: "My Book Cover",
      src: "https://edit.org/photos/images/cat/book-covers-big-2019101610.jpg-1300.jpg",
      Author: "My Name",
    },
    {
      id: 3,
      title: "The Hypocrite World",
      src: "https://marketplace.canva.com/EAD7WuSVrt0/1/0/1003w/canva-colorful-illustration-young-adult-book-cover-LVthABb24ik.jpg",
      Author: "Sophia Hill",
    },
    {
      id: 4,
      title: "Book Of Art",
      src: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
      Author: "Regina Phalance",
    },
    {
      id: 5,
      title: "The Gravity of Us",
      src: "https://assets.teenvogue.com/photos/5cd4384fac4d9e712fe2ebb0/2:3/w_1852,h_2778,c_limit/The%20Gravity%20of%20Us_.jpg",
      Author: "Phill Stamper",
    },
    {
      id: 6,
      title: "The Beautiful World, Where are you",
      src: "https://i.guim.co.uk/img/media/51e82d1479c8bec3fbf6e620f44199490171ac66/433_134_1145_1723/master/1145.jpg?width=700&quality=85&auto=format&fit=max&s=ba7fd94e443ce0193c3a42095c9b4736",
      Author: "Sally Rooney",
    },
  ];
</script>

<div class="store w3-mobile">
  {#each books as book (book.id)}
    <Book {book} />
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
