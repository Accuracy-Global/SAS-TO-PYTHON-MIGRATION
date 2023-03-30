import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastepStatementsComponent } from './datastep-statements.component';

describe('DatastepStatementsComponent', () => {
  let component: DatastepStatementsComponent;
  let fixture: ComponentFixture<DatastepStatementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatastepStatementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastepStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
