// reg
const mobileReg = /^[\d|+|-]*$/;
const emailReg = /@(163|foxmail|qq|gmail)\./;

var joinListOnClick = function(index) {
  var joinLists = document.getElementsByClassName('list-item');
  var joinListsLength = joinLists.length;
  for (var joinListsIndex = 0; joinListsIndex < joinListsLength; joinListsIndex++) {
    var item = joinLists[joinListsIndex];
    item.className = 'list-item';
  };
  joinLists[index].className = 'list-item list-select';
}

const toggleLoginModalVisible = (e) => {
  e.stopPropagation();
  const loginModal = document.getElementById('login-modal');
  const className = loginModal.className;
  if (className === 'login-modal') {
    loginModal.className = 'login-modal modal-show';
  } else {
    loginModal.className = 'login-modal';
  }
};

const toggleApplicationModalVisible = (e) => {
  e.stopPropagation();
  const applicationModal = document.getElementById('modal-application');
  const className = applicationModal.className;
  if (className === 'modal') {
    applicationModal.className = 'modal modal-show';
  } else {
    document.removeEventListener('root').addEventListener('click', closeApplicationModal, false);
    applicationModal.className = 'modal';
  }
};

const closeApplicationModal = () => {
  const applicationModal = document.getElementById('modal-application');
  if (applicationModal) {
    applicationModal.className = 'modal';
  }
};
const closeleLoginModal = () => {
  const applicationModal = document.getElementById('login-modal');
  if (applicationModal) {
    applicationModal.className = 'login-modal';
  }
};

const request = (url, params) => {
  return fetch(
    `${window.backhost}${url}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(params)
    }
  ).then(function(response) {
      return response.json();
    });
};

const onChangeClearErr = (item) => {
  if (item && item.className !== "form-item") {
    item.className = "form-item";
  }
};

const addItemListen = () => {
  const mapItems = (items) => {
    for (let i = 0; i < items.length; i++) {
      const itemBlock = items[i];
      const itemInput = itemBlock.querySelector('input');
      if (itemInput) {
        const onChange = () => {
          onChangeClearErr(itemBlock);
        };
        itemInput.addEventListener('input', onChange, true);
      }
    }
  };

  try {
    if (form1) {
      const form1s = form1.querySelectorAll('.form-item') || [];
      mapItems(form1s);
    }
  } catch(e) {
  }
  try {
    if (formModal) {
      const formModals = formModal.querySelectorAll('.form-item');
      mapItems(formModals);
    }
  } catch(e) {
  }
  try {
    if (formReserve) {
      const formReserves = formReserve.querySelectorAll('.form-item') || [];
      mapItems(formReserves);
      const itemBlock = formReserve.querySelector('.form-wrap');
      const itemTextarea = itemBlock.querySelector('textarea');
      const onChange = () => {
        itemBlock.className = 'form-wrap';
      };
      itemTextarea.addEventListener('input', onChange, true);
    }
  } catch(e) {
  }
};

const validateTextarea = (value = '', item) => {
  if (value.length === 0) {
    item.setAttribute('data-err', item.getAttribute('data-attr'));
    item.className = "form-wrap errTextarea";
    return false;
  }

  item.className = "form-wrap";
  return true
};

const validate = (value = '', item, regs = {}) => {
  const { reg, negateReg } = regs;
  if (value.length === 0) {
    item.setAttribute('data-err', item.getAttribute('data-attr'));
    item.className = "form-item err";
    return false;
  }

  if (reg && !reg.test(value)) {
    item.setAttribute('data-err', item.getAttribute('data-input'));
    item.className = "form-item err";
    return false;
  }

  if (negateReg && negateReg.test(value)) {
    item.setAttribute('data-err', item.getAttribute('data-input'));
    item.className = "form-item err";
    return false; 
  }

  item.className = "form-item";
  return true;
};

const submitForm = () => {
  const name = form1.name.value;
  const email = form1.email.value;
  const mobile = form1.mobile.value;
  const company = form1.company.value;
  const department = form1.department.value;
  const title = form1.title.value;

  const allItem = form1.querySelectorAll('.form-item');

  const validateAll = () => {
    let isErr = false;

    if (!validate(name, allItem[0])) {
      isErr = true;
    }
    if (!validate(email, allItem[1], { negateReg: emailReg })) {
      isErr = true;
    }
    if (!validate(mobile, allItem[2], { reg: mobileReg })) {
      isErr = true;
    }
    if (!validate(company, allItem[3])) {
      isErr = true;
    }
    if (!validate(department, allItem[4])) {
      isErr = true;
    }
    if (!validate(title, allItem[5])) {
      isErr = true;
    }
    return isErr;
  };

  if (
    validateAll()
  ) {
    return false;
  }

  const params = {
    name,
    email,
    mobile,
    company,
    department,
    title,
  };
  request('/website/trail', params)
    .then(() => {
      closeApplicationModal();
    });
};

const submitModalForm = () => {
  const  name = formModal.name.value;
  const  email = formModal.email.value;
  const  mobile = formModal.mobile.value;
  const  company = formModal.company.value;
  const  department = formModal.department.value;
  const  title = formModal.title.value;
  const params = {
    name,
    email,
    mobile,
    company,
    department,
    title
  };

  const allItem = formModal.querySelectorAll('.form-item');

  const validateAll = () => {
    let isErr = false;
    if (!validate(name, allItem[0])) {
      isErr = true;
    }
    if (!validate(email, allItem[1], { negateReg: emailReg })) {
      isErr = true;
    }
    if (!validate(mobile, allItem[2], { reg: mobileReg })) {
      isErr = true;
    }
    if (!validate(company, allItem[3])) {
      isErr = true;
    }
    if (!validate(department, allItem[4])) {
      isErr = true;
    }
    if (!validate(title, allItem[5])) {
      isErr = true;
    }
    return isErr;
  };

  if (
    validateAll()
  ) {
    return false;
  }

  request('/website/trail', params)
    .then(() => {
      closeApplicationModal();
    });
};

const submitFormReserve = () => {
  const type1 = formReserve.type[0].checked;
  const type2 = formReserve.type[1].checked;
  const typeValue = () => {
    if (type1) {
      return 0;
    }
    if (type2) {
      return 1;
    }
    return undefined;
  };

  const name = formReserve.name.value;
  const email = formReserve.email.value;
  const mobile = formReserve.mobile.value;
  const company = formReserve.company.value;
  const type = typeValue();
  const content = formReserve.content.value;
  const params = {
    name,
    email,
    mobile,
    company,
    type,
    content,
  };

  const allItem = formReserve.querySelectorAll('.form-item');
  const textareaItem = formReserve.querySelector('.form-wrap');

  const validateAll = () => {
    let isErr = false;
    if (!validate(name, allItem[0])) {
      isErr = true;
    }
    if (!validate(email, allItem[1], { negateReg: emailReg })) {
      isErr = true;
    }
    if (!validate(mobile, allItem[2], { negateReg: mobileReg })) {
      isErr = true;
    }
    if (!validate(company, allItem[3])) {
      isErr = true;
    }
    if (!validateTextarea(content, textareaItem)) {
      isErr = true;
    }
    return isErr;
  };

  if (
    validateAll()
  ) {
    return false;
  }


  request('/website/feedback', params);
};

const nextCard = () => {
  const cards = document.getElementsByClassName('show-card');
  const cardsLength = cards.length;
  let currentIndex = 0;
  for (let cardsIndex = 0; cardsIndex < cardsLength; cardsIndex++) {
    const item = cards[cardsIndex];
    const className = item.className;
    if (className === 'show-card show') {
      currentIndex = cardsIndex;
      item.className = 'show-card';
    }
  };
  const nextIndex = (currentIndex + 1) % cardsLength;
  cards[nextIndex].className = 'show-card show';

};

const upCard = () => {
  const cards = document.getElementsByClassName('show-card');
  const cardsLength = cards.length;
  let currentIndex = 0;
  for (let cardsIndex = 0; cardsIndex < cardsLength; cardsIndex++) {
    const item = cards[cardsIndex];
    const className = item.className;
    if (className === 'show-card show') {
      currentIndex = cardsIndex;
      item.className = 'show-card';
    }
  };
  const upIndex = (cardsLength + currentIndex - 1) % cardsLength;
  cards[upIndex].className = 'show-card show';
};

const opentNewWindow = () => {
  const hostsName = document.getElementById('input-hosts');
  const hostMatch = window.host.match(/(https*:\/\/)([\s\S]*)/) || [];
  window.open(hostMatch[1] + hostsName.value + '.' + hostMatch[2], '_blank');
  closeleLoginModal();
};

const jumpHomePage = () => {
  window.location.href = window.host;
};

const toggleNavModalVisible = (type) => {
  const modal = document.getElementById("nav-modal-id");
  if (modal) {
    modal.className = type === 'show' ? 'nav-modal modal-show' : "nav-modal";
  }
};

const loginCellOnKeyDown = (e) => {
  if (e.keyCode === 13) {
    opentNewWindow();
    return false;
  }
  return true;
};

window.onload = function () {
  const navApplication = document.getElementById('nav-application');
  const freeBtn = document.getElementById('free-btn-id');
  const formSubmitBtn = document.getElementById('form-submit-btn-id');
  const formModalSubmitBtn = document.getElementById('form-modal-submit-btn-id');
  const formReserveSubmitBtn = document.getElementById('form-reserve-submit-btn-id');
  const loginModal = document.getElementById('login-modal');
  const navLogin = document.getElementById('nav-login');
  const logo = document.getElementById("logo");

  //mobile nav menu
  const mNavMenu = document.getElementById("nav-menu-id");
  const mNavClose = document.getElementById("nav-modal-close-id");
  if (mNavMenu) {
    const show = (e) => {
      e.stopPropagation();
      toggleNavModalVisible('show')
    };
    mNavMenu.addEventListener('click', show, true);
  }
  if (mNavClose) {
    const hide = () => toggleNavModalVisible('hide');
    mNavClose.addEventListener('click', hide, true);
  }

  const loginProduct = document.getElementById('login-product');

  const upBtn = document.getElementById('up-btn');
  const downBtn = document.getElementById('down-btn');

  if (loginProduct) {
    loginProduct.addEventListener('click', opentNewWindow, true);
  }

  if (upBtn) {
    upBtn.addEventListener('click', upCard, true);
  }
  if (downBtn) {
    downBtn.addEventListener('click', nextCard, true);
  }

  if (loginModal) {
    loginModal.addEventListener('click', function(e) {
      e.stopPropagation();
    }, false);
  }
  if (navLogin) {
    navLogin.addEventListener('click', toggleLoginModalVisible, true);
  }
  if (navApplication) {
    navApplication.addEventListener('click', toggleApplicationModalVisible, true);
  }
  if (freeBtn) {
    freeBtn.addEventListener('click', toggleApplicationModalVisible, true);
  }
  if (formModalSubmitBtn) {
    formModalSubmitBtn.addEventListener('click', submitModalForm, true);
  }
  if (formReserveSubmitBtn) {
    formReserveSubmitBtn.addEventListener('click', submitFormReserve, true);
  }
  if (formSubmitBtn) {
    formSubmitBtn.addEventListener('click', submitForm, true);
  }
  if (logo) {
    logo.addEventListener('click', jumpHomePage, true);
  }

  // root listen
  document.getElementById('root').addEventListener('click', function() {
    closeApplicationModal();
    closeleLoginModal();
    toggleNavModalVisible('hide');
  }, false);

  const modalIdClose = document.getElementById('modal-id-close');
  modalIdClose.onclick = closeApplicationModal;

  var joinLists = document.getElementsByClassName('list-item');
  var joinListsLength = joinLists.length;
  for (var joinListsIndex = 0; joinListsIndex < joinListsLength; joinListsIndex++) {
    var item = joinLists[joinListsIndex];
    var aelement = item.getElementsByTagName('a');
    const target = joinListsIndex;
    aelement[0].onclick = function() {
      joinListOnClick(target);
    };
  }

  const cards = document.getElementsByClassName('card-btn');
  const cardsLength = cards.length;
  let currentIndex = 0;
  for (let cardsIndex = 0; cardsIndex < cardsLength; cardsIndex++) {
    const item = cards[cardsIndex];
    item.onclick= toggleApplicationModalVisible;
  };

  // items onchange
  addItemListen();

  const loginCell = document.body.querySelector('.login-cell');
  if (loginCell) {
    loginCell.addEventListener('keydown', loginCellOnKeyDown, true);
  }
}
