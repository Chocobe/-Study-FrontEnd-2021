function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.getInfo = function() {
  return `${this.name}, ${this.age}`;
}

function ExtendsBridge() {}

ExtendsBridge.prototype = Person.prototype;

function Developer(name, age, language) {
  this.name = name;
  this.age = age;
  this.language = language;
}
// Developer.prototype = new Person();
Developer.prototype = new ExtendsBridge();

Developer.prototype.constructor = Developer;
Developer.prototype.getLanguage = function() {
  return this.language;
}

const kim = new Developer("kim", 35, "Javascript");

console.log(kim.getInfo());
console.log(kim.getLanguage());
console.log(kim);