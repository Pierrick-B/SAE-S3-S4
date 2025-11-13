// SAE/src/services/user.service.js
import { users as initialUsers } from "@/datasource/data_users.js";

const LS_KEY = 'userDataV2';
let users = null;

function _clone(src) {
    return JSON.parse(JSON.stringify(src));
}

function _load() {
    if (users) return users;
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
        try {
            users = JSON.parse(raw);
            return users;
        } catch (e) {
        }
    }
    users = _clone(initialUsers);
    _save();
    return users;
}

function _save() {
    try {
        localStorage.setItem(LS_KEY, JSON.stringify(users));
    } catch (e) {
        console.error('Impossible de sauvegarder users dans localStorage', e);
    }
}

class UserService {
    async getUserProfile(userId) {
        const data = _load();
        const user = data.find(u => u.id == userId);
        if (!user) {
            return { error: 1, message: "User not found" };
        }
        return { error: 0, data: user };
    }

    async updateUserProfile(userId, updates) {
        const data = _load();
        const userIndex = data.findIndex(u => u.id == userId);
        if (userIndex === -1) {
            return { error: 1, message: "User not found" };
        }
        Object.assign(data[userIndex], updates);
        _save();
        return { error: 0, data: data[userIndex] };
    }
}

export default new UserService();