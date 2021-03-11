window.onload = () => {
  const wrapper = document.querySelector('.page-wrapper');

  // Extract list innerHTML and delete original list-wrapper node.
  const originalList = document.querySelector('.list-wrapper');
  const originalListItems = originalList.innerHTML;
  originalList.parentNode.removeChild(originalList);

  // Top list
  const topList = document.createElement('div');
  topList.className = 'list-wrapper list-a';
  topList.innerHTML = originalListItems;
  wrapper.appendChild(topList);

  // Monocle list
  const monocleList = document.createElement('div');
  monocleList.className = 'list-wrapper list-b';
  monocleList.innerHTML = originalListItems;
  wrapper.appendChild(monocleList);

  // Bottom list
  const bottomList = document.createElement('div');
  bottomList.className = 'list-wrapper list-c';
  bottomList.innerHTML = originalListItems;
  wrapper.appendChild(bottomList);

  const topListInner = topList.querySelector('.list');
  const monocleListInner = monocleList.querySelector('.list');
  const bottomListInner = bottomList.querySelector('.list');

  const rowHeight = topList.querySelector('.list-item').offsetHeight;
  const topListScrollheight = topListInner.scrollHeight;
  const monocleListScrollheight = monocleListInner.scrollHeight;

  let topListHeight = 0,
    monocleListHeight = rowHeight * 2,
    bottomListHeight = 0;

  let scrollPosition = 0;

  function init() {
    window.addEventListener('resize', layout);
    window.addEventListener('scroll', syncScrollPosition);

    // make page-wrapper visible
    wrapper.style.visibility = '';

    layout();

    syncScrollPosition();
  }

  function layout() {
    let height = window.innerHeight;

    topListHeight = (height - monocleListHeight) / 2;
    // topListHeight = Math.floor(topListHeight / rowHeight) * rowHeight;

    bottomListHeight = height - (topListHeight + monocleListHeight);

    topList.style.height = topListHeight + 'px';
    monocleList.style.height = monocleListHeight + 'px';
    monocleList.style.top = topListHeight + 'px';
    bottomList.style.height = bottomListHeight + 'px';

    sync();
  }

  function sync() {
    topListInner.style.top =
      topListHeight + -scrollPosition * topListScrollheight + 'px';
    monocleListInner.style.top =
      -scrollPosition * (monocleListScrollheight - monocleListHeight) + 'px';
    bottomListInner.style.top = -scrollPosition * topListScrollheight + 'px';
  }

  function syncScrollPosition(event) {
    let scrollRange =
      document.documentElement.scrollHeight -
      document.documentElement.offsetHeight;

    scrollPosition = window.scrollY / scrollRange;
    scrollPosition = Math.max(0, Math.min(1, scrollPosition));

    sync();
  }

  init();

  const timerId = setInterval(() => {
    if (document.querySelector('.LI-profile-pic')) {
      document
        .querySelector('.LI-profile-pic')
        .setAttribute('src', './media/images/0.jfif');
      clearInterval(timerId);
    }
  }, 100);
};
