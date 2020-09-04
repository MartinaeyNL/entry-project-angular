import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDetailsdrawerComponent } from './dashboard-detailsdrawer.component';

describe('DashboardDetailsdrawerComponent', () => {
  let component: DashboardDetailsdrawerComponent;
  let fixture: ComponentFixture<DashboardDetailsdrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDetailsdrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDetailsdrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
