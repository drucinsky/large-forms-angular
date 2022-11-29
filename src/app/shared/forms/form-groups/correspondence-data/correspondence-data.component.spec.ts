import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrespondenceDataComponent } from './correspondence-data.component';

describe('CorrespondenceDataComponent', () => {
  let component: CorrespondenceDataComponent;
  let fixture: ComponentFixture<CorrespondenceDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CorrespondenceDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrespondenceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
