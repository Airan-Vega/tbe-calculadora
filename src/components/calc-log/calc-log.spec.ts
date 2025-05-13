import { newSpecPage } from '@stencil/core/testing';
import { CalcLog } from './calc-log';

type Operation = {
  expression: string;
  result: number | string;
};

describe.only('calc-log', () => {
  it('muestra correctamente el historial vacío cuando logs está vacío', async () => {
    const page = await newSpecPage({
      components: [CalcLog],
      html: `<calc-log logs='[]'></calc-log>`,
    });

    const logList = page.root.shadowRoot.querySelector('ul');

    expect(logList).not.toBeNull();
    expect(logList.children.length).toBe(0);
  });

  it('actualiza el historial cuando se pasa un nuevo array de logs', async () => {
    const page = await newSpecPage({
      components: [CalcLog],
      html: `<calc-log logs='[]'></calc-log>`,
    });

    const calcLog = page.root as HTMLCalcLogElement;

    // Primero sin logs
    let items = page.root.shadowRoot.querySelectorAll('li');
    expect(items.length).toBe(0);

    // Actualizamos los logs
    const newLogs: Operation[] = [{ expression: '7 * 8', result: 56 }];

    calcLog.logs = newLogs;
    await page.waitForChanges();

    items = page.root.shadowRoot.querySelectorAll('li');
    expect(items.length).toBe(1);
    expect(items[0].textContent).toBe('7 * 8 = 56');
  });

  it('renderiza correctamente el HTML esperado', async () => {
    const logs: Operation[] = [
      { expression: '2 + 2', result: 4 },
      { expression: '5 - 3', result: 2 },
    ];

    const page = await newSpecPage({
      components: [CalcLog],
      html: `<calc-log logs='${JSON.stringify(logs)}'></calc-log>`,
    });

    const receivedHtml = page.root.outerHTML;
    const expectedHtml = `<calc-log logs="[{&quot;expression&quot;:&quot;2 + 2&quot;,&quot;result&quot;:4},{&quot;expression&quot;:&quot;5 - 3&quot;,&quot;result&quot;:2}]"><template shadowrootmode="open"><div class="log"><h3>Historial</h3><ul></ul></div></template></calc-log>`;

    expect(receivedHtml).toEqualHtml(expectedHtml);
  });
});
