/*

Strategy Pattern - defines a family of algorithms, encapsulated each one, and makes them interchangeable.

Problem

- Adding new algorithms to an existing class is difficult because it would require changing the class.
- We want to be able to change the behavior of an object at runtime.
- There is a risk of breaking existing code when adding new algorithms inside an existing class.
- It's much harder to maintain a class that contains a lot of algorithms.
- Team working on the same codebase may have lead to conflicts when adding new algorithms.

Solution

- Define a family of algorithms, encapsulate each one in seperate classes, that we call strategies
- Context class delegates the work to a strategy object (interface) instead of implementing it on its own.
- Context class contains a reference to a strategy object.
- Context class becomes independent of the concrete strategy class.
- Client is responsible for creating and passing the strategy object to the primary class.

Real life example

- You want to go to the airport, you can choose between different strategies:
  - Go by car
  - Go by bus
  - Go by train
  - Go by taxi
  - Go by bike
  - Go by walking
-  It depends of your budget, time, etc.

Structure

- Context class contains a reference to a strategy object and delegares it executing the bahavior
- Strategy interface delcares oprtaions common to all supported versions of some algorithm
- Concrete strategies implements different variations of the algorithm
- Context runs the algorithm by calling the strategy method
- Client creates a specific strategy object and passes it to the context. The context exposes a setter which lets clients replace the strategy associated with the context at runtime.

Usage

- When you want to use different variants of an algoithm within an object and be able to swtich from on algorithm to another
- When you have a lot of similar classes that only differ int the way they execute some behavior
- When you wany to isolate the business logic of a class from the implemntaton details of algorithms that may not be as important in the context of that logic
- When you have a class that has a massive conditional operator that switches between different variations of the same algorithm

Advantages

- You can swap algorithms used inside an object at runtime
- You can isolate the implementation details of an algorithm from the code that uses it
- You can replace intheretance with composition

Disadvantages

- When you have only few algorithms and they rarely change, there is no real need to overcomplicate the code
- Client must be aware of the differences between startegies to be able to select a poper one
- A lot of modern programming languages have functional type support to swap algorithms at runtime

*/

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
