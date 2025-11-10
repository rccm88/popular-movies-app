import { render, RenderOptions } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

// Custom render function that includes any providers
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { ...options });

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { customRender as render };

