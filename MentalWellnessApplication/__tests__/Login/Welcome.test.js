import 'react-native';
import React from 'react';
import Welcome from '../../src/components/pages/Login/Welcome';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Checks to see if the Welcome page renders', () => {
  const tree = renderer.create(<Welcome />).toJSON();
  expect(tree).toMatchSnapshot();
});