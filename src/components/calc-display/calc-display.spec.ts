import { newSpecPage } from '@stencil/core/testing';
import { CalcDisplay } from './calc-display';

describe('calc-display', () => {
  it('muestra el valor por defecto "0" cuando no se pasa value', async () => {
    const page = await newSpecPage({
      components: [CalcDisplay],
      html: `<calc-display></calc-display>`,
    });

    const display = page.root?.shadowRoot?.querySelector('.display');

    expect(display).not.toBeNull();
    expect(display.textContent).toBe('0');
  });

  it('muestra el valor pasado por la prop "value"', async () => {
    const page = await newSpecPage({
      components: [CalcDisplay],
      html: `<calc-display value="123"></calc-display>`,
    });

    const display = page.root?.shadowRoot?.querySelector('.display');

    expect(display).not.toBeNull();
    expect(display.textContent).toBe('123');
  });

  it('actualiza el valor correctamente al cambiar la prop "value"', async () => {
    const page = await newSpecPage({
      components: [CalcDisplay],
      html: `<calc-display value="5"></calc-display>`,
    });

    const calcDisplay = page.root as HTMLCalcDisplayElement;
    const display = page.root?.shadowRoot?.querySelector('.display');

    expect(display.textContent).toBe('5');

    calcDisplay.value = '42';
    await page.waitForChanges();

    expect(display.textContent).toBe('42');
  });

  it('renderiza correctamente el HTML esperado', async () => {
    const page = await newSpecPage({
      components: [CalcDisplay],
      html: `<calc-display value="999"></calc-display>`,
    });

    const receivedHtml = page.root.outerHTML;
    const expectedHtml = `<calc-display value="999"><template shadowrootmode="open"><div class="display">999</div></template></calc-display>`;

    expect(receivedHtml).toEqualHtml(expectedHtml);
  });
});
