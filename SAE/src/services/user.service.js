// SAE/src/services/user.service.js
import { users as initialUsers } from "@/datasource/data_users.js";

const LS_KEY = 'userDataV2'

let users = null;
let prestataireRequests = null;

function _clone(src) {
  return JSON.parse(JSON.stringify(src));
}

function _ensureRequests() {
  if (prestataireRequests === null) prestataireRequests = [];
}

function _load() {
  if (users) return users;
  // Attempt to load persisted data from localStorage
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(LS_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          users = parsed
          return users
        }
      }
    }
  } catch (e) {
    // ignore parsing errors and fall back to default
  }
  users = _clone(initialUsers || [])
  return users
}

function _save() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(LS_KEY, JSON.stringify(users || []))
    }
  } catch (e) {
    console.warn('Unable to save users to localStorage', e)
  }
}

class UserService {
  async getUserProfile(userId) {
    const data = _load();
    const user = data.find(u => Number(u.id) === Number(userId));
    if (!user) return { error: 1, message: 'User not found' };
    return { error: 0, data: _clone(user) };
  }

  async updateUserProfile(userId, updates) {
    const data = _load();
    const idx = data.findIndex(u => Number(u.id) === Number(userId));
    if (idx === -1) return { error: 1, message: 'User not found' };
    Object.assign(data[idx], updates);
    users = data;
    _save();
    return { error: 0, data: _clone(data[idx]) };
  }

  async createUser(payload) {
    const data = _load();
    // basic validation
    if (data.find(u => String(u.login || '').trim() === String(payload.login || '').trim())) {
      return { error: 2, message: 'Login already exists' };
    }
    if (data.find(u => String(u.email || '').trim() === String(payload.email || '').trim())) {
      return { error: 3, message: 'Email already exists' };
    }
    const maxId = data.reduce((m, u) => (Number(u.id) > m ? Number(u.id) : m), 0);
    const newUser = Object.assign({
      id: maxId + 1,
      name: payload.name || '',
      email: payload.email || '',
      login: payload.login || '',
      password: payload.password || '',
      role: payload.role || 'client',
      favorites: payload.favorites || [],
      registeredEvents: payload.registeredEvents || []
    }, payload);
    data.push(newUser);
    users = data;
    _save();
    return { error: 0, data: _clone(newUser) };
  }

  async findByLogin(login) {
    const data = _load();
    const user = data.find(u => String(u.login || '') === String(login || ''));
    if (!user) return { error: 1, message: 'User not found' };
    return { error: 0, data: _clone(user) };
  }

  async listPrestataires() {
    try {
      const data = _load() || [];
      const prest = data.filter(u => String(u.role || '').toLowerCase() === 'prestataire');
      return { error: 0, data: _clone(prest) };
    } catch (e) {
      return { error: 1, message: String(e) };
    }
  }

  async deleteUserById(userId) {
    try {
      const data = _load() || [];
      const id = Number(userId);
      const idx = data.findIndex(u => Number(u.id) === id);
      if (idx === -1) return { error: 1, message: 'User not found' };
      if (String(data[idx].role || '').toLowerCase() !== 'prestataire') {
        return { error: 1, message: 'Can only delete prestataires via this endpoint' };
      }
      const removed = data.splice(idx, 1)[0];
      users = data;
      _save();
      return { error: 0, data: _clone(removed) };
    } catch (e) {
      return { error: 1, message: String(e) };
    }
  }

  // Requests management (in-memory)
  async submitPrestataireRequest(userId, services, description) {
    try {
      _ensureRequests();
      const reqs = prestataireRequests;
      const maxId = reqs.reduce((m, r) => (Number(r.id) > m ? Number(r.id) : m), 0);
      const newReq = { id: maxId + 1, userId: Number(userId), services: Array.isArray(services) ? services.slice() : [], description: String(description || ''), status: 'pending', createdAt: new Date().toISOString() };
      reqs.push(_clone(newReq));
      prestataireRequests = reqs;
      return { error: 0, data: _clone(newReq) };
    } catch (e) {
      return { error: 1, message: String(e) };
    }
  }

  async listPrestataireRequests() {
    try {
      _ensureRequests();
      return { error: 0, data: _clone(prestataireRequests) };
    } catch (e) {
      return { error: 1, message: String(e) };
    }
  }

  async approvePrestataireRequest(requestId) {
    try {
      _ensureRequests();
      const idx = prestataireRequests.findIndex(r => Number(r.id) === Number(requestId));
      if (idx === -1) return { error: 1, message: 'Request not found' };
      const req = prestataireRequests[idx];
      const data = _load() || [];
      const userIndex = data.findIndex(u => Number(u.id) === Number(req.userId));
      if (userIndex === -1) return { error: 1, message: 'User not found' };
      data[userIndex].role = 'prestataire';
      users = data;
      _save();
      prestataireRequests.splice(idx, 1);
      return { error: 0, data: { user: _clone(data[userIndex]) } };
    } catch (e) {
      return { error: 1, message: String(e) };
    }
  }

  async rejectPrestataireRequest(requestId) {
    try {
      _ensureRequests();
      const idx = prestataireRequests.findIndex(r => Number(r.id) === Number(requestId));
      if (idx === -1) return { error: 1, message: 'Request not found' };
      const removed = prestataireRequests.splice(idx, 1)[0];
      return { error: 0, data: _clone(removed) };
    } catch (e) {
      return { error: 1, message: String(e) };
    }
  }

  async getRequestsForUser(userId) {
    try {
      _ensureRequests();
      const list = (prestataireRequests || []).filter(r => Number(r.userId) === Number(userId));
      return { error: 0, data: _clone(list) };
    } catch (e) {
      return { error: 1, message: String(e) };
    }
  }
}

export default new UserService();