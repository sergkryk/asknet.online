import template from "./template";

const loginForm = document.querySelector("#formLogin");

const API_URL = "http://localhost:3001";

function handleFormData(form) {
  const response = new FormData(form);
  const data = {};
  for (const [key, value] of response) {
    data[key] = value;
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
  return responseJson;
}

function renderUserPage(res) {
  const rootDir = document.querySelector("#app");
  rootDir.innerHTML = template.userPage(res);
}

async function formSubmitHandler(evt) {
  evt.preventDefault();
  const res = await getUser(handleFormData(loginForm));
  if (res?.length > 0) {
    renderUserPage(res);
  }
}

loginForm.addEventListener("submit", formSubmitHandler);
