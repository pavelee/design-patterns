/*

Builder - it's structural pattern, which allows to create complex objects step by step.

Problem

- How to create complex objects (with many properties and methods) without creating a huge constructor?
- How to create different representations of complex objects?
- Many subclasses are required to create a complex object.

Solution

- Separate the construction of a complex object from its representation 
so that the same construction process can create different representations.
- Create common interface for all builders.
- You can use only that methods that you need.
- You can create director that will use builder to create complex object, and hide complexity from client. It's optional.

Structure

- Builder is interface with methods to create parts of complex object.
- ConcreteBuilder is class that implements Builder interface. It can create parts of complex object.
- Product is class that represents complex object. It could be different products without common interface.
- Director is class that uses Builder interface to create complex object. It's optional.
- Client is class that uses Builder interface.

Usage

- When you need to create complex objects (with many properties and methods) without creating a huge constructor.
- When you need to create different representations of complex objects.
- When you work with composite tree structures.

Advantages

- You can vary products representation.
- You can reuse common parts of complex objects.
- Single Responsibility Principle. You can isolate construction code from business logic of the product.

Disadvantages

- You might need to create a lot of subclasses to implement the pattern.

*/

class Car {
  engine: string;
  seats: number;
  tripComputer: boolean;
  gps: boolean;

  constructor(builder: CarBuilder) {
    this.engine = builder.engine;
    this.seats = builder.seats;
    this.tripComputer = builder.tripComputer;
    this.gps = builder.gps;
  }
}

class Manual {
  engine: string;
  seats: number;
  tripComputer: boolean;
  gps: boolean;

  constructor(builder: CarBuilder) {
    this.engine = builder.engine;
    this.seats = builder.seats;
    this.tripComputer = builder.tripComputer;
    this.gps = builder.gps;
  }
}

class CarBuilder {
  engine: string;
  seats: number;
  tripComputer: boolean;
  gps: boolean;

  addEngine(engine: string): CarBuilder {
    this.engine = engine;
    return this;
  }

  addSeats(seats: number): CarBuilder {
    this.seats = seats;
    return this;
  }

  addTripComputer(tripComputer: boolean): CarBuilder {
    this.tripComputer = tripComputer;
    return this;
  }

  addGPS(gps: boolean): CarBuilder {
    this.gps = gps;
    return this;
  }

  build(): Car {
    return new Car(this);
  }
}

class CarManualBuilder {
  engine: string;
  seats: number;
  tripComputer: boolean;
  gps: boolean;

  addEngine(engine: string): CarManualBuilder {
    this.engine = engine;
    return this;
  }

  addSeats(seats: number): CarManualBuilder {
    this.seats = seats;
    return this;
  }

  addTripComputer(tripComputer: boolean): CarManualBuilder {
    this.tripComputer = tripComputer;
    return this;
  }

  addGPS(gps: boolean): CarManualBuilder {
    this.gps = gps;
    return this;
  }

  build(): Manual {
    return new Manual(this);
  }
}

const car = new CarBuilder()
  .addEngine("V8")
  .addSeats(4)
  .addTripComputer(true)
  .addGPS(true)
  .build();

console.log(car);
