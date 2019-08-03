
import { elements } from './base';
export const getInput = () => elements.searchInput.value;
export const clearInput = () => elements.searchInput.value = '';
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}


const limitRecipeTitle = (title, limit = 20) => {
    const newTitle = [];
 if(title.length > limit){
     title.split('').reduce((acc, cur) => {
       if(acc + cur.length <= limit){ 
           newTitle.push[cur];
       }
        return acc + cur.length;

      }, );
       return `${newTitle.join('')} ...`;

      }  
       return title;
}



const renderRecipe = recipe => {
    var $;
    const markup = `
    <ul class="results__list">
       <li>
          <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title, 20)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                       </div>
                  </a>
            </li>
          </u>
      `; 
   elements.searchResList.insertAdjacentHTML('beforeend', markup);
};
// type: previous or next
const createButton = (page, type) => `<button class="btn-inline results__btn--${type}" data-goto= ${type === 'prev' ? page -1: page + 1}>
<span>Page ${type === 'prev' ? page -1: page + 1} </span>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' -1: 'right'}"></use>
</svg>
</button>`


const renderButton = (page, numResults, resPerPage) =>{
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if(page === 1 && page > 1){
        //the button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages){
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        ;`    
    }  
    else if(page === pages && pages > 1){
         button = createButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};
    export const renderRsults = (recipes, page = 1, resPerPage = 10) => {  
        //render results of current page
    const start = (page - 1) * resPerPage;
    const end = Math.ceil(page * resPerPage);

    recipes.slice(start, end).forEach(renderRecipe);
        //render the pagination buttons
        renderButton(page, recipes.length, resPerPage);
};