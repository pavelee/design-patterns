/*

Command (action, transaction) - it's behavioral pattern, which encapsulates request as an object,
that contain all information about request. It allows to delay request execution, queue it,
log it, etc.

Problem

- Creating too many classes and subclasses to implement various actions
- Dupication of code in classes that implement actions
- Dependency between classes that invoke actions and classes that implement actions

Solution

- Separte responsibility of software into layers (UI, business logic, data access, etc.)
- You should extract all actions into separate classes that contain one method, for example execute()
- Action objects are contections between layers, UI and business logic, business logic and data access, etc.
- Actions should have common interface, so you can invoke them in the same way
- Parameters of actions should be passed as contructor arguments, via setters or via execute() method
- Reducing dependency between classes that invoke actions and classes that implement actions

Real world example

- If you order food in a restaurant, waiter doesn't cook it, he just passes your order to the kitchen.
Order contains all information about your order, so waiter doesn't need to know how to cook it.

Structure

- Invoker is responsible for invoking actions. It doesn't know how to execute them, it just knows
that they have execute() method. Often he got action object from client via constructor or setter.
- Action's interface defines execute() method.
- Concrete actions implements execute() method. It contains all information about request.
Often it delegates request execution to other objects with business logic. Action's parameters
we can make read-only via constructor or setters.
- Receiver is responsible for executing request. It knows how to perform all kinds of operations,
associated with carrying out a request. It's a business logic of the application.

Usage

- When you want to parametrize objects with operations
- When you want to queue operations, schedule their execution, or execute them remotely
- When you want to implement reversible operations

Advantages

- Single Responsibility Principle. You can extract request execution code into a single place,
making it easier to comprehend and maintain.
- Open/Closed Principle. You can introduce new actions without having to change
the actual invoker code.
- You can implement undo/redo.
- You can implement deferred execution of operations.
- You can assemble commands into a composite command.

Disadvantages

- You can create a lot of classes to implement the pattern. That complicates the code a bit.

*/

abstract class Command {
  protected app: Application;
  protected editor: Editor;
  protected backup: string;

  constructor(app: Application, editor: Editor) {
    this.app = app;
    this.editor = editor;
  }

  saveBackup(): void {
    this.backup = this.editor.text;
  }

  undo(): void {
    this.editor.text = this.backup;
  }

  abstract execute(): void;
}

class CopyCommand extends Command {
  execute(): void {
    this.app.clipboard = this.editor.getSelection();
  }
}

class CutCommand extends Command {
  execute(): void {
    this.saveBackup();
    this.app.clipboard = this.editor.getSelection();
    this.editor.deleteSelection();
  }
}

class PasteCommand extends Command {
  execute(): void {
    this.saveBackup();
    this.editor.replaceSelection(this.app.clipboard);
  }
}

class UndoCommand extends Command {
  execute(): void {
    this.app.undo();
  }
}

class CommandHistory {
  private history: Command[] = [];

  push(command: Command): void {
    this.history.push(command);
  }

  pop(): Command | undefined {
    return this.history.pop();
  }
}

class Editor {
  text: string = "";

  deleteSelection(): void {
    this.text = "";
  }

  getSelection(): string {
    return this.text;
  }

  replaceSelection(text: string): void {
    this.text = text;
  }
}

class Application {
  clipboard: string = "";
  private history: CommandHistory = new CommandHistory();

  executeCommand(command: Command): void {
    this.history.push(command);
    command.execute();
  }

  undo(): void {
    const command = this.history.pop();
    if (command) {
      command.undo();
    }
  }

  createUI(): void {
    // create UI elements with attached commands
  }
}
