/*

State - a behavioral design pattern that lets an object alter its behavior when its internal state changes.
It apperars as if the object changed its class.

Problem

- State is usually implemented with a set of conditional statements that change the state.
That leads to the hight cost of maintenance and the code becomes unmaintainable.
- Complex conditional logic is hard to understand and maintain.

Solution

- Define a separte class for each possible state of an object and extract all state-specific behaviors into these classes.
- Make the primary object (context) hold a referance to one of the state objects.
- The context delegates all the state-related work to that object.
- This is similar to Strategy patter but the difference is that in State classes are aware of each other, 
they can trigger transitions from one state to another. In Strategy, the strategy classes don't know about each other.

Real life example

In your phone the side button can have different actions depending on the state of the phone:
- When the phone is locked, it silences the phone.
- When the phone is unlocked, it turns on the sound.

Structure

- Context class maintains a referance to one of the state objects.
- State objects represent various states of the context and implement behavior associated with the state.
- Context delegates all the state-related work to the current state object.
- Context doesn't know what the next state will be, it depends on the current state object.
- State has refernce to the context object. It can retrive its data, store its data or even change its state.

Usage

- When you have an object that behaves differently depending on its current state. 
Possible number of states is enormous.
- When you have a lot of conditional statements in the context class that switches between different behaviors depending on the current state.
- When you have a duplication of code related to state-specific behavior across several classes that represent different states.

Advantages

- Single Responsibility Principle. Organize the code related to particular states into separate classes.
- Open/Closed Principle. Introduce new states without changing existing state classes or the context.
- Simplify the code of the context by eliminating bulky state machine conditionals.

Disadvantages

- Applying the pattern can be overkill if a state machine has only a few states or rarely changes.

*/

class AudioPlayer {
  private state: State;

  constructor(state: State) {
    this.state = state;
  }

  changeState(state: State) {
    this.state = state;
  }

  play() {
    this.state.play();
  }

  pause() {
    this.state.pause();
  }

  stop() {
    this.state.stop();
  }
}

abstract class State {
  protected player: AudioPlayer;

  constructor(player: AudioPlayer) {
    this.player = player;
  }

  abstract play();
  abstract pause();
  abstract stop();
}

class PlayingState extends State {
  play() {
    console.log("Already playing...");
  }

  pause() {
    console.log("Paused...");
    this.player.changeState(new PausedState(this.player));
  }

  stop() {
    console.log("Stopped...");
    this.player.changeState(new StoppedState(this.player));
  }
}

class PausedState extends State {
  play() {
    console.log("Playing...");
    this.player.changeState(new PlayingState(this.player));
  }

  pause() {
    console.log("Already paused...");
  }

  stop() {
    console.log("Stopped...");
    this.player.changeState(new StoppedState(this.player));
  }
}

class StoppedState extends State {
  play() {
    console.log("Playing...");
    this.player.changeState(new PlayingState(this.player));
  }

  pause() {
    console.log("Paused...");
    this.player.changeState(new PausedState(this.player));
  }

  stop() {
    console.log("Already stopped...");
  }
}
