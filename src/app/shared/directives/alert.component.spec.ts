import {DebugElement}    from '@angular/core';

import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {AlertService} from '../../shared/services/index';
import {AlertComponent} from '../../shared/directives/alert.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  // let de:      DebugElement;
  // let el:      HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AlertComponent
      ],
      providers: [AlertService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the alert component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should have message property', function () {
    expect(component.message).toBe('');
  });

});
