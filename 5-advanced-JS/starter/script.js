/* Constructors and Instances in Javascript */

// Constructors (or prototype): is an blueprint that is used to create instances that are also other objects.

// Inheritance is when one object is based on another object, its when one object gets access to another objects properties and methods.

// Javascript is a prototype based langange. Which means that inheritance works by using something called prototypes.

/** SUMMARY
 * Every JavaScript object has a protoype property, which makes inheritance possible in JavaScript;
 * The prototyp property of an object is where we put methods and properties that we want other objects to inherit;
 * The Constructor's prototype property is NOT the prototype of the Constructor itself, it's the prototype of ALL instances that are created through it;
 * When a certain method (or property) is called, the search starts in the object itself, and if it cannot be found, the search moves on to the object's prototype. This continues until the method is found: prototype chain.
 */

/* Object Literal EXAMPLE
 let john = {
     name:'John',
     yearOfBirth:1990,
     job:'teacher'
 }; */

 /* Function Constructor
 ----------------------------------------------------- */
 const Person = function(name, yearOfBirth, job){
     this.name = name;
     this.yearOfBirth = yearOfBirth;
     this.job = job;
 }

 // Prototype property of function constructor (most popular)
 Person.prototype.calculateAge = function(){ //method
    console.log(2016 - this.yearOfBirth); 
 }

 Person.prototype.lastName = 'Smith'; //property

 //instances
 let john = new Person('John',1990,'teacher'); 
 let jane = new Person('Jane',1969,'designer');
 let mark = new Person('Mark',1948,'retired');

 john.calculateAge();
 jane.calculateAge();
 mark.calculateAge();

 console.log(
    john.name, john.lastName,
    jane.name, jane.lastName,
    mark.name, mark.lastName
);


/* Object.create method
----------------------------------------------------- */
const personProto = {
    calculateAge:function(){
        console.log(2016 - this.yearOfBirth);
    }
};

// Method One: Fill an Object
let john1 = Object.create(personProto);
john1.name = 'John';
john1.yearOfBirth = 1990;
john1.job = 'Teacher';

// Method Two: Fill an Object
let jane1 = Object.create(personProto,{
    name: {value:'Jane'},
    yearOfBirth: {value:1969},
    job: {value:'designer'}
});

/* Difference between "Object.create" and the "Function Constructor": Object.create builds and object that inherits directly from the one that we passed into the first argument, while on the other hand, the Function Constructor the newly created object inherits from the constructor's prototype property */


/* Primitives VS. Objects
----------------------------------------------------- */

/* Difference between "Primitives" and "Objects":
 |-> Variables containing primitives, actually hold that data inside of the variable itself.
 |-> Variables associated with objects will not actually contain the object but instead they contain a reference to the place in memory where the object sits or is stored. Again, a variable that is stored as an object does not have a real copy of the object; it just points to that object. 
*/

// Primitives Example
let a = 23, b = a;
a = 46;
console.log(a,b);

// Objects Example
let obj1 = {
    name:'John',
    age:26
};
let obj2 = obj1;
obj1.age = 30;
console.log(obj1.age, obj2.age);

// Functions Example
let age = 27;
let obj3 = {
    name:'Jonas',
    city:'Lisbon'
};

function change(a,b){
    a = 30;
    b.city = 'San Francisco';
}
change(age,obj3);
console.log(age, obj3.city);
// Notice the Primitive(age) is unchanged


/* Lecture: Passing functions as arguments (ref:line:277)
----------------------------------------------------- */
/* Functions
 * A function is an instance of the Object type
 * A function behaves like any other object
 * We can store functions in a variable
 * We can pass a function as an argument to another function
 * We can return a function from a function
 */
 var years = [1990,1965,1937,2005,1998];

 function arrayCalc(arr, fn){
     var arrRes = [];
     for (var i = 0; i < arr.length; i++){
         arrRes.push(fn(arr[i]));
     }
     return arrRes;
 }

 function calcAge(el){
     return 2016 - el;
 }

 function isFullAge(el){
     return el >= 18;
 }

 function maxHeartRate(el){
     if (el >= 18 && el <= 81){
         return Math.round(206.9 - (0.67 * el));
     } else {
         return -1;
     }
 }

 var ages = arrayCalc(years, calcAge);
 var fullAges = arrayCalc(ages, isFullAge);
 var rates = arrayCalc(ages, maxHeartRate);

 console.log(ages);
 console.log(fullAges);
 console.log(rates);


/* Lecture: Functions returning functions (ref:line:224)
----------------------------------------------------- */
function interviewQuestion(job){
    if (job === 'designer'){
        return function(name){
            console.log(`${name}, can you please explain what UX design is?`);
        }
    } else if (job === 'teacher'){
        return function(name){
            console.log(`What subject do you teach, ${name}?`);
        }
    } else {
        return function(name){
            console.log(`Hello ${name}, what do you do?`);
        }
    }
}

// Calling the function (storing it in a variable)
let teacherQuestion = interviewQuestion('teacher');
teacherQuestion('John');
let designerQuestion = interviewQuestion('designer');
designerQuestion('Jane');

// Calling the function outright
interviewQuestion('teacher')('Mark');


/* Lecture: IIFE (Immediately Invoked Function Expressions)
----------------------------------------------------------- */
/* BUILD A GAME: where we win the game if a random score from 0 to 9 is greater or equal to 5, and lose if it is smaller. We want to keep the score hidden. */
(function(){
    let score = Math.random() * 10;
    console.log(score >= 5);
})();

(function(goodLuck){
    let score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(5);

//An IIFE is not to create a piece of reusable code, but for data privacy


/* Lecture: Closures (IMPORTANT!)
----------------------------------------------------- */
function retirement(retirementAge){
    let a = ' years left until retirement.';
    return function(yearOfBirth){
        let age = 2016 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}
//retirement(66)(1990); //alternate way to call the functions
let retirementUS = retirement(66);
let retirementGermany = retirement(65);
let retirementIceland = retirement(67);

retirementUS(1990);
retirementGermany(1990);
retirementIceland(1990);

/* CLOSURES SUMMARY: An inner function always has access to the variables and parameters of its outer function, even after the outer function has returned. */

/* CLOSURES CHALLENGE: rewrite "interviewQuestion" function with closures (ref:line:160) */
function interviewQuestionChallenge(job){
    return function(name){
        if (job === 'designer'){
            console.log(`${name}, can you please explain what UX design is?`);
        } else if (job === 'teacher'){
            console.log(`What subject do you teach, ${name}?`);
        } else {
            console.log(`Hello ${name}, what do you do?`);
        }
    }
}
interviewQuestionChallenge('teacher')('Becky');


/* Lecture: Bind, Call and Apply
----------------------------------------------------- */
let speakerJohn = {
    name:'John',
    age:26,
    job:'teacher',
    presentation: function(style,timeOfDay){
        if (style === 'formal'){
            console.log(`Good ${timeOfDay}, Ladies and Gentlemen! I'm ${this.name}, and I'm a ${this.age} year old ${this.job}.`);
        } else if (style === 'casual'){
            console.log(`Hey! What's up everyone? I'm ${this.name}, and I'm a ${this.age} year old ${this.job}. Good ${timeOfDay}! :)`);
        }
    }
}

let speakerEmily = {
    name:'Emily',
    age:35,
    job:'designer',
};

speakerJohn.presentation('formal','morning');

/* CALL Method: allows use to set the THIS variable as the 1st argument */
speakerJohn.presentation.call(speakerEmily,'formal','afternoon');// Method borrowing (Borrowed from John for Emily)

/* APPLY Method: accepts the arguments as an array */
speakerJohn.presentation.apply(speakerEmily,['casual','afternoon']);// Won't works because the function is not expecting an array

/* BIND Method: similar to the call method, but doesn't immediately call the function. Instead it generates a copy of the function, so that we can store it. This is useful for create functions with preset arguments.*/
let johnCasual = speakerJohn.presentation.bind(speakerJohn,'casual');
johnCasual('afternoon');
johnCasual('evening');

let emilyFormal = speakerJohn.presentation.bind(speakerEmily,'formal');
emilyFormal('morning');
//this is call carrying

/* BIND Method Challenge (ref:line:116) */
var years_Challenge = [1990,1965,1937,2005,1998];

function arrayCalc_Challenge(arr, fn){
    var arrRes = [];
    for (var i = 0; i < arr.length; i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calcAge_Challenge(el){
    return 2016 - el;
}

function isFullAge_Challenge(limit, el){ //Challenge Edit
    return el >= limit;
}

let ages_Challenge = arrayCalc_Challenge(years_Challenge,calcAge_Challenge);

let fullJapan = arrayCalc_Challenge(ages_Challenge,isFullAge_Challenge.bind(this,20));

console.log(ages_Challenge);
console.log(fullJapan);


/*--------------------------------
Coding Challenge 7
Build a fun quiz game in the console
----------------------------------------------------- */