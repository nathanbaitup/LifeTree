import 'react-native';
import React from 'react';
import EntriesList from '../../src/components/pages/Entries/EntriesList';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Checks to see if the Entires List page renders', () => {
  const tree = renderer.create(<EntriesList />).toJSON();
  expect(tree).toMatchSnapshot();
});