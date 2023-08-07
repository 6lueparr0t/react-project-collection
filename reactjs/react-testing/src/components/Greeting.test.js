import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Greeting from "./Greeting";

describe('Greeting component', () => {
  test('renders "Hello World" as a text', () => {
    // Arrange, 준비
    render(<Greeting />);

    // Act, 실행
    // ... nothing

    // Assert, 판단
    // screen.getByText("Hello World", { exact: true }); // default
    const helloWorldElement = screen.getByText("Hello World", { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });

  test('renders "good to see you" if the button was NOT clicked', () => {
    // Arrange, 준비
    render(<Greeting />);

    // Act, 실행
    // ... nothing

    // Assert, 판단
    const outputElement = screen.getByText("good to see you", { exact: false });
    expect(outputElement).toBeInTheDocument();
  });


  test('renders "Changed" if the button was clicked', () => {
    // Arrange, 준비
    render(<Greeting />);

    // Act, 실행
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement)

    // Assert, 판단
    const outputElement = screen.getByText("Changed!" );
    expect(outputElement).toBeInTheDocument();
  });

  test('does not render "good to see you" if the button was clicked', () => {
    // Arrange, 준비
    render(<Greeting />);

    // Act, 실행
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement)

    // Assert, 판단
    const outputElement = screen.queryByText("good to see you" );
    expect(outputElement).not.toBeInTheDocument();
  });
});
