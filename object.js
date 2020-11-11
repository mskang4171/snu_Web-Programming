const c = {
  color: "white",
  price: 500,
  x: 10,
  sayColor: function () {
    console.log(this.color);
  },
  sayColor2: () => {
    console.log(this.color);
  },
};
function changeColor(obj, newColor) {
  obj.color = newColor;
}
changeColor(c, "yellow");
console.log(c.color);
c.sayColor();
c.sayColor2();
