/*

Template Method - defines the skeleton of an algorithm in a method, let subclasses redefine certain steps of an
algorithm without changing the algorithm's structure

Problem

- You have notice that some of your classes have similar algorithms, or portions of algorithms
- You have alot of duplicate code spread across classes that solve similar problems
- Client code has alot of conditional statements that alter the behavior of a class according to the current context, 
it would be much better to use polymorphism to solve the problem 

Solution

- Separate the algorithm into a series of steps
- Put the steps into methods, that could be either abstract or have some default implementation
- Subclass should override some of the methods, but not the entire algorithm
- Alternativly you can add hooks that will be called at specific points (important) of the algorithm, that allow subclasses to extend algorithms

Real life example

- You are bulding a house and you want to have possibility to extends project by changin some steps results
    -   eg. add extra window on the roof instead of standard roof project

Structure

- Abstract class declares methods that act as steps of an algorithm, as well as the actual algorithm
- Concrete classes implement these steps accordingly

Usage

- When you want to let clients extend only particular steps of an algorithm, but not the whole algorithm or its structure
- When you have several classes that contain almost identical algorithms with some minor differences

Advantages

- You can let clients override only certain parts of a large algorithm, making them less affected by changes that happen to other parts of the algorithm
- You can pull the duplicate code into a superclass

Disadvantages

- Some clients may be limited by the provided skeleton of an algorithm
- You might violate the Liskov Substitution Principle by suppressing a default step implementation via a subclass
- Template methods tend to be harder to maintain the more steps they have

Related Patterns

- Factory Method - Factory Method is a specialization of Template Method
- Strategy - Strategy is like Template Method except in its granularity
- Template Method uses inheritance to vary part of an algorithm, Strategy uses delegation to vary the entire algorithm

*/

abstract class GameAI {
    // template method
    public turn(): void {
        this.collectResources();
        this.buildStructures();
        this.buildUnits();
        this.attack();
    }
    
    // some of the steps have default implementation, do not have to be overriden
    protected collectResources(): void {};
    protected buildStructures(): void {};
    protected abstract buildUnits(): void;
    protected attack(): void { }
}

// orcs do not collect resources
class OrcsAI extends GameAI {    
    protected buildStructures(): void {
        console.log("Orcs build structures");
    }
    
    protected buildUnits(): void {
        console.log("Orcs build units");
    }

    protected attack(): void {
        console.log("Monsters attack");
    }
}

// monsters do not build structures
class MonstersAI extends GameAI {
    protected collectResources(): void {
        console.log("Monsters collect resources");
    }
    
    protected buildUnits(): void {
        console.log("Monsters build units");
    }
    
    protected attack(): void {
        console.log("Monsters attack");
    }
}