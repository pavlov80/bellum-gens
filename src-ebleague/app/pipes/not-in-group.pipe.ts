import { Pipe, PipeTransform } from '@angular/core';
import { TournamentParticipant } from '../../../src-common/models/tournament';

@Pipe({
  name: 'notInGroup'
})
export class NotInGroupPipe implements PipeTransform {

  public transform(value: TournamentParticipant [], key: string): any {
    if (value) {
      return value.filter(r => !r[key]);
    }
    return null;
  }

}
