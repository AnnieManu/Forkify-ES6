
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';  
import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import * as listView from './view/listView';
import { elements, renderLoader, clearLoader} from './view/base';
/*Global State of the app
-Search object
-Current recipe object
-Shopping list object'
-Liked recipes 
*/
const state = {};
window.state = state;
//** =====Search Controler=====**/
const controlSearch = async() => {
    //1. get the query from the view
    const query = searchView.getInput(); 

    //console.log(query);//toDo
    if (query){
        //2.new search object and add it to state
        state.search = new Search(query);
   
       //3.prepare UI for the results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

       try{
        //4.search for recipes
       await state.search.getResults();

       //5.render results on UI
       //console.log(state.search.result);
       clearLoader();
       searchView.renderResults(state.search.result);
       } catch(err){
           console.log(err.message);
          //alert('something wrong with the search');
          clearLoader();
       }        
    }
}

elements.searchForm.addEventListener('submit', e => {
e.preventDefault();
controlSearch();
});
 
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

//*=====Recipe Controler=====*//
 
const controlRecipe = async () => {
//get the ID from the URL
 const id = window.location.hash.replace('#', '');
 console.log('id');
    if(id){
        //Prepare UI for changes
         recipeView.clearRecipe();
         renderLoader(elements.recipe);
        //Get the id from the URL
    
         //Highlight te selected seatch item
        if(state.search) searchView.highlightSelected(id);
        //Create a new recipe object
        state.recipe = new Recipe(id); 
        try{
             //Get the recipe data and ingredients
            await state.recipe.getRecipe();
            //console.log(state.recipe.ingredient);
            state.recipe.parseIngredients();
            //Calculate servings & time
            state.recipe.calcTime();
            state.recipe.calcServings();
            //Render the recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch(err){
            console.log(err.message);
            //alert('Error processing recipe');
        }    
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/** 
 * LIST CONTROLLER
 */
const controlList = () => {
    // Create a new list IF there in none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem (item);
    });
}
//handle delete and update list item event
  elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    //handle the delete button and update list event
    if(e.target.matches('shopping__delete', 'shopping__delete *')){
     //delete from the state 
      state.list.deleteItem(id);
     //delete from user interface
     listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
  });
  
    

//Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
 if(e.target.matches('.btn-decrease, .btn-decrease *')){
     if(state.recipe.servings > 1) {    
        //decrease button is clicked
    state.recipe.updateServings('dec'); 
    recipeView.updateServingsIngredients(state.recipe);  
     }
  
 } else if(e.target.matches('.btn-increase, .btn-increase *')){
   //increase button is clicked   
   state.recipe.updateServings('inc');
   recipeView.updateServingsIngredients(state.recipe);
 } else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
    controlList();
 }
 //console.log(state.recipe);
});
 window.l = new List();

 
