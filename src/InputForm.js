import React, { useState} from 'react';

function InputForm({ setResult }) {
  
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    activityLevel: 'sedentary',
    targetWeightChange: '',
    goalType: 'gain', // 'gain' or 'loss'
    timeframe: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Convert height to meters
  const heightMeters = formData.height / 100;

  // Calculate BMI
  const bmi = (formData.weight / (heightMeters ** 2)).toFixed(2);

  // Determine BMI category
  let category = '';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi >= 18.5 && bmi <= 24.9) category = 'Normal';
  else if (bmi >= 25 && bmi <= 29.9) category = 'Overweight';
  else category = 'Obese';

  // Calculate BMR
  const bmr =
    formData.gender === 'female'
      ? 10 * formData.weight + 6.25 * formData.height - 5 * formData.age - 161
      : 10 * formData.weight + 6.25 * formData.height - 5 * formData.age + 5;

  // Adjust BMR for activity level
  const activityMultiplier = {
    sedentary: 1.2,
    lightlyActive: 1.375,
    moderatelyActive: 1.55,
    veryActive: 1.725,
  };

  // Calculate TDEE
  const tdee = (bmr * activityMultiplier[formData.activityLevel]).toFixed(2);

  // Calculate daily calorie adjustment
  const weightDifference =
    formData.goalType === 'gain'
      ? parseFloat(formData.targetWeightChange)
      : -parseFloat(formData.targetWeightChange);

  const totalCaloriesRequired = 7700 * weightDifference; // 7700 kcal = 1 kg
  const dailyCalorieAdjustment = (totalCaloriesRequired / formData.timeframe).toFixed(3);

  // Calculate daily weight change
  const dailyWeightChange = (dailyCalorieAdjustment / 7700).toFixed(3);

  // Calculate daily calorie need
  const dailyCalorieNeed = (parseFloat(dailyCalorieAdjustment) + parseFloat(tdee)).toFixed(3);

  // Provide recommendation and calorie message
  const recommendation = `You need to ${
    weightDifference > 0 ? 'gain' : 'lose'
  } ${Math.abs(weightDifference)} kg in ${formData.timeframe} days.`;

  const calorieMessage = `You should ${
    parseFloat(dailyCalorieAdjustment) > 0 ? 'increase' : 'decrease'
  } your daily calorie intake by ${Math.abs(parseFloat(dailyCalorieAdjustment))} kcal.`;

  // Fetch meal suggestions based on TDEE
  let mealSuggestions = [];
  try {
    const response = await fetch(
      `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${dailyCalorieNeed}&apiKey=1af0711e3075429cb1ce87f71878a6ca`
    );
    const data = await response.json();
    mealSuggestions = data.meals || [];
  } catch (error) {
    console.error('Error fetching meal suggestions:', error);
  }

  // Set the result state
  setResult({
    bmi,
    bmr,
    category,
    tdee,
    dailyCalorieAdjustment,
    weightDifference,
    dailyCalorieNeed,
    recommendation,
    calorieMessage,
    dailyWeightChange: dailyWeightChange > 0
      ? `Gain ${dailyWeightChange} kg/day`
      : `Lose ${Math.abs(dailyWeightChange)} kg/day`,
    mealSuggestions,
  });
};

  


  return (
    <form onSubmit={handleSubmit} className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="animate-scaleIn">
        <label
          className="block text-gray-700 dark:text-gray-200 mb-2 font-medium"
          htmlFor="weight"
        >
          Weight (kg)
        </label>
        <input
          id="weight"
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          className="w-full p-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-[1.02]"
          required
          aria-required="true"
        />
      </div>
      <div className="animate-scaleIn" style={{ animationDelay: "0.1s" }}>
        <label
          className="block text-gray-700 dark:text-gray-200 mb-2 font-medium"
          htmlFor="height"
        >
          Height (cm)
        </label>
        <input
          id="height"
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          className="w-full p-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-[1.02]"
          required
          aria-required="true"
        />
      </div>
      <div className="animate-scaleIn" style={{ animationDelay: "0.2s" }}>
        <label
          className="block text-gray-700 dark:text-gray-200 mb-2 font-medium"
          htmlFor="age"
        >
          Age
        </label>
        <input
          id="age"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-[1.02]"
          required
          aria-required="true"
        />
      </div>
      <div className="animate-scaleIn" style={{ animationDelay: "0.3s" }}>
        <label
          className="block text-gray-700 dark:text-gray-200 mb-2 font-medium"
          htmlFor="gender"
        >
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-[1.02]"
          aria-label="Select gender"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="animate-scaleIn" style={{ animationDelay: "0.4s" }}>
        <label
          className="block text-gray-700 dark:text-gray-200 mb-2 font-medium"
          htmlFor="activityLevel"
        >
          Activity Level
        </label>
        <select
          id="activityLevel"
          name="activityLevel"
          value={formData.activityLevel}
          onChange={handleChange}
          className="w-full p-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-[1.02]"
          aria-label="Select activity level"
        >
          <option value="sedentary">Sedentary</option>
          <option value="lightlyActive">Lightly Active</option>
          <option value="moderatelyActive">Moderately Active</option>
          <option value="veryActive">Very Active</option>
        </select>
      </div>
      <div className="animate-scaleIn" style={{ animationDelay: "0.5s" }}>
        <label
          className="block text-gray-700 dark:text-gray-200 mb-2 font-medium"
          htmlFor="goalType"
        >
          Goal
        </label>
        <select
          id="goalType"
          name="goalType"
          value={formData.goalType}
          onChange={handleChange}
          className="w-full p-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-[1.02]"
          aria-label="Select goal type"
        >
          <option value="lose">Lose Weight</option>
          <option value="gain">Gain Weight</option>
        </select>
      </div>
      <div className="animate-scaleIn" style={{ animationDelay: "0.6s" }}>
        <label
          className="block text-gray-700 dark:text-gray-200 mb-2 font-medium"
          htmlFor="targetWeightChange"
        >
          Target Weight Change (kg)
        </label>
        <input
          id="targetWeightChange"
          type="number"
          name="targetWeightChange"
          value={formData.targetWeightChange}
          onChange={handleChange}
          className="w-full p-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-[1.02]"
          required
          aria-required="true"
        />
      </div>
      <div className="animate-scaleIn" style={{ animationDelay: "0.7s" }}>
        <label
          className="block text-gray-700 dark:text-gray-200 mb-2 font-medium"
          htmlFor="timeframe"
        >
          Timeframe (days)
        </label>
        <input
          id="timeframe"
          type="number"
          name="timeframe"
          value={formData.timeframe}
          onChange={handleChange}
          className="w-full p-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-[1.02]"
          required
          aria-required="true"
        />
      </div>
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl font-medium text-lg shadow-md"
      aria-label="Calculate results"
    >
      Get Your Personalized Plan
    </button>
  </form>
  );
}

export default InputForm;
