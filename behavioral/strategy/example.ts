// we define a family of algorithms, encapsulate each one, and make them interchangeable.
interface Strategy {
  execute(a: number, b: number): number;
}

// conrecte strategies
class Add implements Strategy {
  execute(a: number, b: number): number {
    return a + b;
  }
}

class Substract implements Strategy {
  execute(a: number, b: number): number {
    return a - b;
  }
}

class Multiply implements Strategy {
  execute(a: number, b: number): number {
    return a * b;
  }
}

class Divide implements Strategy {
  execute(a: number, b: number): number {
    return a / b;
  }
}

// context, here we can change the strategy at runtime
class Context {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  public executeStrategy(a: number, b: number): number {
    return this.strategy.execute(a, b);
  }
}

// example of usage

const operation = "add";

if (operation === "add") {
  const context = new Context(new Add());
  context.executeStrategy(1, 2);
}

// now you can change the strategy at runtime
