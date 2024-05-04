function fetchRecipes() {
    const ingredient = document.getElementById('ingredientInput').value;

    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(ingredient)}`;

    fetch(apiUrl)
    .then(response => {
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse the JSON from the response
        return response.json();
    })
    .then(data => {
        // Data contains the JSON response from the API
        // Log the data for now, you can process it further as needed
        console.log(data)
        renderMeals(data.meals);
        
        
        //data.meals.forEach(recipe => {
            //console.log(recipe.strMeal);
        //});
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with the fetch operation:', error);
    });
}

function renderMeals(meals){
    const mealListContainer = document.getElementById('mealList');

    // Clear any existing content in the container
    mealListContainer.innerHTML = '';

    // Create a list element to hold the meals
    const listElement = document.createElement('ul');

    // Loop through the meals array and create list items for each meal
    meals.forEach(meal => {
        // Create a list item element
        const listItem = document.createElement('li');

        // Create an image element for the meal thumbnail
        const img = document.createElement('img');
        img.src = meal.strMealThumb; // Set the image source
        img.alt = meal.strMeal; // Set the alt text

        // Append the image to the list item
        listItem.appendChild(img);

        // Create a paragraph element for the meal name
        const mealName = document.createElement('p');
        mealName.textContent = meal.strMeal; // Set the text content

        // Append the meal name to the list item
        listItem.appendChild(mealName);

        // Add event listener to the list item
        listItem.addEventListener('click', function() {
            // Open the strYoutube link in a new tab
            window.open(meal.strYoutube, '_blank');
        });

        // Append the list item to the list
        listElement.appendChild(listItem);
    });

    // Append the list of meals to the container
    mealListContainer.appendChild(listElement);
}