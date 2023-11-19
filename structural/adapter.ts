/*

Adapter - it's structural pattern, which allows to use incompatible interfaces together.

Problem

- You have two classes with incompatible interfaces.
- You want to integrate third-party class, but it's interface is incompatible with existing code.

Solution

- Create adapter class, which implements interface, required by client code.
- Adapter class should contain instance of third-party class.
- Wrapped object could do not know about adapter and client code could do not know about wrapped object.
- You can create two-way adapter, which allows to work with both classes through adapter.

Real world examples

- Power adapter - allows to connect devices with different voltage.

Structure

- Client is class containing existing code.
- Client interface is interface, required by client code.
- Service is class, which should be integrated with client code.
- Adapter is class, which implements Client interface and contains instance of Service class.
- Client code works with Adapter through Client interface.

Usage

- When you want to use existing class, but it's interface is incompatible with your code.
- When you can't add some functionality to parent class, because it's closed or you don't have access to it's source code.


Advantages

- Single Responsibility Principle. You can separate interface or data conversion code from the primary business logic of the program.
- Open/Closed Principle. You can introduce new types of adapters into the program without breaking the existing client code, as long as they work with the adapters through the client interface.

Disadvantages

- The overall complexity of the code increases because you need to introduce a set of new interfaces and classes. Sometimes it's simpler just to change the service class so that it matches the rest of your code.

 */

class RoundHole {
  constructor(protected radius: number) {}

  getRadius() {
    return this.radius;
  }

  fits(peg: RoundPeg) {
    return this.getRadius() >= peg.getRadius();
  }
}

class RoundPeg {
  constructor(protected radius: number) {}

  getRadius() {
    return this.radius;
  }
}

class SquarePeg {
  constructor(protected width: number) {}

  getWidth() {
    return this.width;
  }
}

class SquarePegAdapter extends RoundPeg {
  constructor(protected peg: SquarePeg) {
    super((peg.getWidth() * Math.sqrt(2)) / 2);
  }
}

const hole = new RoundHole(5);
const rpeg = new RoundPeg(5);
console.log(hole.fits(rpeg));
