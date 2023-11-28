import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AdminGuard } from './admin.guard';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';



describe('AdminGuard', () => {
  let guard: AdminGuard;
  let authService: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard, LoginService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ServiceWorkerModule.register('', { enabled: false })
      ]
    });

    guard = TestBed.inject(AdminGuard);
    authService = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if the user is an admin', () => {
    let canActivate;
    (guard.canActivate() as Observable<boolean>).subscribe(admin => canActivate = admin);
    const req = httpMock.expectOne(`${authService['_apiBase']}/admin`);
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toEqual(true);
    req.flush(true);

    expect(canActivate).toBe(true);
  });

  it('should return false if the user is not an admin', () => {
    let canActivate;
    (guard.canActivate() as Observable<boolean>).subscribe(admin => canActivate = admin);
    const req = httpMock.expectOne(`${authService['_apiBase']}/admin`);
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toEqual(true);
    req.flush(false);

    expect(canActivate).toBe(false);
  });
});
