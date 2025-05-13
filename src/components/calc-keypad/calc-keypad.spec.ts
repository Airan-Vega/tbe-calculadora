import { newSpecPage } from '@stencil/core/testing';
import { CalcKeypad } from './calc-keypad';

describe('calc-keypad', () => {
  it('renderiza correctamente todos los botones', async () => {
    const page = await newSpecPage({
      components: [CalcKeypad],
      html: '<calc-keypad></calc-keypad>',
    });

    const buttons = page.root.shadowRoot.querySelectorAll('calc-button');

    expect(buttons.length).toBe(19);

    const labels = Array.from(buttons).map(btn => btn.getAttribute('label'));
    expect(labels).toEqual(['C', '+/-', '%', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '=']);
  });

  it('emite el evento buttonPressed al hacer clic en un botón', async () => {
    const page = await newSpecPage({
      components: [CalcKeypad],
      html: '<calc-keypad></calc-keypad>',
    });

    const keypad = page.root as HTMLCalcKeypadElement;
    const spy = jest.fn();

    keypad.addEventListener('buttonPressed', spy);

    const zeroButton = page.root.shadowRoot.querySelector('calc-button[label="0"]') as any;

    // Simulamos manualmente el evento desde el botón
    zeroButton.dispatchEvent(new CustomEvent('buttonClick', { detail: '0', bubbles: true, composed: true }));

    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: '0',
      }),
    );
  });

  it('el botón "0" tiene la clase wide aplicada', async () => {
    const page = await newSpecPage({
      components: [CalcKeypad],
      html: '<calc-keypad></calc-keypad>',
    });

    const zeroButton = page.root.shadowRoot.querySelector('calc-button[label="0"]');

    expect(zeroButton.getAttribute('wide')).toBe('');
  });

  it('renderiza correctamente el HTML esperado', async () => {
    const page = await newSpecPage({
      components: [CalcKeypad],
      html: '<calc-keypad></calc-keypad>',
    });

    const receivedHtml = page.root.outerHTML;
    const expectedHtml = `<calc-keypad><template shadowrootmode="open"><div class="keypad"><calc-button label="C"></calc-button><calc-button label="+/-"></calc-button><calc-button label="%"></calc-button><calc-button label="/"></calc-button><calc-button label="7"></calc-button><calc-button label="8"></calc-button><calc-button label="9"></calc-button><calc-button label="x"></calc-button><calc-button label="4"></calc-button><calc-button label="5"></calc-button><calc-button label="6"></calc-button><calc-button label="-"></calc-button><calc-button label="1"></calc-button><calc-button label="2"></calc-button><calc-button label="3"></calc-button><calc-button label="+"></calc-button><calc-button label="0" wide=""></calc-button><calc-button label="."></calc-button><calc-button label="="></calc-button></div></template></calc-keypad>`;

    expect(receivedHtml).toEqualHtml(expectedHtml);
  });
});
