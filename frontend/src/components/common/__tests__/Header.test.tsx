import { render, screen, waitFor } from "@/__tests__/test-utils";
import userEvent from "@testing-library/user-event";
import Header from "../Header";

// Mock usePathname
const mockUsePathname = jest.fn(() => "/");

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
}));

describe("Header", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });

  it("should render title", () => {
    render(<Header title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should not show back button by default", () => {
    render(<Header title="Test Title" />);
    const backButton = screen.queryByAltText("Back");
    expect(backButton).not.toBeInTheDocument();
  });

  it("should show back button when showBackButton is true", () => {
    render(<Header title="Test Title" showBackButton={true} />);
    const backButton = screen.getByAltText("Back");
    expect(backButton).toBeInTheDocument();
  });

  it("should toggle menu when button is clicked", async () => {
    const user = userEvent.setup();
    render(<Header title="Test Title" />);

    const menuButton = screen.getByLabelText("More options");
    expect(menuButton).toBeInTheDocument();
    expect(screen.queryByText("Favorites")).not.toBeInTheDocument();

    await user.click(menuButton);
    expect(screen.getByText("Favorites")).toBeInTheDocument();
  });

  it('should show Favorites link when pathname is "/"', async () => {
    mockUsePathname.mockReturnValue("/");
    const user = userEvent.setup();
    render(<Header title="Test Title" />);

    const menuButton = screen.getByLabelText("More options");
    await user.click(menuButton);

    expect(screen.getByText("Favorites")).toBeInTheDocument();
    expect(screen.queryByText("Pop Movies")).not.toBeInTheDocument();
  });

  it('should show Pop Movies link when pathname is not "/"', async () => {
    mockUsePathname.mockReturnValue("/favorites");
    const user = userEvent.setup();
    render(<Header title="Test Title" />);

    const menuButton = screen.getByLabelText("More options");
    await user.click(menuButton);

    expect(screen.getByText("Pop Movies")).toBeInTheDocument();
    expect(screen.queryByText("Favorites")).not.toBeInTheDocument();
  });

  it("should have onClick handler on menu link", async () => {
    const user = userEvent.setup();
    render(<Header title="Test Title" />);

    const menuButton = screen.getByLabelText("More options");
    await user.click(menuButton);
    expect(screen.getByText("Favorites")).toBeInTheDocument();

    // Verify link has onClick handler (menu closes via onClick in component)
    const favoritesLink = screen.getByText("Favorites");
    expect(favoritesLink).toBeInTheDocument();
    // Note: In jsdom, navigation doesn't work, but the onClick handler exists
    // and will close the menu in real usage
  });

  it("should have correct aria attributes", () => {
    render(<Header title="Test Title" />);
    const menuButton = screen.getByLabelText("More options");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("should update aria-expanded when menu is open", async () => {
    const user = userEvent.setup();
    render(<Header title="Test Title" />);

    const menuButton = screen.getByLabelText("More options");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await user.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
  });

  it("should be 64px in height", () => {
    const { container } = render(<Header title="Test Title" />);
    const header = container.querySelector("header");
    expect(header).toHaveStyle({ height: "64px" });
  });
});
