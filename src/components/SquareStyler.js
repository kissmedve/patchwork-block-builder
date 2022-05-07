import React from "react";

const SquareStyler = ({
  id,
  activeStyler,
  onCloseStyler,
  squareType,
  amountColors,
  //orderIdNr,
  onSelectSquareType,
  onColorSquare,
  onColorLup,
  onColorRup,
  onColorLdown,
  onColorRdown,
  //onOrderIdNr,
}) => {
  const closeStyler = onCloseStyler;
  const selectSquareType = onSelectSquareType;
  const colorSquare = onColorSquare;
  const colorLup = onColorLup;
  const colorRup = onColorRup;
  const colorLdown = onColorLdown;
  const colorRdown = onColorRdown;

  return (
    <>
      <div className={`styler ${activeStyler === id ? "active" : ""} `}>
        <div className="styler-header">
          <button className="btn close" onClick={closeStyler}>
            X
          </button>
        </div>
        <div className="card">
          <div className="form-group">
            <h3>Square Type</h3>
            <label className="form-radio rect">
              <input
                className="square-type"
                type="radio"
                name="squareType"
                value="rect"
                checked={squareType === "rect"}
                onChange={(event) => {
                  selectSquareType(event, id);
                }}
              />

              <span>Full Square</span>
            </label>

            <label className="form-radio hst-up">
              <input
                className="square-type"
                type="radio"
                name="squareType"
                value="hstUp"
                checked={squareType === "hstUp"}
                onChange={(event) => {
                  selectSquareType(event, id);
                }}
              />

              <span>HST Up</span>
            </label>

            <label className="form-radio hst-down">
              <input
                className="square-type"
                type="radio"
                name="squareType"
                value="hstDown"
                checked={squareType === "hstDown"}
                onChange={(event) => {
                  selectSquareType(event, id);
                }}
              />

              <span>HST Down</span>
            </label>
          </div>

          {squareType === "rect" ? (
            <div className="colorize full">
              <h3>Color Full</h3>
              <div className="patches">
                <div
                  className="color1 patch"
                  onClick={(event) => colorSquare(event, id, "color1")}
                ></div>
                <div
                  className="color2 patch"
                  onClick={(event) => colorSquare(event, id, "color2")}
                ></div>
                {amountColors === "3" ? (
                  <div
                    className="color3 patch"
                    onClick={(event) => colorSquare(event, id, "color3")}
                  ></div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : squareType === "hstUp" ? (
            <div className="colorize hstUp">
              <h3>Color Left</h3>
              <div className="patches left">
                <div
                  className="color1 patch"
                  onClick={(event) => colorLup(event, id, "color1")}
                ></div>
                <div
                  className="color2 patch"
                  onClick={(event) => colorLup(event, id, "color2")}
                ></div>
                {amountColors === "3" ? (
                  <div
                    className="color3 patch"
                    onClick={(event) => colorLup(event, id, "color3")}
                  ></div>
                ) : (
                  ""
                )}
              </div>

              <h3>Color Right</h3>
              <div className="patches right">
                <div
                  className="color1 patch"
                  onClick={(event) => colorRup(event, id, "color1")}
                ></div>
                <div
                  className="color2 patch"
                  onClick={(event) => colorRup(event, id, "color2")}
                ></div>
                {amountColors === "3" ? (
                  <div
                    className="color3 patch"
                    onClick={(event) => colorRup(event, id, "color3")}
                  ></div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : squareType === "hstDown" ? (
            <div className="colorize hstDown">
              <h3>Color Left</h3>
              <div className="patches left">
                <div
                  className="color1 patch"
                  onClick={(event) => colorLdown(event, id, "color1")}
                ></div>
                <div
                  className="color2 patch"
                  onClick={(event) => colorLdown(event, id, "color2")}
                ></div>
                {amountColors === "3" ? (
                  <div
                    className="color3 patch"
                    onClick={(event) => colorLdown(event, id, "color3")}
                  ></div>
                ) : (
                  ""
                )}
              </div>

              <h3>Colors Right</h3>
              <div className="patches right">
                <div
                  className="color1 patch"
                  onClick={(event) => colorRdown(event, id, "color1")}
                ></div>
                <div
                  className="color2 patch"
                  onClick={(event) => colorRdown(event, id, "color2")}
                ></div>
                {amountColors === "3" ? (
                  <div
                    className="color3 patch"
                    onClick={(event) => colorRdown(event, id, "color3")}
                  ></div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default SquareStyler;
