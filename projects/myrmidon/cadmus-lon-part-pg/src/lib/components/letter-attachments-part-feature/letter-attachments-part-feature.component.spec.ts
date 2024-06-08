import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterAttachmentsPartFeatureComponent } from './letter-attachments-part-feature.component';

describe('LetterAttachmentsPartFeatureComponent', () => {
  let component: LetterAttachmentsPartFeatureComponent;
  let fixture: ComponentFixture<LetterAttachmentsPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetterAttachmentsPartFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetterAttachmentsPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
