class NewObj {
  constructor(name) {
    this.name = name;
  }
  doLater() {
    setTimeout(function () {
      console.log(this.name);
    }, 1000);
  }
  doLater2() {
    // fix by self
    let self = this;
    setTimeout(function () {
      console.log(self.name);
    }, 1000);
  };
  doLater3() {
    // fix by arrow func
    setTimeout(() => console.log(this.name), 1000);
  };
}

let obj = new NewObj('shelley');
obj.doLater();
obj.doLater2();
obj.doLater3();