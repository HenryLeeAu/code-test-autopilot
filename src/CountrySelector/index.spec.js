import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CountrySelector from '.';

describe('<CountrySelector />', () => {
  const baseProps = {
    countryList: [
      {name:'France', flag:'http://url1/'},
      {name:'Taiwan', flag:'http://url2/'},
      {name:'Japan', flag:'http://url3/'},
      {name:'Australia', flag:'http://url4/'},
      {name:'Austria', flag:'http://url5/'},
      {name:'f', flag:'http://url6/'},
      {name:'g', flag:'http://url7/'},
      {name:'h', flag:'http://url8/'},
    ]
  }

  it('renders default UI status', () => {
    const props = {
      ...baseProps,
    }
    const { getAllByTestId, getByTestId } = render(
      <CountrySelector
        {...props}
        data-testid='country-selector'
       />
    );

    expect(getByTestId('country-selector').value).toBe('');

    expect(getAllByTestId('country-item').length).toBe(props.countryList.length);

    props.countryList.forEach((countryObj, index) => {
      expect(getAllByTestId('country-name')[index].textContent).toBe(countryObj.name)
      expect(getAllByTestId('country-flag')[index].src).toBe(countryObj.flag)
    });

  });

  it('types input to find matched countries', () => {
    const props = {
      ...baseProps,
    }
    const { getByTestId, getAllByTestId } = render(
      <CountrySelector
        {...props}
        data-testid='country-selector'
       />
    );

    fireEvent.change(getByTestId('country-selector'), { target: { value: 'aUsTr' } })

    expect(getAllByTestId('country-item').length).toBe(2);

  })

  it('clicks one of the countries from list', () => {
    const props = {
      ...baseProps,
      onSelect: jest.fn()
    }
    const { getByTestId, getByText } = render(
      <CountrySelector
        {...props}
        data-testid='country-selector'
       />
    );

    fireEvent.click(getByText('Australia'));

    expect(getByTestId('country-selector').value).toBe('Australia')

    expect(props.onSelect).toHaveBeenCalledWith(props.countryList[3])

  })

});
