/**
 * 問題を表す型
*/
export interface Problem {
  /** タイトル */
  title: string;
  /**説明 */
  description: string;
  /** テストケース */
  test_cases: TestCases;
}

/**
 * テストケースを表す型。
 * * passesおよびhidden_passesはマッチすることを検証する
 * * failsおよびhidden_failsはマッチしないことを検証する
 * */
export interface TestCases {
  /** マッチするべき文字列の例 */
  passes: string[];
  /** マッチしてはならない文字列の例 */
  fails: string[];
  /** 例として表示されない、マッチするべき文字列 */
  hidden_passes: string[];
  /**例として表示されない、 マッチしてはならない文字列 */
  hidden_fails: string[];
}

export async function fetchProblems(): Promise<Problem[] | null> {
  let req = await fetch('/problems.json');

  if (!req.ok) {
    return null;
  }

  return req.json();
}
