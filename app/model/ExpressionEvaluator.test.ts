import { Expression, ExpressionType } from "./Expression";
import { ExpressionEvaluator } from "./ExpressionEvaluator";

describe('Evaluator is able to', () => {
  test('split assignement', () => {
    let evaluator = new ExpressionEvaluator();
    let e1 = new Expression("var", ExpressionType.KEY_WORD);
    let e2 = new Expression("variable", ExpressionType.VARIABLE);
    let e3 = new Expression("=", ExpressionType.OPERATOR);
    let e4 = new Expression("value", ExpressionType.STRING);
    expect(evaluator.split([e1, e2, e3, e4])).toStrictEqual([
      [e1, e2],
      [e4]
    ]);
  });
});
