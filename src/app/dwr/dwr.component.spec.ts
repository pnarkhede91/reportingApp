import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DWRComponent } from './dwr.component';

describe('DWRComponent', () => {
  let component: DWRComponent;
  let fixture: ComponentFixture<DWRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DWRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DWRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
