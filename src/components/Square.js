import React from "react";
import SquareStyler from "./SquareStyler";

const Square = ({
  id,
  squareType,
  amountColors,
  fillSquare,
  fillHstLdown,
  fillHstRdown,
  fillHstLup,
  fillHstRup,
  orderIdNr,
  handleSelectSquareType,
  handleColorSquare,
  handleColorLup,
  handleColorRup,
  handleColorLdown,
  handleColorRdown,
  handleOrderIdNr,
  activeStyler,
  openStyler,
  handleCloseStyler,
}) => {
  return (
    <div
      className={`square ${id}`}
      key={id}
      onClick={(event) => {
        openStyler(event, id);
      }}
    >
      <svg
        viewBox={"0 0 50 50"}
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        <rect
          className={`rect ${
            squareType === "rect" ? "active" : ""
          } ${fillSquare}`}
          x="0"
          y="0"
          width="50"
          height="50"
          stroke="#bbb"
        />
        <polygon
          className={`hstdown ldown ${
            squareType === "hstDown" ? "active" : ""
          } ${fillHstLdown}`}
          points="0,0 50,50 0,50"
          stroke="#bbb"
        />
        <polygon
          className={`hstdown rdown ${
            squareType === "hstDown" ? "active" : ""
          } ${fillHstRdown}`}
          points="0,0 50,0 50,50"
          stroke="#bbb"
        />
        <polygon
          className={`hstup lup ${
            squareType === "hstUp" ? "active" : ""
          } ${fillHstLup}`}
          points="0,50 0,0 50,0"
          stroke="#bbb"
        />
        <polygon
          className={`hstup rup ${
            squareType === "hstUp" ? "active" : ""
          } ${fillHstRup} `}
          points="0,50 50,0 50,50"
          stroke="#bbb"
        />
      </svg>
      {activeStyler === id ? (
        <SquareStyler
          id={id}
          activeStyler={activeStyler}
          onCloseStyler={handleCloseStyler}
          squareType={squareType}
          amountColors={amountColors}
          orderIdNr={orderIdNr}
          onSelectSquareType={handleSelectSquareType}
          onColorSquare={handleColorSquare}
          onColorLup={handleColorLup}
          onColorRup={handleColorRup}
          onColorLdown={handleColorLdown}
          onColorRdown={handleColorRdown}
          //onOrderIdNr={handleOrderIdNr}
        />
      ) : null}
    </div>
  );
};

export default Square;
