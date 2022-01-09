// REFERENCE ACCESSED 06/01/2022 https://stackoverflow.com/a/52100382
// Used to mock firestore.

'use strict';

const collection = jest.fn(() => {
  return {
    doc: jest.fn(() => {
      return {
        collection: collection,
        update: jest.fn(() => Promise.resolve(true)),
        onSnapshot: jest.fn(() => Promise.resolve(true)),
        get: jest.fn(() => Promise.resolve(true))
      };
    }),
    where: jest.fn(() => {
      return {
        get: jest.fn(() => Promise.resolve(true)),
        onSnapshot: jest.fn(() => Promise.resolve(true)),
      };
    })
  };
});

const Firestore = () => {
  return {
    collection
  };
};

Firestore.FieldValue = {
  serverTimestamp: jest.fn()
};

export default Firestore;