<script lang="ts">
  import { MaterialApp, ProgressCircular } from 'svelte-materialify';
  import { fetchProblems } from './problem';
  import Problem from './widget/Problem.svelte';

  let request = fetchProblems();
</script>

<MaterialApp>
  <header>
    <h1>正規表現100本ノック</h1>
  </header>
  <main>
    {#await request}
      <div class="wait">
        <ProgressCircular indeterminate color="primary" />
      </div>
    {:then problems}
      {#each problems as problem}
        <Problem {problem} />
      {/each}
    {/await}
  </main>
</MaterialApp>

<style lang="scss">
  @import 'theme/theme';

  h1 {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 2rem;
    background: $primary-color;
    color: map-get(map-get($material-dark-theme, 'text'), 'primary');
    padding-left: 2rem;
  }

  main {
    position: relative;
    padding-bottom: 3rem;
  }

  :global(body) {
    padding: 0;
  }
</style>
