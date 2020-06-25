const INTERVAL_TIME = 1000;

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

  if (confirmSquashAndMergeBtn) {
    confirmSquashAndMergeBtn.click();
    return;
  }
}, INTERVAL_TIME);
