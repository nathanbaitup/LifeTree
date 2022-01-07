import 'react-native';
import React from 'react';
import Settings from '../../src/components/pages/Settings/Settings';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Checks to see if the Settings page renders', () => {
  const tree = renderer.create(<Settings />).toJSON();
  expect(tree).toMatchSnapshot();
});