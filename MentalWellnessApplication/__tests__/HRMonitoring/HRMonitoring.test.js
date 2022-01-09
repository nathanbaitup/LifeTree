// https://keyholesoftware.com/2020/11/02/using-jest-and-testing-library-with-react-native-part-1-setting-up/
// helped with setting up testing.

import 'react-native';
import React from 'react';
import HRMonitoring from '../../src/components/pages/HRMonitoring/HRMonitoring';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Checks to see if the Heart Monitoring page renders', () => {
  const tree = renderer.create(<HRMonitoring />).toJSON();
  expect(tree).toMatchSnapshot();
});