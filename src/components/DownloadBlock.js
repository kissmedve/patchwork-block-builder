import React from "react";

const DownloadBlock = ({ squares, sq, patchType, amountColors }) => {
  // sq: squareWidth
  // color1: "#888"
  // color2: "#cfcfcf"
  // color3: "#eee"

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
              [squ.col * sq, squ.row * sq],
              [(squ.col + 1) * sq, squ.row * sq],
              [(squ.col + 1) * sq, (squ.row + 1) * sq],
              [squ.col * sq, (squ.row + 1) * sq],
            ],
            fillColor: squ.fillSquare,
          },
        ];
      } else if (squ.squareType === "hstUp") {
        paths = [
          {
            vertices: [
              [squ.col * sq, squ.row * sq],
              [(squ.col + 1) * sq, squ.row * sq],
              [squ.col * sq, (squ.row + 1) * sq],
            ],
            fillColor: squ.fillHstLup,
          },
          {
            vertices: [
              [(squ.col + 1) * sq, squ.row * sq],
              [(squ.col + 1) * sq, (squ.row + 1) * sq],
              [squ.col * sq, (squ.row + 1) * sq],
            ],
            fillColor: squ.fillHstRup,
          },
        ];
      } else if (squ.squareType === "hstDown") {
        paths = [
          {
            vertices: [
              [squ.col * sq, squ.row * sq],
              [(squ.col + 1) * sq, (squ.row + 1) * sq],
              [squ.col * sq, (squ.row + 1) * sq],
            ],
            fillColor: squ.fillHstLdown,
          },
          {
            vertices: [
              [squ.col * sq, squ.row * sq],
              [(squ.col + 1) * sq, squ.row * sq],
              [(squ.col + 1) * sq, (squ.row + 1) * sq],
            ],
            fillColor: squ.fillHstRdown,
          },
        ];
      }
      return paths;
    });

  const createId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  let data = {
    id: createId(),
    rowCol: patchType,
    colours: amountColors,
    size: 100,
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
      <div className="download">
        <a
          className="btn"
          type="button"
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(data)
          )}`}
          download="block.json"
        >
          Download Block
        </a>
      </div>
    </>
  );
};

export default DownloadBlock;
