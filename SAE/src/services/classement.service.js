import individualClassements from "@/datasource/classement_individuel_evenement.js";
import teamClassements from "@/datasource/classement_equipe_evenement.js";
import { usersPoints } from "@/datasource/classement_user.js";
import { users } from "@/datasource/data_users.js";
import stands from "@/datasource/stands.js";

function sumPoints(entries = []) {
  return entries.reduce((total, entry) => total + (entry?.points || 0), 0);
}

function findUserById(userId) {
  return users.find(user => user.id === userId) || null;
}

function getStandDetails(standIds = []) {
  const result = [];
  standIds.forEach(id => {
    const stand = stands.find(item => item.id === id);
    if (stand) {
      result.push(stand);
    }
  });
  return result;
}

function formatIndividualClassements() {
  return individualClassements.map(event => {
    const classement = event.classement.map(entry => ({
      ...entry,
      user: findUserById(entry.id_user)
    }));

    return {
      ...event,
      organisateursDetails: getStandDetails(event.organisateurs),
      classement
    };
  });
}

function formatTeamClassements() {
  return teamClassements.map(event => {
    const teams = event.teams.map(team => {
      const members = team.members_id
        .map(memberId => findUserById(memberId))
        .filter(Boolean);
      return { ...team, members };
    });

    const classement = event.classement.map(entry => {
      const team = teams.find(teamItem => teamItem.id_team === entry.id_team) || null;
      return { ...entry, team };
    });

    return {
      ...event,
      organisateursDetails: getStandDetails(event.organisateurs),
      teams,
      classement
    };
  });
}

function buildLeaderboard() {
  const rows = usersPoints.map(entry => {
    const standPoints = sumPoints(entry.points_by_stand);
    const activityPoints = sumPoints(entry.points_by_activity);
    const total = standPoints + activityPoints;

    return {
      id_user: entry.id_user,
      name: entry.name,
      standPoints,
      activityPoints,
      total,
      user: findUserById(entry.id_user)
    };
  });

  rows.sort((a, b) => b.total - a.total);

  return rows.map((entry, index) => ({
    ...entry,
    rank: index + 1
  }));
}

class ClassementService {
  async getIndividualClassements() {
    return formatIndividualClassements();
  }

  async getTeamClassements() {
    return formatTeamClassements();
  }

  async getLeaderboard() {
    return buildLeaderboard();
  }

  async getUserPoints() {
    return usersPoints;
  }
}

export default new ClassementService();
