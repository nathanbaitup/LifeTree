// https://keyholesoftware.com/2020/11/02/using-jest-and-testing-library-with-react-native-part-1-setting-up/
// helped with setting up testing.

import 'react-native';
import React from 'react';
import Loading from '../../src/components/utils/Loading';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Checks to see if the Loading Page renders', () => {
  const tree = renderer.create(<Loading />).toJSON();
  expect(tree).toMatchSnapshot();
});