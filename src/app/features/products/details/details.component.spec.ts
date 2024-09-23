import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';

describe('DetailsComponent()', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  @Component({
    template: `<app-details />`,
    standalone: true,
    imports: [DetailsComponent],
  })
  class TestHostComponent {
    @Input() productId!: number;
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should ', () => {
    expect(component).toBeTruthy();
  });
});
