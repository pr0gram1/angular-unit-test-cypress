# angular-unit-test-cypress

 "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "build:prod": "ng build --configuration production",
    "start:prod": "http-server ./dist -a localhost -p 4200",
    "build-and-deploy:prod": "run-s build:prod start:prod",
    "e2e": "start-server-and-test build-and-deploy:prod http://localhost:4200 cypress:run"
  },

  Use these of script with combination of npm run *scriptName*
