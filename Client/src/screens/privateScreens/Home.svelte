<script>
  import { useLocation } from "svelte-navigator";
  import StoreBar from "../../components/StoreBar.svelte";
  import Store from "../../components/Store.svelte";

  let location = useLocation();
  let books = [];
</script>

<div class="intro ">
  <h1 class="intro-text w3-animate-zoom">
    Learning is Living <span style="color:#fff">|</span> Living is Learning
  </h1>
</div>
<div class="home-store">
  <StoreBar />
  <Store />
</div>

<style>
  .intro {
    padding-top: 50px;
    margin-top: 100px;
    margin-bottom: 50px;
    background: url("/images/intro.jpg") no-repeat center center; /*fixed*/
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: contain;
    height: 700px;
  }
  .home-store {
    height: auto;
    padding: 50px 0;
    display: block;
  }
  .intro-text {
    font-family: "Averia Serif Libre";
    font-style: normal;
    font-weight: 500;
    font-size: 48px;
    line-height: 58px;
    text-align: center;
    color: #18a0fb;
    width: 100%;

    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */

    z-index: 2; /**if background blur*/
  }
</style>
