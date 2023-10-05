export class FixturesOverview {
  constructor() {
  }
  errors: {
    requests: "",
    access: ""
  };
  response: [
    {
      league: {
        id: number
      },
      teams: {
        home: {
          id: number,
          name: string,
          logo: string,
          winner: boolean
        },
        away:
        {
          id: number,
          name: string,
          logo: string,
          winner: boolean
        }
      },
      goals: {
        home: number,
        away: number
      }
    }
  ]
}
