/*

Chain of command (chain of responsibility) - it's behavioral pattern,
which allows to pass request through chain of handlers. Each handler 
can process request or pass it to next handler.

Problem

- You need to process sequence of checks
- Code is duplicated in multiple places
- It's hard to mantain code and add new checks to the sequence

Solution 

- create handler object for each check
- handler object can execute check or pass request to next handler. 
Request and response are passed as arguments
- handler can decide to not pass request to next handler! 🫣
- There is possibility to change logic and when handler support reuqest it doesn't pass it to next handler,
it depends of your needs.
- All handlers shoyld implement the same interface. Each handler only knows about next handler in the chain.

Real life example

- Call center where you can call to get help. 
You can call to first line support, if they can't help you, they will pass your call to second line support.
If they can't help you, they will pass your call to third line support.

Structure

- Handler interface, which defines method for handling request and method for setting next handler
- Base Handler, optional class which implements Handler interface and has method for setting next handler. 
Helping to avoid code duplication in each handler.
- Conrete handlers, which implement Handler interface and have method for handling request. 
- Client, which creates chain of handlers and passes request to first handler in the chain. 
Chain could not be started from first handler, it depends of your needs.

*/

interface ComponentWithConextualHelp {
  showHelp(): void;
}

abstract class Component implements ComponentWithConextualHelp {
  protected tooltop: string = "";
  protected container: Container | null = null;

  public setContainer(container: Container | null): void {
    this.container = container;
  }

  showHelp(): void {
    if (this.tooltop) {
      console.log(`Show tooltip: ${this.tooltop}`);
    } else {
      this.container?.showHelp();
    }
  }
}

abstract class Container extends Component {
  protected children: Component[] = [];

  public add(child: Component): void {
    this.children.push(child);
    child.setContainer(this);
  }
}

class Button extends Component {}

class Panel extends Container {
  protected modalHelpText: string = "This is modal window";

  constructor(modalHelpText: string) {
    super();
    this.modalHelpText = modalHelpText;
  }

  showHelp(): void {
    if (this.modalHelpText) {
      console.log(`Show modal help: ${this.modalHelpText}`);
    } else {
      super.showHelp();
    }
  }
}

class Dialog extends Container {
  protected wikiPageURL: string = "This is wiki page url";

  constructor(wikiPageURL: string) {
    super();
    this.wikiPageURL = wikiPageURL;
  }

  showHelp(): void {
    if (this.wikiPageURL) {
      console.log(`Open wiki page: ${this.wikiPageURL}`);
    } else {
      super.showHelp();
    }
  }
}

// Client code
const dialog = new Dialog(
  "https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern"
);
const panel = new Panel("This is modal window");
const button = new Button();

panel.add(button);
dialog.add(panel);

// will find wiki page url and open it becouse it's first in the chain that can handle request
button.showHelp();
