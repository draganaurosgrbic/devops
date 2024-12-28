import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { Event } from '../models/event';
import { Page } from '../models/pagination';
import { EventService } from './event.service';

describe('EventService', () => {
  let injector: TestBed;
  let service: EventService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    injector = getTestBed();
    service = TestBed.inject(EventService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should read events', fakeAsync(() => {
    const eventsMock: Page<Event> = {
      results: [
        {
          id: 1,
          date: new Date(),
          type: 'type 1',
          data: {
              name: 'name 1'
          },
        },
        {
          id: 2,
          date: new Date(),
          type: 'type 2',
          data: {
              name: 'name 2'
          },
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
    let events: Page<Event>;

    service.read('', 0, 0).subscribe(res => events = res);
    const request = httpMock.expectOne(`${service['API_URL']}?search=&offset=0&limit=0`);
    expect(request.request.method).toBe('GET');
    request.flush(eventsMock);
    tick();

    expect(events).toBeDefined();
    expect(events.results).toBe(eventsMock.results);
    expect(events.links).toBe(eventsMock.links);
    expect(events.offset).toBe(eventsMock.offset);
    expect(events.limit).toBe(eventsMock.limit);
    expect(events.size).toBe(eventsMock.size);
  }));

});
