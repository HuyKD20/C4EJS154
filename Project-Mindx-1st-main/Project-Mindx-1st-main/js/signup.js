const KEY_USERS = "users";
let users = [];
users = [...users];
let addUser = {
  username: "",
  email: "",
  password: "",
};

const listUser = localStorage.getItem(KEY_USERS) ? JSON.parse(localStorage.getItem(KEY_USERS)) : [];

const elUserName_register = document.getElementById("username_register");
const elEmail_register = document.getElementById("email_register");
const elPassword_register = document.getElementById("password_register");
const elRePassword_register = document.getElementById("re_password_register");
const btnRegister = document.getElementById("btnRegister");

// click login, register
btnRegister.addEventListener("click", onClickRegister);

// function login, register

function onClickRegister(event) {
  event.preventDefault();
  // check username
  if (listUser.length >= 0) {
    const user = listUser.find((user) => user.username == elUserName_register.value);
    const checkEmail = listUser.find((checkEmail) => checkEmail.email == elEmail_register.value);
    if (!!user) {
      // existed username
      alert("Tai khoan da ton tai");
      return;
    } else if (!!checkEmail) {
      // existed email
      alert("Email da ton tai");
      return;
    } else if (elUserName_register.value == "" || elEmail_register.value == "" || elPassword_register.value == "" || elRePassword_register.value == "") {
      alert("Vui long dien day du thong tin");
    } else if (elPassword_register.value != elRePassword_register.value) {
      // wrong re_password
      alert("Mat khau khong trung khop");
      return;
    } else {
      // success sign up
      addUser = {
        ...addUser,
        username: elUserName_register.value,
        email: elEmail_register.value,
        password: elPassword_register.value,
      };
      listUser.push(addUser);
      alert("Dang ki thanh cong");
    }
    // push to localStorage
    localStorage.setItem(KEY_USERS, JSON.stringify(listUser));
  }
}
