// https://keyholesoftware.com/2020/11/02/using-jest-and-testing-library-with-react-native-part-1-setting-up/
// helped with setting up testing.

import 'react-native';
import React from 'react';
import ViewSingleEntry from '../../src/components/pages/Entries/ViewSingleEntry';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Checks to see if the View Single Entry Page renders', () => {
  const tree = renderer.create(<ViewSingleEntry />).toJSON();
  expect(tree).toMatchSnapshot();
});