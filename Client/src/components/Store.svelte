<script>
  import Book from "./Book.svelte";
  import Loader from "./Loader.svelte";
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
    {
      id: 7,
      title: "Fortress Blood",
      src: "https://s3-alpha-sig.figma.com/img/cb2c/db21/1de0aa30527390ccb81d00ff9129b257?Expires=1651449600&Signature=g3WuwK7xwyHi7C3aBYvlvJ-TLeMe1r4HFWTWkPoDoSzxRxjKRAqT32LT99vYs9surA9VMYpzB9OipV1kvnumIsZEvTzDmRfsW~7q3k9xkz78D6WgCRFSmSMbb9SlGeI46GAapXjkKDFEev~1XKvB3RrIZXOjQthPBQEeeoanbtR4wAHJ4jtxjkVf5KqQofOZFGw2bLWrH2ZCQhxR5hpBcvmi0gq-Kxz7YwEcqecFCrtLwwjWVTzURh7zEqVLHYdK-yXnhUxm14Rh0Lfisj1jH2uD2tO7e2p5nKbXRu5aGwoYgKjgpk85wLx10pzkt4NmywG6EE-yJKxe39RQ0y7qbg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      Author: "L.D Goffigan",
    },
    {
      id: 8,
      title: "A Powerfull Path",
      src: "https://s3-alpha-sig.figma.com/img/deb1/b84e/cf8f6368aae649eb8126fbd1af12f84a?Expires=1651449600&Signature=Pqfc8o9GJHyWal8HrV1X9ZzMvhcEIavvHIDHhxvB1-1Ug~1G7Hd4sGlYTIte5DXpjsmMqnahLHj4XoVWY-YpnE6SPFkfxxPB1GoUOItwh1pdGr4nJ2yu6mvKYa9OhLrALLyZIxFN256a58kWpL8sGSoKfDGqew7UgW6AWnNjHMneBLGCSAHhDeS2-jeDogU~aWs0fyNBzvqC08J7kMkViZ6qYysaJTYcfNMUtUyhoYDdJUN9tBpl~x56BZ5cP5xFKhfzXbbspYOsp3dWaCpCYifH3qk6OrNh1WwX5r5yc3Jr6MWzd1HDwZJ4pH~eo~ZeqHAd7MKGfNW5U6Y0fhU8SA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      Author: "Haven Obrien",
    },
    {
      id: 9,
      title: "Earrth 2100, What is left",
      src: "https://s3-alpha-sig.figma.com/img/87e7/c8f0/cb24d9759659777bd1448cab026d1c8a?Expires=1651449600&Signature=buqIvhN19ym770LJlhc6snvzuReOzds2nHRqXV2MDy8yxqq4CrlB6HyOvBI7qfxPUzBouoklakFPrOteG0KA9-43aBsvEc6ivjmL5nR6O7wt-B1VtuEUL-vW-pFKF0NfzFChBTpqMrP3cPxxMdlpevjfGV0FEobEgRebrvvF7RbgDzMtMn-2aRqk0YBFqYia2xwXCkqkYgoyEXcxC6xQGVzzfhkRVj~vA1rMFXpUwbvwn94D54FT8vB31KBZf3gExeeThhNNOf2l6CvR8fFCFE8SsS4lXy~V83VSwZiIgon7qezvcW2P31CHWHM2QknGNxM80sYq4oito1qvV6js2g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      Author: "Septimius Severus",
    },
  ];
</script>

<div class="store w3-mobile">
  {#each books as book (book.id)}
    <Book {book} />
  {:else}
    <Loader />
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
