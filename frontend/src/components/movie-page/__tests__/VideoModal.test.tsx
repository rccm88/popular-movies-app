import { render, screen } from '@/__tests__/test-utils';
import userEvent from '@testing-library/user-event';
import VideoModal from '../VideoModal';
import { Video } from '@/types/movie';

const mockVideo: Video = {
  id: '1',
  key: 'test-key-123',
  name: 'Test Trailer',
  site: 'YouTube',
  type: 'Trailer',
};

describe('VideoModal', () => {
  it('should return null when video is null', () => {
    const { container } = render(<VideoModal video={null} onClose={jest.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render modal when video is provided', () => {
    render(<VideoModal video={mockVideo} onClose={jest.fn()} />);
    expect(screen.getByTitle('Test Trailer')).toBeInTheDocument();
  });

  it('should render YouTube iframe with correct src', () => {
    render(<VideoModal video={mockVideo} onClose={jest.fn()} />);
    const iframe = screen.getByTitle('Test Trailer');
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/test-key-123?autoplay=1'
    );
  });

  it('should call onClose when backdrop is clicked', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    render(<VideoModal video={mockVideo} onClose={onClose} />);

    const backdrop = screen.getByLabelText('Close video modal');
    await user.click(backdrop);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when close button is clicked', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    render(<VideoModal video={mockVideo} onClose={onClose} />);

    const closeButton = screen.getByLabelText('Close');
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when Escape key is pressed', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    render(<VideoModal video={mockVideo} onClose={onClose} />);

    const backdrop = screen.getByLabelText('Close video modal');
    backdrop.focus();
    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should render iframe with correct attributes', () => {
    render(<VideoModal video={mockVideo} onClose={jest.fn()} />);
    const iframe = screen.getByTitle('Test Trailer');
    expect(iframe).toHaveAttribute('allowFullScreen');
    expect(iframe).toHaveAttribute(
      'allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
    );
  });
});

