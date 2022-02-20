import { StoryWorld } from "../StoryWorld";
import { Expression, ExpressionType } from "./Expression";

export class ExpressionEvaluator {
  // TODO NESTED_EXPRESSION operations priorities ...
  compute(expressions: Expression[], world: StoryWorld, prev: any = null): any {
    let res: any = null;
    if (!expressions.length) {
      res = prev;
    } else {
      let ex = expressions[0];
      if (ex.type == ExpressionType.STRING) {
        res = this.compute(expressions.slice(1), world, ex.text)
      }
      if (ex.type == ExpressionType.BOOLEAN) {
        res = this.compute(expressions.slice(1), world, ex.text === "true")

      }
      if (ex.type == ExpressionType.NUMBER) {
        res = this.compute(expressions.slice(1), world, Number(ex.text))
      }
      if (ex.type == ExpressionType.VARIABLE) {
        res = this.compute(expressions.slice(1), world, world.state[ex.text])
      }
      if (ex.type == ExpressionType.NESTED_INDEX) {
        let index = this.compute(ex.children, world);
        res = this.compute(expressions.slice(1), world, prev[index])
      }
      if (ex.type == ExpressionType.OPERATOR) {
        // array operator to access item
        if(ex.text == ".") {
          // error when there is no another element!
          let index = expressions[1].text;
          res = this.compute(expressions.slice(2), world, prev[index])
        }
        // there is no priority for operations!!! * + / -
        if (typeof prev === "number") {
          if(ex.text == "+") {
            res = prev + this.compute(expressions.slice(1), world)
          }
          if(ex.text == "-") {
            res = prev - this.compute(expressions.slice(1), world)
          }
          if(ex.text == "*") {
            res = prev * this.compute(expressions.slice(1), world)
          }
          if(ex.text == "/") {
            res = prev / this.compute(expressions.slice(1), world)
          }
          if(ex.text == ">") {
            res = prev > this.compute(expressions.slice(1), world)
          }
          if(ex.text == "<") {
            res = prev < this.compute(expressions.slice(1), world)
          }
          if(ex.text == "<=") {
            res = prev <= this.compute(expressions.slice(1), world)
          }
          if(ex.text == ">=") {
            res = prev >= this.compute(expressions.slice(1), world)
          }
          if(ex.text == "==") {
            res = prev >= this.compute(expressions.slice(1), world)
          }
          if(ex.text == "!=") {
            res = prev != this.compute(expressions.slice(1), world)
          }
        } else if (typeof prev === "boolean") {
          if(ex.text == "==") {
            let cur = this.compute(expressions.slice(1), world);
            res = prev == cur
          }
          if(ex.text == "!=") {
            let cur = this.compute(expressions.slice(1), world);
            res = prev != cur
          }
        } else {
          if(ex.text == "+") {
            res = prev + this.compute(expressions.slice(1), world)
          }
          if(ex.text == "==") {
            res = prev == this.compute(expressions.slice(1), world)
          }
          if(ex.text == "!=") {
            res = prev != this.compute(expressions.slice(1), world)
          }
        }
      }
    }
    return res;
  }

  buildObj(variable: any, value: any, expressions: Expression[], world: StoryWorld) {
    let res: any;
    if(!expressions.length) {
      return value;
    } else {
      let ex = expressions[0];
      if (ex.type == ExpressionType.VARIABLE) {
        let wrapper: any = {};
        if (variable[ex.text]) {
          let obj = this.buildObj(variable[ex.text], value, expressions.slice(1), world);
          wrapper[ex.text] = obj;
        } else {
          let obj = this.buildObj({}, value, expressions.slice(1), world);
          wrapper[ex.text] = obj;
        }
        res = Object.assign({}, variable, wrapper)
      } else if(ex.type == ExpressionType.OPERATOR && ex.text == ".") {
        res = this.buildObj(variable, value, expressions.slice(1), world);
      } else if(ex.type == ExpressionType.NESTED_INDEX) {
        let index = this.compute(ex.children, world);
        if (variable[index]){
          let obj = this.buildObj(variable[index], value, expressions.slice(1), world);
          variable[index] = obj;
        } else {
          let obj = this.buildObj({}, value, expressions.slice(1), world);
          variable[index] = obj;
        }
        res = variable

      }
    }
    return res;
  }

  setValue(world: StoryWorld, value: any, expressions: Expression[]) {
    let obj: any = this.buildObj(world.state, value, expressions, world);
    world.state = Object.assign({}, world.state, obj)
  }

  // separate expressions assignement of value computing
  split(expressions: Expression[]):[Expression[], Expression[]] {
    let [[left, right], found] = expressions.reduceRight((prev: [[Expression[], Expression[]], boolean], curr) => {
      let [[left, right], found] = prev;
      if (curr.type ==  ExpressionType.OPERATOR && curr.text == "="){
        found = true;
      } else if (found) {
        left = [curr].concat(left);
      } else {
        right = [curr].concat(right);
      }
      return([[left, right], found])
    }, [[[],[]], false])
    return [left, right];
  }

  eval(world: StoryWorld, expression: Expression[]): [StoryWorld, any]{
    let [left, right] = this.split(expression);

    let value = this.compute(right, world);
    if (left.length){
      if (left[0].type == ExpressionType.KEY_WORD) {
        this.setValue(world, value, left.slice(1));
      } else {
        this.setValue(world, value, left);
      }
      return [world, ""];
    } else {
      return [world, value];
    }
  }

  addPropertyListener(){

  }

}
