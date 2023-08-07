import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe('Async component', () => {
  test('renders posts if request succeeds', () => {
    render(<Async />);

    const listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements).not.toHaveLength(0);
  });
})