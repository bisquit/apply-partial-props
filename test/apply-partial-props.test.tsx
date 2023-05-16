import { describe, expect, test, vi } from 'vitest';
import { applyPartialProps } from '../src';

describe('apply-partial-props', () => {
  test('apply props', async () => {
    const propsSpy = vi.fn();
    const component = (props: {
      arg1: number;
      arg2?: string;
      arg3?: () => void;
    }) => {
      propsSpy(props);
      return <></>;
    };
    const provider = () => {
      return {
        arg2: '2',
      };
    };

    const component2 = applyPartialProps(component)(provider);
    component2({ arg1: 1 });

    expect(propsSpy).toHaveBeenCalledWith({
      arg1: 1,
      arg2: '2',
    });

    propsSpy.mockClear();

    const arg3Fn = () => {};
    const component3 = applyPartialProps(component2)(() => ({
      arg3: arg3Fn,
    }));
    component3({ arg1: 1 });

    expect(propsSpy).toHaveBeenCalledWith({
      arg1: 1,
      arg2: '2',
      arg3: arg3Fn,
    });

    propsSpy.mockClear();
  });

  // test('async provider', async () => {
  //   const propsSpy = vi.fn();
  //   const component = (props: {
  //     arg1: number;
  //     arg2?: string;
  //     arg3?: () => void;
  //   }) => {
  //     propsSpy(props);
  //     return <></>;
  //   };
  //   const provider = async () => {
  //     return {
  //       arg2: '2',
  //     };
  //   };

  //   const component2 = applyPartialProps(component)(provider);
  //   component2({ arg1: 1 });
  // })
});
