import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { Page } from '../models/pagination';
import { Post } from '../models/post';
import { PostService } from './post.service';

describe('PostService', () => {
    let injector: TestBed;
    let service: PostService;
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
        });
        injector = getTestBed();
        service = TestBed.inject(PostService);
        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create post', fakeAsync(() => {
        let res: void;

        service.create({
            id: '1',
            profile_id: 1,
            text: 't1',
        }).subscribe(response => res = response);
        const request = httpMock.expectOne(service['POSTS_URL']);
        expect(request.request.method).toBe('POST');
        request.flush(null);
        tick();

        expect(res).toBeDefined();
        expect(res).toBeNull();
    }));

    it('should read posts', fakeAsync(() => {
        const postsMock: Page<any> = {
            results: [
                {
                    id: '1',
                    profile_id: 1,
                    text: 't1',
                },
                {
                    id: '2',
                    profile_id: 1,
                    text: 't2',
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
        let posts: Page<Post>;

        service.read('', 0, 0, 1).subscribe(res => posts = res);
        const request = httpMock.expectOne(`${service['POSTS_URL']}/1?offset=0&limit=0`);
        expect(request.request.method).toBe('GET');
        request.flush(postsMock);
        tick();

        expect(posts).toBeDefined();
        expect(posts.results).toBe(postsMock.results);
        expect(posts.links).toBe(postsMock.links);
        expect(posts.offset).toBe(postsMock.offset);
        expect(posts.limit).toBe(postsMock.limit);
        expect(posts.size).toBe(postsMock.size);
    }));

    it('should create like', fakeAsync(() => {
        let res: void;

        service.like({
            Id: '1',
            profile_id: 1,
            post_id: '1',
        }).subscribe(response => res = response);
        const request = httpMock.expectOne(`${service['POSTS_URL']}/like`);
        expect(request.request.method).toBe('POST');
        request.flush(null);
        tick();

        expect(res).toBeDefined();
        expect(res).toBeNull();
    }));

    it('should create dislike', fakeAsync(() => {
        let res: void;

        service.dislike({
            Id: '1',
            profile_id: 1,
            post_id: '1',
        }).subscribe(response => res = response);
        const request = httpMock.expectOne(`${service['POSTS_URL']}/dislike`);
        expect(request.request.method).toBe('POST');
        request.flush(null);
        tick();

        expect(res).toBeDefined();
        expect(res).toBeNull();
    }));

    it('should reset opinion', fakeAsync(() => {
        let res: void;

        service.neither('1').subscribe(response => res = response);
        const request = httpMock.expectOne(`${service['POSTS_URL']}/neither/1`);
        expect(request.request.method).toBe('DELETE');
        request.flush(null);
        tick();

        expect(res).toBeDefined();
        expect(res).toBeNull();
    }));
});
