import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from '../shared/services/authentication.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../shared/model/user';


import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule],
      declarations: [NavbarComponent],
      providers: [AuthenticationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });


  it('should create NavbarComponent', () => {
    expect(component).toBeTruthy();
  });

  it('user should not be logged in', function () {
    expect(component.isUserLoggedIn()).toBe('N');
  });

  it('user should be logged in', function () {
    const user: User = { 'id': 1, 'firstName': 'jenny', 'username': 'test', 'password': 'test', 'lastName': 'test' };
    localStorage.setItem('currentUser', JSON.stringify(user));
    expect(component.isUserLoggedIn()).toBe('Y');
  });

  it('navigate to "register" takes you to /register', fakeAsync(() => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.register();
    expect(navigateSpy).toHaveBeenCalledWith(['/register']);
  }));

  it('navigate to "login" takes you to /login', fakeAsync(() => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.login();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  }));

  it('call logout function takes you to /login', fakeAsync(() => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.logout();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    expect(component.isUserLoggedIn()).toBe('N');
  }));
});
