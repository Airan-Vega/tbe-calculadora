import { newSpecPage } from '@stencil/core/testing';
import { CalcButton } from './calc-button';

describe('calc-button', () => {
  it('renderiza correctamente con label y clase por defecto', async () => {
    const page = await newSpecPage({
      components: [CalcButton],
      html: `<calc-button label="7"></calc-button>`,
    });

    const receivedHtml = page.root.outerHTML;
    const expectedHtml = `<calc-button label="7"><template shadowrootmode="open"><button>7</button></template></calc-button>`;

    expect(receivedHtml).toEqualHtml(expectedHtml);
  });
  it('aplica la clase "wide" cuando wide={true}', async () => {
    const page = await newSpecPage({
      components: [CalcButton],
      html: `<calc-button label="0" wide></calc-button>`,
    });

    const receivedHtml = page.root.outerHTML;
    const expectedHtml = `<calc-button label="0" wide><template shadowrootmode="open"><button class="wide">0</button></template></calc-button>`;

    expect(receivedHtml).toEqualHtml(expectedHtml);
  });

  it('emite el evento buttonClick con el label al hacer clic', async () => {
    const page = await newSpecPage({
      components: [CalcButton],
      html: `<calc-button label="+"></calc-button>`,
    });

    const buttonClickSpy = jest.fn();
    page.win.addEventListener('buttonClick', buttonClickSpy);

    const button = page.root.shadowRoot.querySelector('button');
    button?.click();
    await page.waitForChanges();

    expect(buttonClickSpy).toHaveBeenCalledTimes(1);
    expect(buttonClickSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: '+',
      }),
    );
  });
});
