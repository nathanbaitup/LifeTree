import 'react-native';
import React from 'react';
import AddNewEntry from '../../src/components/pages/Entries/AddNewEntry';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Checks to see if the Add New Entry page renders', () => {
  const tree = renderer.create(<AddNewEntry />).toJSON();
  expect(tree).toMatchSnapshot();
});