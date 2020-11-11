class Car {
  // color, price, x : property
  constructor(color, price, x) {
    this.color = color;
    this.price = price;
    this.x = x;
  }
  // move, horn : method
  move(x) {
    this.x += x;
  }
  horn() {
    /*
    function으로 정의된 경우 this를 사용할 수 없다.
    function aa() {
      console.log(this.color);
    }
    aa();
    */
    const bb = () => {
      console.log(this.color);
    };

    bb();
    console.log(
      `My color is ${this.color}. Price is ${this.price}. I'm at ${this.x}`
    );
  }
  changeColor(newColor) {
    this.color = newColor;
  }
}

const c = new Car("black", 500, 0);
const c2 = new Car("white", 800, 3);

console.log(c);
console.log(c.color);
c.horn();
c.move(10);
console.log(c.x);
c.changeColor("gray");
console.log(c.color);
const cars = [c, c2];
cars.forEach((car) => car.move(5));
cars.forEach((car) => car.horn());

const cars2 = [];
for (let i = 0; i < 10; i++) {
  cars2.push(new Car("white", 500, i));
}
cars2.forEach((car) => car.horn());
