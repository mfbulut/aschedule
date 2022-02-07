<script>
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { lessons, lessonTimes, weekDays } from "./data.js";

  let currentDay = new Date().getDay() - 1;
  let currentLesson = 404;
  let rtime;

  const progress = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });

  function UpdateState() {
    let date = new Date();
    let time =
      date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();

    if (
      lessonTimes[0].s.h * 3600 + lessonTimes[0].s.m * 60 < time &&
      time <
        lessonTimes[lessonTimes.length - 1].e.h * 3600 +
          lessonTimes[lessonTimes.length - 1].e.m * 60
    ) {
      currentLesson = 64;
    } else {
      currentLesson = 404;
    }

    lessonTimes.forEach((lesson, index) => {
      let startTime = lesson.s.h * 3600 + lesson.s.m * 60;
      let endTime = lesson.e.h * 3600 + lesson.e.m * 60;

      if (startTime <= time && time <= endTime) {
        currentLesson = index;

        let passedTime = time - startTime;
        let remainingTime = endTime - time;
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime - minutes * 60;
        rtime = { ptime: passedTime, rtime: remainingTime, minutes, seconds };
      }
    });
  }

  onMount(() => {
    UpdateState();
    progress.set(rtime.ptime / 2400);

    const interval = setInterval(() => {
      UpdateState();
      progress.set(rtime.ptime / 2400);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div>
  <div>
    {#if -1 < currentDay && currentDay < 6 && currentLesson < 32}
      <h1>Ders {lessons[currentDay][currentLesson]}</h1>
      <h1>
        {#if rtime.minutes < 10}0{/if}{rtime.minutes} : {#if rtime.seconds < 10}0{/if}{rtime.seconds}
        Kaldı
      </h1>
    {:else if -1 < currentDay && currentDay < 6 && currentLesson === 64}
      <h1>Teneffüs</h1>
    {:else}
      <h1>Okul Bitti</h1>
    {/if}
  </div>
  <progress value={$progress} />

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
          <td>
            {#if header.s.h < 10}0{/if}{header.s
              .h}:{#if header.s.m < 10}0{/if}{header.s.m} - {#if header.e.h < 10}0{/if}{header
              .e.h}:{#if header.e.m < 10}0{/if}{header.e.m}
          </td>
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
    font-size: 2.4em;
    font-weight: 125;
    margin-bottom: 0px;
  }

  .myTable {
    width: 72%;
    margin: auto;
    background-color: #ffffff;
    border-collapse: collapse;
    border-width: 4px;
    border-color: #71dfe7;
    border-style: solid;
    color: #000000;
    font-size: 1.4em;
  }

  .myTable td,
  .myTable th {
    border-width: 3px;
    border-color: #71dfe7;
    border-style: solid;
    padding: 2px;
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

  progress {
    width: 72%;
    height: 72px;
  }

  @media only screen and (max-width: 600px) {
    h1 {
      font-size: 1.6em;
    }
    .myTable td,
    .myTable th {
      font-size: 3vw;
    }

    progress {
      height: 24px;
    }
  }

  :global(body.dark-mode) .myTable {
    background-color: #121212;
    color: #ffffff;
  }

  :global(body.dark-mode) .myTable thead {
    color: #000000;
  }

  :global(body.dark-mode) .currentDayHeader {
    color: #ffffff;
  }

  :global(body.dark-mode) .currentDay {
    background-color: #312d02;
    color: #ffffff;
  }

  :global(body.dark-mode) h1 {
    color: #ffffff;
  }

  :global(body.dark-mode) .myTable td:hover {
    color: rgb(255, 255, 255);
    background-color: rgb(95, 95, 95);
  }
</style>
