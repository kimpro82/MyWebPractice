# [My SVG Practice](../README.md#svg)

Actually I'm not so interested in doing graphic work on the web


### \<List>

- [Cybertruck (2024.11.06)](#cybertruck-20241106)
- [Shape Color Changer (2024.09.18)](#shape-color-changer-20240918)



## [Cybertruck (2024.11.06)](#list)

- There's no special reason to do this ……
- CSS can handle all the animation effects without the need for JavaScript.

  ![Cybertruck](./Images/SVG_Cybertruck.gif)

- Code
  <details>
    <summary>cybertruck.svg</summary>

  ```svg
  <svg xmlns="http://www.w3.org/2000/svg" width="450" height="180" viewBox="0 0 500 200">
      <!-- Car Body -->
      <polygon points="80,150 70,85 280,50 430,110 425,150" fill="#c0c0c0" stroke="black" stroke-width="2"/>
      <line x1="70" y1="85" x2="430" y2="110" stroke="#333333" stroke-width="2"/>

      <!-- Door Lines -->
      <line x1="200" y1="85" x2="205" y2="150" stroke="#333333" stroke-width="2"/>
      <line x1="265" y1="85" x2="270" y2="150" stroke="#333333" stroke-width="2"/>
      <line x1="330" y1="85" x2="335" y2="150" stroke="#333333" stroke-width="2"/>

      <!-- Windows -->
      <polygon points="200,85 199,70 280,55 390,100" fill="#000000" stroke="black" stroke-width="1"/>

      <!-- Wheels -->
      <circle cx="145" cy="150" r="35" fill="#000000"/>
      <circle cx="375" cy="150" r="35" fill="#000000"/>

      <!-- Wheel Rims -->
      <circle cx="145" cy="150" r="20" fill="#353535"/>
      <circle cx="375" cy="150" r="20" fill="#353535"/>
  </svg>
  ```
  </details>
  <details>
    <summary>cybertruck.html</summary>

  ```html
  <!DOCTYPE html>

  <html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="author" content="kimpro82">
      <meta name="date" content="2024-11-06">
      <title>SVG Practice : Cybertruck</title>
      <link rel="stylesheet" href="cybertruck.css">
  </head>
  <body>
      <h1>Cybertruck</h1>
      <div class="container">
          <object id="car-svg" data="cybertruck.svg" type="image/svg+xml"></object>
      </div>
  </body>

  </html>
  ```
  </details>
  <details>
    <summary>cybertruck.css</summary>

  ```css
  body {
      text-align: center;
  }

  .container {
      width: 100%;
      overflow: hidden;
  }

  #car-svg {
      width: 50%;
      animation: drive 1.5s ease-in infinite;
  }

  @keyframes drive {
      from { transform: translateX(-150%); }
      to { transform: translateX(150%); }
  }

  #wheel-left, #wheel-right {
      animation: wheel-spin 1s linear infinite;
      transform-origin: center;
      transform-box: fill-box;
  }
  ```
  </details>


## [Shape Color Changer (2024.09.18)](#list)

- Initial practice with SVG
- Output

  ![Shape Color Changer](./Images/SVG_ShapeColorChanger.gif)

- Code
  <details open="">
    <summary>shape.svg</summary>

  ```svg
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 90" width="100%" height="100%">
    <rect id="square" width="90" height="90" x="0" y="0" fill="blue"/>
    <polygon id="triangle" points="110,90 150,0 190,90" fill="green"/>
    <circle id="circle" cx="250" cy="45" r="45" fill="red"/>
  </svg>
  ```
  </details>
  <details>
    <summary>shape_color_changer.html</summary>

  ```html
  <!doctype html>

  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>SVG Practice : Shape Color Changer</title>
      <link rel="stylesheet" href="shape_color_changer.css" />
      <script defer src="shape_color_changer.js" type="module"></script>
    </head>

    <body>
      <h1>SVG Practice : Shape Color Changer</h1>

      <!-- Embed the external SVG file -->
      <object id="svgObject" type="image/svg+xml" data="shape.svg"></object>

      <!-- Buttons for changing colors of each shape -->
      <div id="buttons">
        <button id="changeSquareColor">Square</button>
        <button id="changeTriangleColor">Triangle</button>
        <button id="changeCircleColor">Circle</button>
      </div>
    </body>
  </html>
  ```
  </details>
  <details>
    <summary>shape_color_changer.css</summary>

  ```css
  body {
    font-family: Arial, sans-serif;
    text-align: center;
    margin-top: 5%;
  }

  #svgObject {
    margin-top: 2%;
    width: 60%;
  }

  #buttons {
    margin-top: 2%;
  }

  button {
    margin: 1%;
    padding: 1% 1%;
    width: 18%;
    font-size: 1.2em;
    cursor: pointer;
  }
  ```
  </details>
  <details>
    <summary>shape_color_changer.ts</summary>

  ```ts
  const svgObject = document.getElementById('svgObject') as HTMLObjectElement;
  const changeRectColorBtn = document.getElementById('changeSquareColor') as HTMLButtonElement;
  const changeTriangleColorBtn = document.getElementById('changeTriangleColor') as HTMLButtonElement;
  const changeCircleColorBtn = document.getElementById('changeCircleColor') as HTMLButtonElement;
  ```
  ```ts
  /**
   * Generates a random hex color string.
   * 
   * @returns {string} - A random color in hex format (e.g., "#A1B2C3").
   */
  function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  ```
  ```ts
  /**
   * Changes the fill color of an SVG shape by its ID.
   * 
   * @param {string} shapeId - The ID of the SVG element to change the color of.
   */
  function changeColor(shapeId: string) {
    const svgDoc = svgObject.contentDocument; // Access the embedded SVG document
    if (svgDoc) {
      const shape = svgDoc.getElementById(shapeId);
      if (shape) {
        shape.setAttribute('fill', getRandomColor()); // Set a new random color
      }
    }
  }
  ```
  ```ts
  // Add event listeners to each button to change the color of the corresponding SVG shape
  changeRectColorBtn.addEventListener('click', () => changeColor('square'));
  changeTriangleColorBtn.addEventListener('click', () => changeColor('triangle'));
  changeCircleColorBtn.addEventListener('click', () => changeColor('circle'));
  ```
  </details>
