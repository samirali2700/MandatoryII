<div class="loader-container w3-display-container">
  <div class="w3-display-middle">
    <div class="loader" />
  </div>
</div>

<style>
  .loader-container {
    height: 100vh;
  }
  .loader {
    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid #0080ff; /* Blue */
    border-radius: 50%;
    width: 70px;
    height: 70px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
