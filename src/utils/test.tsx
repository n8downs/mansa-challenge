import {
  render as rtlRender,
  RenderOptions as RtlRenderOptions,
  RenderResult,
} from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';

export * from '@testing-library/react';

type RenderOptions = { history?: MemoryHistory } & RtlRenderOptions;

export function render(
  ui: React.ReactElement,
  options: RenderOptions = {}
): RenderResult {
  const { history, ...rtlOptions } = options;
  const Wrapper = ({ children }: { children?: React.ReactNode }) => (
    <Router history={history || createMemoryHistory()}>{children}</Router>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...rtlOptions });
}

export class FetchMock {
  _responses: Array<{ url: string; response: Response | Error }>;

  constructor() {
    this._responses = [];
    jest.spyOn(global, 'fetch').mockImplementation(async (url) => {
      const response = this._responses.find(
        ({ url: configUrl }) => configUrl === url
      )?.response;
      if (!response) {
        return new Promise((resolve, reject) => {});
      } else if (response instanceof Error) {
        throw response;
      } else {
        return response;
      }
    });
  }

  mockResponse(url: string, bodyOrError: string | Error, init?: ResponseInit) {
    this._responses.push({
      url,
      response:
        bodyOrError instanceof Error
          ? bodyOrError
          : new Response(
              new Blob([bodyOrError], { type: 'application/json' }),
              init
            ),
    });
  }
}
