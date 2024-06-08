import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterAttachmentsPartComponent } from './letter-attachments-part.component';

describe('LetterAttachmentsPartComponent', () => {
  let component: LetterAttachmentsPartComponent;
  let fixture: ComponentFixture<LetterAttachmentsPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetterAttachmentsPartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetterAttachmentsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
