import 'react-native';
import React from 'react';
import CreateAccount from '../../src/components/pages/Login/CreateAccount';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Checks to see if the Create Account page renders', () => {
  const tree = renderer.create(<CreateAccount />).toJSON();
  expect(tree).toMatchSnapshot();
});