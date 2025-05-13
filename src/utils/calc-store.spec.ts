import { CalcStore } from './calc-store';

describe('CalcStore (Singleton)', () => {
  let store: CalcStore;

  beforeEach(() => {
    const instance = (CalcStore as any).instance;
    if (instance) {
      (CalcStore as any).instance = undefined;
    }
    store = CalcStore.getInstance();
  });

  it('debe ser un singleton', () => {
    const store2 = CalcStore.getInstance();
    expect(store).toBe(store2);
  });

  it('debe inicializar con un array vacío de operaciones', () => {
    expect(store.getOperations()).toEqual([]);
  });

  it('debe añadir una operación correctamente', () => {
    store.addOperation('1 + 2', 3);

    expect(store.getOperations()).toEqual([{ expression: '1 + 2', result: 3 }]);
  });

  it('debe mantener las operaciones en orden', () => {
    store.addOperation('2 + 2', 4);
    store.addOperation('5 - 3', 2);

    expect(store.getOperations()).toEqual([
      { expression: '2 + 2', result: 4 },
      { expression: '5 - 3', result: 2 },
    ]);
  });

  it('no debe compartir estado entre diferentes instancias (gracias al singleton)', () => {
    const store2 = CalcStore.getInstance();
    store2.addOperation('10 / 2', 5);

    expect(store.getOperations()).toEqual(store2.getOperations());
  });
});
