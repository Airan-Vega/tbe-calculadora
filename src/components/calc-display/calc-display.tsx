import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'calc-display',
  styleUrl: 'calc-display.scss',
  shadow: true,
})
export class CalcDisplay {
  @Prop() value: string = '0';

  render() {
    return <div class="display">{this.value}</div>;
  }
}
