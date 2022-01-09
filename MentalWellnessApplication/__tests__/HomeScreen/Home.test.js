// https://keyholesoftware.com/2020/11/02/using-jest-and-testing-library-with-react-native-part-1-setting-up/
// helped with setting up testing.

import 'react-native';
import React from 'react';
import Home from '../../src/components/pages/HomeScreen/Home';

import { cleanup, render } from '@testing-library/react-native';

afterEach(cleanup);

describe('Testing that home component is rendered and can press on settings, learn more and daily streak', () => {
  const extraData = { 'id': 1, 'fullName': 'John Doe' };
  const homeRender = render(<Home  extraData={extraData} />).toJSON();
  
  it('Checks to see if the Home page renders', () => {
      expect(homeRender).toMatchSnapshot();
  });

});