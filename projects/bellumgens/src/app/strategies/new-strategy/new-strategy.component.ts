import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import {
  CSGOStrategy,
  NEW_EMPTY_STRAT,
  CSGOTeam,
  ApplicationUser,
  CSGOActiveDutyDescriptor,
  ACTIVE_DUTY,
  ApiStrategiesService
} from '../../../../../common/src/public_api';
import { IgxDialogComponent, IgxDialogModule, IgxInputGroupModule, IgxSuffixModule, IgxIconModule, IgxRadioModule, IgxSwitchModule, IgxSelectModule, IgxPrefixModule, IgxButtonModule, IgxRippleModule } from '@infragistics/igniteui-angular';
import { IsVideoPipe } from '../../pipes/is-video.pipe';
import { Router } from '@angular/router';
import { SafeVideoLinkPipe } from '../../pipes/safe-video-link.pipe';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-new-strategy',
    templateUrl: './new-strategy.component.html',
    styleUrls: ['./new-strategy.component.scss'],
    standalone: true,
    imports: [IgxDialogModule, FormsModule, IgxInputGroupModule, NgIf, IgxSuffixModule, IgxIconModule, IgxRadioModule, IgxSwitchModule, IgxSelectModule, NgFor, IgxPrefixModule, IgxButtonModule, IgxRippleModule, SafeVideoLinkPipe]
})
export class NewStrategyComponent {
  @ViewChild('newStrat', { static: true }) public dialog: IgxDialogComponent;

  @Input() public team: CSGOTeam;

  @Input() public authUser: ApplicationUser;

  @Output() public strategyAdded = new EventEmitter<CSGOStrategy>();

  public newStrategy: CSGOStrategy = Object.assign({}, NEW_EMPTY_STRAT);
  public videoId: string;
  public mapList: CSGOActiveDutyDescriptor [] = ACTIVE_DUTY;
  public selectedMap = this.mapList[0];
  public title = 'Add a new team strategy';

  private _defaultTitle = 'Add a new team strategy';

  constructor(private apiService: ApiStrategiesService,
              private router: Router) {
  }

  public open(strat?: CSGOStrategy, title?: string) {
    if (strat) {
      this.newStrategy = strat;
    } else if (!this.team) {
      this.newStrategy.visible = true;
    }

    if (title) {
      this.title = title;
    } else {
      this.title = this._defaultTitle;
    }
    this.dialog.open();
  }

  public resetStrategy() {
    const strat = Object.assign({}, NEW_EMPTY_STRAT);
    strat.visible = !this.team;
    this.newStrategy = strat;
  }

  public submitStrategy() {
    if (this.team) {
      this.newStrategy.teamId = this.team.teamId;
    }
    this.apiService.submitStrategy(this.newStrategy).subscribe(
      strat => {
        if (!this.newStrategy.id) {
          this.strategyAdded.emit(strat);
        }
        this.dialog.close();
      }
    );
  }

  public createAndRedirect() {
    if (this.team) {
      this.newStrategy.teamId = this.team.teamId;
    }
    this.apiService.submitStrategy(this.newStrategy).subscribe(strat => {
      this.router.navigate(['strategies', 'edit', strat.customUrl]);
    });
  }

  public getVideoEmbedLink() {
    if (IsVideoPipe.isYoutube(this.newStrategy.url)) {
      const parts = IsVideoPipe._youtubeRegEx.exec(this.newStrategy.url);
      if (this.videoId && this.videoId === parts[5]) {
        return true;
      }
      this.videoId = parts[5];
      this.newStrategy.url = IsVideoPipe.getYoutubeEmbedLink(this.newStrategy.url);
      return true;
    } else if (IsVideoPipe.isTwitch(this.newStrategy.url)) {
      const parts = IsVideoPipe._twitchRegEx.exec(this.newStrategy.url);
      if (this.videoId && this.videoId === parts[3]) {
        return true;
      }
      this.videoId = parts[3];
      this.newStrategy.url = IsVideoPipe.getTwitchEmbedLink(this.newStrategy.url);
      return true;
    }
    return false;
  }

}
