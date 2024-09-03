import {ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';




describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;

  let component:HomeComponent;
  let el: DebugElement;
  let coursesSevice: any;

  const beginnerCourses = setupCourses().filter(course => course.category == 'BEGINNER');
  const advanedCourses = setupCourses().filter(course => course.category == 'ADVANCED');

  beforeEach(waitForAsync(() => {

    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses'])

    TestBed.configureTestingModule({
      imports: [CoursesModule, NoopAnimationsModule],
      providers: [{provide:CoursesService, useValue: coursesServiceSpy}]
    }).compileComponents()
        .then(()=> {
            fixture = TestBed.createComponent(HomeComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
            coursesSevice = TestBed.inject(CoursesService)
    });

  }));

  it("should create the component", () => {

    expect(component).toBeTruthy();
  });

  // Testing first ngif

  it("should display only beginner courses", () => {

    coursesSevice.findAllCourses.and.returnValue(of(beginnerCourses))
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));;

    expect(tabs.length).toBe(1,"Unexpected number of tabs found")
  });

  // Testing second ngif

  it("should display only advanced courses", () => {

    coursesSevice.findAllCourses.and.returnValue(of(advanedCourses))
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));;

    expect(tabs.length).toBe(1,"Unexpected number of tabs found")

  });


  it("should display both tabs", () => {

    coursesSevice.findAllCourses.and.returnValue(of(setupCourses()))
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));;

    expect(tabs.length).toBe(2,"Unexpected number of tabs found")

  });


  it("should display advanced courses when tab clicked - fakeAsync", fakeAsync(() => {

    coursesSevice.findAllCourses.and.returnValue(of(setupCourses()))

    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));;

    click(tabs[1]);

    fixture.detectChanges();

    flush();

    const cardTitles = el.queryAll(By.css('.mat-card-title'));

    expect(cardTitles.length).toBeGreaterThan(0,"Could not find card titles");

    expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");


  }));

  it("should display advanced courses when tab clicked - waitForAsync", waitForAsync(() => {

    coursesSevice.findAllCourses.and.returnValue(of(setupCourses()))

    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));;

    click(tabs[1]);

    fixture.detectChanges();

    fixture.whenStable().then(()=> {

      console.log('called whenStable()')

      const cardTitles = el.queryAll(By.css('.mat-card-title'));

      expect(cardTitles.length).toBeGreaterThan(0,"Could not find card titles");

      expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");

    });

  }));

});

// waitForAsync in beforeAfter method is added so that our components are ready before it's are executed
// we are using setTimeout becase of Window: requestAnimationFrame() method while we switch from frame to frame test. It is a async component
// asny cant use to controll time aka passage of time
// whenStable is a callback from waitForAsync that checks if all async operations are completed
