const fs = require("fs");
const path = require("path");

const apps = [
  {
    description: "Pixel Perfect",
    path: path.resolve(__dirname, "../src/pixel-perfect.js")
  },
  {
    description: "Highlight",
    path: path.resolve(__dirname, "../src/highlight.js")
  }
];

const renderApp = ({ description, path }) => {
  const fileContent = fs.readFileSync(path).toString();

  const hash = require("crypto")
    .createHash("sha256")
    .update(fileContent)
    .digest("hex");

  const bookmarklet = `javascript:(function() {
    const APP_ID = '${hash}';
    ${fileContent}
  })();`;

  return `<li><a href="${encodeURI(bookmarklet)}">${description}</a></li>`;
};

fs.mkdirSync(path.resolve(__dirname, "../build"), { recursive: true });

fs.writeFileSync(
  path.resolve(__dirname, "../build/index.html"),
  `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Bookmarklets</title>
  </head>
  <body><ul>${apps.map(renderApp).join('')}</ul></body>
</html>
`
);
