import { render, screen } from '@testing-library/react';
import App from '.';

test('renders app', () => {
  render(<App />);
  const app = screen.getByText(/Hello/i);
  expect(app).toBeInTheDocument();
});
