/*

Factory - it's structural pattern, which allows you to create objects without specifying their concrete classes.

Problem

- When you need to create different objects that belong to one family.
- When you don't know concrete classes of objects you need to create.
- When you want to provide a class library of products, and you want to reveal just their interfaces

Solution

- We create interface for each distinct product of the product family.
- We create concrete classes that implement interface of product.
- We create factory that creates concrete classes of products.
- We choose concrete factory depending on configuration or environment.

Structure

- Product declares interface for a type of product.
- Concrete product implements interface of product.
- Factory declares method for creating product. It should return interface of product.
- Concrete factory implements method for creating concrete product.

Usage

- When you don't know concrete classes of objects you need to create.
- When you don't know what types could be intruduced in future.
- When you want to provide a class library of products, and you want to reveal just their interfaces.
- When you want to safe memory by reusing existing objects instead of creating new ones.

Advantages

- You can be sure that all products are compatible.
- You can avoid tight coupling between concrete products and client code.
- Single Responsibility Principle. You can isolate product creation code from business logic.
- Open/Closed Principle. You can introduce new variants of products without breaking existing client code.

Disadvantages

- It might be hard to support a lot of variants of products.
- Code might become more complicated than it should be.

*/

class Dialog {
  private factory: ButtonFactory;

  constructor(factory: ButtonFactory) {
    this.factory = factory;
  }

  render() {
    const button = this.factory.createButton();
    button.render();
  }
}

interface ButtonFactory {
  createButton(): SuperButton;
}

class SuperWinFactory implements ButtonFactory {
  createButton(): SuperButton {
    return new SuperWinButton();
  }
}

class SuperMacFactory implements ButtonFactory {
  createButton(): SuperButton {
    return new SuperMacButton();
  }
}

interface SuperButton {
  render(): void;
}

class SuperWinButton implements SuperButton {
  render() {
    console.log("WinButton");
  }
}

class SuperMacButton implements SuperButton {
  render() {
    console.log("MacButton");
  }
}

const dialog = new Dialog(new SuperWinFactory());

dialog.render();
