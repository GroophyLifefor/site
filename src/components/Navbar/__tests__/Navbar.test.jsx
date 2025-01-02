import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

describe('Navbar', () => {
  it('renders back to home link', () => {
    render(<Navbar />);
    
    const link = screen.getByText('Back to home');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/');
  });

  it('has correct styling classes', () => {
    render(<Navbar />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('bg-background', 'brightness-[.97]', 'px-4', 'py-2', 'rounded-lg', 'shadow-sm', 'mb-4');
  });
}); 