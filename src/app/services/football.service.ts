import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { StandingsOverview } from '../models/standings-overview.model';
import { FixturesOverview } from '../models/fixtures-overview.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FootballService {

  constructor(private httpClient: HttpClient) { }
  private standings = new BehaviorSubject<StandingsOverview>(new StandingsOverview());
  public standings$ = this.standings.asObservable();

  private fixtures = new BehaviorSubject<FixturesOverview>(new FixturesOverview());
  public fixtures$ = this.fixtures.asObservable();

  getStandings(leagueId: number) {
    let storedStandings = localStorage.getItem(`standings-${leagueId}`)
    if (storedStandings != null) {
      this.standings.next(JSON.parse(storedStandings))
    }
    else {
      this.httpClient
        .get<StandingsOverview>(environment.standingsEndpoint, {
          params: {
            "league": leagueId,
            "season": environment.currentYear
          },
          headers: {
            "x-apisports-key": environment.apiKey
          }
        })
        .subscribe(result => {
          localStorage.setItem(`standings-${leagueId}`, JSON.stringify(result));
          this.standings.next(result);
        })
    }
  }

  getFixtures(teamId: number) {
    let storedFixtures = localStorage.getItem(`fixtures-${teamId}`);
    if (storedFixtures != null) {
      this.fixtures.next(JSON.parse(storedFixtures))
    }
    else {
      this.httpClient
        .get<FixturesOverview>(environment.fixturesEndpoint, {
          params: {
            "team": teamId,
            "last": environment.recentFixtures
          },
          headers: {
            "x-apisports-key": environment.apiKey
          }
        })
        .subscribe(result => {
          localStorage.setItem(`fixtures-${teamId}`, JSON.stringify(result))
          this.fixtures.next(result);
        })
    }
  }
}
