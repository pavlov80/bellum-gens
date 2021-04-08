import { Component } from '@angular/core';
import {
  TournamentGroup,
  TournamentParticipant,
  EMPTY_NEW_GROUP,
  Tournament
} from '../../../../src-common/models/tournament';
import { ApiTournamentsService } from '../../../../src-common/services/bellumgens-api.tournaments.service';
import { environment } from '../../../../src-common/environments/environment';
import {
  IDropDroppedEventArgs,
  IRowDataEventArgs,
  IgxGridComponent,
  IgxDialogComponent
} from '@infragistics/igniteui-angular';
import { TournamentSC2Match, TournamentMatchMap } from '../../../../src-common/models/tournament-schedule';
import { SC2_MAPS, SC2LadderDescriptor } from '../../../../src-common/models/sc2maps';

@Component({
  selector: 'app-admin-sc2',
  templateUrl: './admin-sc2.component.html',
  styleUrls: ['./admin-sc2.component.scss']
})
export class AdminSc2Component {
  public registrations: TournamentParticipant [];
  public groups: TournamentGroup [];
  public matches: TournamentSC2Match [];
  public loading = false;
  public loadingMatches = false;
  public environment = environment;
  public newGroup = Object.assign({}, EMPTY_NEW_GROUP);
  public pipeTrigger = 0;
  public mapList: SC2LadderDescriptor [] = SC2_MAPS;
  public matchInEdit: TournamentSC2Match = { startTime: new Date() };
  public tournaments: Tournament [] = [];
  public selectedTournament: Tournament;

  constructor(private apiService: ApiTournamentsService) {
    this.apiService.tournaments.subscribe(t => this.tournaments = t);
  }

  public selectTournament(tournament: Tournament) {
    this.apiService.getSc2Registrations(tournament.id).subscribe(data => {
      if (data) {
        this.registrations = data;
      }
    });
    this.apiService.loadingSC2Registrations.subscribe(data => this.loading = data);
    this.apiService.getSC2Groups(tournament.id).subscribe(data => this.groups = data);
    this.apiService.loadingSC2Matches.subscribe(data => this.loadingMatches = data);
    this.apiService.getSc2Matches(tournament.id).subscribe(data => {
      if (data) {
        this.matches = data;
      }
    });
  }

  public submitGroup(group: TournamentGroup) {
    group.inEdit = false;
    group.tournamentId = this.selectedTournament.id;
    this.apiService.submitSC2Group(group).subscribe(data => {
      if (!this.groups.find(g => g.id === data.id)) {
        this.groups.push(data);
      }
    });
  }

  public deleteGroup(id: string) {
    const group = this.groups.find(g => g.id === id);
    this.apiService.deleteGroup(id).subscribe(() => this.groups.splice(this.groups.indexOf(group), 1));
    this.registrations.filter(r => r.tournamentSC2GroupId === id).forEach(r => r.tournamentSC2GroupId = null);
    this.pipeTrigger++;
  }

  public addToGroup(event: IDropDroppedEventArgs, group: TournamentGroup) {
    this.apiService.addParticipantToGroup(event.dragData, group.id).subscribe();
    if (!group.participants) {
      group.participants = [ event.dragData ];
    } else {
      group.participants.push(event.dragData);
    }
    event.dragData.TournamentSC2GroupId = group.id;
    this.pipeTrigger++;
  }

  public removeFromGroup(participant: TournamentParticipant, group: TournamentGroup) {
    this.apiService.removeParticipantFromGroup(participant.id).subscribe();
    group.participants.splice(group.participants.indexOf(participant), 1);
    this.registrations.find(r => r.id === participant.id).tournamentSC2GroupId = null;
    this.pipeTrigger++;
  }

  public submitMatch(grid: IgxGridComponent) {
    if (this.matchInEdit.player1Id && this.matchInEdit.player2Id) {
      this.apiService.submitSC2Match(this.matchInEdit).subscribe(data => {
        if (data) {
          if (!this.matchInEdit.id) {
            data.startTime = new Date(data.startTime);
            grid.addRow(data);
          }
        }
      });
    }
  }

  public deleteMatch(event: IRowDataEventArgs) {
    const match = event.data;
    this.apiService.deleteSC2Match(match).subscribe();
  }

  public addNewMatch() {
    this.matchInEdit = { startTime: new Date(), tournamentId: this.selectedTournament.id, maps: [] };
  }

  public editMatch(match: TournamentSC2Match, dialog: IgxDialogComponent) {
    if (!(match.startTime instanceof Date)) {
      match.startTime = new Date(match.startTime);
    }
    this.matchInEdit = match;
    dialog.open();
  }

  public deleteMatchMap(map: TournamentMatchMap, maps: TournamentMatchMap []) {
    this.apiService.deleteSC2MatchMap(map.id).subscribe(() => {
      maps.splice(maps.indexOf(map), 1);
    });
  }
}
