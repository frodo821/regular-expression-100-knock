# 正規表現100本ノック

正規表現をオンラインでインタラクティブに学べる教材を目指して制作中です。

## 問題・テストケースを追加するには
`public/problems.json` を編集してください。このjsonには、以下に示す `Problem` 型の配列を格納します。

```ts
// 問題を表す型
interface Problem {
  // タイトル
  title: string;
  // 説明
  description: string;
  // テストケース
  test_cases: TestCases;
}

// テストケースを表す型
// passesおよびhidden_passesはマッチすることを検証する
// failsおよびhidden_failsはマッチしないことを検証する
interface TestCases {
  // マッチするべき文字列の例
  passes: string[];
  // マッチしてはならない文字列の例
  fails: string[];
  // 例として表示されない、マッチするべき文字列
  hidden_passes: string[];
  // 例として表示されない、 マッチしてはならない文字列
  hidden_fails: string[];
}
```