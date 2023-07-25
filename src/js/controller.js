import * as model from './model.js';
import recipeView from './views/recepView.js';
import searchView from './views/SearchView.js';
import resultView from './views/resultView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    let id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();
    // here we add active class to the selected recipe
    resultView.update(model.getSearchResultPage());
    bookmarksView.update(model.state.bookmarks);
    //this function do not return any data it just manipulate the state object at the model
    //first load recipe
    await model.loadRecipe(id);
    // second we render that recipe
    recipeView.render(model.state.recipe);
  } catch (er) {
    console.error(er);
    recipeView.renderErrorMessage();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    // 1] load the quary
    const quary = searchView.getQuary();

    //2] load the search results
    //this function do not return any thing it just manipulate the state object
    await model.loadSearchResults(quary);

    //3] Render the search result
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultPage());

    //4] Render the pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (page) {
  //1] render that page
  resultView.render(model.getSearchResultPage(page));
  //2] render the pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //first update the servings in the state
  model.updateServings(newServings);
  // second update the view (recepView)

  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //1] Add /Remove the bookmark
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.removeBookMark(model.state.recipe.id);
  //2] Update the bookmark sign in the ui
  recipeView.update(model.state.recipe);

  //3] Render the bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlUploadRecipe = async function (newRecipe) {
  try {
    //load the spinner
    addRecipeView.renderSpinner();

    //upload the recipe to the API
    await model.uploadRecipe(newRecipe);

    //Render the recipe
    recipeView.render(model.state.recipe);

    //render Success message
    addRecipeView.renderMessage();

    //render bookmarks
    bookmarksView.render(model.state.bookmarks);

    //change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close the form
    setTimeout(function () {
      addRecipeView.toggleWindo();
      location.reload();
    }, 2000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderErrorMessage(err.message);
  }
};

//  
//here we applay the concept of Publisher subscriber pattern
// as at the beggining the recepView[Publisher] [do not know any thing about controller]
// just it  listens to the events from DOM and handels it through
// its handeler parameter [subscriber]
// as recepView is imported in the controller so i can add the handeller[subscriber] that exeist
const init = function () {
  bookmarksView.addHandellerRender(controlBookmarks);
  recipeView.addHandelerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandelerBookmark(controlAddBookmark);

  searchView.addHandelerSearch(controlSearchResults);
  paginationView.addHandelerClick(controlPagination);
  addRecipeView.addHadelerUpload(controlUploadRecipe);
};

init();
