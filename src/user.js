import template from "./template";
const loginForm = document.querySelector("#formLogin");
const API_URL = "http://localhost:3001";
const loginRegExp = new RegExp(/^[1|2|3|4]\d{3}$/);
const passwordRegExp = new RegExp(/^\d{6}$/);

function handleInvalidLogin(login) {
  if (!login?.value) {
    login.setCustomValidity("Введите лицевой счёт для входа в личный кабинет");
  } else {
    login.setCustomValidity("Неверный формат. Лицевой счёт состоит из 4 цифр.");
  }
  login.reportValidity();
  login.addEventListener(
    "input",
    () => {
      login.setCustomValidity("");
    },
    { once: true }
  );
}

function handleInvalidPassword(password) {
  if (!password?.value) {
    password.setCustomValidity("Введите пароль для доступа в личный кабинет");
  } else {
    password.setCustomValidity("Неверный формат пароля. Проверьте свой ввод.");
  }
  password.reportValidity();
  password.addEventListener(
    "input",
    () => {
      password.setCustomValidity("");
    },
    { once: true }
  );
}

function handleFormData(form) {
  const response = new FormData(form);
  const data = {};
  for (const [key, value] of response) {
    data[key] = value;
  }
  if (!loginRegExp.test(String(data?.login))) {
    const loginInput = form.querySelector("#login");
    handleInvalidLogin(loginInput);
    return;
  }
  if (!passwordRegExp.test(String(data?.password))) {
    const passInput = form.querySelector("#password");
    handleInvalidPassword(passInput);
    return;
  }
  form.reset();
  return data;
}

async function getUser(authObj) {
  let response = await fetch(`${API_URL}/auth`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    method: "POST",
    body: JSON.stringify(authObj),
  });
  let responseJson = await response.json();
  console.log(responseJson);
  return responseJson;
}

function renderUserPage(res) {
  const rootDir = document.querySelector("#app");
  rootDir.innerHTML = template.userPage(res);
}

async function formSubmitHandler(evt) {
  evt.preventDefault();
  const res = await getUser(handleFormData(loginForm));
  console.log(res);
  if (res?.length > 0) {
    renderUserPage(res);
  } else {
    alert("Лицевой счёт не найден или неверно введён пароль!")
  }
}

loginForm.addEventListener("submit", formSubmitHandler);
