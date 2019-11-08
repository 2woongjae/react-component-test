import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "./Button";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";

jest.useFakeTimers();

describe("Button 컴포넌트 (@testing-library/react)", () => {
  it("컴포넌트가 정상적으로 생성된다.", () => {
    render(<Button />);
  });

  it(`버튼 엘리먼트에 써있는 텍스트는 "button" 이다.`, () => {
    const { getByText } = render(<Button />);

    const button = getByText("button");
    expect(button.innerHTML).toBe("button");
  });

  it(`버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다.`, () => {
    const { getByText } = render(<Button />);

    const button = getByText("button");
    fireEvent.click(button);

    const p = getByText("버튼이 방금 눌렸다.");
    expect(p).not.toBeNull();
    expect(p).toBeInstanceOf(HTMLParagraphElement);
  });

  it(`버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
    const { getByText } = render(<Button />);

    const p = getByText("버튼이 눌리지 않았다.");
    expect(p).not.toBeNull();
    expect(p).toBeInstanceOf(HTMLParagraphElement);
  });

  it(`버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
    const { getByText } = render(<Button />);

    const button = getByText("button");
    fireEvent.click(button);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    const p = getByText("버튼이 눌리지 않았다.");
    expect(p).not.toBeNull();
    expect(p).toBeInstanceOf(HTMLParagraphElement);
  });

  it(`버튼을 클릭하면, 5초 동안 버튼이 비활성화 된다.`, () => {
    const { getByText } = render(<Button />);

    const button = getByText("button");
    fireEvent.click(button);

    expect(button).toBeDisabled();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(button).not.toBeDisabled();
  });
});
