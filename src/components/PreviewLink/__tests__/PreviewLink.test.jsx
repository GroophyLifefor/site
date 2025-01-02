import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PreviewLink from '../PreviewLink';
import { BlurProvider } from '../../BlurLayer/BlurLayer';

// Mock the fetch function
global.fetch = jest.fn();

describe('PreviewLink', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders link with children', () => {
    render(
      <BlurProvider>
        <PreviewLink href="/test">Test Link</PreviewLink>
      </BlurProvider>
    );
    
    expect(screen.getByText('Test Link')).toBeInTheDocument();
  });

  it('shows loading state on hover', async () => {
    render(
      <BlurProvider>
        <PreviewLink href="/test">Test Link</PreviewLink>
      </BlurProvider>
    );

    fireEvent.mouseEnter(screen.getByText('Test Link'));
    
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });
}); 