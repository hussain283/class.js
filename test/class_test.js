Class  = require('../class.js');
expect = require('expect.js');
i      = require('util').inspect;

expect.Assertion.prototype.aSubclassOf = function(superclass){
  function constructor() {};
  constructor.prototype = superclass;
  this.assert(
    this.obj instanceof constructor,
    function(){ return 'expected ' + i(this.obj) + ' to be a subclass of ' + i(superclass) },
    function(){ return 'expected ' + i(this.obj) + ' to not be a subclass of ' + i(superclass) }
  );
  return this;
};

expect.Assertion.prototype.anInstanceOf = function(_class){
  function constructor() {};
  constructor.prototype = _class.prototype;
  this.assert(
    this.obj instanceof constructor,
    function(){ return 'expected ' + i(this.obj) + ' to be an instance of ' + i(_class) },
    function(){ return 'expected ' + i(this.obj) + ' to not be an instance of ' + i(_class) }
  );
  return this;
};

expect.Assertion.prototype.aDelgateFor = function(prototype){
  function constructor() {};
  constructor.prototype = prototype;
  this.assert(
    this.obj instanceof constructor,
    function(){ return 'expected ' + i(this.obj) + ' to be a delegate for ' + i(prototype) },
    function(){ return 'expected ' + i(this.obj) + ' to not be a delegate for ' + i(prototype) }
  );
  return this;
};


describe("Class", function(){

  it("should be an object", function(){
    expect(Class).to.be.a('object');
  });

  describe(".instantiate", function(){
    it("should return an object that delegates to Class", function() {
      expect(Class.instantiate()).to.be.aDelgateFor(Class);
    });
  });

  describe(".extend", function(){

    it("should extend its self with the properties of the given objects", function(){
      Class.extend({_a:'a'}, {_b:'b'}, {_a:'A'}, mixin);
      expect(Class._a).to.eql('A');
      expect(Class._b).to.eql('b');
      expect(Class._c).to.eql('c');
      expect(Class._d).to.eql('d');
      expect(Class._e).to.eql('e');

      function mixin(a1,a2) {
        this._c = 'c';
        a1._d = 'd';
        a2._e = 'e';
      }
    });

  });

  describe(".isA", function(){
    it("should detect if the object is an instance of the given class", function() {
      var Cat = Class.new();
      var Dog = Class.new();
      var fluffy = Cat.new();
      expect( Cat.isA(Class)  ).to.be(true);
      expect( fluffy.isA(Cat) ).to.be(true);
      expect( fluffy.isA(Dog) ).to.be(false);
    });
  });

  describe(".new", function(){
    it("should be a function", function(){
      expect(Class.new).to.be.a('function');
    });

    it("should subclass Class.prototype", function(){
      expect(Class.new()).to.be.anInstanceOf(Class);
    });

  });

  describe(".subclass", function(){
    it("should return a subclass");
  });

  describe(".super", function(){
    it("should be fucking magic!");
  });

});

describe("inheritance", function() {

  it("", function(){

    var Animal = Class.new();
    var Mammal = Animal.subclass();
    var Dog    = Mammal.subclass();
    var Cat    = Mammal.subclass();
    var sparky = Dog.new();
    var mitten = Cat.new();

    Animal.animal_class_attribute = 1;
    Animal.prototype.animal_instance_attribute = 2;
    Mammal.mammal_class_attribute = 3;
    Mammal.prototype.mammal_instance_attribute = 4;
    Dog.dog_class_attribute = 5;
    Dog.prototype.dog_instance_attribute = 6;
    Cat.cat_class_attribute = 7;
    Cat.prototype.cat_instance_attribute = 8;

    expect(Animal).to.be.anInstanceOf(Class);
    expect(Animal).not.to.be.aSubclassOf(Class);
    expect(Animal).not.to.be.aSubclassOf(Animal);
    expect(Animal).not.to.be.aSubclassOf(Mammal);
    expect(Animal).not.to.be.aSubclassOf(Dog);
    expect(Animal).not.to.be.aSubclassOf(Cat);

    expect(Mammal).to.be.anInstanceOf(Class);
    expect(Mammal).not.to.be.aSubclassOf(Class);
    expect(Mammal).to.be.aSubclassOf(Animal);
    expect(Mammal).not.to.be.aSubclassOf(Mammal);
    expect(Mammal).not.to.be.aSubclassOf(Dog);
    expect(Mammal).not.to.be.aSubclassOf(Cat);

    expect(Dog).to.be.anInstanceOf(Class);
    expect(Dog).not.to.be.aSubclassOf(Class);
    expect(Dog).to.be.aSubclassOf(Animal);
    expect(Dog).to.be.aSubclassOf(Mammal);
    expect(Dog).not.to.be.aSubclassOf(Dog);
    expect(Dog).not.to.be.aSubclassOf(Cat);

    expect(Cat).to.be.anInstanceOf(Class);
    expect(Cat).not.to.be.aSubclassOf(Class);
    expect(Cat).to.be.aSubclassOf(Animal);
    expect(Cat).to.be.aSubclassOf(Mammal);
    expect(Cat).not.to.be.aSubclassOf(Dog);
    expect(Cat).not.to.be.aSubclassOf(Cat);


    expect(sparky).to.be.anInstanceOf(Animal);
    expect(sparky).to.be.anInstanceOf(Mammal);
    expect(sparky).to.be.anInstanceOf(Dog);
    expect(sparky).not.to.be.anInstanceOf(Cat);

    expect(mitten).to.be.anInstanceOf(Animal);
    expect(mitten).to.be.anInstanceOf(Mammal);
    expect(mitten).not.to.be.anInstanceOf(Dog);
    expect(mitten).to.be.anInstanceOf(Cat);



    expect( Cat.animal_class_attribute    ).to.be(1)
    expect( Cat.animal_instance_attribute ).to.be(undefined)
    expect( Cat.mammal_class_attribute    ).to.be(3)
    expect( Cat.mammal_instance_attribute ).to.be(undefined)
    expect( Cat.dog_class_attribute       ).to.be(undefined)
    expect( Cat.dog_instance_attribute    ).to.be(undefined)
    expect( Cat.cat_class_attribute       ).to.be(7)
    expect( Cat.cat_instance_attribute    ).to.be(undefined)

    expect( Dog.animal_class_attribute    ).to.be(1)
    expect( Dog.animal_instance_attribute ).to.be(undefined)
    expect( Dog.mammal_class_attribute    ).to.be(3)
    expect( Dog.mammal_instance_attribute ).to.be(undefined)
    expect( Dog.dog_class_attribute       ).to.be(5)
    expect( Dog.dog_instance_attribute    ).to.be(undefined)
    expect( Dog.cat_class_attribute       ).to.be(undefined)
    expect( Dog.cat_instance_attribute    ).to.be(undefined)

    expect( sparky.animal_class_attribute    ).to.be(undefined)
    expect( sparky.animal_instance_attribute ).to.be(2)
    expect( sparky.mammal_class_attribute    ).to.be(undefined)
    expect( sparky.mammal_instance_attribute ).to.be(4)
    expect( sparky.dog_class_attribute       ).to.be(undefined)
    expect( sparky.dog_instance_attribute    ).to.be(6)
    expect( sparky.cat_class_attribute       ).to.be(undefined)
    expect( sparky.cat_instance_attribute    ).to.be(undefined)

    expect( mitten.animal_class_attribute    ).to.be(undefined)
    expect( mitten.animal_instance_attribute ).to.be(2)
    expect( mitten.mammal_class_attribute    ).to.be(undefined)
    expect( mitten.mammal_instance_attribute ).to.be(4)
    expect( mitten.dog_class_attribute       ).to.be(undefined)
    expect( mitten.dog_instance_attribute    ).to.be(undefined)
    expect( mitten.cat_class_attribute       ).to.be(undefined)
    expect( mitten.cat_instance_attribute    ).to.be(8)

  })
});


describe("super", function(){

  it("", function() {

    var A = Class.new( {classname:'A'});
    var B = A.subclass({classname:'B'});
    var C = B.subclass({classname:'C'});
    var D = C.subclass({classname:'D'});
    var E = D.subclass({classname:'E'});
    var F = E.subclass({classname:'F'});
    var G = F.subclass({classname:'G'});
    var H = G.subclass({classname:'H'});

    function open1() {
      return 'open1 ';
    }
    function open2() {
      return 'open2 ' + this.super('open', arguments);
    }
    function open3() {
      return 'open3 ' + this.super('open', arguments) + this.super('open', arguments) + this.super('open', arguments);
    }

    A.prototype.open = open1;
    C.prototype.open = open2;
    E.prototype.open = open3;
    G.prototype.open = open2;


    expect( H.new().open() ).to.be('open2 open3 open2 open1 open2 open1 open2 open1 ');

  });

});
