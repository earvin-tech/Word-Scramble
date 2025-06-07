import { render, screen, fireEvent } from '@testing-library/react';
import App from './App'; 
import { vi } from 'vitest';

// mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ id: 'test-id', scrambled: 'taple' }),
  })
);

test('submits a guess and shows feedback', async () => {
  render(<App />);

  // Wait for word to appear
  const input = await screen.findByPlaceholderText(/Your guess/i);

  fireEvent.change(input, { target: { value: 'plate' } });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

});