<script>
  import { onMount } from "svelte";

  let time = new Date();
  $: hours = time.getHours();
  $: minutes = time.getMinutes();
  $: seconds = time.getSeconds();
  let dayName = time.toLocaleDateString("tr-TR", { weekday: "long" });

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<h1>
  {hours} : {#if minutes < 10}0{/if}{minutes} : {#if seconds < 10}0{/if}{seconds}
  - {dayName}
</h1>

<style>
  h1 {
    color: #000000;
    font-family: Arial, sans-serif;
    font-size: 2.4em;
    font-weight: 100;
  }

  @media only screen and (max-width: 600px) {
    h1 {
      font-size: 1.6em;
    }
  }

  :global(body.dark-mode) h1 {
    color: #e8eaed;
  }
</style>
