import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotedWorkComponent } from './quoted-work.component';

describe('QuotedWorkComponent', () => {
  let component: QuotedWorkComponent;
  let fixture: ComponentFixture<QuotedWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotedWorkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotedWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
