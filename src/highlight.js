if (window[APP_ID] && window[APP_ID].unmount) {
  window[APP_ID].unmount();
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
    window[APP_ID].unmount();
  }
};

document.addEventListener("keydown", handleKeyDown);
document.head.appendChild(style);

if (!window[APP_ID]) {
  window[APP_ID] = {};
}

window[APP_ID].unmount = () => {
  document.removeEventListener("keydown", handleKeyDown);
  wrapper.remove();
  window[APP_ID].unmount = null;
};
