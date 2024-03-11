import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BaseDirective } from './base.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BaseComponent', () => {
  let component: BaseDirective;
  let fixture: ComponentFixture<BaseDirective>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BaseDirective
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component['_title']).toBe('Bellum Gens: Premier Gaming and Esports Events Organizer');
    expect(component['_twitterTitle']).toBe('Bellum Gens: Premier Gaming and Esports Events Organizer');
    expect(component['_description']).toBe('Bellum Gens is a premier gaming and esports events organizer in Bulgaria and the Balkans region. If you want to tap into esports we can help!');
    expect(component['_twitterDescription']).toBe('Bellum Gens is a premier gaming and esports events organizer in Bulgaria and the Balkans region.');
    expect(component['_image']).toBe('/assets/avatar_BG_blood.png');
  });
});
