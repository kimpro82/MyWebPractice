# [My Bootstrap Practice](../README.md#bootstrap)


I heard that **Bootstrap** was quite easy. It was a lie.


### \<List>

- [Bootstrap : Magic Stick (2022.01.28)](#bootstrap--magic-stick-20220128)


## [Bootstrap : Magic Stick (2022.01.28)](#list)

- A practice of **Bootstrap** (5.1.3) : use `container-fluid` `mx` `my` `row` `col`
- Originally I was going to apply **grid**, but to fail.

  ![Bootstrap : Magic Stick](Images/BootstrapMagicStick.gif)

- Codes
  <details>
    <summary>BootstrapMagicStick.html</summary>

  ```html
  ……
      <head>
          <meta charset="UTF-8">
          <title>Magic Stick by Bootstrap</title>
          <link href="./bootstrap5/css/bootstrap.min.css" rel="stylesheet" type="text/css">
          <script defer src="BootstrapMagicStick.js" type="text/javascript"></script>
      </head>

      <body>
          <div class="container-fluid mx-3 my-5">
              <div class="row">
                  <div class="col bg-primary text-center">
                      <h1><span id="text">여의봉아 여의봉아</span></h1>
                  </div>
              </div>
          </div>
      </body>
  ……
  ```
  </details>
  <details>
    <summary>BootstrapMagicStick.js</summary>

  ```js
  var direction = false;
  var width = 400;
  // console.log(width);

  function resize()
  {
      // Set direction and text content
      if (width < 450 && direction == false)
      {
          direction = !direction;
          document.getElementById("text").textContent = "길어져라 길어져라";
      }
      else if (width > 1000 && direction == true)
      {
          direction = !direction;
          document.getElementById("text").textContent = "짧아져라 짧아져라";
      }

      // Modify the body's width
      if (direction == true) { document.body.style.width = (Number(width) + 50) + 'px' }
      else  { document.body.style.width = (Number(width) - 50) + 'px'}

      width = document.body.style.width.replace(/[^0-9]/g, "");
      console.log(direction, width);
  }

  setInterval(resize, 100);
  ```
  </details>
