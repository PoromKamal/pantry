
const foodItems = [
  { name: "Apple", quantity: 5, price: 1.99, expiration_date: "2024-05-01" },
  { name: "Banana", quantity: 3, price: 0.75, expiration_date: "2024-04-30" },
  { name: "Milk", quantity: 1, price: 2.49, expiration_date: "2024-05-03" },
  { name: "Bread", quantity: 2, price: 3.25, expiration_date: "2024-04-29" },
  { name: "Eggs", quantity: 12, price: 1.99, expiration_date: "2024-05-02" },
  { name: "Cheese", quantity: 1, price: 4.99, expiration_date: "2024-05-05" },
  { name: "Orange", quantity: 6, price: 0.50, expiration_date: "2024-05-01" },
  { name: "Yogurt", quantity: 3, price: 1.25, expiration_date: "2024-05-04" },
  { name: "Potato", quantity: 10, price: 0.30, expiration_date: "2024-05-10" },
  { name: "Chicken", quantity: 2, price: 6.99, expiration_date: "2024-04-28" },
  { name: "Rice", quantity: 1, price: 2.99, expiration_date: "2024-12-31" },
  { name: "Tomato", quantity: 4, price: 0.75, expiration_date: "2024-05-01" },
  { name: "Pasta", quantity: 1, price: 1.49, expiration_date: "2024-12-31" },
  { name: "Carrot", quantity: 8, price: 0.25, expiration_date: "2024-05-07" },
  { name: "Salmon", quantity: 2, price: 8.99, expiration_date: "2024-04-29" },
  { name: "Broccoli", quantity: 3, price: 1.50, expiration_date: "2024-05-02" },
  { name: "Cucumber", quantity: 2, price: 0.75, expiration_date: "2024-05-01" },
  { name: "Ground beef", quantity: 1, price: 5.99, expiration_date: "2024-04-30" },
  { name: "Lettuce", quantity: 1, price: 1.00, expiration_date: "2024-04-30" },
  { name: "Onion", quantity: 3, price: 0.50, expiration_date: "2024-05-05" },
  { name: "Bell pepper", quantity: 2, price: 0.75, expiration_date: "2024-05-03" },
  { name: "Ice cream", quantity: 1, price: 3.99, expiration_date: "2024-05-15" },
  { name: "Lemon", quantity: 2, price: 0.50, expiration_date: "2024-05-01" },
  { name: "Cereal", quantity: 1, price: 3.49, expiration_date: "2024-12-31" },
  { name: "Watermelon", quantity: 1, price: 5.99, expiration_date: "2024-05-10" },
  { name: "Grapes", quantity: 1, price: 2.99, expiration_date: "2024-05-03" },
  { name: "Avocado", quantity: 2, price: 1.99, expiration_date: "2024-05-06" },
  { name: "Spinach", quantity: 1, price: 1.25, expiration_date: "2024-05-04" },
  { name: "Pineapple", quantity: 1, price: 2.99, expiration_date: "2024-05-08" },
  { name: "Strawberry", quantity: 1, price: 3.99, expiration_date: "2024-05-05" },
];

const recipeItems = [
  { user_id: 1, url: "testUrl", image_small: "testUrl", image_large: "testUrl", name: "Apple Pie", calories: 350, fat: 15.2, protein: 3.5, carbs: 50.6 },
  { user_id: 1, url: "testUrl", image_small: "testUrl", image_large: "testUrl", name: "Banana Smoothie", calories: 180, fat: 2.1, protein: 5.8, carbs: 35.2 },
  { user_id: 1, url: "testUrl", image_small: "testUrl", image_large: "testUrl", name: "Cheese Omelette", calories: 320, fat: 22.5, protein: 18.9, carbs: 7.3 },
  { user_id: 1, url: "testUrl", image_small: "testUrl", image_large: "testUrl", name: "Chicken Salad", calories: 280, fat: 12.8, protein: 24.5, carbs: 18.3 },
  { user_id: 1, url: "testUrl", image_small: "testUrl", image_large: "testUrl", name: "Pasta Primavera", calories: 410, fat: 16.4, protein: 12.9, carbs: 57.8 },
  { user_id: 1, url: "testUrl", image_small: "testUrl", image_large: "testUrl", name: "Grilled Salmon", calories: 290, fat: 17.6, protein: 29.3, carbs: 3.9 },
  { user_id: 1, url: "testUrl", image_small: "testUrl", image_large: "testUrl", name: "Vegetable Stir-fry", calories: 230, fat: 11.3, protein: 6.7, carbs: 28.9 },
  { user_id: 1, url: "testUrl", image_small: "testUrl", image_large: "testUrl", name: "Spinach Salad", calories: 180, fat: 8.2, protein: 5.6, carbs: 20.4 },
  { user_id: 1, url: "testUrl", image_small: "testUrl", image_large: "testUrl", name: "Fruit Salad", calories: 120, fat: 0.9, protein: 1.5, carbs: 30.8 },
  { user_id: 1, url: "testUrl", image_small: "testUrl", image_large: "testUrl", name: "Avocado Toast", calories: 220, fat: 15.0, protein: 4.3, carbs: 20.1 }
];

module.exports = {foodItems, recipeItems};