import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';

import { IgxBannerComponent, IgxNavigationDrawerComponent} from '@infragistics/igniteui-angular';
import { LoginService, ApplicationUser } from '../../../common/src/public_api';
import { environment } from '../../../common/src/environments/environment';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('cookiesBanner', { static: true })
  private banner: IgxBannerComponent;

  @ViewChild('drawer', { static: true })
  private navdrawer: IgxNavigationDrawerComponent;

  public authUser: ApplicationUser;
  public environment = environment;
  public year = new Date().getFullYear();

  constructor(@Inject(LOCALE_ID) public localeId: string,
              private authManager: LoginService,
              private router: Router) {
    this.authManager.applicationUser.subscribe(data => {
      this.authUser = data;
    });
  }

  public ngOnInit(): void {
    if (!window?.localStorage?.getItem('cookiesAccepted')) {
      this.banner.open();
    }

    this.router.events.pipe(
      filter(x => x instanceof NavigationEnd)
    )
    .subscribe(() => this.navdrawer.close());
  }

  public acceptCookies() {
    this.banner.close();
    window.localStorage.setItem('cookiesAccepted', 'true');
  }
}
