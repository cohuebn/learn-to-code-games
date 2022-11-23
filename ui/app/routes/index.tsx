import React from "react";

export default function Index() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Number game</h1>

      <form>
        <fieldset>
          <legend>What is your name?</legend>
          <input id="name" type="text" />
        </fieldset>
        <fieldset>
          <legend>Pick a number between one and ten</legend>

          {numbers.map((number) => {
            return (
              <React.Fragment key={number}>
                <input
                  type="radio"
                  id={`${number}`}
                  name="number"
                  value={number}
                />
                <label htmlFor={`${number}`}>{number}</label>
              </React.Fragment>
            );
          })}
        </fieldset>
        <button type="button">Play</button>
      </form>
    </div>
  );
}
