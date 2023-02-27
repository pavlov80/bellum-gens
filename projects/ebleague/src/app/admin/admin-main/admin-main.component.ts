import { Component } from '@angular/core';
import {
  LoginService,
  ApiTournamentsService,
  Tournament, EMPTY_NEW_TOURNAMENT, TournamentApplication,
  JerseyOrder, Promo,
  ApiShopService
} from '../../../../../common/src/public_api';
import { IGridEditEventArgs, IGroupingExpression, SortingDirection, DefaultSortingStrategy, RowType, IgxGridModule, IgxGridToolbarModule, IgxGridColumnModule, IgxIconModule, IgxBadgeModule, IgxActionStripModule, IgxButtonModule, IgxRippleModule, IgxPaginatorModule, IgxInputGroupModule, IgxSuffixModule, IgxDatePickerModule, IgxCheckboxModule, IgxChipsModule } from '@infragistics/igniteui-angular';
import { SizeNamePipe } from '../../pipes/size-name.pipe';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-admin-main',
    templateUrl: './admin-main.component.html',
    styleUrls: ['./admin-main.component.scss'],
    standalone: true,
    imports: [IgxGridModule, IgxGridToolbarModule, IgxGridColumnModule, IgxIconModule, NgIf, IgxBadgeModule, IgxActionStripModule, IgxButtonModule, IgxRippleModule, IgxPaginatorModule, NgFor, FormsModule, IgxInputGroupModule, IgxSuffixModule, IgxDatePickerModule, IgxCheckboxModule, IgxChipsModule, SizeNamePipe]
})
export class AdminMainComponent {
  public roles: string [];
  // public users: AdminAppUserSummary [];
  public tournaments: Tournament [];
  public tournament = Object.assign({}, EMPTY_NEW_TOURNAMENT);
  public orders: JerseyOrder [];
  public registrations: TournamentApplication [];
  public promos: Promo [];
  public grouping: IGroupingExpression [];

  constructor(private authService: LoginService,
              private apiService: ApiTournamentsService,
              private shopService: ApiShopService) {
    this.authService.getUserRoles().subscribe(data => this.roles = data);
    // this.authService.getUsers().subscribe(data => this.users = data);
    this.authService.getPromoCodes().subscribe(data => this.promos = data);
    this.apiService.tournaments.subscribe(data => {
      if (data) {
        data.forEach(t => {
          t.startDate = new Date(t.startDate);
          t.endDate = new Date(t.endDate);
        });
        this.tournaments = data;
      }
    });
    this.shopService.getOrders().subscribe(data => this.orders = data);
    this.apiService.allRegistrations.subscribe(data => this.registrations = data);
    this.grouping = [
      { dir: SortingDirection.Desc, fieldName: 'tournamentName', ignoreCase: false, strategy: DefaultSortingStrategy.instance() },
      { dir: SortingDirection.Asc, fieldName: 'game', ignoreCase: false, strategy: DefaultSortingStrategy.instance() }
    ];
  }

  public submitRole(role: string) {
    this.authService.submitRole(role).subscribe(() => this.authService.getUserRoles().subscribe(roles => this.roles = roles));
  }

  public updateTournament(tournament?: Tournament) {
    this.apiService.createTournament(tournament || this.tournament).subscribe(data => !tournament ? this.tournaments.push(data) : null);
  }

  public editDone(event: IGridEditEventArgs) {
    const rowData = event.rowData;
    rowData[event.column.field] = event.newValue;
    this.shopService.confirmOrder(rowData).subscribe();
  }

  public confirmRegistration(event: IGridEditEventArgs) {
    const rowData = event.rowData;
    rowData[event.column.field] = event.newValue ? 1 : 0;
    this.apiService.confirmRegistration(rowData).subscribe();
  }

  public deleteRegistration(rowContext: RowType) {
    rowContext.grid.transactions.commit(rowContext.grid.data, rowContext.key);
    this.apiService.deleteRegistration(rowContext.key).subscribe();
  }

  public deleteOrder(rowContext: RowType) {
    rowContext.grid.transactions.commit(rowContext.grid.data, rowContext.key);
    this.shopService.deleteOrder(rowContext.key).subscribe();
  }
}
