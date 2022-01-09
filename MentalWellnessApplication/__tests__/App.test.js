// https://keyholesoftware.com/2020/11/02/using-jest-and-testing-library-with-react-native-part-1-setting-up/
// helped with setting up testing.

import 'react-native';
import React from 'react';
import App from '../src/components/App';

import renderer from 'react-test-renderer';

describe('Checks if <App> renders correctly with and without user data', () => {
  it('Checks to see if the App renders', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
