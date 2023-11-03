/* 

Iterator - it's behavioral pattern that allows to iterate over collection of
objects without exposing it's internal structure.

Problem

- You need to traverse a complex data strucuture, but you don't want to expose internal structure
- You want to have different traversal algorithms for the same data structure

Solution

- We create an iterator object that knows about the internal structure of the data structure
- Many iterators can work with the same data structure at the same time, independently of each other
- All iterators have the same interace, so we can use them interchangeably

Real world example

- You want to travel through a city and visit all the tourist attractions, there are many ways to do it

Structure

- Iterator's interface defines how to traverse the data structure. 
For example: next, current, key, valid, isLast, isFirst, etc.
- Concrete interators implement various traversal algorithms. Iterator should
 store the current position of the traversal. It allows to have multiple iterators.
- Collection's interface defines methods to get iterators. Return type should be Iterator interface.
- Concrete collections implement methods to return concrete iterators.
- Client works with collections and iterators through their interfaces. Thanks to that
it can work with any collection and iterator implementation.

Usage

- When you deal with complex data structure and you don't want to expose it's internal structure
- When you want to avoid duplication of traversal code
- When you want to be able to traverse various data structures or when you don't know
details of the data structure

Advantages

- Single Responsibility Principle. You can extract traversal code into a single place,
making it easier to comprehend and maintain.
- Open/Closed Principle. You can introduce new collection types and iterators without having to change
the actual traversal code.
- You can iterate over the same data structure in different ways. With different iterators.
So you can have different traversal algorithms for the same data structure.

Disadvantages

- You need to create a lot of classes to implement the pattern.
- You can be unncessary complex if you use the pattern with simple data structures.

*/

class Profile {
  constructor(
    private id: number,
    private name: string,
    private email: string
  ) {}

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  toString(): string {
    return `Profile: ${this.name} (${this.email})`;
  }
}

interface ProfileIterator {
  getNext(): Profile;
  hasMore(): boolean;
}

interface SocialNetwork {
  createFriendsIterator(profileId: number): ProfileIterator;
  createCoworkersIterator(profileId: number): ProfileIterator;
}

class Facebook implements SocialNetwork {
  private profiles: Profile[] = [];

  addProfile(profile: Profile): void {
    this.profiles.push(profile);
  }

  createFriendsIterator(profileId: number): ProfileIterator {
    return new FacebookIterator(this, "friends", profileId);
  }

  createCoworkersIterator(profileId: number): ProfileIterator {
    return new FacebookIterator(this, "coworkers", profileId);
  }

  getProfile(profileId: number): Profile | undefined {
    return this.profiles.find((profile) => profile.getId() === profileId);
  }
}

class FacebookIterator implements ProfileIterator {
  private currentPosition = 0;
  private readonly type: string;
  private cache: Profile[] = [];

  constructor(
    private readonly facebook: Facebook,
    type: string,
    private readonly profileId: number
  ) {
    this.type = type;
  }

  private lazyInit(): void {
    this.cache = []; // fill cache with profiles from facebook's API
  }

  getNext(): Profile {
    if (!this.hasMore()) {
      throw new Error("No more profiles");
    }

    const friend = this.facebook.getProfile(this.profileId)?.getName();
    const nextPosition = this.currentPosition + 1;
    this.currentPosition = nextPosition;
    return new Profile(nextPosition, friend!, `${friend}@facebook.com`);
  }

  hasMore(): boolean {
    this.lazyInit();
    return this.currentPosition < this.cache.length;
  }
}

class SocialSpammer {
  send(iterator: ProfileIterator, message: string): void {
    while (iterator.hasMore()) {
      const profile = iterator.getNext();
      console.log(`Sending message to ${profile.getName()}: ${message}`);
    }
  }
}

const facebook = new Facebook();
facebook.addProfile(new Profile(1, "John Doe", "Some email"));
facebook.addProfile(new Profile(2, "Jane Doe", "Some email"));
facebook.addProfile(new Profile(3, "Jack Doe", "Some email"));
facebook.addProfile(new Profile(4, "Jill Doe", "Some email"));

const socialSpammer = new SocialSpammer();
const profileId = 1;
let iterator = facebook.createFriendsIterator(profileId);
socialSpammer.send(iterator, "Hello from John");

iterator = facebook.createCoworkersIterator(profileId);
socialSpammer.send(iterator, "Hello from John");
