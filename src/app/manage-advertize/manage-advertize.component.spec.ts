import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdvertizeComponent } from './manage-advertize.component';

describe('ManageAdvertizeComponent', () => {
  let component: ManageAdvertizeComponent;
  let fixture: ComponentFixture<ManageAdvertizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAdvertizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdvertizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
