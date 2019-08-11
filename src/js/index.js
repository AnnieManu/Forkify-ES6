
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './view/searchView';
import { elements, renderLoader, clearLoader} from './view/base';
/*Global State of the app
-Search object
-Current recipe object
-Shopping list object'
-Liked recipes 
*/
const state = {};
//** =====Search Controler=====**/
const controlSearch = async() => {
    //1. get the query from the view
    const query = searchView.getInput(); 
    console.log(query);//toDo
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
       searchView.renderResults(state.search.result)
       } catch(err){
           console.log(err);
          alert('something wrong with the search');
          clearLoader();
       }        
    }
}

elements.searchForm.addEventListener('submit', e => {
e.preventDefault();
controlSearch();
});

elements.searchResPages.addEventListener('click', e=>{
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderRsults(state.search.result, goToPage);
    }
});

//*=====Recipe Controler=====*//
 
const controlRecipe = async () => {
//get the ID from the URL
 const id = window.location.hash.replace('#', '');
 console.log('id');
    if(id){
        //Prepare UI for changes

        //Get the id from the URL
    

        //Create a new recipe object
        state.recipe = new Recipe(id); 
    
        try{
             //Get the recipe data
            await state.recipe.getRecipe();

            //Calculate servings & time
            state.recipe.calcTime();
            state.recipe.calcServings();
            //Render the recipe
            console.log(state.recipe);
        } catch(err){
            console.log(err.message);
            alert('Error processing recipe');
        }    
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


 
