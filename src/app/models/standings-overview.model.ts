import { StandingsDetails } from "./standings-details.model";

export class StandingsOverview {
  constructor() { }
  errors: {
    requests: "",
    access: ""
  };
  response: [
    {
      league: {
        id: number,
        name: string
        standings: [
          StandingsDetails[]
        ]
      }
    }
  ];
}

