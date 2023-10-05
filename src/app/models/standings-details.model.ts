export class StandingsDetails {
  rank: number;
  team: {
    id: number;
    name: string;
    logo: string
  };
  points: number;
  goalsDiff: number;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number
    }
  }
}
