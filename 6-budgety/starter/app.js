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

    return{ // "return" to call function publicily
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
        inputBtn:'.add__btn',
        incomeContainer:'.income__list',
        expensesContainer:'.expenses__list'
    }

    return{

        getinput: function(){
            return{ // Using an object: to give value of multiple items
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDesc).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        addListItem: function(obj, type){
            var html, newHtml, element;

            // Create HTML string with placeholder text
            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type === 'exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%desc%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
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
        document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

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
        UICtrl.addListItem(newItem, input.type);

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