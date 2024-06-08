import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotedWorksPartComponent } from './quoted-works-part.component';

describe('QuotedWorksPartComponent', () => {
  let component: QuotedWorksPartComponent;
  let fixture: ComponentFixture<QuotedWorksPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotedWorksPartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotedWorksPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
