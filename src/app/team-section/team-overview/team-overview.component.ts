import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationUser } from '../../models/applicationuser';
import { CSGOTeam, TeamApplication, TEAM_PLACEHOLDER } from '../../models/csgoteam';
import { BellumgensApiService } from '../../services/bellumgens-api.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.css']
})
export class TeamOverviewComponent implements OnInit {
  authUser: ApplicationUser;
  team: CSGOTeam = TEAM_PLACEHOLDER;
  notifications: TeamApplication [];

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: BellumgensApiService,
              private authManager: LoginService) {
    this.authManager.applicationUser.subscribe((data: ApplicationUser) => {
      this.authUser = data;
    });

    this.activatedRoute.params.subscribe(params => {
      const teamId = params['teamid'];

      if (teamId !== '0') {
        this.apiService.getTeam(teamId).subscribe(team => {
          this.team = team;
        });
        this.apiService.teamApplications(teamId).subscribe(data => {
          this.notifications = data;
        });
      }
    });
  }

  public get userIsMember() {
    if (this.authUser && this.team && this.team.Members) {
      return this.team.Members.filter(m => m.UserId === this.authUser.SteamUser.steamID64).length;
    }
    return false;
  }

  public get userIsAdmin() {
    if (this.authUser && this.team && this.team.Members) {
      return this.team.Members.filter(m => m.IsAdmin && m.UserId === this.authUser.SteamUser.steamID64).length;
    }
    return false;
  }

  ngOnInit() {
  }

}
