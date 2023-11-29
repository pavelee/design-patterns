/*

Prototype - it's creational design pattern that allows to copy objects without knowledge of their specific classes.

Problem

- You need to copy objects without knowledge of their specific classes.
- You need to hide complexity of creating new instance from client.
- You need to reduce count of subclasses.

Solution

- Delegate copying process to the actual objects that are being copied.
- Create common interface for all objects that can be copied. With method clone().
- Object can copy itself by cloning itself and then adjusting its properties. Can access it own private fields.
- Object that have clone method is called prototype.

Real life examples

- Cells in biology. They are clones of each other.

Structure

- Prototype is interface with method clone().
- ConcretePrototype is class that implements Prototype interface. It can copy itself and depedencies.
- Client is class that uses Prototype interface.

Usage

- When you need to copy objects without knowledge of their specific classes.
- When you need to hide complexity of creating new instance from client.
- When you need to reduce count of subclasses.

Advantages

- You can clone objects without knowledge of their specific classes.
- You can get rid of initialization code in your classes by cloning pre-built prototypes.
- More easly way to create complex objects.
- It's alternative to inheritance.

Disadvantages

- Cloning complex objects that have circular references might be very tricky.

*/

abstract class Shape {
  x: number;
  y: number;
  color: string;

  constructor(source?: Shape) {
    if (source) {
      this.x = source.x;
      this.y = source.y;
      this.color = source.color;
    }
  }

  abstract clone(): Shape;
}

class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(source?: Rectangle) {
    super(source);
    if (source) {
      this.width = source.width;
      this.height = source.height;
    }
  }

  clone(): Rectangle {
    return new Rectangle(this);
  }
}

class Circle extends Shape {
  radius: number;

  constructor(source?: Circle) {
    super(source);
    if (source) {
      this.radius = source.radius;
    }
  }

  clone(): Circle {
    return new Circle(this);
  }
}

// Usage

const shapes: Shape[] = [];
const circle = new Circle();
circle.x = 10;
circle.y = 10;

shapes.push(circle);

const anotherCircle = circle.clone();
shapes.push(anotherCircle);

const rectangle = new Rectangle();
rectangle.width = 10;
rectangle.height = 20;
shapes.push(rectangle);

const shapesCopy: Shape[] = [];
shapes.forEach((shape) => {
  shapesCopy.push(shape.clone());
});
