import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubsGeneralComponent } from './clubs-general.component';

describe('ClubsGeneralComponent', () => {
  let component: ClubsGeneralComponent;
  let fixture: ComponentFixture<ClubsGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubsGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClubsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
