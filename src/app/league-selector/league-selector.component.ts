import { Component, Input } from '@angular/core';
import { League } from '../models/league.model';

@Component({
  selector: 'app-league-selector',
  templateUrl: './league-selector.component.html'
})
export class LeagueSelectorComponent
{
  @Input() leagues: League[];
}
