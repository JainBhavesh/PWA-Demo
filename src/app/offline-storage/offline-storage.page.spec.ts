import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OfflineStoragePage } from './offline-storage.page';

describe('OfflineStoragePage', () => {
  let component: OfflineStoragePage;
  let fixture: ComponentFixture<OfflineStoragePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflineStoragePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OfflineStoragePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
