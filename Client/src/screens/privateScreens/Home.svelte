<script>
  import { user, rememberMe } from "../../stores";
  import { useLocation } from "svelte-navigator";
  let location = useLocation();
</script>

<div class="intro ">
  <h1 class="intro-text w3-animate-zoom">
    Learning is Living <span style="color:#fff">|</span> Living is Learning
  </h1>
  <div class="main " />
</div>

<style>
  .intro {
    padding-top: 50px;
    margin-top: 100px;
    margin-bottom: 50px;
    border-bottom: 1px solid red;
    background: url("/images/intro.jpg") no-repeat center center; /*fixed*/
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: contain;
    height: 700px;
  }
  .main {
    height: 100%;
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
