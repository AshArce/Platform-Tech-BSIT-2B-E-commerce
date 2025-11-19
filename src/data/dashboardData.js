// src/data/dashboardData.js

export const userProfile = {
  name: 'Alex The Foodie',
  email: 'alex.eats@example.com',
  memberSince: 'January 2024',
  avatarUrl: 'https://via.placeholder.com/150?text=Alex', // You can replace with a real image later
};

export const recentOrders = [
  {
    id: 'ORD-8821',
    date: '2025-11-18',
    total: 24.50,
    status: 'Delivered', // Status options: Delivered, Cancelled, Refunded
    items: ['Pepperoni Pizza (Large)', 'Coke Zero'],
  },
  {
    id: 'ORD-8822',
    date: '2025-11-18',
    total: 12.99,
    status: 'Cooking', // Status options: Pending, Cooking, On the Way
    items: ['Spicy Tuna Roll', 'Miso Soup'],
  },
  {
    id: 'ORD-8790',
    date: '2025-11-15',
    total: 8.50,
    status: 'Delivered',
    items: ['Brown Sugar Milk Tea'],
  },
];