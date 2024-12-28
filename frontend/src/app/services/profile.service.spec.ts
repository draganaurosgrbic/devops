import { HttpClient } from '@angular/common/http';
import { ProfileService } from './profile.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { Page } from '../models/pagination';
import { Profile } from '../models/profile';
import { Auth } from '../models/auth';

const PROFILES_MOCK: Profile[] = [
    {
        id: 1,
        first_name: 'first_name 1',
        last_name: 'last_name 1',
        email: 'email 1',
        phone_number: 'phone_number 1',
        sex: 'sex 1',
        birth_date: new Date(),
        username: 'username 1',
        biography: 'biography 1',
        private: true,
        work_experiences: [],
        educations: [],
        skills: [],
        interests: [],
        connections: [],
        connection_requests: [],
        blocked_profiles: [],
        block_post_notifications: false,
        block_message_notifications: false,
    },
    {
        id: 2,
        first_name: 'first_name 2',
        last_name: 'last_name 2',
        email: 'email 2',
        phone_number: 'phone_number 2',
        sex: 'sex 2',
        birth_date: new Date(),
        username: 'username 2',
        biography: 'biography 2',
        private: true,
        work_experiences: [],
        educations: [],
        skills: [],
        interests: [],
        connections: [],
        connection_requests: [],
        blocked_profiles: [],
        block_post_notifications: false,
        block_message_notifications: false,
    },
];

describe('ProfileService', () => {
    let injector: TestBed;
    let service: ProfileService;
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
        });
        injector = getTestBed();
        service = TestBed.inject(ProfileService);
        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should read profiles', fakeAsync(() => {
        const profilesMock: Page<Profile> = {
            results: PROFILES_MOCK,
            links: {
                base: 'base 1',
                prev: 'prev 1',
                next: 'next 1',
            },
            offset: 0,
            limit: 0,
            size: 0,
        };
        let profiles: Page<Profile>;

        service.read('', 0, 0).subscribe(res => profiles = res);
        const request = httpMock.expectOne(`${service['PROFILES_URL']}?search=&offset=0&limit=0`);
        expect(request.request.method).toBe('GET');
        request.flush(profilesMock);
        tick();

        expect(profiles).toBeDefined();
        expect(profiles.results).toBe(profilesMock.results);
        expect(profiles.links).toBe(profilesMock.links);
        expect(profiles.offset).toBe(profilesMock.offset);
        expect(profiles.limit).toBe(profilesMock.limit);
        expect(profiles.size).toBe(profilesMock.size);
    }));

    it('should read public profiles', fakeAsync(() => {
        const profilesMock: Page<Profile> = {
            results: PROFILES_MOCK,
            links: {
                base: 'base 1',
                prev: 'prev 1',
                next: 'next 1',
            },
            offset: 0,
            limit: 0,
            size: 0,
        };
        let profiles: Page<Profile>;

        service.readPublic('', 0, 0).subscribe(res => profiles = res);
        const request = httpMock.expectOne(`${service['PROFILES_URL']}/public?search=&offset=0&limit=0`);
        expect(request.request.method).toBe('GET');
        request.flush(profilesMock);
        tick();

        expect(profiles).toBeDefined();
        expect(profiles.results).toBe(profilesMock.results);
        expect(profiles.links).toBe(profilesMock.links);
        expect(profiles.offset).toBe(profilesMock.offset);
        expect(profiles.limit).toBe(profilesMock.limit);
        expect(profiles.size).toBe(profilesMock.size);
    }));

    it('should read connections', fakeAsync(() => {
        const profilesMock: Page<Profile> = {
            results: PROFILES_MOCK,
            links: {
                base: 'base 1',
                prev: 'prev 1',
                next: 'next 1',
            },
            offset: 0,
            limit: 0,
            size: 0,
        };
        let profiles: Page<Profile>;

        service.readConnections('', 0, 0).subscribe(res => profiles = res);
        const request = httpMock.expectOne(`${service['PROFILES_URL']}/connections?search=&offset=0&limit=0`);
        expect(request.request.method).toBe('GET');
        request.flush(profilesMock);
        tick();

        expect(profiles).toBeDefined();
        expect(profiles.results).toBe(profilesMock.results);
        expect(profiles.links).toBe(profilesMock.links);
        expect(profiles.offset).toBe(profilesMock.offset);
        expect(profiles.limit).toBe(profilesMock.limit);
        expect(profiles.size).toBe(profilesMock.size);
    }));

    it('should read connection requests', fakeAsync(() => {
        const profilesMock: Page<Profile> = {
            results: PROFILES_MOCK,
            links: {
                base: 'base 1',
                prev: 'prev 1',
                next: 'next 1',
            },
            offset: 0,
            limit: 0,
            size: 0,
        };
        let profiles: Page<Profile>;

        service.readConnectionRequests('', 0, 0).subscribe(res => profiles = res);
        const request = httpMock.expectOne(`${service['PROFILES_URL']}/connection_requests?search=&offset=0&limit=0`);
        expect(request.request.method).toBe('GET');
        request.flush(profilesMock);
        tick();

        expect(profiles).toBeDefined();
        expect(profiles.results).toBe(profilesMock.results);
        expect(profiles.links).toBe(profilesMock.links);
        expect(profiles.offset).toBe(profilesMock.offset);
        expect(profiles.limit).toBe(profilesMock.limit);
        expect(profiles.size).toBe(profilesMock.size);
    }));

    it('should read profile', fakeAsync(() => {
        const profileMock = PROFILES_MOCK[0];
        let profile: Profile;

        service.readProfile().subscribe(res => profile = res);
        const request = httpMock.expectOne(service['PROFILE_URL']);
        expect(request.request.method).toBe('GET');
        request.flush(profileMock);
        tick();

        expect(profile).toBeDefined();
        expect(profile.id).toBe(profileMock.id);
        expect(profile.first_name).toBe(profileMock.first_name);
        expect(profile.last_name).toBe(profileMock.last_name);
        expect(profile.email).toBe(profileMock.email);
        expect(profile.phone_number).toBe(profileMock.phone_number);
        expect(profile.sex).toBe(profileMock.sex);
        expect(profile.birth_date).toBe(profileMock.birth_date);
        expect(profile.username).toBe(profileMock.username);
        expect(profile.biography).toBe(profileMock.biography);
        expect(profile.private).toBe(profileMock.private);
        expect(profile.work_experiences).toBe(profileMock.work_experiences);
        expect(profile.educations).toBe(profileMock.educations);
        expect(profile.skills).toBe(profileMock.skills);
        expect(profile.interests).toBe(profileMock.interests);
        expect(profile.connections).toBe(profileMock.connections);
        expect(profile.connection_requests).toBe(profileMock.connection_requests);
        expect(profile.blocked_profiles).toBe(profileMock.blocked_profiles);
        expect(profile.block_post_notifications).toBe(profileMock.block_post_notifications);
        expect(profile.block_message_notifications).toBe(profileMock.block_message_notifications);
    }));

    it('should update profile', fakeAsync(() => {
        let res: Auth;

        service.updateProfile(PROFILES_MOCK[0]).subscribe(response => res = response);
        const request = httpMock.expectOne(service['PROFILE_URL']);
        expect(request.request.method).toBe('PUT');
        request.flush(null);
        tick();

        expect(res).toBeDefined();
        expect(res).toBeNull();
    }));

    it('should connect profile', fakeAsync(() => {
        const id = 1;
        let res: void;

        service.connect(id).subscribe(response => res = response);
        const request = httpMock.expectOne(`${service['PROFILE_URL']}/connect/${id}`);
        expect(request.request.method).toBe('PUT');
        request.flush(null);
        tick();

        expect(res).toBeDefined();
        expect(res).toBeNull();
    }));

    it('should accept profile', fakeAsync(() => {
        const id = 1;
        let res: void;

        service.accept(id).subscribe(response => res = response);
        const request = httpMock.expectOne(`${service['PROFILE_URL']}/accept/${id}`);
        expect(request.request.method).toBe('PUT');
        request.flush(null);
        tick();

        expect(res).toBeDefined();
        expect(res).toBeNull();
    }));

    it('should reject profile', fakeAsync(() => {
        const id = 1;
        let res: void;

        service.reject(id).subscribe(response => res = response);
        const request = httpMock.expectOne(`${service['PROFILE_URL']}/reject/${id}`);
        expect(request.request.method).toBe('PUT');
        request.flush(null);
        tick();

        expect(res).toBeDefined();
        expect(res).toBeNull();
    }));

    it('should block profile', fakeAsync(() => {
        const id = 1;
        let res: void;

        service.block(id).subscribe(response => res = response);
        const request = httpMock.expectOne(`${service['PROFILE_URL']}/block/${id}`);
        expect(request.request.method).toBe('PUT');
        request.flush(null);
        tick();

        expect(res).toBeDefined();
        expect(res).toBeNull();
    }));

});
