/* 

Singleton - it's structural patter, which allows to create only one istance of class in runtime. Also it
provides global access point to this instance.

Problem

- You need to have only one instance of class.
- You need to have global access point to this instance.
- You want to control access to some shared resource.

Solution

- Create class with private constructor.
- Create static method, which will be used for getting instance of class.
- Client code will always get the same instance of class.

Real life examples

- The government of the country is a singleton.

Structure

- Singleton is class with private constructor.

Usage

- When you need to have only one instance of class.
- When you need to have global access point to this instance.
- When you want to control access to some shared resource.

Advantages

- You can be sure that class has only one instance.
- You can control access to shared resource.
- You can create lazy initialization.

Disadvantages

- Violates Single Responsibility Principle. The pattern solves two problems at the time.
- The Singleton pattern can mask bad design, for instance, when the components of the program know too much about each other.
- The pattern requires special treatment in a multithreaded environment so that multiple threads won’t create a singleton object several times.
- It may be difficult to unit test the client code of the Singleton because many test frameworks rely on inheritance when producing mock objects. Since the constructor of the singleton class is private and overriding static methods is impossible in most languages, you will need to think of a creative way to mock the singleton. Or just don’t write the tests. Or don’t use the Singleton pattern.

*/

class Singleton {
  private static instance: Singleton;

  private constructor() {}

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }
}
