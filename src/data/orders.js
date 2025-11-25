// src/data/orders.js

export const orders = [
  // --- USER 2 (Alex - The Main Demo User) ---
  {
    id: 'ORD-1001',
    userId: 2,
    date: '11/25/2025',
    total: 41.49,
    status: 'Cooking', // Active
    items: [
      { name: 'Mozzarella Pizza', quantity: 1, price: 15.99 },
      { name: 'Double Cheeseburger', quantity: 2, price: 9.50 },
      { name: 'Coke Zero', quantity: 2, price: 3.25 }
    ]
  },
  {
    id: 'ORD-1002',
    userId: 2,
    date: '11/24/2025',
    total: 17.00,
    status: 'On the Way', // Active
    items: [
      { name: 'Spicy Beef Noodles', quantity: 1, price: 12.00 }
    ]
  },
  {
    id: 'ORD-1003',
    userId: 2,
    date: '11/22/2025',
    total: 14.50,
    status: 'Delivered',
    items: [
      { name: 'Matcha Latte', quantity: 2, price: 5.50 },
      { name: 'Cookie', quantity: 1, price: 3.50 }
    ]
  },
  {
    id: 'ORD-1004',
    userId: 2,
    date: '11/18/2025',
    total: 49.00,
    status: 'Refunded', // Test Refund
    items: [
      { name: 'Sushi Platter', quantity: 2, price: 22.00 }
    ]
  },
  {
    id: 'ORD-1005',
    userId: 2,
    date: '11/15/2025',
    total: 26.50,
    status: 'Delivered',
    items: [
      { name: 'Chicken Pad Thai', quantity: 1, price: 11.50 },
      { name: 'Iced Americano', quantity: 2, price: 3.50 },
      { name: 'Spring Rolls', quantity: 1, price: 8.00 }
    ]
  },
  {
    id: 'ORD-1006',
    userId: 2,
    date: '11/01/2025',
    total: 32.00,
    status: 'Cancelled',
    items: [
      { name: 'Mushroom Swiss', quantity: 2, price: 10.00 },
      { name: 'Fries', quantity: 2, price: 6.00 }
    ]
  },

  // --- USER 1 (Admin) ---
  {
    id: 'ORD-2001',
    userId: 1,
    date: '11/25/2025',
    total: 71.50,
    status: 'Cooking',
    items: [
      { name: 'Sushi Platter', quantity: 3, price: 22.00 },
      { name: 'Miso Soup', quantity: 3, price: 1.80 } // Small add-on
    ]
  },
  {
    id: 'ORD-2002',
    userId: 1,
    date: '11/23/2025',
    total: 23.00,
    status: 'Delivered',
    items: [
      { name: 'Bacon Smashburger', quantity: 2, price: 11.50 }
    ]
  },
  {
    id: 'ORD-2003',
    userId: 1,
    date: '11/21/2025',
    total: 19.00,
    status: 'Delivered',
    items: [
      { name: 'BBQ Chicken Pizza', quantity: 1, price: 19.00 }
    ]
  },
  {
    id: 'ORD-2004',
    userId: 1,
    date: '11/10/2025',
    total: 7.50,
    status: 'Returned',
    items: [
      { name: 'Chocolate Lava Cake', quantity: 1, price: 7.50 }
    ]
  },

  // --- OTHER USERS (Simulated Traffic) ---
  {
    id: 'ORD-3001',
    userId: 3,
    date: '11/24/2025',
    total: 31.98,
    status: 'Delivered',
    items: [
      { name: 'Mozzarella Pizza', quantity: 2, price: 15.99 }
    ]
  },
  {
    id: 'ORD-3002',
    userId: 4,
    date: '11/24/2025',
    total: 9.00,
    status: 'On the Way',
    items: [
      { name: 'Kimchi Fried Rice', quantity: 1, price: 9.00 }
    ]
  },
  {
    id: 'ORD-3003',
    userId: 5,
    date: '11/23/2025',
    total: 55.00,
    status: 'Delivered',
    items: [
      { name: 'Family Feast Bundle', quantity: 1, price: 55.00 }
    ]
  },
  {
    id: 'ORD-3004',
    userId: 3,
    date: '11/22/2025',
    total: 12.00,
    status: 'Cooking',
    items: [
      { name: 'Spicy Beef Noodles', quantity: 1, price: 12.00 }
    ]
  },
  {
    id: 'ORD-3005',
    userId: 4,
    date: '11/21/2025',
    total: 6.00,
    status: 'Delivered',
    items: [
      { name: 'Strawberry Shake', quantity: 1, price: 6.00 }
    ]
  },
  {
    id: 'ORD-3006',
    userId: 5,
    date: '11/20/2025',
    total: 16.50,
    status: 'Delivered',
    items: [
      { name: 'Fruit Tart', quantity: 3, price: 5.50 }
    ]
  },
  {
    id: 'ORD-3007',
    userId: 3,
    date: '11/19/2025',
    total: 22.50,
    status: 'Refunded',
    items: [
      { name: 'Cheesecake Slice', quantity: 2, price: 6.50 },
      { name: 'Tiramisu', quantity: 1, price: 7.00 },
      { name: 'Coffee', quantity: 1, price: 2.50 }
    ]
  },
  {
    id: 'ORD-3008',
    userId: 4,
    date: '11/18/2025',
    total: 11.00,
    status: 'Delivered',
    items: [
      { name: 'Spaghetti Bolognese', quantity: 1, price: 11.00 }
    ]
  },
  {
    id: 'ORD-3009',
    userId: 5,
    date: '11/17/2025',
    total: 35.00,
    status: 'Delivered',
    items: [
      { name: 'Hawaiian Delight', quantity: 2, price: 17.50 }
    ]
  },
  {
    id: 'ORD-3010',
    userId: 3,
    date: '11/16/2025',
    total: 7.00,
    status: 'Delivered',
    items: [
      { name: 'Iced Americano', quantity: 2, price: 3.50 }
    ]
  }
];