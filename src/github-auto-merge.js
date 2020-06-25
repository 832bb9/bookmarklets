const INTERVAL_TIME = 1000;

const UPDATE_BRANCH_FORM_SELECTOR = `[action$=update_branch]`;

const intervalId = setInterval(() => {
  const updateBranch = document.querySelector(UPDATE_BRANCH_FORM_SELECTOR);

  if (updateBranch) {
    updateBranch.submit();
  }
}, INTERVAL_TIME);
