// src/data/products.js

export const products = [
  {
    id: 1,
    name: 'Mozzarella Pizza',
    price: 15.99,
    description: 'Classic hand-tossed dough topped with premium mozzarella and fresh basil.',
    imageUrl: 'https://via.placeholder.com/300x200?text=Pizza', // Replace with real food image URL later
    inStock: true,
    calories: 1200, // Optional: Good for food apps
  },
  {
    id: 2,
    name: 'Double Cheeseburger',
    price: 9.50,
    description: 'Two juicy beef patties with melted cheddar, lettuce, tomato, and house sauce.',
    imageUrl: 'https://via.placeholder.com/300x200?text=Burger',
    inStock: true,
    calories: 850,
  },
  {
    id: 3,
    name: 'Matcha Latte',
    price: 5.50,
    description: 'Premium ceremonial grade matcha with oat milk and a hint of honey.',
    imageUrl: 'https://via.placeholder.com/300x200?text=Matcha',
    inStock: true,
    calories: 250,
  },
  {
    id: 4,
    name: 'Spicy Beef Noodles',
    price: 12.00,
    description: 'Hand-pulled noodles in a spicy broth with tender beef shank and bok choy.',
    imageUrl: 'https://via.placeholder.com/300x200?text=Noodles',
    inStock: false, // Sold out example
    calories: 900,
  },
  {
    id: 5,
    name: 'Spaghetti Bolognese',
    price: 11.00,
    description: 'Traditional Italian meat sauce served over al dente spaghetti.',
    imageUrl: 'https://via.placeholder.com/300x200?text=Spaghetti',
    inStock: true,
    calories: 700,
  },
];