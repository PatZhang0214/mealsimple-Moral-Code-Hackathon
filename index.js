function fetchRecipes() {
    const ingredient = document.getElementById('ingredientInput').value;

    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(ingredient)}`;

    fetch(apiUrl)
    .then(response => {

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    })
    .then(data => {
        // Data contains the JSON response from the API

        console.log(data)
        renderMeals(data.meals);


        //data.meals.forEach(recipe => {
            //console.log(recipe.strMeal);
        //});
    })
    .catch(error => {

        console.error('There was a problem with the fetch operation:', error);
    });
}

function renderMeals(meals){
    const mealListContainer = document.getElementById('mealList');


    mealListContainer.innerHTML = '';

    // Create a list element to hold the meals
    const listElement = document.createElement('ul');

    // Loop through the meals array and create list items for each meal
    meals.forEach(meal => {
        // Create a list item element
        const listItem = document.createElement('li');


        const img = document.createElement('img');
        img.src = meal.strMealThumb;
        img.alt = meal.strMeal;


        listItem.appendChild(img);


        const mealName = document.createElement('p');
        mealName.textContent = meal.strMeal;


        listItem.appendChild(mealName);

        // Add event listener to the list item
        listItem.addEventListener('click', function() {

            window.open(meal.strYoutube, '_blank');
        });


        listElement.appendChild(listItem);
    });

    // Append the list of meals to the container
    mealListContainer.appendChild(listElement);
}

async function generateRecipe() {

    // API key and URL for OpenAI
    const apiKey = 'sk-proj-FuaeF67W8CUavlAtyu85T3BlbkFJ2F64lhPlWTAQCAYEFDst';
    const url = 'https://api.openai.com/v1/chat/completions';

    // Use gpt-4 with a prompt to generate a recipe
    const formData = {
        model: "gpt-4",
        messages: [{
            "role": "user",
            "content": `Generate a name, approximate budget, ingredients list, and a step-by-step recipe for a meal based on these specifications: Cuisine: ${document.getElementById('cuisine').value}, Dietary Restrictions: ${document.getElementById('restrictions').value}, Time To Make: ${document.getElementById('time').value}, Budget: ${document.getElementById('cost').value} (make the response easy to read and less than 100 words)`
        }],
        max_tokens: 200
    };

    try {
        const spinner = document.querySelector('.spinner');
        spinner.style.display = 'block';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recipe: ' + response.statusText);
        }

        const result = await response.json();
        document.getElementById('recipeResult').innerText = result.choices[0].message.content;
        spinner.style.display = 'none';
    }
    catch (error) {
        document.getElementById('recipeResult').innerText = 'Failed to generate recipe: ' + error.message;
    }

}