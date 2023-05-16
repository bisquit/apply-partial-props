import { describe, test } from 'vitest';
import { createFakeProvider } from '../src/create-fake-provider';

describe.skip('create-fake-provider', () => {
  test('empty object', async () => {
    const provider = () => {
      return {};
    };

    createFakeProvider<typeof provider>(() => {
      return {};
    });
  });

  test('null', async () => {
    const provider = () => {
      return null;
    };

    createFakeProvider<typeof provider>(() => {
      return null;
    });

    // throw type error
  });

  test('example', async () => {
    const provider = () => {
      return { arg1: 1, arg2: '1' };
    };

    createFakeProvider<typeof provider>(() => {
      return {
        arg1: 2,
        arg2: '2',
      };
    });
  });

  test('over provide', async () => {
    const provider = () => {
      return { arg1: 1, arg2: '1' };
    };

    createFakeProvider<typeof provider>(() => {
      return {
        arg1: 2,
        arg2: '2',
        arg3: '3',
      };
    });

    // throw type error
  });
});
