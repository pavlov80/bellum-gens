import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IgxNavbarModule,
  IgxLayoutModule,
  IgxRippleModule,
  IgxIconModule,
  IgxInputGroupModule,
  IgxButtonModule,
  IgxProgressBarModule,
  IgxBannerModule,
  IgxIconService,
  IgxDividerModule,
  IgxAvatarModule,
  IgxNavigationDrawerModule,
  IgxSelectModule,
  IgxDropDownModule,
  IgxCheckboxModule,
  IgxAutocompleteModule,
  IgxDialogModule
} from '@infragistics/igniteui-angular';
import { LoginService } from '../../src-common/services/login.service';
import { BellumgensApiService } from '../../src-common/services/bellumgens-api.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../src-common/environments/environment';
import { TournamentHomeComponent } from './home/home.component';
import { ApiTournamentsService } from '../../src-common/services/bellumgens-api.tournaments.service';
import { GetRegCountPipe } from '../../src-bellumgens/app/pipes/get-reg-count.pipe';
import { BellumGensModule } from '../../src-common/components/components.module';
import { RaffleComponent } from './raffle/raffle.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { TournamentRegistrationComponent } from './tournament-registration/tournament-registration.component';
import { StartsWithPipe } from '../../src-bellumgens/app/pipes/starts-with.pipe';
import { TeamNewComponent } from '../../src-bellumgens/app/team-section/team-new/team-new.component';
import { GroupsFilterPipe } from '../../src-bellumgens/app/pipes/groups-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TournamentHomeComponent,
    GetRegCountPipe,
    RaffleComponent,
    OrderSuccessComponent,
    TournamentRegistrationComponent,
    TeamNewComponent,
    StartsWithPipe,
    GroupsFilterPipe
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    IgxNavbarModule,
    IgxLayoutModule,
    IgxRippleModule,
    IgxIconModule,
    IgxInputGroupModule,
    IgxButtonModule,
    IgxBannerModule,
    IgxProgressBarModule,
    IgxDividerModule,
    IgxAvatarModule,
    IgxNavigationDrawerModule,
    IgxSelectModule,
    IgxDropDownModule,
    IgxCheckboxModule,
    IgxAutocompleteModule,
    IgxDialogModule,
    BellumGensModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HammerModule
  ],
  providers: [
    LoginService,
    BellumgensApiService,
    ApiTournamentsService,
    IgxIconService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private iconService: IgxIconService) {
    this.iconService.addSvgIcon('Steam', '/assets/login/steam-logo-white.svg', 'login-icons');
    this.iconService.addSvgIcon('Facebook', '/assets/login/fb.svg', 'login-icons');
    this.iconService.addSvgIcon('Twitter', '/assets/login/twitter.svg', 'login-icons');
    this.iconService.addSvgIcon('Instagram', '/assets/login/instagram.svg', 'login-icons');
    this.iconService.addSvgIcon('BattleNet', '/assets/login/battle-net.svg', 'login-icons');
    this.iconService.addSvgIcon('Discord', '/assets/login/Discord-Logo-White.svg', 'login-icons');
    this.iconService.addSvgIcon('isobar', '/assets/partners/isobar.svg', 'partners');
    this.iconService.addSvgIcon('vmware', '/assets/partners/vmware.svg', 'partners');
    this.iconService.addSvgIcon('telus', '/assets/partners/telus.svg', 'partners');
    this.iconService.addSvgIcon('modis', '/assets/partners/modis.svg', 'partners');
    this.iconService.addSvgIcon('omen', '/assets/partners/omen.svg', 'partners');
  }
}
