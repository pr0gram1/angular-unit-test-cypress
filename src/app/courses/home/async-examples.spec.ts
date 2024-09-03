import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe("Async Testing Examples",()=> {

  it("Async test example with Jasmine done()", (done:DoneFn)=>{

    let test = false;

    setTimeout(()=> {

      console.log('running assertions')

      test = true;

      expect(test).toBeTruthy();

      done();

    },1000)

  })


  it("Async test example - setTimeout()", fakeAsync(()=>{

    let test = false;

    setTimeout(()=> {

      console.log('running assertions setTimeout()')

      test = true;


    }, 1000);

    tick(1000);

    //flush();

    expect(test).toBeTruthy();

  }));

  it("Async test example - setTimeout() flush", fakeAsync(()=>{

    let test = false;

    setTimeout(()=>  {});

    setTimeout(()=> {

      console.log('running assertions setTimeout()')

      test = true;


    }, 1000);


    flush();

    expect(test).toBeTruthy();

  }));

  it('Async test example - plain promise', fakeAsync(()=> {

    let test = false;

    console.log('Creating promise');

    Promise.resolve().then(()=>  {

      console.log('Promise first then() evaluated successfully');

      test = true;

      return Promise.resolve();

    }).then(()=> {

      console.log('Promise second then() evaluated successfully');

    });

    flushMicrotasks();

    console.log('Running asseertion');

    expect(test).toBeTruthy();

  }));

  it('Async test example - Promises + setTimeout', fakeAsync(()=> {

    let counter = 0;

    Promise.resolve().then(()=> {

      counter+=10;

      setTimeout(()=> {

        counter+=1;

      }, 1000);
    });

    expect(counter).toBe(0);

    flushMicrotasks();

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(11);

  }));

  it('Async test example - Observables', fakeAsync(()=> {

    let test = false;

    console.log('Creating observable');

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(()=> {

      test = true;
    });

    tick(1000);

    console.log('Running test assertions');
    expect(test).toBe(true);

  }));

});


// when you set setTimeout it means that the content in it is called after the test is completed
// add done:DoneFn for async tests

// fakeasync knows the test can be completed if the setTimeout gets executed
// tick - passage of time. Tick time needs to be ahead of setTimeout
// flush - if we have one ore more timeouts we are executing all them in queue from fakeasync and then it goes to assertion
// flushMicrotasks - all tasks in microtasks are going to be flushed in the correct order

// Promise - a microtask
// promise has its own queue and its gets called before setTimeout as an example.
// some async operations are lighter than others that browsers processes

// when adding delay we need to use fakeAsync to use pasage of time in order to test to work. Meaning the test us asnyc But no need if there is no delay
