import 'react-native';
import React from 'react';
import CreateAccount, {checkPassword} from '../../src/components/pages/Login/CreateAccount';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import { cleanup, render, fireEvent } from '@testing-library/react-native';

afterEach(cleanup);

describe('Checks <CreateAccount> and its functions', () => {

  const fakeNavigation = {
    navigate: jest.fn(),
  };

  it('Checks to see if the Create Account page renders', () => {
    const tree = renderer.create(<CreateAccount />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should say Welcome', () => {
    const title = 'Welcome to LifeTree';
    const { getByText } = render(<CreateAccount />);

    const foundTitleText = getByText(title);
    expect(foundTitleText.props.children).toEqual(title);
  });

  it('Find button from accessibility label and testID', () => {
    const { getByA11yLabel, getByTestId } = render(<CreateAccount />);
    const accessibilityLabel = 'Create Account Button';
    const testIdName = 'createAccountButton';
    const createAccountButton = getByA11yLabel(accessibilityLabel);
    const buttonID = getByTestId(testIdName);

    expect(createAccountButton).toBeTruthy();
    expect(buttonID).toBeTruthy();
  });

  it('Checks if text inputs recieve data.', () => {
    const { getByTestId } = render(<CreateAccount />);
    const fullNameTestID = 'fullNameInput';
    const emailTestID = 'emailInput';
    const passwordTestID = 'passwordInput';
    const fullNameInput = getByTestId(fullNameTestID);
    const emailInput = getByTestId(emailTestID);
    const passwordInput = getByTestId(passwordTestID);

    fireEvent.changeText(fullNameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');

    expect(fullNameInput.props.value).toEqual('John Doe');
    expect(emailInput.props.value).toEqual('test@example.com');
    expect(passwordInput.props.value).toEqual('password');
  });

  it('Checks that a password is valid', () => {
    const badPassword = 'bad';
    const goodPassword = '@GoodPassword1';
    expect(checkPassword(badPassword)).toBeFalsy();
    expect(checkPassword(goodPassword)).toBeTruthy();
  });

  it('Test navigation to welcomepage', () => {
    const welcomeID = 'welcomeLink';
    const { getByTestId } = render(<CreateAccount navigation={fakeNavigation} />);

    fireEvent(getByTestId(welcomeID), 'press');
    expect(fakeNavigation.navigate).toBeCalledWith('Welcome');
  });

});
