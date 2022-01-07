import 'react-native';
import React from 'react';
import Home from '../../src/components/pages/HomeScreen/Home';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Checks to see if the Home page renders', () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});