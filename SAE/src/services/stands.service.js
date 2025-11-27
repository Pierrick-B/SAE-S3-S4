import standsData from "@/datasource/stands.js";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

class StandsService {
  async getStands() {
    return { error: 0, data: clone(standsData) };
  }

  async getStandById(id) {
    const stands = await this.getStands();
    if (stands.error !== 0) {
      return stands;
    }
    const stand = stands.data.find(item => item.id === id) || null;
    if (!stand) {
      return { error: 1, message: "Stand introuvable" };
    }
    return { error: 0, data: stand };
  }
}

export default new StandsService();
