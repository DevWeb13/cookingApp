const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input");
let meals = [];

/**
 * [async description]
 *
 * @param   {string}  search  [search description]
 *
 * @return  {Promise}          [return description]
 */
async function fetchMeals(search) {
	await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
		.then((res) => res.json())
		.then((data) => (meals = data.meals));
	console.log(meals);
}
/**
 * Affichage des plats
 *
 * @return  {void}  Affichage des plats
 */
function mealsDisplay() {
	if (meals === null) {
		result.innerHTML = "<h2>Aucun résultat</h2>";
	} else {
		// Limiter le nombre de plats affiché à 12
		meals.length = 12;

		result.innerHTML = meals
			.map((meal) => {
				// Pour codé plusieurs lignes dans le map il FAUT ajouter les accolades ET le return

				let ingredients = [];

				for (let i = 1; i < 21; i++) {
					// Si l'ingrédient numéro ${i} existe
					if (meal[`strIngredient${i}`]) {
						let ingredient = meal[`strIngredient${i}`];
						let measure = meal[`strMeasure${i}`];
						ingredients.push(`<li>${ingredient}  -  ${measure}</li>`);
					}
				}

				console.log(ingredients);

				return /* html */ `
          <li class="card">
          <h2>${meal.strMeal}</h2>
          <p>${meal.strArea}</p>
          <img src=${meal.strMealThumb} alt="photo ${meal.strMeal}">
          <ul>${ingredients.join("")}</ul>
          </li>
        `;
			})
			// Supprime la virgule qui sépare chaque element du map()
			.join("");
	}
}

// Lorsque l'utilisateur entre une valeur dans l'input
input.addEventListener("input", (e) => {
	// @ts-ignore
	fetchMeals(e.target.value);
});

// Lorsque le form est soumis
form.addEventListener("submit", (e) => {
	// Ne pas recharger la page
	e.preventDefault();
	// Affiche les résultats
	mealsDisplay();
});
