import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationUser } from '../../models/applicationuser';
import { IgxListComponent } from 'igniteui-angular';
import { UserNotification, NotificationState } from '../../models/usernotifications';
import { BellumgensApiService } from '../../services/bellumgens-api.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class PlayerNotificationsComponent {

  @Input()
  public authUser: ApplicationUser;
  public loading = false;
  public notificationClass = ['', '', 'notification-disabled', 'notification-disabled'];
  public pipeTrigger = 0;

  @Output()
  public loaded = new EventEmitter<UserNotification []>();

  @Output()
  public changed = new EventEmitter<number>();

  @ViewChild(IgxListComponent) public notifications: IgxListComponent;

  constructor(private apiService: BellumgensApiService,
              private router: Router) { }

  public acceptInvitation(notification: UserNotification) {
    this.loading = true;
    this.apiService.acceptInvite(notification).pipe(finalize(() => this.loading = false)).subscribe(
      _ => {
        notification.State = NotificationState.Accepted;
        this.pipeTrigger++;
        this.router.navigate(['team', notification.TeamInfo.TeamId]);
        this.changed.emit(-1);
      }
    );
  }

  public rejectInvitation(notification: UserNotification) {
    this.loading = true;
    this.apiService.rejectInvite(notification).pipe(finalize(() => this.loading = false)).subscribe(
      _ => {
        notification.State = NotificationState.Rejected;
        this.pipeTrigger++;
        this.changed.emit(-1);
      }
    );
  }

}
