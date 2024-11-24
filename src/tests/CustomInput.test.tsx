import { render, screen, fireEvent } from '@testing-library/react';
import { CustomInput } from '../components';

describe('CustomInput Component', () => {
  const mockOnChange = jest.fn();

  it('renders with the correct placeholder', () => {
    render(
      <CustomInput
        onChange={mockOnChange}
        placeholder='Enter text'
        value=''
      />
    );
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('calls onChange handler when typing', () => {
    render(
      <CustomInput
        onChange={mockOnChange}
        placeholder='Enter text'
        value=''
      />
    );
    const input = screen.getByPlaceholderText('Enter text');
    fireEvent.change(input, { target: { value: 'New value' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
