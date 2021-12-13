import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminMainPagePage } from './admin-main-page.page';

describe('AdminMainPagePage', () => {
  let component: AdminMainPagePage;
  let fixture: ComponentFixture<AdminMainPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMainPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMainPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
