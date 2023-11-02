/*

Mediator - it's behavioral design pattern which allows to reduce dependecies
between objects by creating a mdiator object that takes care of the interaction

Problem

- chaos and tight coupling between objects
- when an object changes its state, all its dependents should be notified
- components are hard to reuse in different context because they are 
tightly coupled to other components

Solution

- Objects communucate with each other indirectly through a mediator object
- Mediator knows about all the components and their interactions
- The button only needs to send a notification to the mediator,
and then the mediator handles the rest of the communication
- It's good idea to create interface to notify the mediator about the events,
so components can work with any mediator implementation

Real world example

- Air traffic control room. Piltos don't communicate with each other directly. 
All communication goes through the control room. Control room is a mediator.
Control room dosen't control the planes, it just controls the communication between them.

Structure

- Components are the objects that need to communicate with each other. It use
the mediator to send notifications to other components.
-  Mediator's interface define how components communicate with each other.
Often it's just a single method with a nofitication parameter.
- Conrete mediators encapsulate relations between various components. They have 
the knowledge about all components and their intercatios. Sometimes they also 
control the lifecycle of the components.
- Components should not have know about each other. If something happens
it should notify the mediator, and the mediator should handle the rest.

Usage

- When change is hard becouse there are a lot of dependencies between objects
- When you can't use a component in a different context becouse
it's tightly coupled to other components
- When you create alot of component subclasses to reuse some basic behviour
in various contexts

Advantages

- Single Responsibility Principle. You can extract the communication between
various components into a single place, making it easier to comprehend and maintain.
- Open/Closed Principle. You can introduce new mediators without having to change
the actual components.
- You can reduce coupling between various components of a program.
- You can reuse individual components more easily.

Disadvantages

- Over time a mediator can evolve into a God Object.

*/

interface Mediator {
  notify(sender: object, event: string): void;
}

class AuthenticationDialg implements Mediator {
  private title: string;
  private loginOrRegister: string;
  private loginUsername: string;
  private loginPassword: string;
  private registerUsername: string;
  private registerPassword: string;
  private registerPasswordConfirm: string;
  private loginButton: Button;
  private registerButton: Button;
  private cancelButton: Button;

  constructor() {
    this.title = "Authentication";
    this.loginOrRegister = "Login or Register";
    this.loginUsername = "Username";
    this.loginPassword = "Password";
    this.registerUsername = "Username";
    this.registerPassword = "Password";
    this.registerPasswordConfirm = "Confirm Password";
    this.loginButton = new Button("Login");
    this.registerButton = new Button("Register");
    this.cancelButton = new Button("Cancel");
  }

  notify(sender: object, event: string): void {
    if (sender === this.loginButton && event === "click") {
      console.log("Login button clicked");
    }
    if (sender === this.registerButton && event === "click") {
      console.log("Register button clicked");
    }
    if (sender === this.cancelButton && event === "click") {
      console.log("Cancel button clicked");
    }
  }

  show(): void {
    console.log("Showing authentication dialog");
  }
}

class Button {
  private title: string;

  constructor(title: string) {
    this.title = title;
  }

  click(): void {
    console.log("Button clicked");
  }
}
