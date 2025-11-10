import { render, screen } from '@/__tests__/test-utils';
import DescriptionSection from '../DescriptionSection';

describe('DescriptionSection', () => {
  it('should render overview text', () => {
    const overview = 'This is a test movie overview.';
    render(<DescriptionSection overview={overview} />);
    expect(screen.getByText(overview)).toBeInTheDocument();
  });

  it('should render empty overview', () => {
    const { container } = render(<DescriptionSection overview="" />);
    const paragraph = container.querySelector('p');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph?.textContent).toBe('');
  });

  it('should render long overview text', () => {
    const longOverview = 'A'.repeat(500);
    render(<DescriptionSection overview={longOverview} />);
    expect(screen.getByText(longOverview)).toBeInTheDocument();
  });
});

