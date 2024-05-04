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