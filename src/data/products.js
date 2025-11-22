// src/data/products.js

export const products = [
  // PIZZAS
  { id: 1, name: 'Mozzarella Pizza', price: 15.99, category: 'Pizza', description: 'Classic hand-tossed dough with premium mozzarella.', imageUrl: 'https://via.placeholder.com/300x200?text=Mozzarella', inStock: true },
  { id: 2, name: 'Pepperoni Feast', price: 18.50, category: 'Pizza', description: 'Loaded with double pepperoni and extra cheese.', imageUrl: 'https://via.placeholder.com/300x200?text=Pepperoni', inStock: true },
  { id: 3, name: 'Veggie Supreme', price: 16.00, category: 'Pizza', description: 'Bell peppers, onions, mushrooms, and olives.', imageUrl: 'https://via.placeholder.com/300x200?text=Veggie+Pizza', inStock: true },
  { id: 4, name: 'BBQ Chicken Pizza', price: 19.00, category: 'Pizza', description: 'Grilled chicken with tangy BBQ sauce base.', imageUrl: 'https://via.placeholder.com/300x200?text=BBQ+Pizza', inStock: true },
  { id: 5, name: 'Hawaiian Delight', price: 17.50, category: 'Pizza', description: 'Ham and pineapple for the controversial lovers.', imageUrl: 'https://via.placeholder.com/300x200?text=Hawaiian', inStock: true },

  // BURGERS
  { id: 6, name: 'Double Cheeseburger', price: 9.50, category: 'Burger', description: 'Two juicy beef patties with melted cheddar.', imageUrl: 'https://via.placeholder.com/300x200?text=Dbl+Cheeseburger', inStock: true },
  { id: 7, name: 'Classic Beef Burger', price: 7.99, category: 'Burger', description: 'Standard quarter pounder with lettuce and tomato.', imageUrl: 'https://via.placeholder.com/300x200?text=Beef+Burger', inStock: true },
  { id: 8, name: 'Spicy Chicken Burger', price: 8.50, category: 'Burger', description: 'Crispy fried chicken with spicy mayo.', imageUrl: 'https://via.placeholder.com/300x200?text=Spicy+Chicken', inStock: true },
  { id: 9, name: 'Mushroom Swiss', price: 10.00, category: 'Burger', description: 'Sautéed mushrooms and swiss cheese on beef.', imageUrl: 'https://via.placeholder.com/300x200?text=Mushroom+Swiss', inStock: true },
  { id: 10, name: 'Bacon Smashburger', price: 11.50, category: 'Burger', description: 'Smashed patty with crispy bacon strips.', imageUrl: 'https://via.placeholder.com/300x200?text=Bacon+Smash', inStock: true },

  // DRINKS
  { id: 11, name: 'Matcha Latte', price: 5.50, category: 'Drinks', description: 'Ceremonial grade matcha with oat milk.', imageUrl: 'https://via.placeholder.com/300x200?text=Matcha', inStock: true },
  { id: 12, name: 'Iced Americano', price: 3.50, category: 'Drinks', description: 'Double shot espresso over ice and water.', imageUrl: 'https://via.placeholder.com/300x200?text=Americano', inStock: true },
  { id: 13, name: 'Strawberry Shake', price: 6.00, category: 'Drinks', description: 'Real strawberries blended with vanilla ice cream.', imageUrl: 'https://via.placeholder.com/300x200?text=Strawberry+Shake', inStock: true },
  { id: 14, name: 'Lemonade', price: 3.00, category: 'Drinks', description: 'Freshly squeezed lemons with a hint of mint.', imageUrl: 'https://via.placeholder.com/300x200?text=Lemonade', inStock: true },
  { id: 15, name: 'Caramel Macchiato', price: 5.00, category: 'Drinks', description: 'Espresso with vanilla syrup and caramel drizzle.', imageUrl: 'https://via.placeholder.com/300x200?text=Caramel+Macchiato', inStock: true },

  // NOODLES & RICE
  { id: 16, name: 'Spicy Beef Noodles', price: 12.00, category: 'Noodles', description: 'Hand-pulled noodles in spicy beef broth.', imageUrl: 'https://via.placeholder.com/300x200?text=Beef+Noodles', inStock: true },
  { id: 17, name: 'Chicken Pad Thai', price: 11.50, category: 'Noodles', description: 'Stir-fried rice noodles with peanuts and lime.', imageUrl: 'https://via.placeholder.com/300x200?text=Pad+Thai', inStock: true },
  { id: 18, name: 'Spaghetti Bolognese', price: 11.00, category: 'Noodles', description: 'Italian meat sauce served over spaghetti.', imageUrl: 'https://via.placeholder.com/300x200?text=Spaghetti', inStock: true },
  { id: 19, name: 'Kimchi Fried Rice', price: 9.00, category: 'Rice', description: 'Spicy fried rice with kimchi and fried egg.', imageUrl: 'https://via.placeholder.com/300x200?text=Kimchi+Rice', inStock: true },
  { id: 20, name: 'Sushi Platter', price: 22.00, category: 'Rice', description: 'Assorted nigiri and maki rolls.', imageUrl: 'https://via.placeholder.com/300x200?text=Sushi', inStock: false },

  // DESSERT
  { id: 21, name: 'Chocolate Lava Cake', price: 7.50, category: 'Dessert', description: 'Warm cake with a gooey chocolate center.', imageUrl: 'https://via.placeholder.com/300x200?text=Lava+Cake', inStock: true },
  { id: 22, name: 'Cheesecake Slice', price: 6.50, category: 'Dessert', description: 'Classic New York style cheesecake.', imageUrl: 'https://via.placeholder.com/300x200?text=Cheesecake', inStock: true },
  { id: 23, name: 'Tiramisu', price: 7.00, category: 'Dessert', description: 'Coffee-soaked ladyfingers with mascarpone.', imageUrl: 'https://via.placeholder.com/300x200?text=Tiramisu', inStock: true },
  { id: 24, name: 'Fruit Tart', price: 5.50, category: 'Dessert', description: 'Pastry shell filled with custard and fresh fruit.', imageUrl: 'https://via.placeholder.com/300x200?text=Fruit+Tart', inStock: true },
  { id: 25, name: 'Ice Cream Sundae', price: 4.50, category: 'Dessert', description: 'Vanilla scoops with chocolate sauce and nuts.', imageUrl: 'https://via.placeholder.com/300x200?text=Sundae', inStock: true },
];