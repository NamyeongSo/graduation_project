import { readFileSync } from 'fs';

let challenges = {};
try {
    const data = readFileSync('tasks/team_challenges.json', 'utf8');
    challenges = JSON.parse(data);
} catch (err) {
    console.error('Failed to load team challenges:', err);
}

class TeamGoalManager {
    constructor() {
        this.reset();
    }

    reset() {
        this.currentId = null;
        this.startTime = null;
        this.agents = [];
        this.completed = new Set();
    }

    getChallenge(id) {
        return challenges[id];
    }

    start(id, agents) {
        this.reset();
        this.currentId = id;
        this.startTime = Date.now();
        this.agents = [...agents];
    }

    markComplete(agentName) {
        if (!this.currentId)
            return null;
        const elapsed = Date.now() - this.startTime;
        this.reset();
        return elapsed;
    }

    isActive() {
        return this.currentId !== null;
    }
}

export const teamGoalManager = new TeamGoalManager();
