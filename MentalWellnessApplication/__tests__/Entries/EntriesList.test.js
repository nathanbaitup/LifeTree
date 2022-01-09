// https://keyholesoftware.com/2020/11/02/using-jest-and-testing-library-with-react-native-part-1-setting-up/
// helped with setting up testing.

import 'react-native';
import React from 'react';
import EntriesList from '../../src/components/pages/Entries/EntriesList';

import { cleanup, render } from '@testing-library/react-native';

afterEach(cleanup);

describe('Check that the entries list is rendered and elements are displayed.', () => {
  const extraData = { 'id': 1, 'fullName': 'John Doe' };
  const entriesListRender = render(<EntriesList  extraData={extraData} />).toJSON();
  
  it('Checks to see if the Home page renders', () => {
      expect(entriesListRender).toMatchSnapshot();
  });

});