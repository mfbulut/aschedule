<script>
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { lessons, lessonTimes, weekDays } from "./data.js";

  let currentDay = new Date(2022, 2, 8, 11, 40).getDay() - 1;
  let currentLesson = 32;
  let remainingTime = 0;

  const progress = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });

  function UpdateState() {
    let d = new Date(2022, 2, 8, 9, 20, 31);
    let time = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();

    currentLesson = 32;

    let schoolStart =
      lessons[0].start.hour * 3600 + lessons[0].start.minutes * 60;
    let schoolEnd =
      lessons[lessons.length - 1].end.hour * 3600 +
      lessons[lessons.length - 1].end.minutes * 60;
    if (schoolStart < time < schoolEnd) currentLesson = 16;

    lessonTimes.forEach((lesson, index) => {
      let startTime = lesson.start.hour * 3600 + lesson.start.minutes * 60;
      let endTime = lesson.end.hour * 3600 + lesson.end.minutes * 60;

      if (startTime <= time && time <= endTime) {
        let rtime = endTime - time;
        let ptime = time - startTime;
        let minutes = Math.floor(rtime / 60);
        let seconds = rtime - minutes * 60;
        currentLesson = index;
        remainingTime = { ptime, rtime, minutes, seconds };
      }
    });
  }

  onMount(() => {
    UpdateState(currentDay);
    progress.set(remainingTime.ptime / 2400);

    const interval = setInterval(() => {
      UpdateState(currentDay);
      progress.set(remainingTime.ptime / 2400);
    }, 1000);
  });
</script>

<div>
  <h1>
    {#if -1 < currentDay && currentDay < 6 && currentLesson !== 32}
      Ders {lessons[currentDay][currentLesson]} <br />
      {#if remainingTime.minutes < 10}0{/if}{remainingTime.minutes} : {#if remainingTime.seconds < 10}0{/if}{remainingTime.seconds}
      kaldı

    {:else if currentLesson === 16}
      Teneffüs
    {:else}Okul Bitti
    {/if}
  </h1>
  <table class="myTable">
    <thead>
      <tr>
        <th>Zaman</th>
        {#each weekDays as weekDay, i}
          {#if i == currentDay}
            <th class="currentDayHeader">{weekDay}</th>
          {:else}
            <th>{weekDay}</th>
          {/if}
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each lessonTimes as header, timeIndex}
        <tr>
          <td
            >{#if header.start.hour < 10}0{/if}{header.start
              .hour}:{#if header.start.minutes < 10}0{/if}{header.start.minutes}
            - {#if header.end.hour < 10}0{/if}{header.end
              .hour}:{#if header.end.minutes < 10}0{/if}{header.end.minutes}</td
          >
          {#each lessons as lesson, dayIndex}
            {#if dayIndex == currentDay}
              {#if timeIndex == currentLesson}
                <td class="currentLesson">{lesson[timeIndex]}</td>
              {:else}<td class="currentDay">{lesson[timeIndex]}</td>{/if}
            {:else}
              <td>{lesson[timeIndex]}</td>
            {/if}
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  h1 {
    color: #000000;
    font-family: Arial, sans-serif;
    font-size: 3em;
    font-weight: 100;
  }

  .myTable {
    width: 72%;
    margin: auto;
    background-color: #f2eee2;
    border-collapse: collapse;
    border-width: 3px;
    border-color: #71dfe7;
    border-style: solid;
    color: #000000;
    font-size: 1.4em;
  }

  .myTable td,
  .myTable th {
    border-width: 2px;
    border-color: #71dfe7;
    border-style: solid;
    padding: 3px;
    width: 12%;
  }

  .myTable thead {
    background-color: #71dfe7;
  }

  .myTable td:hover {
    color: rgb(255, 255, 255);
    background-color: rgb(60, 60, 60);
  }

  .currentDayHeader {
    color: rgb(255, 255, 255);
    background-color: #1d89e2;
  }

  .currentDay {
    color: rgb(0, 0, 0);
    background-color: #d8d6af;
  }

  .currentLesson {
    color: rgb(255, 255, 255);
    background-color: #ff1100;
  }

  #myProgress {
    width: 50%;
    background-color: grey;
    margin: auto;
  }

  #myBar {
    width: 1%;
    height: 30px;
    background-color: green;
  }

  @media only screen and (max-width: 600px) {
    h1 {
      font-size: 1.6em;
    }
    .myTable td,
    .myTable th {
      font-size: 3vw;
    }
  }

  :global(body.dark-mode) .myTable {
    background-color: #1d3040;
    color: #ffffff;
  }

  :global(body.dark-mode) .myTable thead {
    color: #000000;
  }

  :global(body.dark-mode) .currentDayHeader {
    color: #ffffff;
  }

  :global(body.dark-mode) .currentDay {
    background-color: #46420c;
    color: #ffffff;
  }

  :global(body.dark-mode) h1 {
    color: #ffffff;
  }

  :global(body.dark-mode) .myTable td:hover {
    color: rgb(255, 255, 255);
    background-color: rgb(120, 120, 120);
  }
</style>
