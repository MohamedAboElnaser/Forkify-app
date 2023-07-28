# Forkify App

Forkify App is a recipe search application that allows users to search for recipes from an external API. It enables users to find their favorite recipes and save them for future reference.

## Live Demo

Hit the [Link](https://forkify-app-mohamed-aboelnasr.netlify.app/)

## Features

- Search for recipes: Users can enter a keyword to search for recipes available in the API.
- Render search results: The application will display the search results in a user-friendly format.
- Pagination: Search results will be paginated, providing easy navigation through multiple recipes.
- View recipe details: Users can click on a recipe from the search results to view detailed information about the selected recipe.
- Bookmark recipes: Users can bookmark their favorite recipes, and the bookmarks will be saved in the local storage for easy access.
- Upload own recipe: Users have the option to upload their own recipes to the server, and these recipes will be automatically bookmarked for the user.


## Flowchart
![flowchart](./arch/forkify-flowchart-part-3.png)
### Installation

1. Clone the repository: `git clone https://github.com/MohamedAboElnaser/Forkify-app.git`
2. Navigate to the project directory: `cd forkify-app`
3. Run this command `npm init` to set up all the dependencies.
4. Run `npm start` to start the development server on your machine.

### Usage

1. Enter a recipe name or keyword in the search bar and press the "Search" button.
2. Browse through the search results by clicking on the pagination buttons.
3. Click on a recipe to view its details.
4. To bookmark a recipe, click the "Bookmark" button on the recipe page.
5. To upload your own recipe, use the "Upload" feature in the app.

## Configuration

The Forkify App does not require any specific configuration. However, if you plan to deploy it to a server or modify API endpoints, you may need to update the relevant configuration files.

## Contributing

We welcome contributions from the community! If you find any bugs or have suggestions for improvement, please feel free to create issues or submit pull requests. When contributing, follow the existing coding style and guidelines.

## License

This project is part of [Jonas](https://github.com/jonasschmedtmann/complete-javascript-course/tree/master) JavaScript course.

## Acknowledgments

The Forkify App relies on the [Forkify API](https://forkify-api.herokuapp.com/) for recipe data. We extend our gratitude to Jonas for providing this service.
