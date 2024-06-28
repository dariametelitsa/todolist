import React from 'react';
import { render, screen } from '@testing-library/react';
import AppWithRedux, { sum } from './components/appWithRedux/AppWithRedux';

test('renders learn react link', () => {
  const { getByText } = render(<AppWithRedux />);
  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
  render(<AppWithRedux />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('sum should be correct', () => {
  let a = 2;
  let b = 3;
  let c = 5;

  const result1 = sum(a,b);
  const result2 = sum(a,c);

  expect(result1).toBe(5);
  expect(result2).toBe(7);
})