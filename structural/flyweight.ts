/*

Flyweight (cache) - it's a structural design pattern that allows you to fit more objects
into the available amount of RAM by sharing common parts of state between multiple objects

Problem

- You have problems with RAM usage because you have a lot of similar objects in your app
- You can't fit all of them into RAM

Solution

- Extract the common state of the objects into a single place, where one object can hold it
- Let multiple objects share the same state object instead of having identical copies of it

Usage

- When an application uses a huge number of objects that have some shared state among them
- When the majority of an object's state can be made extrinsic

Advantages

- You save RAM

Disadvantages

- You might be trading RAM over CPU cycles when some of the context data needs to be recalculated each time somebody calls a flyweight method
- The code becomes much more complicated. New team members will always be wondering why the state of an entity was separated in such a way

*/

class TreeType {
  name: string;
  color: string;
  texture: string;

  constructor(name: string, color: string, texture: string) {
    this.name = name;
    this.color = color;
    this.texture = texture;
  }

  draw(canvas: Canvas, x: number, y: number) {
    canvas.drawTree(this, x, y);
  }
}

class TreeFactory {
  static treeTypes: Map<string, TreeType> = new Map();

  static getTreeType(name: string, color: string, texture: string) {
    let type = this.treeTypes.get(name);

    if (!type) {
      type = new TreeType(name, color, texture);
      this.treeTypes.set(name, type);
    }

    return type;
  }
}

class Tree {
  x: number;
  y: number;
  type: TreeType;

  constructor(x: number, y: number, type: TreeType) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  draw(canvas: Canvas) {
    this.type.draw(canvas, this.x, this.y);
  }
}

class Forest {
  trees: Tree[] = [];

  plantTree(
    x: number,
    y: number,
    name: string,
    color: string,
    texture: string
  ) {
    const type = TreeFactory.getTreeType(name, color, texture);
    const tree = new Tree(x, y, type);
    this.trees.push(tree);
  }

  draw(canvas: Canvas) {
    this.trees.forEach((tree) => tree.draw(canvas));
  }
}

class Canvas {
  context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  drawTree(type: TreeType, x: number, y: number) {
    const canvas = this.context;
    canvas.fillStyle = type.color;
    canvas.fillRect(x - 1, y, 3, 5);
  }
}

const forest = new Forest();

forest.plantTree(1, 2, "tree", "green", "texture");
forest.plantTree(2, 3, "tree", "green", "texture");
forest.plantTree(3, 4, "tree", "green", "texture");
forest.plantTree(4, 5, "tree", "green", "texture");
forest.plantTree(5, 6, "tree", "green", "texture");
