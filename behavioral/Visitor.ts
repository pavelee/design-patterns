/*
Visitor - lets you separate algorithms from the objects on witch they operate

Problem
- You need to defin a new opration on an entire class hirearchy
- you want to avoid polluting the class with the new operation
- you need to define many unrelated operations
- the classes that you need to visit are defined in another library
- you need to perform several unrelated operations across classes
- you need to perform the same operation across many classes and that operation involves many classes

Solution
- Define a separate operation (visitor) that is applied to an entire class hirearchy
- Move related behaviors into the new class
- The original class hierarchy is free of new behaviors
- The visitor class hierarchy is free of unrelated behaviors
- The visitor class hierarchy can be extended without changing the original class hierarchy
- It use technique called double dispatch - the visitor recieves the target object to perform the operation on
    - the visitor then performs the operation on the target object by calling a method or accessing a property

Real life example

- You are insecurance agent and you always want to sell your product to people
    - If you visit bank you want to sell them thief insurance
    - If you visit a house you want to sell them health insurance

Structure

- visitor interfaece declares a set of vistiting methods that correspond to conrete compoent classes
- concrete visitors implements several versions of the same behavior for each concrete component class
- element interface delcares a method for accepting visitor
- concrete element implement an accept method that takes a visitor as an argument

Usage

- When you need to perform an operation on all elements of a comples object structure (eg object tree)
- It helpls to clean up the bussines logic of extra behaviors
- When you need to perform unrelated operations on objects without changing them

Advantages

- Open/Closed Principle - you can introduce new behaviors to existing class hierarchies without changing any existing code
- Single Responsibility Principle - you can move multiple versions of the same behavior into the same class
- You can gather information about complex object structures

Disadvantages

- You need to update all visitors each time a class gets added to or removed from the elment hierarchy
- Visitors might lack the necessary acces to the private fields and methods of the elements that they are supposed to work with

*/

interface Visitor {
  visitDot(dot: Dot): unknown | void;
  visitCircle(circle: Cicrle): unknown;
  visitRectangle(rectangle: Rectangle): unknown;
}

class ToJsonVisitor implements Visitor {
  visitDot(dot: Dot): unknown {
    return JSON.stringify(dot);
  }
  visitCircle(circle: Cicrle): unknown {
    return JSON.stringify(circle);
  }
  visitRectangle(rectangle: Rectangle): unknown {
    return JSON.stringify(rectangle);
  }
}

interface Shape {
  move(x: number, y: number): void;
  draw(): void;
  accept(visitor: Visitor): void;
}

class Dot implements Shape {
  move(x: number, y: number): void {}
  draw(): void {}
  accept(visitor: Visitor): void {}
}

class Cicrle implements Shape {
  move(x: number, y: number): void {}
  draw(): void {}
  accept(visitor: Visitor): void {}
}

class Rectangle implements Shape {
  move(x: number, y: number): void {}
  draw(): void {}
  accept(visitor: Visitor): void {}
}
