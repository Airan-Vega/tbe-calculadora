import { Component, h, State } from '@stencil/core';
import { evaluate } from 'mathjs';
import { calcStore } from '../global/calculator';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: false,
})
export class AppRoot {
  @State() currentExpression: string = '';
  @State() displayValue: string = '0';
  @State() resolvedOperation: boolean = false;

  private resetCalculator() {
    this.displayValue = '0';
    this.currentExpression = '';
    this.resolvedOperation = false;
  }

  private handleDigit(digit: string) {
    if (this.resolvedOperation) {
      this.resetCalculator();
    }
    this.displayValue = this.displayValue === '0' ? digit : this.displayValue + digit;
    this.currentExpression += digit;
  }

  private handleOperator(operator: string) {
    this.resolvedOperation = false;
    this.currentExpression += operator === 'x' ? '*' : operator;
    this.displayValue = this.displayValue + operator;
  }

  private handleDecimal() {
    this.displayValue += '.';
    this.currentExpression += '.';
  }

  private handleNegative() {
    const currentValue = parseFloat(this.displayValue);
    if (!isNaN(currentValue)) {
      const newValue = currentValue * -1;
      this.displayValue = newValue.toString();
      this.currentExpression = this.currentExpression.slice(0, -this.displayValue.length) + newValue;
    }
  }

  private evaluateExpression() {
    try {
      const result = evaluate(this.currentExpression);
      if (typeof result !== 'number' || !isFinite(result)) throw new Error('Invalid result');

      calcStore.addOperation(this.currentExpression, result);

      this.displayValue = result.toString();
      this.currentExpression = result.toString();
      this.resolvedOperation = true;
    } catch (error) {
      this.displayValue = 'Error';
      this.currentExpression = '';
    }
  }

  private handleKeyPress(label: string) {
    switch (label) {
      case 'C':
        this.resetCalculator();
        break;
      case '=':
        this.evaluateExpression();
        break;
      case '+':
      case '-':
      case 'x':
      case '/':
        this.handleOperator(label);
        break;
      case '.':
        this.handleDecimal();
        break;
      case '+/-':
        this.handleNegative();
        break;
      default:
        this.handleDigit(label);
        break;
    }
  }

  render() {
    return (
      <div class="calculator">
        <calc-display value={this.displayValue}></calc-display>
        <calc-keypad onButtonPressed={ev => this.handleKeyPress(ev.detail)}></calc-keypad>
        <calc-log logs={calcStore.getOperations()}></calc-log>
      </div>
    );
  }
}
