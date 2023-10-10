import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSmartphones } from "./useSmartphones";

// Mock the useFetch hook
jest.mock("./useFetch", () => ({
  useFetch: jest.fn(() => ({ response: [] })), // Replace with your mock data
}));

describe("useSmartphones", () => {
  it("should set and get manufacturer and storage values", () => {
    const TestComponent = () => {
      const { manufacturer, storage, setManufacturer, setStorage } =
        useSmartphones();

      return (
        <div>
          <span data-testid="manufacturer">{manufacturer}</span>
          <span data-testid="storage">{storage}</span>
          <button onClick={() => setManufacturer("Apple")}>
            Set Manufacturer
          </button>
          <button onClick={() => setStorage("64GB")}>Set Storage</button>
        </div>
      );
    };

    render(<TestComponent />);

    const manufacturerSpan = screen.getByTestId("manufacturer");
    const storageSpan = screen.getByTestId("storage");
    const setManufacturerButton = screen.getByText("Set Manufacturer");
    const setStorageButton = screen.getByText("Set Storage");

    expect(manufacturerSpan.textContent).toBe("");
    expect(storageSpan.textContent).toBe("");

    act(() => {
      userEvent.click(setManufacturerButton);
    });

    act(() => {
      userEvent.click(setStorageButton);
    });

    expect(manufacturerSpan.textContent).toBe("Apple");
    expect(storageSpan.textContent).toBe("64GB");
  });
});
