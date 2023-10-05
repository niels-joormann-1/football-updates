import { Component, OnInit } from '@angular/core';
import { FootballService } from './services/football.service';
import { Subscription } from 'rxjs';
import { StandingsDetails } from './models/standings-details.model';
import { FixturesOverview } from './models/fixtures-overview.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'football-updates';
}
