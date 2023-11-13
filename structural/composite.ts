/*

Composite (Object Tree) - it's structural design pattern that allows to
compose objects into three structures and work with it as with single object.

Problem

- It's only make sense to use this pattern when you have object tree structure.
- You want to work with object tree structure as with single object.
- You want to calcuate total price of object tree structure.

Solution

- We should use aggregation instead of inheritance.
- We define common interface for both composite and leaf objects.
- When we meet leaf object, we just call it's method, when we meet composite object, we call it's method and then call method of all it's children.
- We don't need to bother about type of object, because we use common interface.

Real life example

- In army we have squads, and squads have soldiers. We can calculate total number of soldiers in army.

Structure

- Component declares interface for both composite and leaf objects.
- Leaf is basic object without children. Often it's doing all the work.
- Container is object with children. It delegates work to it's children, and then return result.
- Client works with all objects through common interface.

Usage

- When you have to implement tree structure of objects.
- When you want client to treat both simple and complex objects uniformly.
- When you want to calculate total price of object tree structure.

Advantages

- You can work with tree objects in easy way.
- Open/Closed Principle. You can introduce new types of objects into the app without breaking existing client code.

Disadvantages

- It's hard to define common interface for both composite and leaf objects. 
Sometimes you need to add methods that do nothing to leaf objects.

*/

// common interface for both composite and leaf objects
interface Grapgic {
  move(x: number, y: number): void;
  draw(): void;
}

// leaf
class Dot implements Grapgic {
  constructor(private x: number, private y: number) {}

  move(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }

  draw(): void {
    console.log(`Draw dot at ${this.x} ${this.y}`);
  }
}

// leaf
class Circle implements Grapgic {
  constructor(private x: number, private y: number, private radius: number) {}

  move(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }

  draw(): void {
    console.log(
      `Draw circle at ${this.x} ${this.y} with radius ${this.radius}`
    );
  }
}

// composite
class CompoundGraphic implements Grapgic {
  private children: Grapgic[] = [];

  move(x: number, y: number): void {
    this.children.forEach((child) => child.move(x, y));
  }

  draw(): void {
    this.children.forEach((child) => child.draw());
  }

  add(child: Grapgic): void {
    this.children.push(child);
  }

  remove(child: Grapgic): void {
    const index = this.children.indexOf(child);
    this.children.splice(index, 1);
  }
}

const dot1 = new Dot(1, 2);
const dot2 = new Dot(3, 4);
const circle = new Circle(5, 6, 7);

const compoundGraphic = new CompoundGraphic();
compoundGraphic.add(dot1);
compoundGraphic.add(dot2);
compoundGraphic.add(circle);

compoundGraphic.draw();
compoundGraphic.move(1, 1);
compoundGraphic.draw();
compoundGraphic.remove(dot1);
compoundGraphic.draw();
