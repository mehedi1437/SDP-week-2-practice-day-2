document.getElementById("search-btn").addEventListener('click',()=>{
    const search = document.getElementById("search-input").value 
    if (search) {
        loadAllMeals(search);
    } else {
        displayNoResults();
    }
})

const loadAllMeals = (search) =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
            .then((res)=>res.json())
            .then((data)=>{
                if(data.meals){
                    displayData(data.meals)
                }
                else
                {
                    displayNoResults()
                } 
            });   
};
const displayData=(mealData)=>{
    const container = document.getElementById("userData-container")
    container.innerHTML = "";

    mealData.forEach((meal) => {
        const div = document.createElement("div")

        console.log(mealData)
        div.innerHTML=`
            <div class="card" data-id="${meal.idMeal}">
                <img class="meal-img" src=${meal.strMealThumb} alt="" />
                <h4 class="fw-bold text-center" >${meal.strMeal}</h4>
                <p class="text-center text-danger">${meal.idMeal}</p>
            </div> 
        `
        container.appendChild(div)

        div.querySelector(".card").addEventListener('click',()=>{
            loadMealDetail(meal.idMeal)
        })
    });
}

const loadMealDetail = (mealID)=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then((res)=>res.json())
        .then((data)=>{
            if(data.meals){
                displayMealDetail(data.meals[0])
            }
        })
        .catch((error)=>{
            console.error("Error fetching meal details:",error);
        })
}

const displayMealDetail = (meal)=>{
    const container = document.getElementById("meal-details")
    container.innerHTML=""

    const div = document.createElement("div")
    div.classList.add("details")

    div.innerHTML = `
        <div class="details-left">
            <img class="details-img" src="${meal.strMealThumb}">
            <h4 class="fw-bold text-center">${meal.strMeal}</h4>
        </div>
        <div class="details-right text-start">
            <h4 class="fw-bolder text-danger text-center "><strong>Details</strong></h4>
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <p class="lh-base"><strong>Instructions:</strong> <br/> ${meal.strInstructions.slice(0,30)}</p>
            <p class="fw-bolder fw-italic"><strong>Ingredients:</strong> </p>
            <p><strong>Ingredient-1:</strong> ${meal.strIngredient1}</p>
            <p><strong>Ingredient-2:</strong> ${meal.strIngredient2}</p>
            <p><strong>Ingredient-3:</strong> ${meal.strIngredient3}</p>
            <p><strong>Ingredient-4:</strong> ${meal.strIngredient4}</p>
            <p><strong>Ingredient-5:</strong> ${meal.strIngredient5}</p>
            <p><strong>Ingredient-6:</strong> ${meal.strIngredient6}</p>
            <p><strong>Ingredient-7:</strong> ${meal.strIngredient7}</p>
            <p><strong>Ingredient-8:</strong> ${meal.strIngredient8}</p>
        </div>  
    `
    container.appendChild(div)
}

const displayNoResults=()=>{
    const container = document.getElementById("userData-container")
    container.innerHTML = "<h4 class='text-center text-danger'>No result found.</h4>"
}

loadAllMeals()


