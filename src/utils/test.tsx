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
