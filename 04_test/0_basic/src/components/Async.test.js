import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async component", () => {
  test("renders posts if request succeeds", async () => {
    // fecth 함수를 mock 으로 만든다.
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{id: 'p1', title: 'First post'}]
    });
    render(<Async />);

    const listItemElements = await screen.findAllByRole("listitem", {}, {});
    // console.log(listItemElements.length);
    expect(listItemElements).not.toHaveLength(0);
  });
});
