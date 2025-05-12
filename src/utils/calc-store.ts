export type Operation = {
  expression: string;
  result: number | string;
};

export class CalcStore {
  private static instance: CalcStore;
  public operations: Operation[] = [];

  private constructor() {}

  public static getInstance(): CalcStore {
    if (!CalcStore.instance) {
      CalcStore.instance = new CalcStore();
    }
    return CalcStore.instance;
  }

  addOperation(expression: string, result: number | string) {
    this.operations = [...this.operations, { expression, result }];
  }

  getOperations(): Operation[] {
    return this.operations;
  }
}
