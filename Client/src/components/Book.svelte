<script>
  export let book;
</script>

<div class="book-cover w3-border">
  <img src={book.src} alt="Book" />
</div>

<style>
  .book-cover {
    width: 364px;
    height: 526px;
    box-shadow: 2px 2px 10px rgba(255, 255, 255, 0.5);
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 900px) {
    .book-cover {
      width: 300px;
      border: 1px solid blue;
    }
  }
</style>
