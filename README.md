## Props table for CountrySelector

| Name   |      Type      |  Default value | Description
|----------|---------------|--------------|----------|
| countryList|  array | [] | an array of country data
| onSelect|    function    |  () => {} |  get selected country obj from function parameter
| maxVisibleNumber | number|    5 | number of countries are showing in scroll visible view
| defaultPosition | number|    3 |  default position of selected country when user open the dropdown
| itemHeight | number|    36 |  each country ui height in dropdown
| {...otherprops} | any|     |  will map these props on input element such as data-testid


## Usage

```javascript
  <CountrySelector
    countryList={[{
      name: 'country1',
      flag: 'url1'
    },
    {
      name: 'country2',
      flag: 'url2'
    }]}
    onSelect={(selectedCountryObj) => {
      // you can get the data and use it your app
    })}
    maxVisibleNumber={7}
    defaultPosition={4}
    itemHeight={30}
    data-testid="my-test-id"
  />
```

## Basic
![Image of example1](https://i.ibb.co/xDzD8qZ/example1.png)

- User can use input to find matched country or open the dropdown menu to select
- Support click away
- When user update the text from input, the selected country will be reset

## Advance

![Image of example2](https://i.ibb.co/SRCCBPq/example2.png)
 - Supports different size
 - Default opening position
 - Different number of countries at one time.

## How to try this project

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\
I am using react testing library and jest for this project.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

