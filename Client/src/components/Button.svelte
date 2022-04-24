<script>
  export let button;
  export let selected;
  export let borderLess;
</script>

<button
  on:click
  class="w3-button w3-hover-blue"
  class:current={selected === button.name}
  class:borderless={borderLess}>{button.name}</button
>

<style>
  button:first-of-type {
    border-right: none;
  }

  .borderless {
    border-left: none;
  }
  .current {
    background-color: #0088ff;
    color: #fff;
  }
  button {
    height: 45px;
    font-family: "Caudex";
    font-style: italic;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    width: 121px;
    border: 1px solid #fff;
  }
  @media screen and (max-width: 900px) {
    button {
      width: 100px;
    }
  }
</style>
