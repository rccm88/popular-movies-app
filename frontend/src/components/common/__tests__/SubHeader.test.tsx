import { render, screen } from '@/__tests__/test-utils';
import SubHeader from '../SubHeader';

describe('SubHeader', () => {
  it('should render title', () => {
    render(<SubHeader title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should render different titles', () => {
    const { rerender } = render(<SubHeader title="First Title" />);
    expect(screen.getByText('First Title')).toBeInTheDocument();

    rerender(<SubHeader title="Second Title" />);
    expect(screen.getByText('Second Title')).toBeInTheDocument();
  });

  it('should render title in h2 element', () => {
    render(<SubHeader title="Test Title" />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Test Title');
  });
});

