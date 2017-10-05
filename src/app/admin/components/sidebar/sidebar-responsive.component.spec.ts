import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarResponsiveComponent } from './sidebar-responsive.component';

describe('SidebarResponsiveComponent', () => {
  let component: SidebarResponsiveComponent;
  let fixture: ComponentFixture<SidebarResponsiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarResponsiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
