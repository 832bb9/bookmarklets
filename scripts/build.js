const fs = require("fs");
const path = require("path");

const BUILD_TIME = Date.now();

const apps = [
  {
    id: "pixel-perfect",
    description: "Pixel Perfect",
    path: path.resolve(__dirname, "../src/pixel-perfect.js"),
  },
  {
    id: "highlight",
    description: "Highlight",
    path: path.resolve(__dirname, "../src/highlight.js"),
  },
  {
    id: "fill-table",
    description: "Fill Table",
    path: path.resolve(__dirname, "../src/fill-table.js"),
  },
  {
    id: "update-squash-and-merge",
    description: "Update & Squash & Merge",
    path: path.resolve(__dirname, "../src/github-auto-merge.js"),
  },
];

const contents = apps.reduce((acc, app) => {
  acc[app.id] = fs.readFileSync(app.path).toString();

  return acc;
}, {});

const hashes = apps.reduce((acc, app) => {
  acc[app.id] = require("crypto")
    .createHash("sha256")
    .update(contents[app.id])
    .digest("hex");

  return acc;
}, {});

const renderApp = (app) => {
  const content = contents[app.id];
  const hash = hashes[app.id];

  const bookmarklet = `javascript:(function() {
    const APP_ID = '${app.id}';
    const APP_HASH = '${hash}';
    ${content}
  })();`;

  return `<li><a href="${encodeURI(bookmarklet)}">${app.description}</a></li>`;
};

fs.mkdirSync(path.resolve(__dirname, "../build"), { recursive: true });

fs.writeFileSync(
  path.resolve(__dirname, "../build/apps.html"),
  `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Bookmarklets</title>
  </head>
  <body><div>Last build: ${new Date(
    BUILD_TIME
  ).toUTCString()}</div><ul>${apps.map(renderApp).join("")}</ul></body>
</html>
`
);

fs.writeFileSync(
  path.resolve(__dirname, "../build/apps.json"),
  JSON.stringify({
    build: BUILD_TIME,
    apps: apps.reduce((acc, app) => {
      acc[app.id] = {
        content: contents[app.id],
        hash: hashes[app.id],
      };

      return acc;
    }, {}),
  })
);
