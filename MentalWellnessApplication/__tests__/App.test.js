import 'react-native';
import React from 'react';
import App from '../src/components/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Checks to see if the App renders', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
