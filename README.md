# technical-assessment
# Instructions to initialize project
- clone the repository
- run ```npm install``` in the root directory
# Instructions to run tests
- run ```npm run test```
# Description
- Steps 1 to 4 of the Courier Kata assessment completed with tests passing
- Step 5 partially completed with tests passing for implemented features
  - Small parcel mania implemented and passing tests
  - Medium parcel mania implemented and passing tests
# Todo
- Implement Mixed parcel mania
  - Mixed parcel mania adds complexity of colliding discounts, meaning steps applied to create discounts would need to be reconsidered to ensure that the best combination of discounts is always used

- Refactor test code to use more reusable inputs to reduce the repetition with long declarations of variables

- Make sure edge cases are covered

- Move helper function for checking if functions throw errors to helpers file

- Move code to create discounts to seperate service to follow single responsibility principle

- Move code to generate total to seperate service for single responsibility

- Change the Discount model to allow for tests that parcels are only used once per discount
