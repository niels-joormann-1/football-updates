import { Component, OnInit } from '@angular/core';
import { FixturesOverview } from '../models/fixtures-overview.model';
import { FootballService } from '../services/football.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html'
})
export class FixturesComponent implements OnInit {
  teamId: number;
  teamName: string;
  private fixturesSubscription = new Subscription();
  fixtures: FixturesOverview;
  leagueId: number;
  errors = [];

  constructor(private footballService: FootballService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.errors = [];

    this.route.queryParams.subscribe((queryParameters) => {
      if (queryParameters['leagueId']) {
        this.leagueId = queryParameters['leagueId'];
      }

      if (queryParameters['teamId']) {
        this.teamId = queryParameters['teamId'];
        this.footballService.getFixtures(this.teamId);
      }
    })

    this.fixturesSubscription = this.footballService.fixtures$.subscribe(fixtures => {
      if (fixtures.errors?.requests && !this.errors.find(e => e == fixtures.errors.requests)) {
        this.errors.push(fixtures.errors.requests);
      }

      if (fixtures.errors?.access && !this.errors.find(e => e == fixtures.errors.access)) {
        this.errors.push(fixtures.errors.access);
      }

      if (fixtures.response) {
        this.fixtures = fixtures;
        this.getTeamName();
      }
    })
  }

  getTeamName() {
    if (this.fixtures.response[0].teams.home.id == this.teamId) {
      this.teamName = this.fixtures.response[0].teams.home.name
    }
    else if (this.fixtures.response[0].teams.away.id == this.teamId) {
      this.teamName = this.fixtures.response[0].teams.away.name
    }
  }
}
