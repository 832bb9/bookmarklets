const INTERVAL_TIME = 1000;
const INITIAL_DESCRIPTION_TEXT = "No description provided.";

const createApp = (renderApp, initialState = {}) => {
  const root = document.createElement("div");

  const unmount = () => {
    root.remove();
  };

  let state = initialState;

  const effects = [];

  let rerenderTimeoutId = null;

  const render = () => {
    const update = (updater) => {
      const nextState = updater(state)

      if (nextState === state) {
        return;
      }

      state = nextState;

      clearTimeout(rerenderTimeoutId);
      rerenderTimeoutId = setTimeout(() => {
        render();
      }, 0)
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

      effect();
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
}

let intervalId = null;

createApp(({state, update}) => {
  after(() => {
    if (!state.initialRender) {
      return;
    }

    intervalId = startInterval();

    update((current) => ({
      ...current,
      interval: {
        ...current.interval,
        status: 'pending',
      },
    }))
  })

  after(() => {
    if (!state.initialRender) {
      return;
    }

    update((current) => ({
      ...current,
      initialRender: false,
    }))
  })

  return `
    <div style="position: fixed; right: 10px; bottom: 10px; padding: 10px; border-radius: 4px; border: 1px solid #000;">
      <div style="margin-bottom: 8px;">
        INTERVAL STATUS: ${state.interval.status}
      </div>
      <div>
        ${state.updates.status === 'pending' ? 'Checking updates...' : ''}
      </div>
    </div>
  `
}, {
  initialRender: true,
  interval: {
    status: 'idle',
  },
  updates: {
    status: 'idle',
  },
});
