import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { Notification } from '../models/notification';
import { Page } from '../models/pagination';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let injector: TestBed;
  let service: NotificationService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    injector = getTestBed();
    service = TestBed.inject(NotificationService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should read notifications', fakeAsync(() => {
    const notificationsMock: Page<Notification> = {
      results: [
        {
          id: 1,
          recipient_id: 1,
          message: 'message 1',
        },
        {
          id: 2,
          recipient_id: 2,
          message: 'message 2',
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
    let notifications: Page<Notification>;

    service.read('', 0, 0).subscribe(res => notifications = res);
    const request = httpMock.expectOne(`${service['API_URL']}?search=&offset=0&limit=0`);
    expect(request.request.method).toBe('GET');
    request.flush(notificationsMock);
    tick();

    expect(notifications).toBeDefined();
    expect(notifications.results).toBe(notificationsMock.results);
    expect(notifications.links).toBe(notificationsMock.links);
    expect(notifications.offset).toBe(notificationsMock.offset);
    expect(notifications.limit).toBe(notificationsMock.limit);
    expect(notifications.size).toBe(notificationsMock.size);
  }));

});
