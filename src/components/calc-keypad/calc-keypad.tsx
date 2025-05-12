import { Component, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'calc-keypad',
  styleUrl: 'calc-keypad.scss',
  shadow: true,
})
export class CalcKeypad {
  @Event() buttonPressed: EventEmitter<string>;

  buttons = [
    ['C', '+/-', '%', '/'],
    ['7', '8', '9', 'x'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  handleButtonClick(label: string) {
    this.buttonPressed.emit(label);
  }

  render() {
    return (
      <div class="keypad">{this.buttons.map(row => row.map(btn => <calc-button label={btn} wide={btn === '0'} onButtonClick={ev => this.handleButtonClick(ev.detail)} />))}</div>
    );
  }
}
