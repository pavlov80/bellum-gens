import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxListComponent } from 'igniteui-angular';
import { CSGOTeam, TeamSearch } from 'src/app/models/csgoteam';
import { BellumgensApiService } from 'src/app/services/bellumgens-api.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  public csgoTeams: CSGOTeam [];
  public loading = true;

  constructor(private apiManager: BellumgensApiService) {
  }

  ngOnInit() {
    this.apiManager.loadingTeams.subscribe(loading => this.loading = loading);
    this.apiManager.csgoTeams.subscribe(data => {
      this.csgoTeams = data;
    });
  }
}
