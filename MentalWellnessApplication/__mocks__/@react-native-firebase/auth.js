// REFERENCE ACCESSED 06/01/2022 https://github.com/invertase/react-native-firebase/issues/3035#issuecomment-629479680
// Used to create a mock file for firebase for tests to work correctly.

export default () => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    onAuthStateChanged: jest.fn(),
    updateProfile: jest.fn(),
    signOut: jest.fn(),
  });