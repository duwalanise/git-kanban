import { render, screen } from '@testing-library/react';
import App from './';
import { useStore } from '../Store';

jest.mock('../Store');

describe('Container/index.tsx', () => {
  const fetch = jest.fn();
  beforeEach(() => {
    (useStore as jest.Mock).mockImplementation(() => ({
      issues: {
        fetch,
      },
    }));
  });
  test('renders app', () => {
    render(<App />);
    const app = screen.getByTestId('container');
    expect(app).toBeInTheDocument();
  });
});
