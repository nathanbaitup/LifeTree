// https://keyholesoftware.com/2020/11/02/using-jest-and-testing-library-with-react-native-part-1-setting-up/
// helped with setting up testing.

import 'react-native';
import React from 'react';
import Welcome, { checkEmail } from '../../src/components/pages/Login/Welcome';

import renderer from 'react-test-renderer';

import { cleanup, render, fireEvent } from '@testing-library/react-native';

afterEach(cleanup);

describe('Tests <Welcome> component and functions inside', () => {

  const fakeNavigation = {
    navigate: jest.fn(),
  };

  it('Checks to see if the Welcome page renders', () => {
    const tree = renderer.create(<Welcome />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should say Welcome', () => {
    const title = 'Welcome to LifeTree';
    const { getByText } = render(<Welcome />);
    const foundTitleText = getByText(title);

    expect(foundTitleText.props.children).toEqual(title);
  });

  it('Find button from accessibility label and testID', () => {
    const { getByA11yLabel, getByTestId } = render(<Welcome />);
    const accessibilityLabel = 'Log In button';
    const testIdName = 'loginButton';
    const loginButton = getByA11yLabel(accessibilityLabel);
    const buttonID = getByTestId(testIdName);

    expect(loginButton).toBeTruthy();
    expect(buttonID).toBeTruthy();
  });

  it('Checks if email and password text inputs recieve data', async () => {
    const { getByTestId } = render(<Welcome />);
    const emailTestID = 'emailInput';
    const passwordTestID = 'passwordInput';
    const emailInput = getByTestId(emailTestID);
    const passwordInput = getByTestId(passwordTestID);

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');

    expect(emailInput.props.value).toEqual('test@example.com');
    expect(passwordInput.props.value).toEqual('password');
  });

  it('Checks that an email is valid', () => {
    const badEmail = 'bad';
    const goodEmail = 'test@test.com';
    expect(checkEmail(badEmail)).toBeFalsy();
    expect(checkEmail(goodEmail)).toBeTruthy();
  });

  it('Test navigation to create account page', () => {
    const createAccountID = 'createAccountLink';
    const { getByTestId } = render(<Welcome navigation={fakeNavigation} />);

    fireEvent(getByTestId(createAccountID), 'press');
    expect(fakeNavigation.navigate).toBeCalledWith('CreateAccount');
  });


});
