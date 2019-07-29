
import Search from './models/Search';
import * as searchView from './view/searchView';
import { elements, renderLoader, clearLoader} from './view/base';
/*Global State of the app
-Search object
-Current recipe object
-Shopping list object'
-Liked recipes 
*/
const state = {};
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


       
       //4.search for recipes
       await state.search.getResults();

       //5.render results on UI
       //console.log(state.search.result);
       clearLoader();
       searchView.renderRsults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
e.preventDefault();
controlSearch();
});


 
