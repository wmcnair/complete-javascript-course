/** Modules:
 * Important aspect of any robust application's architecture;
 * Keep the units of code for a project both cleanly separated and organized;
 * Encapsulate some data into privacy and expose other data publicly.
 */


// Budget Controller | --->
var budgetController = (function(){

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems:{
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        }
    };

    return{
        addItem: function(type, des, val){
            var newItem, ID;

            // Create new ID
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else{
                ID = 0;
            }

            // Create new item based on 'inc' or 'exp' type
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            }else if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }

            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;
        },

        testing: function(){
            console.log(data);
        }
    };

})();

// UI Controller | --->
var UIController = (function(){
    
    var DOMstrings={
        inputType:'.add__type',
        inputDesc:'.add__description',
        inputValue:'.add__value',
        inputBtn:'.add__btn'
    }

    return{

        getinput: function(){
            return{ // Using an object: to give value of multiple items
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDesc).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function(){
            return DOMstrings;
        }

    };

})();

// Global App Controller | --->
var controller = (function(budgetCtrl, UICtrl){

    var setupEventListeners = function(){ 
        var DOM = UICtrl.getDOMstrings(); //Pulling DOMstrings from UI Controller
        
        // ADD btn is Clicked
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        // ENTER key is Clicked
        document.addEventListener('keypress', function(event){
            if(event.keycode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
    };
    
    var ctrlAddItem = function(){
        var input, newItem;
        
        // 1. Get the field input data (aka Get input values)
        input = UICtrl.getinput();

        // 2. Add the new item to the budget controller (aka to our data structure)
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // 3. Add the new item to the UI
        // 4. Calculate the budget
        // 5. Display the budget on the UI (aka Update the UI)
    };

    return{ // init function
        init: function(){
            setupEventListeners();
            console.log('App has started!');
        }
    };


})(budgetController, UIController);


controller.init(); //calling init function
