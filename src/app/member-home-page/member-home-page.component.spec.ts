import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberHomePageComponent } from './member-home-page.component';

describe('MemberHomePageComponent', () => {
  let component: MemberHomePageComponent;
  let fixture: ComponentFixture<MemberHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
