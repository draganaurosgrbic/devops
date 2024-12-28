import { HttpClient } from '@angular/common/http';
import { fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Auth } from '../models/auth';


describe('AuthService', () => {
    let injector: TestBed;
    let service: AuthService;
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
        });
        injector = getTestBed();
        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should auth', fakeAsync(() => {
        let res: void;

        service.auth().subscribe(response => res = response);
        const request = httpMock.expectOne(service['API_URL']);
        expect(request.request.method).toBe('GET');
        request.flush(null);
        tick();

        expect(res).toBeDefined();
        expect(res).toBeNull();
    }));

    it('should login', fakeAsync(() => {
        const authMock: Auth = {
            token: 'token 1',
            role: 'role 1',
        };
        let auth: Auth;

        service.login({
            username: 'username 1',
            password: 'password 1',
        }).subscribe(res => auth = res);
        const request = httpMock.expectOne(`${service['API_URL']}/login`);
        expect(request.request.method).toBe('POST');
        request.flush(authMock);
        tick();

        expect(auth).toBeDefined();
        expect(auth.token).toEqual(authMock.token);
        expect(auth.role).toEqual(authMock.role);
    }));

    it('should register', fakeAsync(() => {
        const resMock = null;
        let res: void;

        service.register({
            first_name: 'first_name 1',
            last_name: 'last_name 1',
            email: 'email 1',
            phone_number: 'phone_number 1',
            sex: 'sex 1',
            birth_date: 'birth_date 1',
            username: 'username 1',
            biography: 'biography 1',
            private: true,
            password: 'password 1',
        }).subscribe(response => res = response);
        const request = httpMock.expectOne(`${service['API_URL']}/registration`);
        expect(request.request.method).toBe('POST');
        request.flush(resMock);
        tick();

        expect(res).toBeDefined();
        expect(res).toBeNull();
    }));

});
