/** Modules:
 * Important aspect of any robust application's architecture;
 * Keep the units of code for a project both cleanly separated and organized;
 * Encapsulate some data into privacy and expose other data publicly.
 */

// Get input values
// Add the new item to our data structure
// Add the new item to the UI
// Calculate budget
var budgetController = (function(){
    var x = 23;

    var add = function(a){
        return x + a;
    }

    return {
        publicTest: function(b){
            return add(b);
        }
    }
})();

// Update the UI
var UIController = (function(){
    //some code
})();

// Add event handler
var controller = (function(budgetCtrl, UICtrl){
    var z = budgetCtrl.publicTest(5);

    return{
        anotherPublic: function(){
            console.log(z);
        }
    }
})(budgetController, UIController);
