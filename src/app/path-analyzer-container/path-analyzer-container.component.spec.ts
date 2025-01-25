import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathAnalyzerContainerComponent } from './path-analyzer-container.component';

describe('PathAnalyzerContainerComponent', () => {
  let component: PathAnalyzerContainerComponent;
  let fixture: ComponentFixture<PathAnalyzerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PathAnalyzerContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathAnalyzerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
