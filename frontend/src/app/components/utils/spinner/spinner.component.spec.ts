import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
    let component: SpinnerComponent;
    let fixture: ComponentFixture<SpinnerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SpinnerComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SpinnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should render spinner', () => {
        expect(fixture.debugElement.query(By.css('div')).nativeElement).toBeTruthy();
        expect(fixture.debugElement.query(By.css('div > mat-card.mat-elevation-z8')).nativeElement).toBeTruthy();
        expect(fixture.debugElement.query(By.css('div > mat-card.mat-elevation-z8 > mat-card-content')).nativeElement).toBeTruthy();
        expect(fixture.debugElement.query(By.css('div > mat-card.mat-elevation-z8 > mat-card-content > mat-spinner')).nativeElement).toBeTruthy();
        expect(fixture.debugElement.query(By.css('div > mat-card.mat-elevation-z8 > mat-card-content > mat-spinner')).nativeElement.diameter).toEqual(25);
    });

});
