import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationTrackingPage } from './location-tracking.page';

describe('LocationTrackingPage', () => {
  let component: LocationTrackingPage;
  let fixture: ComponentFixture<LocationTrackingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationTrackingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationTrackingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
