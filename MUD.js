// 직업을 만든다던가
// 공간을 만든다던가

class Job {
  constructor(atk, speed, magicPower) {}
}

class Theif extends Job {
  steal() {}
}

class Cell {
  constructor(name, desc, event) {}
}

class WarCell extends Cell {}
class CureCell extends Cell {}
class ItemCell extends Cell {}

// 3*3 cell
[
  [new WarCell(), new Cell(), new Cell()],
  [new Cell(), new Cell(), new ItemCell()],
  [new Cell(), new CureCell(), new Cell()],
];
