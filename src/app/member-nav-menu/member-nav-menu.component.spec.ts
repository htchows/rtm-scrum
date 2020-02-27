import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberNavMenuComponent } from './member-nav-menu.component';

describe('MemberNavMenuComponent', () => {
  let component: MemberNavMenuComponent;
  let fixture: ComponentFixture<MemberNavMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberNavMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberNavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
