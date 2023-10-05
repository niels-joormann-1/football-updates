import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FootballService } from '../services/football.service';
import { StandingsDetails } from '../models/standings-details.model';
import { League } from '../models/league.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent {
  constructor(private footballService: FootballService, private route: ActivatedRoute) {
  }

  private standingsSubscription = new Subscription();
  standingsDetails: StandingsDetails[];
  selectedLeague: League;
  leagues: League[];
  errors = [];

  ngOnInit(): void {
    this.errors = [];

    this.leagues = this.getLeagues();

    this.route.queryParams.subscribe((queryParameters) => {
      this.selectedLeague = this.getLeagues().find(l => l.id == queryParameters['leagueId']);
      if (this.selectedLeague) {
        this.footballService.getStandings(this.selectedLeague.id);
      }
    });

    this.standingsSubscription = this.footballService.standings$.subscribe(s => {
      if (s.errors?.requests && !this.errors.find(e => e == s.errors.requests)) {
        this.errors.push(s.errors.requests);
      }

      if (s.errors?.access && !this.errors.find(e => e == s.errors.access)) {
        this.errors.push(s.errors.access);
      }

      if (s.response) {
        this.standingsDetails = s.response[0]?.league.standings[0];
      }
    });
  }

  getLeagues(): League[] {
    let leagues =
      [
        new League("England", "Premier League", 39),
        new League("Spain", "La Liga", 140),
        new League("Germany", "Bundesliga", 78),
        new League("France", "Ligue 1", 61),
        new League("Italy", "Serie A", 135)
      ]
    return leagues;
  }
}
