import { API_URL, RES_PER_PAGE, KEY } from './config';
import { getJSON, setJSON } from './helper.js';
export const state = {
  recipe: {},
  search: {
    results: [],
    quary: '',
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};
const creatRecipeObject = function (data) {
  let { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingrediants: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  try {
    let data = await getJSON(`${API_URL}/${id}`);

    state.recipe = creatRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.log(`${err.message} is handelled at model 🙋‍♂️🙋‍♂️`);
    throw err;
  }
};

export const loadSearchResults = async function (quary) {
  try {
    state.search.quary = quary;
    let data = await getJSON(`${API_URL}?search=${quary}&key=${KEY}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        img: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultPage = function (page = 1) {
  state.search.page = page;

  let start = (page - 1) * state.search.resultsPerPage;
  let end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingrediants.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  //update the servings of the state obj
  state.recipe.servings = newServings;
};

const addBookmarsTolocalStorage = function () {
  let data = JSON.stringify(state.bookmarks);
  localStorage.setItem('bookmarks', data);
};
export const addBookMark = function (recipe) {
  //add the recipe to the bookmark array
  state.bookmarks.push(recipe);
  //mark the current recipe as bookmarded
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  addBookmarsTolocalStorage();
};

export const removeBookMark = function (id) {
  let index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  //marked the current recipe as not bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  addBookmarsTolocalStorage();
};

const loadBookmarskFromLocalStorage = function () {
  let data = localStorage.getItem('bookmarks');
  if (data) state.bookmarks = JSON.parse(data);
};

loadBookmarskFromLocalStorage();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingrediants = Object.entries(newRecipe)
      .filter(enti => {
        return enti[0].startsWith('ingredient') && enti[1] !== '';
      })
      .map(ing => {
        let ingArray = ing[1].split(',').map(ele => ele.trim());

        if (ingArray.length !== 3)
          throw new Error('Wrong Input Format .Please, Try again');
        let [quantity, unit, description] = ingArray;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      ingrediants,
    };
    console.log('recipe object ', recipe);
    let data = await setJSON(`${API_URL}?key=${KEY}`, recipe);
    console.log('Data returned form the server', data);
    state.recipe = creatRecipeObject(data);
    addBookMark(state.recipe);
  } catch (err) {
    throw err;
  }
};
