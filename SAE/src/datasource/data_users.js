// SAE/src/datasource/data_users.js
const users = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        favorites: ["stand-3-1-a", "stand-3-2-b"], // Stand IDs
        registeredEvents: ["Activite 1", "Activite 5"] // Event names
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        favorites: ["stand-3-1-b"],
        registeredEvents: ["Activite 3", "Activite 9"]
    }
];

export { users };