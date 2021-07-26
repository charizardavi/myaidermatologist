import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RemediesPage } from './remedies.page';

describe('RemediesPage', () => {
  let component: RemediesPage;
  let fixture: ComponentFixture<RemediesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemediesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RemediesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
