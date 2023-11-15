/*

Bridge - it's structural design pattern which allows to separate abstraction from implementation.

Problem

- You have two hierarchies. Abstraction and implementation. You want to avoid permanent binding between them.
- You want to share implementation between objects.
- You wan to limit number of classes. For example when you start to multiply classes, you can get class explosion.
- There is lack of flexibility. You have to create many classes to cover all possible cases.

Solution

- Change inheritance to composition.
- Find what parts of abstraction can vary and separate them from the rest.
- There should be no permanent binding between abstraction and implementation.
- Adding new abstraction should not affect client code.

Structure

- Abstraction - defines abstraction interface. It maintains reference to the object of type Implementor.
- Implementation - defines interface for implementation classes. This interface does not have to correspond to Abstraction interface. 
In fact, the two interfaces can be quite different. Typically the Implementation interface provides only primitive operations, and Abstraction defines higher-level operations based on these primitives.
- Concrete implementation - implements Implementation interface and defines concrete implementation.
- Refined abstraction - extends the interface defined by Abstraction.
- Client - manipulates objects in terms of Abstraction interface. It also connects to the object of type Implementor.

Usage

- When you want to avoid permanent binding between abstraction and implementation.
- When you have a few variants of some class. You can extract common logic to separate classes and combine them with bridge pattern.
- When you want to extend class in several independent dimensions.
- When you want to change implementation of class in runtime.

Advantages

- You can create platform independent classes and apps.
- Client code works with high-level abstractions. It does not depend on concrete implementation.
- Open/Closed Principle. You can introduce new abstractions and implementations independently.
- Single Responsibility Principle. You can focus on high-level logic in abstraction and on platform details in concrete implementations.

Disadvantages

- You complicate code by applying additional layers of abstraction.

*/

class RemoteControl {
  constructor(protected device: Device) {}

  togglePower() {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  volumeDown() {
    this.device.setVolume(this.device.getVolume() - 10);
  }

  volumeUp() {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  channelDown() {
    this.device.setChannel(this.device.getChannel() - 1);
  }

  channelUp() {
    this.device.setChannel(this.device.getChannel() + 1);
  }
}

class AdvancedRemoteControl extends RemoteControl {
  mute() {
    this.device.setVolume(0);
  }
}

interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(percent: number): void;
  getChannel(): number;
  setChannel(channel: number): void;
}

class TV implements Device {
  private enabled = false;
  private volume = 0;
  private channel = 0;

  isEnabled(): boolean {
    return this.enabled;
  }

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(percent: number): void {
    this.volume = percent;
  }

  getChannel(): number {
    return this.channel;
  }

  setChannel(channel: number): void {
    this.channel = channel;
  }
}

class Radio implements Device {
  private enabled = false;
  private volume = 0;
  private channel = 0;

  isEnabled(): boolean {
    return this.enabled;
  }

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(percent: number): void {
    this.volume = percent;
  }

  getChannel(): number {
    return this.channel;
  }

  setChannel(channel: number): void {
    this.channel = channel;
  }
}

const tv = new TV();
const remote = new RemoteControl(tv);
remote.togglePower();

const radio = new Radio();
const advancedRemote = new AdvancedRemoteControl(radio);
