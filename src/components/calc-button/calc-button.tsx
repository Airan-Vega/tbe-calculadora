import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'calc-button',
  styleUrl: 'calc-button.scss',
  shadow: true,
})
export class CalcButton {
  @Prop() label: string;
  @Prop() wide: boolean = false;

  @Event() buttonClick: EventEmitter<string>;

  private handleClick() {
    this.buttonClick.emit(this.label);
  }

  render() {
    return (
      <button onClick={() => this.handleClick()} class={{ wide: this.wide }}>
        {this.label}
      </button>
    );
  }
}
