import { Component } from '@angular/core';
import { BaseComponent } from '../../../../src-bellumgens/app/base/base.component';
import { ApplicationUser } from '../../../../src-common/models/applicationuser';
import { ApiTournamentsService } from '../../../../src-common/services/bellumgens-api.tournaments.service';
import { LoginService } from '../../../../src-common/services/login.service';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TournamentParticipant, TournamentGroup } from '../../../../src-common/models/tournament';
import { environment } from '../../../../src-common/environments/environment';
import { DataType, FilteringExpressionsTree, FilteringLogic, GridSelectionMode, IgxDateFilteringOperand } from '@infragistics/igniteui-angular';
import { TournamentSC2Match } from '../../../../src-common/models/tournament-schedule';

@Component({
  selector: 'app-tournament-sc2',
  templateUrl: './tournament-sc2.component.html',
  styleUrls: ['./tournament-sc2.component.scss']
})
export class TournamentSc2Component extends BaseComponent {
  public registrations: TournamentParticipant [];
  public groups: TournamentGroup [];
  public loading = false;
  public loadingMatches = false;
  public authUser: ApplicationUser;
  public tournamentId: string;
  public environment = environment;
  public gridDataType = DataType;
  public selectionMode = GridSelectionMode;
  public sc2matches: TournamentSC2Match [];
  public initialFilter: FilteringExpressionsTree;

  constructor(private apiService: ApiTournamentsService,
              private loginService: LoginService,
              title: Title,
              meta: Meta,
              route: ActivatedRoute) {
    super(title, meta, route);
    this.subs.push(
      this.activeRoute.params.subscribe(params => {
        this.tournamentId = params['tournamentid'];
      }),
      this.apiService.sc2Registrations.subscribe(data => this.registrations = data),
      this.apiService.loadingSC2Registrations.subscribe(data => this.loading = data),
      this.loginService.applicationUser.subscribe(user => this.authUser = user),
      this.apiService.loadingSC2Matches.subscribe(data => this.loadingMatches = data),
      this.apiService.sc2Matches.subscribe(data => {
        if (data) {
          data.forEach(item => item.startTime = new Date(item.startTime));
          this.sc2matches = data;
        }
      })
    );
    this.apiService.getSC2Groups().subscribe(data => this.groups = data);

    const gridFilteringExpressionsTree = new FilteringExpressionsTree(FilteringLogic.And);
    const productFilteringExpressionsTree = new FilteringExpressionsTree(FilteringLogic.And, 'startTime');
    const productExpression = {
        condition: IgxDateFilteringOperand.instance().condition('after'),
        fieldName: 'startTime',
        searchVal: new Date(2020, 10, 6)
    };
    productFilteringExpressionsTree.filteringOperands.push(productExpression);
    gridFilteringExpressionsTree.filteringOperands.push(productFilteringExpressionsTree);
    this.initialFilter = gridFilteringExpressionsTree;
  }

}
