import { render, screen } from '@/__tests__/test-utils';
import userEvent from '@testing-library/user-event';
import TrailersSection from '../TrailersSection';
import { Video } from '@/types/movie';

const mockTrailers: Video[] = [
  {
    id: '1',
    key: 'key1',
    name: 'Trailer 1',
    site: 'YouTube',
    type: 'Trailer',
  },
  {
    id: '2',
    key: 'key2',
    name: 'Trailer 2',
    site: 'YouTube',
    type: 'Trailer',
  },
  {
    id: '3',
    key: 'key3',
    name: 'Trailer 3',
    site: 'YouTube',
    type: 'Trailer',
  },
];

describe('TrailersSection', () => {
  it('should return null when trailers array is empty', () => {
    const { container } = render(<TrailersSection trailers={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render TRAILERS heading', () => {
    render(<TrailersSection trailers={mockTrailers} />);
    expect(screen.getByText('TRAILERS')).toBeInTheDocument();
  });

  it('should render only first 2 trailers', () => {
    render(<TrailersSection trailers={mockTrailers} />);
    expect(screen.getByText('Play trailer 1')).toBeInTheDocument();
    expect(screen.getByText('Play trailer 2')).toBeInTheDocument();
    expect(screen.queryByText('Play trailer 3')).not.toBeInTheDocument();
  });

  it('should open video modal when trailer button is clicked', async () => {
    const user = userEvent.setup();
    render(<TrailersSection trailers={mockTrailers} />);

    const trailer1Button = screen.getByText('Play trailer 1');
    await user.click(trailer1Button);

    // VideoModal should be rendered with the first trailer
    expect(screen.getByTitle('Trailer 1')).toBeInTheDocument();
  });

  it('should open correct trailer in modal', async () => {
    const user = userEvent.setup();
    render(<TrailersSection trailers={mockTrailers} />);

    const trailer2Button = screen.getByText('Play trailer 2');
    await user.click(trailer2Button);

    expect(screen.getByTitle('Trailer 2')).toBeInTheDocument();
    expect(screen.getByTitle('Trailer 2')).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/key2?autoplay=1'
    );
  });

  it('should close modal when close is triggered', async () => {
    const user = userEvent.setup();
    render(<TrailersSection trailers={mockTrailers} />);

    // Open modal
    const trailer1Button = screen.getByText('Play trailer 1');
    await user.click(trailer1Button);
    expect(screen.getByTitle('Trailer 1')).toBeInTheDocument();

    // Close modal
    const closeButton = screen.getByLabelText('Close');
    await user.click(closeButton);
    expect(screen.queryByTitle('Trailer 1')).not.toBeInTheDocument();
  });

  it('should handle single trailer', () => {
    render(<TrailersSection trailers={[mockTrailers[0]]} />);
    expect(screen.getByText('Play trailer 1')).toBeInTheDocument();
    expect(screen.queryByText('Play trailer 2')).not.toBeInTheDocument();
  });
});

