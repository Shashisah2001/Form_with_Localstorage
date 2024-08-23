const firstName = document.querySelector("#input-fname");
const lastName = document.querySelector("#input-lname");
const emailID = document.querySelector("#input-mail");
const mobileNum = document.querySelector("#input-num");
const passwordInput = document.querySelector("#input-password");
const submitButton = document.querySelector("#btn-id");
const tableBody = document.querySelector("#table-body");

let editIndex = null;

submitButton.addEventListener("click", () => {
  const firstNameValue = firstName.value;
  const lastnameValue = lastName.value;
  const emailValue = emailID.value;
  const mobileValue = mobileNum.value;
  const passwordValue = passwordInput.value;

  const formData = {
    firstName: firstNameValue,
    lastName: lastnameValue,
    emailID: emailValue,
    mobileNum: mobileValue,
    password: passwordValue,
  };

  let storedData = JSON.parse(localStorage.getItem("formData")) || [];

  if (editIndex !== null) {
    storedData[editIndex] = formData;
    editIndex = null;
  } else {
    storedData.unshift(formData);
  }

  localStorage.setItem("formData", JSON.stringify(storedData));

  displayStoredData();
  clearForm();
});

function clearForm() {
  firstName.value = "";
  lastName.value = "";
  emailID.value = "";
  mobileNum.value = "";
  passwordInput.value = "";
}

function addRowToTable(data, index) {
  const row = document.createElement("tr");

  row.innerHTML = `
        <td>${data.firstName}</td>
        <td>${data.lastName}</td>
        <td>${data.emailID}</td>
        <td>${data.mobileNum}</td>
        <td>${data.password}</td>
        <td><button onclick="editRow(${index})">Edit</button></td>
        <td><button onclick="deleteRow(${index})">Delete</button></td>
    `;
  // below is used to  add new row to the beginning of the table that we inserted on the form.
  tableBody.prepend(row);
}

function displayStoredData() {
  tableBody.innerHTML = ""; //  we use it to clear the  existing rows from the table.
  const storedData = JSON.parse(localStorage.getItem("formData")) || [];
  storedData.forEach((data, index) => {
    addRowToTable(data, index);
  });
}

function editRow(index) {
  const storedData = JSON.parse(localStorage.getItem("formData"));
  const data = storedData[index];

  firstName.value = data.firstName;
  lastName.value = data.lastName;
  emailID.value = data.emailID;
  mobileNum.value = data.mobileNum;
  passwordInput.value = data.password;

  editIndex = index;
}

function deleteRow(index) {
  let storedData = JSON.parse(localStorage.getItem("formData"));
  storedData.splice(index, 1);
  localStorage.setItem("formData", JSON.stringify(storedData));
  displayStoredData();
}

document.addEventListener("DOMContentLoaded", displayStoredData);
