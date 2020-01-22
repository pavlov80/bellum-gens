import { CSGOTeam } from './csgoteam';
import { ApplicationUser } from './applicationuser';
import { CSGOMap } from './csgomaps';

export interface Tournament {
  ID?: string;
  Name: string;
  StartDate?: Date;
  EndDate?: Date;
}

export interface TournamentApplication {
  Id?: string;
  UserId?: string;
  CompanyId?: string;
  Game: Game;
  TeamId?: string;
  Email: string;
  BattleNetId?: string;
  Hash?: string;
  DateSubmitted?: Date;
  State?: TournamentApplicationState;
}

export interface TournamentRegistration {
  Id: string;
  UserId: string;
  State: TournamentApplicationState;
  User: ApplicationUser;
  Team: CSGOTeam;
  BattleTag: string;
  TournamentCSGOGroupId: string;
  TournamentSC2GroupId: string;
}

export interface TournamentGroup {
  Id?: string;
  Name: string;
  TournamentId?: string;
  Participants?: TournamentRegistration [];
  Matches?: any [];
  inEdit?: boolean;
}

export interface TournamentMatch {
  Id?: string;
  DemoLink?: string;
  VideoLink?: string;
  StartTime?: Date;
  EndTime?: Date;
}

export interface TournamentCSGOMatch extends TournamentMatch {
  TeamId1?: string;
  TeamId2?: string;
  Maps?: CSGOMap [];
  Team1?: CSGOTeam;
  Team2?: CSGOTeam;
}

export interface TournamentCSGOGroup extends TournamentGroup {
  Matches?: any [];
}

export interface TournamentSC2Group extends TournamentGroup {
  Matches?: any [];
}

export interface Company {
  Name: string;
  Website: string;
}

export interface RegistrationsCount {
  game: Game;
  count: number;
}

export enum Game {
  CSGO,
  StarCraft2
}

export enum TournamentApplicationState {
  Pending,
  Confirmed
}

export function getEmptyNewApplication(): TournamentApplication {
  return {
    Game: null,
    Email: ''
  };
}

export function getEmptyNewTournament(): Tournament {
  return { Name: null };
}

export function getEmptyNewCSGOGroup(): TournamentCSGOGroup {
  return { Name: null, inEdit: false };
}

export function getEmptyNewSC2Group(): TournamentCSGOGroup {
  return { Name: null, inEdit: false };
}

export const GAMES = [
  { name: 'Counter Strike: Global Offensive', id: Game.CSGO },
  { name: 'StarCraft II', id: Game.StarCraft2 }
];

export const WEEKLY_SCHEDULE = [
  { name: 'Седмица 1', start: new Date(2020, 0, 27), end: new Date(2020, 0, 30),
    days: [
      {
        day: new Date(2020, 0, 27),
        slots: [
          { start: new Date(2020, 0, 27, 19, 30, 0), match: null },
          { start: new Date(2020, 0, 27, 21, 30, 0), match: null },
        ]
      },
      {
        day: new Date(2020, 0, 28),
        slots: [
          { start: new Date(2020, 0, 28, 19, 30, 0), match: null },
          { start: new Date(2020, 0, 28, 21, 30, 0), match: null }
        ]
      },
      {
        day: new Date(2020, 0, 29),
        slots: [
          { start: new Date(2020, 0, 29, 19, 30, 0), match: null },
          { start: new Date(2020, 0, 29, 21, 30, 0), match: null }
        ]
      },
      {
        day: new Date(2020, 0, 30),
        slots: [
          { start: new Date(2020, 0, 30, 19, 30, 0), match: null },
          { start: new Date(2020, 0, 30, 21, 30, 0), match: null }
        ]
      }
    ]
  },
  { name: 'Седмица 2', start: new Date(2020, 1, 3), end: new Date(2020, 1, 6),
    days: [
      {
        day: new Date(2020, 1, 3),
        slots: [
          { start: new Date(2020, 1, 3, 19, 30, 0), match: null },
          { start: new Date(2020, 1, 3, 21, 30, 0), match: null },
        ]
      },
      {
        day: new Date(2020, 1, 4),
        slots: [
          { start: new Date(2020, 1, 4, 19, 30, 0), match: null },
          { start: new Date(2020, 1, 4, 21, 30, 0), match: null }
        ]
      },
      {
        day: new Date(2020, 1, 5),
        slots: [
          { start: new Date(2020, 1, 5, 19, 30, 0), match: null },
          { start: new Date(2020, 1, 5, 21, 30, 0), match: null }
        ]
      },
      {
        day: new Date(2020, 1, 6),
        slots: [
          { start: new Date(2020, 1, 6, 19, 30, 0), match: null },
          { start: new Date(2020, 1, 6, 21, 30, 0), match: null }
        ]
      }
    ]
  },
  { name: 'Седмица 3', start: new Date(2020, 1, 10), end: new Date(2020, 1, 13),
    days: [
      {
        day: new Date(2020, 1, 10),
        slots: [
          { start: new Date(2020, 1, 10, 19, 30, 0), match: null },
          { start: new Date(2020, 1, 10, 21, 30, 0), match: null },
        ]
      },
      {
        day: new Date(2020, 1, 11),
        slots: [
          { start: new Date(2020, 1, 11, 19, 30, 0), match: null },
          { start: new Date(2020, 1, 11, 21, 30, 0), match: null }
        ]
      },
      {
        day: new Date(2020, 1, 12),
        slots: [
          { start: new Date(2020, 1, 12, 19, 30, 0), match: null },
          { start: new Date(2020, 1, 12, 21, 30, 0), match: null }
        ]
      },
      {
        day: new Date(2020, 1, 13),
        slots: [
          { start: new Date(2020, 1, 13, 19, 30, 0), match: null },
          { start: new Date(2020, 1, 13, 21, 30, 0), match: null }
        ]
      }
    ]
  },
  { name: 'Седмица 4', start: new Date(2020, 1, 17), end: new Date(2020, 1, 20),
    days: [
      {
        day: new Date(2020, 1, 17),
        slots: [
          { start: new Date(2020, 1, 17, 19, 30, 0), match: null },
          { start: new Date(2020, 1, 17, 21, 30, 0), match: null },
        ]
      },
      {
        day: new Date(2020, 1, 18),
        slots: [
          { start: new Date(2020, 1, 18, 19, 30, 0), match: null },
          { start: new Date(2020, 1, 18, 21, 30, 0), match: null }
        ]
      },
      {
        day: new Date(2020, 1, 19),
        slots: [
          { start: new Date(2020, 1, 19, 19, 30, 0), match: null },
          { start: new Date(2020, 1, 19, 21, 30, 0), match: null }
        ]
      },
      {
        day: new Date(2020, 1, 20),
        slots: [
          { start: new Date(2020, 1, 20, 19, 30, 0), match: null },
          { start: new Date(2020, 1, 20, 21, 30, 0), match: null }
        ]
      }
    ]
  },
  { name: 'Седмица 5', start: new Date(2020, 1, 24), end: new Date(2020, 1, 27),
    days: [
      {
        day: new Date(2020, 1, 24),
        slots: [
          { start: new Date(2020, 1, 24, 19, 30, 0), match: null },
          { start: new Date(2020, 1, 24, 21, 30, 0), match: null },
        ]
      },
      {
        day: new Date(2020, 1, 25),
        slots: [
          { start: new Date(2020, 1, 25, 19, 30, 0), match: null },
          { start: new Date(2020, 1, 25, 21, 30, 0), match: null }
        ]
      },
      {
        day: new Date(2020, 1, 26),
        slots: [
          { start: new Date(2020, 1, 26, 19, 30, 0), match: null },
          { start: new Date(2020, 1, 26, 21, 30, 0), match: null }
        ]
      },
      {
        day: new Date(2020, 1, 27),
        slots: [
          { start: new Date(2020, 1, 27, 19, 30, 0), match: null },
          { start: new Date(2020, 1, 27, 21, 30, 0), match: null }
        ]
      }
    ]
  }
];
