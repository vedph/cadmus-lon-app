import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotedWorksPartFeatureComponent } from './quoted-works-part-feature.component';

describe('QuotedWorksPartFeatureComponent', () => {
  let component: QuotedWorksPartFeatureComponent;
  let fixture: ComponentFixture<QuotedWorksPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotedWorksPartFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotedWorksPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
