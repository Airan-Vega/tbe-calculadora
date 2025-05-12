import { newSpecPage } from '@stencil/core/testing';
import { AppRoot } from './app-root';

describe('a`-root', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [AppRoot],
      html: '<app-root></app-root>',
    });
    expect(root).toEqualHtml(`
      <app-root>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </app-root>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [AppRoot],
      html: `<app-root first="Stencil" middle="'Don't call me a framework'" last="JS"></app-root>`,
    });
    expect(root).toEqualHtml(`
      <app-root first="Stencil" middle="'Don't call me a framework'" last="JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </app-root>
    `);
  });
});
