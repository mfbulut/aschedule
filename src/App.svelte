<script>
  import ToggleTheme from "./ToggleTheme.svelte";
  import Timetable from "./Timetable.svelte";
  import Clock from "./Clock.svelte";
</script>

<main>
  <Clock />
  <Timetable />
  <ToggleTheme>Toggle</ToggleTheme>
</main>

<style>
  :global(body) {
    background-color: #ffffff;
    color: #000000;
    transition: background-color 0.3s;
  }
  :global(body.dark-mode) {
    background-color: #121212;
    color: #ffffff;
  }

  main {
    text-align: center;
  }
</style>
