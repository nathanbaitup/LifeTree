// https://keyholesoftware.com/2020/11/02/using-jest-and-testing-library-with-react-native-part-1-setting-up/
// helped with setting up testing.

import 'react-native';
import React from 'react';
import AddNewEntry from '../../src/components/pages/Entries/AddNewEntry';

import { cleanup, render, fireEvent } from '@testing-library/react-native';

afterEach(cleanup);

describe('Check that the add new entry page is rendered and elements are displayed and updateable.', () => {
  const extraData = { 'id': 1, 'fullName': 'John Doe' };
  const addNewEntryRender = render(<AddNewEntry  extraData={extraData} />).toJSON();
  
  
  it('Checks to see if the Home page renders', () => {
      expect(addNewEntryRender).toMatchSnapshot();
  });

  it('Checks to see if the moods are displayed.', () => {
    const {getByTestId} = render(<AddNewEntry extraData={extraData} />);
    const happyRender = getByTestId('happy');
    const mehRender = getByTestId('meh');
    const sadRender = getByTestId('sad');
    const angryRender = getByTestId('angry');

    expect(happyRender.type).toBe('Image');
    expect(mehRender.type).toBe('Image');
    expect(sadRender.type).toBe('Image');
    expect(angryRender.type).toBe('Image');
    
  });

  it('Checks to see if the journal and obsession inputs are displayed.', () => {
    const {getByTestId} = render(<AddNewEntry extraData={extraData} />);

    const journalID = getByTestId('journalInput');
    const obsessionID = getByTestId('obsessionInput');

    const journalPlaceholder = 'Feel free to dump as much or as little information in here as you want. We wont judge you. We promise! ';
    const obsessionPlaceholder = 'Enter your random obsession here!';
    
    expect(journalID.props.placeholder).toBe(journalPlaceholder);
    expect(obsessionID.props.placeholder).toBe(obsessionPlaceholder);


  });

  it('Checks to see if the date is displayed and set to the current date.', () => {
    const {getByTestId} = render(<AddNewEntry extraData={extraData} />);
    const date = new Date();
    const displayDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric'});
    const dateRendered = getByTestId('dateID');

    expect(dateRendered.props.children[1]).toBe(displayDate);
  });

  it('Checks to see if the submit button is accessible via accessibility label and ID.', () => {
    const {getByTestId, getByA11yLabel} = render(<AddNewEntry extraData={extraData} />);
    const submitButton = getByA11yLabel('Submit Button');
    const buttonID = getByTestId('submitBTN');

    expect(submitButton).toBeTruthy();
    expect(buttonID).toBeTruthy();
  });

  it('Update the journal entry and obsession entry to contain text.', () => {
    const {getByTestId} = render(<AddNewEntry extraData={extraData} />);
    const journalInput = getByTestId('journalInput');
    const obsessionInput = getByTestId('obsessionInput');
    // Expect a blank entry when first loading the page.
    expect(journalInput.props.value).toEqual('');
    expect(obsessionInput.props.value).toEqual('');

    // Add values to inputs.
    fireEvent.changeText(journalInput, 'Test journal entry');
    fireEvent.changeText(obsessionInput, 'Test obsession entry');

    // Expect values to be stored in the inputs.
    expect(journalInput.props.value).toEqual('Test journal entry');
    expect(obsessionInput.props.value).toEqual('Test obsession entry');
  });

});
