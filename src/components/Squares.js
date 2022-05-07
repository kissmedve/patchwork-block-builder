import React, { useEffect, useState } from "react";
import Square from "./Square";
import Output from "./Output";

const Squares = () => {
  const [squares, setSquares] = useState([
    {
      row: 0,
      col: 0,
      id: "0-0",
      squareType: "rect",
      fillSquare: "color1",
      fillHstLdown: "color1",
      fillHstRdown: "color1",
      fillHstLup: "color1",
      fillHstRup: "color1",
    },
  ]);

  const [patchType, setPatchType] = useState("2");
  const [amountColors, setAmountColors] = useState("2");
  const [orderIdNr, setOrderIdNr] = useState(0);
  const [elementsType, setElementsType] = useState("sq");
  const [activeStyler, setActiveStyler] = useState("");

  const squw = 50; // squareWidth

  useEffect(() => {
    // i: row, k: col
    let squareBase = {};
    let squareCollection = [];
    for (let i = 0; i < Number(patchType); i++) {
      for (let k = 0; k < Number(patchType); k++) {
        squareBase = {
          row: i,
          col: k,
          id: i + "-" + k,
          squareType: "rect",
          fillSquare: "color1",
          fillHstLdown: "color1",
          fillHstRdown: "color1",
          fillHstLup: "color1",
          fillHstRup: "color1",
        };
        squareCollection.push(squareBase);
      }
    }
    setSquares(squareCollection);
  }, [patchType]);

  const handleOpenStyler = (event, id) => {
    setActiveStyler(id);
    event.stopPropagation();
  };
  const handleCloseStyler = (event) => {
    setActiveStyler("");
    event.stopPropagation();
  };

  const handleSelectSquareType = (event, id) => {
    let updatedSquare = squares.find((squ) => squ.id === id);
    let filtered = squares.filter((squ) => squ.id !== id);
    updatedSquare = { ...updatedSquare, squareType: event.target.value };
    setSquares([...filtered, updatedSquare]);
    // mapping squares and thereby replacing the squareType value
    // would be the intuitive way to go,
    // but a setSquares like that wouldn't trigger a rerender
    // (seemingly due to the replacement being too shallow,
    // see https://blog.logrocket.com/how-when-to-force-react-component-re-render/).
    // so we have to go with the above,
    // plus re-sorting the squares before rendering, see allSquares().
  };

  const handleColorSquare = (event, id, color) => {
    let updatedSquare = squares.find((squ) => squ.id === id);
    let filtered = squares.filter((squ) => squ.id !== id);
    updatedSquare = { ...updatedSquare, fillSquare: color };
    setSquares([...filtered, updatedSquare]);
  };
  const handleColorLup = (event, id, color) => {
    let updatedSquare = squares.find((squ) => squ.id === id);
    let filtered = squares.filter((squ) => squ.id !== id);
    updatedSquare = { ...updatedSquare, fillHstLup: color };
    setSquares([...filtered, updatedSquare]);
  };
  const handleColorRup = (event, id, color) => {
    let updatedSquare = squares.find((squ) => squ.id === id);
    let filtered = squares.filter((squ) => squ.id !== id);
    updatedSquare = { ...updatedSquare, fillHstRup: color };
    setSquares([...filtered, updatedSquare]);
  };
  const handleColorLdown = (event, id, color) => {
    let updatedSquare = squares.find((squ) => squ.id === id);
    let filtered = squares.filter((squ) => squ.id !== id);
    updatedSquare = { ...updatedSquare, fillHstLdown: color };
    setSquares([...filtered, updatedSquare]);
  };
  const handleColorRdown = (event, id, color) => {
    let updatedSquare = squares.find((squ) => squ.id === id);
    let filtered = squares.filter((squ) => squ.id !== id);
    updatedSquare = { ...updatedSquare, fillHstRdown: color };
    setSquares([...filtered, updatedSquare]);
  };

  const handleOrderIdNr = (event) => {
    setOrderIdNr(event.target.value);
  };

  const allSquares = squares
    .sort((a, b) => (a.id > b.id ? 1 : -1))
    .map((squ) => {
      return (
        <Square
          key={squ.id}
          row={squ.row}
          col={squ.col}
          id={squ.id}
          squareType={squ.squareType}
          amountColors={amountColors}
          //orderIdNr={orderIdNr}
          fillSquare={squ.fillSquare}
          fillHstLdown={squ.fillHstLdown}
          fillHstRdown={squ.fillHstRdown}
          fillHstLup={squ.fillHstLup}
          fillHstRup={squ.fillHstRup}
          handleSelectSquareType={handleSelectSquareType}
          handleColorSquare={handleColorSquare}
          handleColorLup={handleColorLup}
          handleColorRup={handleColorRup}
          handleColorLdown={handleColorLdown}
          handleColorRdown={handleColorRdown}
          //handleOrderIdNr={handleOrderIdNr}
          activeStyler={activeStyler}
          openStyler={handleOpenStyler}
          handleCloseStyler={handleCloseStyler}
        />
      );
    });

  return (
    <>
      <div className="settings">
        <form className="amount-colors">
          <label htmlFor="amount-colors">Number of Colors:</label>
          <select
            name="amount-colors"
            onChange={(event) => setAmountColors(event.target.value)}
          >
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </form>
        <form className="patch-type">
          <label htmlFor="patchtype">Patch Type:</label>
          <select
            name="patchtype"
            onChange={(event) => setPatchType(event.target.value)}
          >
            <option value="2">2 x 2</option>
            <option value="3">3 x 3</option>
            <option value="4">4 x 4</option>
            <option value="5">5 x 5</option>
            <option value="6">6 x 6</option>
            <option value="7">7 x 7</option>
            <option value="8">8 x 8</option>
            <option value="9">9 x 9</option>
          </select>
        </form>
        <form className="elements-type">
          <label htmlFor="elementsType">Elements:</label>
          <select
            name="elementsType"
            onChange={(event) => setElementsType(event.target.value)}
          >
            <option value="sq">squares</option>
            <option value="tr">triangles</option>
            <option value="mi">mixed</option>
            <option value="sp">specials</option>
          </select>
        </form>
        <form className="order-id">
          <label htmlFor="orderIdNr">Order Id Nr:</label>
          {/* example: 2-2x2-sq-0001 */}
          {/* format: colours-elements-type-id(4char) */}
          <label className="form-number ">
            <input
              className="order-id"
              type="number"
              name="orderIdNr"
              value={orderIdNr}
              onChange={handleOrderIdNr}
            />
          </label>
        </form>

        <Output
          squares={squares}
          squw={squw}
          patchType={patchType}
          elementsType={elementsType}
          amountColors={amountColors}
          orderIdNr={orderIdNr}
        />
      </div>

      <div className="squares" style={{ width: `${Number(patchType) * 50}px` }}>
        {allSquares}
      </div>
    </>
  );
};

export default Squares;
