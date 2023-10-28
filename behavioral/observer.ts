/*

Obsever - it's a behavioral design pattern that lets you define a subscription
mechanism to notify multiple objects about any events that happen to the object

Problem

- Not optimal to have a lot of objects that need to be updated when another object changes
- Forced to check the state of the subject too often, which can be inefficient
- We would like to be able to update objects only when they are interested in
the changes and not all the time

Solution

- We introduce a publisher and subscriber model
    - Publisher is the object that sends notifications
    - Subscriber is the object that receives notifications
- Subscriber can subscribe to the publisher and unsubscribe from it
- When the publisher changes, it go through the list of subscribers and notifies them
- All subsribers must implement the same interface so the publisher doesn't need to know
the type of the subscriber

Real life example

- When you subscribe to a newsletter, you get notified when a new issue is published
- Publisher is just checking if there are any subscribers and notifies them
- Subscriber can unsubscribe from the newsletter

Structure

- Publisher is the object that sends notifications. It happens when the state of the publisher
changes or when a specific event occurs. Publisher has methods to subscribe and unsubscribe.
- When event occurs, publisher goes through the list of subscribers and notifies them.
- Subscriber's Interfce defines the notificaiton interface. In the most cases it's just one
method. Update.
- Concrete Subscibers execute some actions on the notification from the publisher.
- It's common to pass arguments with the notification. It could be the publisher itself or some
data that the subscriber can use.
- Client creates the publisher and the subscribers and subscribes the subscribers to the publisher.

Usage

- When you change in one object may require changing in others,
and you don't know how many objects need to be changed.
- When some objects should be able to observer changes in others,
but only for a limited time or in specific cases.

Advantages

- Open/Close Principle. You can introduce new subscuibers without having to change 
the publisher's code (and vice versa if there's a subscriber interface).
- You can establish relations between objects at runtime.

Disadvantages

- Subscribers are notified in random order.

*/

interface EventListeners {
  update(filename: string): void;
}

// it's more generic, we can use it for any type of events
class EventManager {
  private listeners: { [key: string]: EventListeners[] } = {};

  subscribe(eventType: string, listener: EventListeners) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(listener);
  }

  unsubscribe(eventType: string, listener: EventListeners) {
    const listeners = this.listeners[eventType];
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }

  notify(eventType: string, data: any) {
    const listeners = this.listeners[eventType];
    if (listeners) {
      listeners.forEach((listener) => listener.update(data));
    }
  }
}

class Editor {
  private eventManager: EventManager;

  constructor(eventManager: EventManager) {
    this.eventManager = eventManager;
  }

  openFile(filename: string) {
    this.eventManager.notify("open", filename);
  }

  saveFile() {
    this.eventManager.notify("save", null);
  }

  closeFile() {
    this.eventManager.notify("close", null);
  }
}

class LoggingListener implements EventListeners {
  update(filename: string) {
    console.log(`Logging: ${filename}`);
  }
}

class EmailAlertsListener implements EventListeners {
  update(filename: string) {
    console.log(`Emailing: ${filename}`);
  }
}

const eventManager = new EventManager();
const loggingListener = new LoggingListener();
const emailAlertsListener = new EmailAlertsListener();

eventManager.subscribe("open", loggingListener);
eventManager.subscribe("save", loggingListener);
eventManager.subscribe("save", emailAlertsListener);

const editor = new Editor(eventManager);
editor.openFile("test.txt");
editor.saveFile();
editor.closeFile();
