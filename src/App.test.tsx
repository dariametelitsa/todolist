import React from 'react';
import { render } from '@testing-library/react';
import App, { sum } from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('sum should be correct', () => {
  let a = 2;
  let b = 3;
  let c = 5;

  const result = sum(a,b);

  expect(result).toBe(5);
})