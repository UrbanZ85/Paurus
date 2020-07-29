import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedOverviewComponent } from './shared-overview.component';

describe('SharedOverviewComponent', () => {
  let component: SharedOverviewComponent;
  let fixture: ComponentFixture<SharedOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
