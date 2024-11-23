import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/store';

test('renders TodoCard', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const headingElement = screen.getByText(/todos/i);
  expect(headingElement).toBeInTheDocument();
});
