/* 

Snapshot - also known as Memento - it's a behavioral design pattern that les you
save and restore the previous state of an object withoout revealing the details

Problem

- An object needs to be able to save its internal state and restore it later
- The first problem that mostly objects store their state in private fields, which
cannot be accesed from outside the object
- If we decide to make all the fields public, objects who use these fields will
be strong coupled to the implementation of the state class (hard to maintain)

Solution

- the above problem comes from the fact of lack of heremetic encapsulation, each object 
shoulde be responsible for its own state
- the solution is to make the object itself resposible for saveing its own state. The object has 
access to its own state, so it can pass it to the snapshot object when creating it
- the design pattern suggest that we should create a snapshote class that will store
the state of the object at a given point in time
- others object can communicate with the snapshot object only through the narrow interface
which doesn't expose any implementation details and data. 
For example date of the snapshot, name of the snapshot. Usually we call that objects 
caretaker or snapshot manager
- caretaker is passing snapshot object to the object that can restore its state from the snapshot

Structure

- The source object that can create snapshots is called originator, 
it can as well restore its state
- the snapshot is a simple value object that contains the state of the originator (it's immutable)
- the caretaker is responsible for the snapshots, it can store and restore them
- In case of language like PHP, we can move restore method to the snapshot object. Also we should
pass to snapshot object the originator object, so it can restore its state setting the originator

Usage

- When you want to produce snapshots of the object's state and restore it in the future
- When direct access to the object's fields/getters/setters violates its encapsulation

Advantages

- You can produce snapshots of the object's state without violating its encapsulation
- You can simplify the originator's code by letting the caretaker maintain the history of the originator's state

Disadvantages

- The app might consume lots of RAM if clients create snapshots too often
- Caretakers should track the originator's lifecycle to be able to destroy obsolete snapshots
- Most dynamic programming languages, such as PHP, Python and JavaScript, can't guarantee that the state within the snapshot stays untouched after its creation

*/

class Editor {
  private text: string = "";
  private curX: number = 0;
  private curY: number = 0;
  private selectionWidth: number = 0;

  setText(text: string) {
    this.text = text;
  }

  setCursor(x: number, y: number) {
    this.curX = x;
    this.curY = y;
  }

  setSelectionWidth(width: number) {
    this.selectionWidth = width;
  }

  createSnapshot(): Snapshot {
    return new Snapshot(
      this,
      this.text,
      this.curX,
      this.curY,
      this.selectionWidth
    );
  }
}

class Snapshot {
  private editor: Editor;
  private text: string = "";
  private curX: number = 0;
  private curY: number = 0;
  private selectionWidth: number = 0;

  constructor(
    editor: Editor,
    text: string,
    curX: number,
    curY: number,
    selectionWidth: number
  ) {
    this.editor = editor;
    this.text = text;
    this.curX = curX;
    this.curY = curY;
    this.selectionWidth = selectionWidth;
  }

  restore() {
    this.editor.setText(this.text);
    this.editor.setCursor(this.curX, this.curY);
    this.editor.setSelectionWidth(this.selectionWidth);
  }
}

class Command {
  private editor: Editor;
  private history: Snapshot[];

  constructor(editor: Editor) {
    this.editor = editor;
  }

  saveChange() {
    this.history.push(this.editor.createSnapshot());
  }

  revertLastChange() {
    if (this.history.length > 0) {
      const snapshot = this.history.pop();
      if (snapshot) {
        snapshot.restore();
      }
    }
  }
}
