import React from 'react';

function Result({ result }) {
  return (
    <div>
   {result && (
  <div className="mt-12 space-y-6 bg-blue-50 dark:bg-gray-700 p-6 sm:p-8 md:p-10 rounded-lg animate-slideUp">
    {/* Heading */}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 tracking-tight leading-tight">
      Your Personalized Health Plan
    </h2>

    {/* Grid for BMI, BMR, TDEE, and Daily Calorie Intake */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] animate-scaleIn">
        <p className="font-bold text-gray-700 dark:text-gray-200 text-lg   mb-2">
          Body Mass Index:
        </p>
        <p className="text-2xl md:text-3xl font-bold dark:text-white">
          {result.bmi}{" "}
          <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
            ({result.category})
          </span>
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] animate-scaleIn">
        <p className="font-bold text-gray-700 dark:text-gray-200 text-lg tracking-tight  mb-2">
          Base Metabolic Rate:
        </p>
        <p className="text-2xl md:text-3xl font-bold dark:text-white tracking-tight ">
          {result.bmr.toFixed(2)}{" "}
          <span className="text-sm font-medium">calories/day at rest</span>
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] animate-scaleIn">
        <p className="font-bold text-gray-700 dark:text-gray-200 text-lg tracking-tight  mb-2">
          Daily Energy Expenditure:
        </p>
        <p className="text-2xl md:text-3xl font-bold dark:text-white tracking-tight">
          {result.tdee}{" "}
          <span className="text-sm font-medium">calories/day with activity</span>
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] animate-scaleIn">
        <p className="font-bold text-gray-700 dark:text-gray-200 text-lg tracking-tight  mb-2">
          Recommended Daily Intake:
        </p>
        <p className="text-2xl md:text-3xl font-bold dark:text-white tracking-tight">
          {result.dailyCalorieNeed}{" "}
          <span className="text-sm font-medium">calories/day to reach goal</span>
        </p>
      </div>
    </div>

    {/* Health Plan Recommendation */}
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] animate-scaleIn">
      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 leading-tight">
        {result.recommendation}
      </p>
      <p className="text-xl text-gray-700 dark:text-gray-200 mb-2 font-medium">
        {result.calorieMessage}
      </p>
      <p className="text-xl text-gray-700 dark:text-gray-200 font-medium">
        Expected Progress:{" "}
        <span className="font-bold">{result.dailyWeightChange}</span>
      </p>
    </div>

    {/* Meal Suggestions */}
    {result.mealSuggestions && result.mealSuggestions.length > 0 && (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6 animate-scaleIn">
        <h3 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6 tracking-tight">
          Recommended Meals for Your Goals
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.mealSuggestions.map((meal, index) => (
            <div
              key={meal.id}
              className="border dark:border-gray-600 p-2 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] animate-scaleIn"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <img
                src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.${meal.imageType}`}
                alt={`Healthy recipe for ${meal.title}`}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h4 className="font-bold text-xl mb-2 dark:text-white tracking-tight">
                {meal.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-3 font-medium">
                Preparation time: {meal.readyInMinutes} minutes
              </p>
              <a
                href={meal.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline inline-block font-semibold transition-transform duration-300 hover:translate-x-1"
                aria-label={`View full recipe for ${meal.title}`}
              >
                See Full Recipe
              </a>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)}

    </div>
  );
}

export default Result;

