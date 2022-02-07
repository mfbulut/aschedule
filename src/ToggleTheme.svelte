<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  export const enabled = writable(localStorage.enabled === "true");

  enabled.subscribe((value) => (localStorage.enabled = String(value)));

  let count = 0;
  function toggle() {
    window.document.body.classList.toggle("dark-mode");
    enabled.set(localStorage.enabled !== "true");
    count++;
    console.log(count);
    if (20 < count) {
      let btn = document.getElementById("toggle");
      btn.innerText = "Yavaş lan kaç tane tıklıyon";
      setTimeout(function () {
        btn.innerText = "Toggle";
        count = 0;
      }, 5000);
    }
  }

  onMount(async () => {
    if (localStorage.enabled === "true") {
      window.document.body.classList.toggle("dark-mode");
    }
  });
</script>

<div>
  <button id="toggle" on:click={toggle}>
    <slot />
  </button>
</div>

<style>
  div {
    width: 100%;
    text-align: center;
    margin-top: 16px;
  }

  button {
    background-color: #f76027;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px 10px 20px;
    text-transform: uppercase;
    transition: background-color 0.3s;
    font-size: x-large;
  }

  :global(body.dark-mode) button {
    background-color: #0084f6;
    color: white;
  }
</style>
