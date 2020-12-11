const version = `APP:${APP_ID}:${APP_HASH}`

if (window[version] && window[version].unmount) {
  window[version].unmount();
}

const style = document.createElement("style");
style.innerHTML = `
    * { background-color: rgba(255,0,0,.2) !important; }
    * * { background-color: rgba(0,255,0,.2) !important; }
    * * * { background-color: rgba(0,0,255,.2) !important; }
    * * * * { background-color: rgba(255,0,255,.2) !important; }
    * * * * * { background-color: rgba(0,255,255,.2) !important; }
    * * * * * * { background-color: rgba(255,255,0,.2) !important; }
    * * * * * * * { background-color: rgba(255,0,0,.2) !important; }
    * * * * * * * * { background-color: rgba(0,255,0,.2) !important; }
    * * * * * * * * * { background-color: rgba(0,0,255,.2) !important; }
`;

const handleKeyDown = function(event) {
  if (event.keyCode === 81) {
    window[version].unmount();
  }
};

document.addEventListener("keydown", handleKeyDown);
document.head.appendChild(style);

if (!window[version]) {
  window[version] = {};
}

window[version].unmount = () => {
  document.removeEventListener("keydown", handleKeyDown);
  style.remove();
  window[version].unmount = null;
};
