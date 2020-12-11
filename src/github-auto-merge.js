const INTERVAL_TIME = 1000;
const INITIAL_DESCRIPTION_TEXT = "No description provided.";

const createApp = (renderApp, initialState = {}) => {
  const root = document.createElement("div");

  const unmount = () => {
    root.remove();
  };

  let state = initialState;

  const effects = [];
  const cleanups = [];

  let rerenderTimeoutId = null;

  const render = () => {
    while (cleanups.length) {
      const [cleanup] = cleanups.splice(0, 1);

      if (typeof cleanup !== "function") {
        continue;
      }

      cleanup();
    }

    const update = (updater) => {
      const nextState = updater(state);

      if (nextState === state) {
        return;
      }

      state = nextState;

      clearTimeout(rerenderTimeoutId);
      rerenderTimeoutId = setTimeout(() => {
        render();
      }, 0);
    };

    const after = (callback) => {
      effects.push(callback);
    };

    root.innerHTML = renderApp({
      root,
      state,
      update,
      after,
      unmount,
    });

    while (effects.length) {
      const [effect] = effects.splice(0, 1);

      if (typeof effect !== "function") {
        continue;
      }

      cleanups.push(effect());
    }
  };

  render();

  document.body.appendChild(root);

  return unmount;
};

const selectUpdateBranchBtn = () => {
  return Array.from(document.querySelectorAll("button")).find(
    (node) => node.innerText === "Update branch"
  );
};

const selectSquashAndMergeBtn = () => {
  return Array.from(document.querySelectorAll("button")).find(
    (node) => node.innerText === "Squash and merge"
  );
};

const selectConfirmSquashAndMergeBtn = () => {
  return Array.from(document.querySelectorAll("button")).find(
    (node) => node.innerText === "Confirm squash and merge"
  );
};

const getPullRequestDescriptionText = () => {
  const innerText = document.querySelector(
    "#discussion_bucket .js-discussion:first-child .comment-body"
  ).innerText;
  return innerText === INITIAL_DESCRIPTION_TEXT ? "" : innerText;
};

const getPullRequestTitleText = () => {
  return document.querySelector("#partial-discussion-header .js-issue-title")
    .innerText;
};

const selectSquashAndMergeDescriptionTextarea = () => {
  return document.querySelector("#merge_message_field");
};

const selectSquashAndMergeTitleInput = () => {
  return document.querySelector("#merge_title_field");
};

const startInterval = () => {
  return setInterval(() => {
    console.log("INTERVAL TICK");

    const updateBranchBtn = selectUpdateBranchBtn();

    if (updateBranchBtn) {
      updateBranchBtn.click();
      return;
    }

    const squashAndMergeBtn = selectSquashAndMergeBtn();

    if (squashAndMergeBtn) {
      squashAndMergeBtn.click();
      return;
    }

    const confirmSquashAndMergeBtn = selectConfirmSquashAndMergeBtn();
    const pullRequestDescriptionText = getPullRequestDescriptionText();
    const pullRequestTitleText = getPullRequestTitleText();

    if (confirmSquashAndMergeBtn) {
      if (pullRequestDescriptionText) {
        selectSquashAndMergeDescriptionTextarea().value = pullRequestDescriptionText;
      }

      if (pullRequestTitleText) {
        selectSquashAndMergeTitleInput().value = pullRequestTitleText;
      }

      confirmSquashAndMergeBtn.click();
      return;
    }
  }, INTERVAL_TIME);
};

let intervalId = null;
let autostart = true;

createApp(
  ({ state, update, after }) => {
    after(() => {
      if (!autostart) {
        return;
      }

      autostart = false;

      intervalId = startInterval();

      update((current) => ({
        ...current,
        interval: {
          ...current.interval,
          status: "pending",
        },
      }));
    });

    after(() => {
      const onToggleInterval = () => {
        if (state.interval.status === "idle") {
          intervalId = startInterval();

          update((current) => ({
            ...current,
            interval: {
              ...current.interval,
              status: "pending",
            },
          }));
        } else if (state.interval.status === "pending") {
          clearInterval(intervalId);

          update((current) => ({
            ...current,
            interval: {
              ...current.interval,
              status: "idle",
            },
          }));
        }
      };
    });

    return `
    <div style="position: fixed; right: 8px; bottom: 8px; padding: 8px; border-radius: 4px; border: 1px solid #000; background-color: #fff; color: #000">
      <div style="margin-bottom: 8px;">
        <button data-ref="toggle-interval" style="width: 100%;">Interval is "${state.interval.status}"</button>
      </div>
      <div>
        CHECKING UPDATES: ${state.updates.status}
      </div>
    </div>
  `;
  },
  {
    interval: {
      status: "idle",
    },
    updates: {
      status: "idle",
    },
  }
);
