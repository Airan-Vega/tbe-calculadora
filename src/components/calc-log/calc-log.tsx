import { Component, h, Prop } from '@stencil/core';
import { Operation } from '../../utils/calc-store';

@Component({
  tag: 'calc-log',
  styleUrl: 'calc-log.scss',
  shadow: true,
})
export class CalcLog {
  @Prop() logs: Operation[] = [];

  render() {
    return (
      <div class="log">
        <h3>Historial</h3>
        <ul>
          {this.logs.map(log => (
            <li key={log.expression + log.result.toString()}>
              {log.expression} = {log.result}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
