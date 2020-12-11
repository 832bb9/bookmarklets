const INTERVAL_TIME = 1000;
const INITIAL_DESCRIPTION_TEXT = 'No description provided.'

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
  const innerText = document.querySelector('#discussion_bucket .js-discussion:first-child .comment-body').innerText
  return innerText === INITIAL_DESCRIPTION_TEXT ? '' : innerText
};

const getPullRequestTitleText = () => {
  return document.querySelector('#partial-discussion-header .js-issue-title').innerText
};

const selectSquashAndMergeDescriptionTextarea = () => {
  return document.querySelector('#merge_message_field');
};

const selectSquashAndMergeTitleInput = () => {
  return document.querySelector('#merge_title_field');
};

const intervalId = setInterval(() => {
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
