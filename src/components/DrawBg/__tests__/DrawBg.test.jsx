import { render, fireEvent, screen } from '@testing-library/react';
import DrawBg from '../DrawBg';

// Mock canvas operations
const mockContext = {
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
};

const mockCanvas = {
  getContext: () => mockContext,
  getBoundingClientRect: () => ({
    width: 1000,
    height: 1000,
    left: 0,
    top: 0,
  }),
};

describe('DrawBg', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock canvas element
    HTMLCanvasElement.prototype.getContext = () => mockContext;
    HTMLCanvasElement.prototype.getBoundingClientRect = () => ({
      width: 1000,
      height: 1000,
      left: 0,
      top: 0,
    });
  });

  it('renders children', () => {
    render(
      <DrawBg>
        <div data-testid="child">Test Content</div>
      </DrawBg>
    );
    
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders splash emoji', () => {
    render(<DrawBg />);
    
    expect(screen.getByText('🎉')).toBeInTheDocument();
  });

  it('creates splash particles on emoji click', () => {
    render(<DrawBg />);
    
    const splashEmoji = screen.getByText('🎉');
    fireEvent.click(splashEmoji);
    
    // Verify that canvas operations were called
    expect(mockContext.clearRect).toHaveBeenCalled();
    expect(mockContext.beginPath).toHaveBeenCalled();
  });
}); 