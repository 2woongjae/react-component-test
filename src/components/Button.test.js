import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import Button from "./Button";
import { act } from "react-dom/test-utils";

jest.useFakeTimers();

describe("Button 컴포넌트", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("컴포넌트가 정상적으로 생성된다.", () => {
    act(() => {
      render(<Button />, container);
    });
  });

  it(`버튼 엘리먼트에 써있는 텍스트는 "button" 이다.`, () => {
    act(() => {
      render(<Button />, container);
    });

    const button = container.querySelector("button");
    expect(button.innerHTML).toBe("button");
  });

  it(`버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다.`, () => {
    act(() => {
      render(<Button />, container);
    });

    act(() => {
      const button = container.querySelector("button");
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const p = container.querySelector("p");
    expect(p.innerHTML).toBe("버튼이 방금 눌렸다.");
  });

  it(`버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
    act(() => {
      render(<Button />, container);
    });

    const p = container.querySelector("p");
    expect(p.innerHTML).toBe("버튼이 눌리지 않았다.");
  });

  it(`버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
    act(() => {
      render(<Button />, container);
      container
        .querySelector("button")
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
      jest.advanceTimersByTime(5000);
    });

    const p = container.querySelector("p");
    expect(p.innerHTML).toBe("버튼이 눌리지 않았다.");
  });

  it(`버튼을 클릭하면, 5초 동안 버튼이 비활성화 된다.`, () => {
    act(() => {
      render(<Button />, container);
    });
    const button = container.querySelector("button");
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(button.disabled).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(button.disabled).toBeFalsy();
  });
});
