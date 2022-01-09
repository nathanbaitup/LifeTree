// https://keyholesoftware.com/2020/11/02/using-jest-and-testing-library-with-react-native-part-1-setting-up/
// helped with setting up testing.

import 'react-native';
import React from 'react';
import MoodJournal from '../../src/components/pages/MoodJournal/MoodJournal';

import { cleanup, render } from '@testing-library/react-native';

afterEach(cleanup);

describe('Testing that mood journal is rendered', () => {
  const extraData = { 'id': 1, 'fullName': 'John Doe' };
  const moodJournalRender = render(<MoodJournal extraData={extraData} />).toJSON();

  it('Checks to see if the Home page renders', () => {
    expect(moodJournalRender).toMatchSnapshot();
  });

  it('Checks if the key renders', () => {
    const {getByTestId} = render(<MoodJournal extraData={extraData} />);
    const keyText = getByTestId('keyID');
    expect(keyText.props.children).toEqual('Mood Key:');
  });

  it('Checks if the calendar renders', () => {
  const {getByTestId} = render(<MoodJournal extraData={extraData} />);
  const calendar = getByTestId('calendarID');
  expect(calendar.type).toEqual('View');
  });

});