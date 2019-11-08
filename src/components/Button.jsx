import React, { useState, useEffect } from "react";

let timer = null;

export default function Button() {
  const [text, setText] = useState("버튼이 눌리지 않았다.");
  function click() {
    setText("버튼이 방금 눌렸다.");
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      setText("버튼이 눌리지 않았다.");
    }, 5000);
  }
  useEffect(() => {
    return () => {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }, []);
  return (
    <div>
      <button onClick={click} disabled={text === "버튼이 방금 눌렸다."}>
        button
      </button>
      <p>{text}</p>
    </div>
  );
}
