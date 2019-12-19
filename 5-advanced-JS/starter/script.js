// Example of an Object
/* let john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
}; */

/* Function constructor
**********************************************/
 
let Person = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    /* this.calculateAge = function(){
        console.log(2016 - this.yearOfBirth);
    } */
}

// inheritance Method (recommended)
Person.prototype.calculateAge = function(){ 
    console.log(2016 - this.yearOfBirth);
};

// inheritance Property
Person.prototype.lastName = 'Smith';

// instance of the Person Object
let john = new Person('John', 1990, 'teacher');
let jane = new Person('Jane', 1969, 'designer');
let mark = new Person('Mark', 1948, 'retired');

john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(`${john.name} ${john.lastName}`);


/* Object.create
**********************************************/

let personProto = {
    calculateAge: function(){
        console.log(2016-this.yearOfBirth);
    }
};

let john1 = Object.create(personProto);
john1.name = 'John';
john1.yearOfBirth = 1990;
john1.job = 'teacher';

let jane1 = Object.create(personProto, {
    name: {value:'Jane'},
    yearOfBirth: {value:1969},
    job: {value:'designer'}
});

/*  The difference between "Object.create" and the "Constructor Function" is:
    -> Object.create builds an object that inherits directly from the one that we passed into the first argument.
       (The benefit of Object.create is that is allows us to implement really complex inheritance structures in an easier way than Function Constructor, because it allows us to directly specify which object should be a prototype)
    -> Function Constructor, the newly create object inherits from the constructor's prototype property
       (This is still the most popular method)
*/
