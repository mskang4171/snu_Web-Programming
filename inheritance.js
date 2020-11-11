class Animal {
  constructor(name, weight, height) {
    this.name = name;
    this.weight = weight;
    this.height = height;
  }
  bark() {
    console.log(`${this.name} : hello`);
  }
}

class Dog extends Animal {
  constructor(name, weight, height, color) {
    super(name, weight, height); // parent class(super class)의 property를 그대로 사용
    this.color = color;
  } // 이렇게 property를 추가하는 것이 가능
  bark() {
    console.log(`${this.name} : bowwow`);
  }
  barkSuper() {
    super.bark(); // parent class의 property, method 접근 방법
  }
  guard() {
    this.weight -= 5;
  }
}

class Cat extends Animal {
  bark() {
    console.log(`${this.name} : meow`);
  } // 동일한 이름의 함수에 대하여 다른 작업을 수행할 수 있다.
}

const dog = new Dog("Bowl", 30, 30, "Black");
const cat = new Cat("kitty", 20, 20);

Dog.prototype.bark2 = function () {
  console.log(`${this.name} : bowwwwoww!!!`);
};

dog.bark();
cat.bark();
dog.guard();
// cat.guard(); TypeError: cat.guard is not a function
console.log(dog.color);
dog.barkSuper();
dog.bark2();
