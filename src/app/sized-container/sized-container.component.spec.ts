import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizedContainerComponent } from './sized-container.component';

describe('SizedContainerComponent', () => {
  let component: SizedContainerComponent;
  let fixture: ComponentFixture<SizedContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizedContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
