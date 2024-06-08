import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterInfoPartFeatureComponent } from './letter-info-part-feature.component';

describe('LetterInfoPartFeatureComponent', () => {
  let component: LetterInfoPartFeatureComponent;
  let fixture: ComponentFixture<LetterInfoPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetterInfoPartFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetterInfoPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
