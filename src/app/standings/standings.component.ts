import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StandingsDetails } from '../models/standings-details.model';
import { League } from '../models/league.model';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html'
})
export class StandingsComponent {

  @Input() league: League;
  @Input() standings: StandingsDetails[];
  @Output() selectedTeam = new EventEmitter<number>();

  selectTeam(teamId: number) {
    this.selectedTeam.emit(teamId);
  }
}
