// src/data/users.js

export const users = [
  {
    id: 1,
    name: "Admin User",
    username: "super_admin",
    email: "admin@foodie.com",
    password: "adminpassword", // In a real app, this would be encrypted!
    role: "System Administrator",
    memberSince: "11-23-2025",
    avatarUrl: "https://via.placeholder.com/150?text=Admin"
  },
  {
    id: 2,
    name: "Alex The Foodie",
    username: "alex_eats",
    email: "user@foodie.com",
    password: "password123",
    role: "Frontend Architect", // Occupation
    memberSince: "11-23-2025",
    avatarUrl: "https://via.placeholder.com/150?text=Alex"
  },
  {
    id: 3,
    name: "Ash Arcebuche",
    username: "ash_arce",
    email: "ash@test.com",
    password: "password123",
    role: "Food Critic",
    memberSince: "11-23-2025",
    avatarUrl: "https://via.placeholder.com/150?text=Sarah"
  }
];