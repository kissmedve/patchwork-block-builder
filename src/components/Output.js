import React, { useState } from "react";

const Output = ({
  squares,
  squw,
  patchType,
  amountColors,
  orderIdNr,
  elementsType,
}) => {
  // squw: squareWidth
  // color1: "#888"
  // color2: "#cfcfcf"
  // color3: "#eee"

  // local state
  const [collected, setCollected] = useState([]);

  const addToCollection = (event) => {
    setCollected([...collected, data]);
  };

  const outputElements = () => {
    let elements = [];
    let countRects = 0;
    let countHsts = 0;
    squares.forEach((squ) => {
      if (squ.squareType === "rect") {
        countRects += 1;
      } else if (squ.squareType === "hstUp" || squ.squareType === "hstDown") {
        countHsts += 1;
      }
    });
    if (countRects === 0) {
      elements = ["hst"];
    } else if (countHsts === 0) {
      elements = ["rect"];
    } else {
      elements = ["rect", "hst"];
    }
    return elements;
  };

  const outputColors = () => {
    let squaresColor1 = 0;
    let squaresColor2 = 0;
    let squaresColor3 = 0;
    let trianglesColor1 = 0;
    let trianglesColor2 = 0;
    let trianglesColor3 = 0;

    squares.forEach((squ) => {
      let squareColors = [];
      let hstColors = [];
      if (squ.squareType === "rect") {
        squareColors.push(squ.fillSquare);
      } else if (squ.squareType === "hstUp") {
        hstColors.push(squ.fillHstLup);
        hstColors.push(squ.fillHstRup);
      } else if (squ.squareType === "hstDown") {
        hstColors.push(squ.fillHstLdown);
        hstColors.push(squ.fillHstRdown);
      }
      squareColors.forEach((color) => {
        switch (color) {
          case "color2":
            squaresColor2 += 1;
            break;
          case "color3":
            squaresColor3 += 1;
            break;
          default:
            // 'color1'
            squaresColor1 += 1;
            break;
        }
      });
      hstColors.forEach((color) => {
        switch (color) {
          case "color2":
            trianglesColor2 += 1;
            break;
          case "color3":
            trianglesColor3 += 1;
            break;
          default:
            // 'color1'
            trianglesColor1 += 1;
            break;
        }
      });
    });
    return [
      squaresColor1,
      squaresColor2,
      squaresColor3,
      trianglesColor1,
      trianglesColor2,
      trianglesColor3,
    ];
  };
  console.log("outputColors()", outputColors());

  const outputPaths = squares
    .sort((a, b) => (a.id > b.id ? 1 : -1))
    .map((squ) => {
      let paths = [];
      if (squ.squareType === "rect") {
        paths = [
          {
            vertices: [
              [squ.col * squw, squ.row * squw],
              [(squ.col + 1) * squw, squ.row * squw],
              [(squ.col + 1) * squw, (squ.row + 1) * squw],
              [squ.col * squw, (squ.row + 1) * squw],
            ],
            fillColor: squ.fillSquare,
          },
        ];
      } else if (squ.squareType === "hstUp") {
        paths = [
          {
            vertices: [
              [squ.col * squw, squ.row * squw],
              [(squ.col + 1) * squw, squ.row * squw],
              [squ.col * squw, (squ.row + 1) * squw],
            ],
            fillColor: squ.fillHstLup,
          },
          {
            vertices: [
              [(squ.col + 1) * squw, squ.row * squw],
              [(squ.col + 1) * squw, (squ.row + 1) * squw],
              [squ.col * squw, (squ.row + 1) * squw],
            ],
            fillColor: squ.fillHstRup,
          },
        ];
      } else if (squ.squareType === "hstDown") {
        paths = [
          {
            vertices: [
              [squ.col * squw, squ.row * squw],
              [(squ.col + 1) * squw, (squ.row + 1) * squw],
              [squ.col * squw, (squ.row + 1) * squw],
            ],
            fillColor: squ.fillHstLdown,
          },
          {
            vertices: [
              [squ.col * squw, squ.row * squw],
              [(squ.col + 1) * squw, squ.row * squw],
              [(squ.col + 1) * squw, (squ.row + 1) * squw],
            ],
            fillColor: squ.fillHstRdown,
          },
        ];
      }
      return paths;
    });

  const createId = () => {
    return Math.floor(Math.random() * 1000000000);
  };
  const orderId4char = () => {
    let orderNumber = "";
    if (orderIdNr > 999) {
      orderNumber = orderIdNr;
    } else if (orderIdNr > 99) {
      orderNumber = "0" + orderIdNr;
    } else if (orderIdNr > 9) {
      orderNumber = "00" + orderIdNr;
    } else if (orderIdNr > 0) {
      orderNumber = "000" + orderIdNr;
    }
    return orderNumber;
  };

  let data = {
    id: createId(),
    orderId: `${amountColors}-${patchType}x${patchType}-${elementsType}-${orderId4char()}`,
    rowCol: patchType,
    colours: amountColors,
    size: 100,
    rotated: 0,
    elements: outputElements(),
    squaresColor1: outputColors()[0],
    squaresColor2: outputColors()[1],
    squaresColor3: outputColors()[2],
    trianglesColor1: outputColors()[3],
    trianglesColor2: outputColors()[4],
    trianglesColor3: outputColors()[5],
    paths: outputPaths,
  };

  console.log("data", data);

  return (
    <>
      <div className="collect">
        <button className="btn" onClick={addToCollection}>
          Add to Collection
        </button>
      </div>
      <div className="download">
        <a
          className="btn"
          type="button"
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(collected)
          )}`}
          // download single block file:
          // download={`${amountColors}-${patchType}x${patchType}-${elementsType}-${orderId4char()}.json`}
          // download all blocks from state:
          download={`elementBlocksData.json`}
        >
          Download
        </a>
      </div>
    </>
  );
};

export default Output;
