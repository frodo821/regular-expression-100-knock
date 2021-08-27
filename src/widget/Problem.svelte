<script lang="ts">
  import type { Problem } from '../problem';

  export let problem: Problem;
</script>

<div class="problem">
  <h2 class="title">{problem.title}</h2>
  <div class="contents">
    <p class="description">{problem.description}</p>

    <p class="cases">
      <span>マッチするべきものの例</span>
      <code>
        {#if problem.test_cases.passes.length > 0}
          {#each problem.test_cases.passes as passing_cases}
            <span>{passing_cases}</span>
          {/each}
        {:else}
          <span class="none">(なし)</span>
        {/if}
      </code>
    </p>
    <p class="cases">
      <span>マッチしてはならないものの例</span>
      <code>
        {#if problem.test_cases.fails.length > 0}
          {#each problem.test_cases.fails as failing_cases}
            <span>{failing_cases}</span>
          {/each}
        {:else}
          <span class="none">(なし)</span>
        {/if}
      </code>
    </p>
  </div>
</div>

<style lang="scss">
  @import '../theme/theme';

  .problem {
    margin: 3rem 1rem;
    padding: 0 10%;
  }

  .title {
    font-size: 1.5rem;
    padding-left: 2rem;
    border-bottom: solid 2px $secondary-color;
    position: sticky;
    top: 0;
    background: white;
  }

  .contents {
    padding: 0 2rem;

    .description {
      margin: 0.5rem 1rem;
    }

    .cases {
      > span:first-child {
        margin-bottom: 0.4rem;
        &::before {
          content: '・';
        }
      }

      code {
        display: block;
        background: rgb(33, 33, 41);
        color: #eeffff;
        padding: 0.5rem;

        span {
          display: block;

          &:not(.none) {
            color: #c3e88d;
          }
        }
      }
    }
  }
</style>
