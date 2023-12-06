/* 

Abstract factory - it's a creational design pattern that let's you produce families of related objects
without specifying their concrete classes.

Problem

- When you need to create different families of related objects.
- When you want to provide a class library of products, and you want to reveal just their interfaces, 
not their implementations.

Solution

- We create interface for each distinct product of the product family.
- We create abstract factory that declares methods for creating abstract products for each product of product family.
- We create concrete factories that implement abstract factory and create concrete products for each product of product family.
- We choose concrete factory depending on configuration or environment.

- Structure

- Abstract product declares interface for a type of product.
- Concrete product implements interface of abstract product.
- Abstract factory declares methods for creating abstract products.
- Concrete factory implements methods for creating concrete products.
- Client uses only interfaces declared by abstract factory and abstract products.

Usage

- When you need to create different families of related objects.
- When you have a class with bunch of factory methods that create different products of product family.

Advantages

- You can be sure that all products of product family are compatible.
- You can avoid tight coupling between concrete products and client code.
- Single Responsibility Principle. You can isolate product creation code from business logic.
- Open/Closed Principle. You can introduce new variants of products without breaking existing client code.

Disadvantages

- It might be hard to support a lot of variants of products.
- Code might become more complicated than it should be.

*/

interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class WinFactory implements GUIFactory {
  createButton(): Button {
    return new WinButton();
  }

  createCheckbox(): Checkbox {
    return new WinCheckbox();
  }
}

class MacFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }

  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}

interface Button {
  paint(): void;
}

class WinButton implements Button {
  paint(): void {
    console.log("WinButton");
  }
}

class MacButton implements Button {
  paint(): void {
    console.log("MacButton");
  }
}

interface Checkbox {
  paint(): void;
}

class WinCheckbox implements Checkbox {
  paint(): void {
    console.log("WinCheckbox");
  }
}

class MacCheckbox implements Checkbox {
  paint(): void {
    console.log("MacCheckbox");
  }
}

class Application {
  private button: Button;
  private checkbox: Checkbox;

  constructor(private factory: GUIFactory) {
    this.button = factory.createButton();
    this.checkbox = factory.createCheckbox();
  }

  paint(): void {
    this.button.paint();
    this.checkbox.paint();
  }
}

const app = new Application(new WinFactory());
app.paint();

const app2 = new Application(new MacFactory());
app2.paint();
