import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { Offer } from '../models/offer';
import { Page } from '../models/pagination';
import { OfferService } from './offer.service';

describe('OfferService', () => {
    let injector: TestBed;
    let service: OfferService;
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
        });
        injector = getTestBed();
        service = TestBed.inject(OfferService);
        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create offer', fakeAsync(() => {
        let res: void;

        service.create({
            id: 1,
            position: 'position 1',
            requirements: 'requirements 1',
            description: 'description 1',
            agent_application_link: 'agent_application_link 1',
        }).subscribe(response => res = response);
        const request = httpMock.expectOne(service['API_URL']);
        expect(request.request.method).toBe('POST');
        request.flush(null);
        tick();

        expect(res).toBeDefined();
        expect(res).toBeNull();
    }));

    it('should read offers', fakeAsync(() => {
        const offersMock: Page<Offer> = {
            results: [
                {
                    id: 1,
                    position: 'position 1',
                    requirements: 'requirements 1',
                    description: 'description 1',
                    agent_application_link: 'agent_application_link 1',
                },
                {
                    id: 2,
                    position: 'position 2',
                    requirements: 'requirements 2',
                    description: 'description 2',
                    agent_application_link: 'agent_application_link 2',
                },
            ],
            links: {
                base: 'base 1',
                prev: 'prev 1',
                next: 'next 1',
            },
            offset: 0,
            limit: 0,
            size: 0,
        };
        let offers: Page<Offer>;

        service.read('', 0, 0).subscribe(res => offers = res);
        const request = httpMock.expectOne(`${service['API_URL']}?search=&offset=0&limit=0`);
        expect(request.request.method).toBe('GET');
        request.flush(offersMock);
        tick();

        expect(offers).toBeDefined();
        expect(offers.results).toBe(offersMock.results);
        expect(offers.links).toBe(offersMock.links);
        expect(offers.offset).toBe(offersMock.offset);
        expect(offers.limit).toBe(offersMock.limit);
        expect(offers.size).toBe(offersMock.size);
    }));

});
