/*

Decorator - it's strutural pattern, which allows to add new funitionality to existing class
by wrapping it into another class.

Problem

- You need to add new functionality to existing class, but you can't modify it.
- You need to add new functionality to all instances of existing class.
- You have a lot of subclasses with similar functionality, and you want to extract it to reusable class.

Solution

- We should use aggregation instead of inheritance.
- It's also known as wrapper.
- It run some code before or after calling methods of wrapped object.
- It implements the same interface as wrapped object. So for the client it's transparent.
- We are building stack of decorators, so we can add new functionality to existing class.

Real life example

- You can wrap your clothes with another clothes to add new functionality.

Structure

- Component declares interface for both wrapper and wrapped objects.
- Concrete component is a class of wrapped object.
- Base decorator implements the same interface as wrapped object.
- Concrete decoratar adds new functionality to wrapped object. Before or after calling wrapped object methods.
- Client can use wrapped object or decorated object, because they implement the same interface.

Usage

- When you need to add new functionality to existing class, but you can't modify it.
- When you need to add new functionality to all instances of existing class.
- When you can't use inheritance, because you need to add new functionality to a lot of classes or it's not possible to extend class.

Advantages

- You can add new functionality to existing class without changing it.
- You can add new functionality to all instances of existing class.
- You can concate new functionality by wrapping objects.
- Single responsibility principle. You can divide functionality between classes with single responsibility.

Disadvantages

- It's hard to remove functionality from wrapped object.
- It's hard to implement decorator in such way, that order of decorators doesn't matter.
- Client code could become more complicated, because it has to deal with a lot of objects.

*/

interface DataSource {
  writeData(data: string): void;
  readData(): string;
}

class FileDataSource implements DataSource {
  private data: string;

  constructor() {
    this.data = "";
  }

  writeData(data: string): void {
    this.data = data;
  }

  readData(): string {
    return this.data;
  }
}

class DataSourceDecorator implements DataSource {
  protected wrappee: DataSource;

  constructor(source: DataSource) {
    this.wrappee = source;
  }

  writeData(data: string): void {
    this.wrappee.writeData(data);
  }

  readData(): string {
    return this.wrappee.readData();
  }
}

class EncryptionDecorator extends DataSourceDecorator {
  writeData(data: string): void {
    super.writeData(this.encrypt(data));
  }

  readData(): string {
    return this.decrypt(super.readData());
  }

  private encrypt(data: string): string {
    return data + " encrypted";
  }

  private decrypt(data: string): string {
    return data.replace(" encrypted", "");
  }
}

class CompressionDecorator extends DataSourceDecorator {
  writeData(data: string): void {
    super.writeData(this.compress(data));
  }

  readData(): string {
    return this.decompress(super.readData());
  }

  private compress(data: string): string {
    return data + " compressed";
  }

  private decompress(data: string): string {
    return data.replace(" compressed", "");
  }
}

const source = new FileDataSource();

const encryptedSource = new EncryptionDecorator(source);
encryptedSource.writeData("data");
console.log(encryptedSource.readData());

const compressedSource = new CompressionDecorator(source);
compressedSource.writeData("data");
console.log(compressedSource.readData());

const compressedEncryptedSource = new CompressionDecorator(encryptedSource);
compressedEncryptedSource.writeData("data");
console.log(compressedEncryptedSource.readData());
