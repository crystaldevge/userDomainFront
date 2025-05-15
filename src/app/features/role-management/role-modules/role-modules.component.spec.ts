import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleModulesComponent } from './role-modules.component';

describe('RoleModulesComponent', () => {
  let component: RoleModulesComponent;
  let fixture: ComponentFixture<RoleModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoleModulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
