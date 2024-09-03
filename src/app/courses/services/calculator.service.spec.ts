import { CalculatorService } from "./calculator.service";
import { TestBed } from '@angular/core/testing';
import { LoggerService } from "./logger.service";


fdescribe('CalculatorService', ()=> {

  let calculator: CalculatorService,
  loggerSpy: any;

  beforeEach(()=> {

    console.log("Method for not repeating code executions. Calling before each test")

    loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {provide: LoggerService, useValue: loggerSpy}
      ]
    })

    calculator = TestBed.inject(CalculatorService)
  })

  it('should add two numbers',()=>{

    console.log("Add test")

    const result = calculator.add(2,2);

    expect(result).toBe(4);

    expect(loggerSpy.log).toHaveBeenCalledTimes(1)

  });

  it('should subtract two numbers',()=>{

    console.log("subtract test")

    const result = calculator.subtract(2,2);

    expect(result).toBe(0, "unexpected subtraction result")

    expect(loggerSpy.log).toHaveBeenCalledTimes(1)

  });
})

// beforeEach method - runs before every test so we dont need to duplicate code - setuping
// mocking -> loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);
// Testbed -> testing injected services in Calcualtor Service constructor - Dependency Injection test
// Temporarily disabled with (x)it or (f)describe
// Temporarily focused with (f)it or (f)describe
