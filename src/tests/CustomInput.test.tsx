import { render, screen, fireEvent } from '@testing-library/react';
import { CustomInput } from '../components';

describe('CustomInput Component', () => {
  const mockOnChange = jest.fn();
  const mockHandleKeyPress = jest.fn();

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

  it('calls handleKeyPress handler when a key is pressed', () => {
    render(
      <CustomInput
        onChange={mockOnChange}
        placeholder='Enter text'
        value=''
      />
    );
    const input = screen.getByPlaceholderText('Enter text');

    input.focus();
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    console.log(mockHandleKeyPress.mock.calls); 

    expect(mockHandleKeyPress).toHaveBeenCalledTimes(1);
  });
});
