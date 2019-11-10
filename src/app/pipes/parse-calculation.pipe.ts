import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "parseCalculation"
})
export class ParseCalculationPipe implements PipeTransform {
  transform(text: string): any {
    const arr = text.match(/(?<exp>([-+]?[0-9]+)+[-+][0-9]+)/g) || [];
    return arr.reduce(
      (text, match) => text.replace(match, `${this.calculate(match)}`),
      text
    );
  }

  private calculate(expression) {
    let currentNumberStr = "0";
    let result = 0;

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      if (char === "+" || char === "-") {
        result += Number(currentNumberStr);
        currentNumberStr = char;
      } else {
        currentNumberStr += char;
      }
    }

    return (result += Number(currentNumberStr));
  }
}
