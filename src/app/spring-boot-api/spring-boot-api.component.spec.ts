import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringBootApiComponent } from './spring-boot-api.component';

describe('SpringBootApiComponent', () => {
  let component: SpringBootApiComponent;
  let fixture: ComponentFixture<SpringBootApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpringBootApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpringBootApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
