<script lang="ts">
  import type { Problem, TestResult } from '../problem';
  import { resultMessage } from '../problem';
  import hljs from 'highlight.js';
  export let problem: Problem;
  let regexp: string = '';
  let error: string = '';
  let result: TestResult | null = null;

  function stripError(err: Error): string {
    switch (err.name) {
      case 'SyntaxError':
        return '入力された正規表現に誤りがあります。';
      default:
        return '不明なエラーです。';
    }
  }

  function testAll(regexp: RegExp): TestResult {
    console.log(regexp);

    let passes = problem.test_cases.passes.concat(
      problem.test_cases.hidden_passes || []
    );
    let fails = problem.test_cases.fails.concat(
      problem.test_cases.hidden_fails || []
    );

    for (let idx = 0; idx < passes.length; idx++) {
      const testcase = passes[idx];
      if (!regexp.test(testcase)) {
        return {
          match: true,
          status: 'wrong',
          wa_case: testcase,
        };
      }
    }

    for (let idx = 0; idx < fails.length; idx++) {
      const testcase = fails[idx];
      if (regexp.test(testcase)) {
        return {
          match: false,
          status: 'wrong',
          wa_case: testcase,
        };
      }
    }

    return {
      status: 'accepted',
    };
  }
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
    <h3>回答欄</h3>
    <form
      action="#"
      on:submit={(evt) => {
        result = null;
        error = '';

        try {
          result = testAll(new RegExp(`^(${regexp.replace(/^\^|\$$/g, '')})$`));
        } catch (e) {
          error = stripError(e);
        }
        evt.preventDefault();
      }}
    >
      <div class="editor">
        <input type="text" class="edit" bind:value={regexp} />
        <code class="hl">
          {@html hljs.highlight(regexp, { language: 'regexp' }).value}
        </code>
        <input type="submit" value="OK" class="submit" />
      </div>
      {#if result}
        <p class={`result ${result.status}`}>
          {@html resultMessage(result)}
        </p>
      {/if}
      {#if error}
        <p class="error">{error}</p>
      {/if}
    </form>
  </div>
</div>

<style lang="scss">
  @import '../theme/theme';

  .problem {
    margin: 1rem 1rem;
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

  h3 {
    font-size: 1.2rem;
    padding-left: 1rem;
    border-bottom: solid 2px $secondary-color;
    top: 0;
    background: white;
    margin-bottom: 0.5rem;
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
  .editor {
    position: relative;
    .edit {
      background: none;
      outline: none;
      border: none;
      caret-color: white;
      color: transparent;
      position: absolute;
      font-size: 1rem;
      font-family: monospace;
      top: 0;
      left: 0;
      padding: 0.2rem 0.4rem;
      margin: 0;
      width: 100%;
      font-weight: 600;

      &::selection {
        color: transparent;
        background: rgba(81, 255, 238, 0.514);
      }
    }

    .hl {
      background-color: #0d1117;
      color: #c9d1d9;
      font-size: 1rem;
      font-family: monospace;
      display: block;
      width: 100%;
      height: 1.9rem;
      padding: 0.2rem 0.4rem;
    }
  }

  .error {
    background: rgb(255, 142, 108);
    color: rgb(94, 7, 7);
    padding: 0.2rem 0.4rem;
    margin-top: 0.2rem;
    border-radius: 2px;
  }

  .submit {
    border: solid 2px #6200ee;
    border-radius: 4px;
    margin: 0.4rem 0;
    padding: 0.2rem 2rem;

    &:active {
      box-shadow: 4px 4px 2px 2px inset #1e1e2f9a;
    }
  }
</style>
