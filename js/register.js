$(window).on("load", function () {
  $(".global-loader").delay(500).fadeOut("slow");
});

let employees = [];
let flag = "";

const addEmployee = (ev) => {
  let employee = {
    // id,
    fName: $("#fName").val(),
    lName: $("#lName").val(),
    email: $("#email").val(),
    address: $("#address").val(),
    age: $("#age").val(),
    password: Math.random().toString(36).slice(-10),
    username: $("#email").val().split("@")[0],
    flag: $("input[name=role]:checked", "#registerForm").val(),
  };
  employees.push(employee);
  // console.log("employee added", employee);
  //saving to localStorage
  localStorage.setItem("employeeList", JSON.stringify(employees));
};

//SEND EMAIL
function sendEmail() {
  email = $("#email").val();
  address = $("#address").val();
  password = $("#password").val();
  username = $("#email").val().split("@")[0];

  console.log("email ==> ", email, "\n", "username ==> ", username);
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "attendanceiti2021@gmail.com",
    Password: "74010685975D5B4B3E9C808AFC731409026F",
    To: email,
    From: "attendanceiti2021@gmail.com",
    Subject: "verification Email",
    Body: `Congratulations, This is a verification Email from ITI Attendance System and your \n
        Username is: ${username}\n
        Password is: ${password}`,
  }).then(function (message) {
    alert("Mail has been sent successfully, Please Go and check your Inbox");
  });
}

//POST DATA TO API
async function postData(url = "http://localhost:3000/employees", data = {}) {
  alert("Processing Data !!");
  addEmployee();
  var employeeList = JSON.parse(localStorage.getItem("employeeList"))[0];
  // console.log(employeeList);
  // Default options are marked with
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(employeeList),
  })
    .then((response) => response.json())
    .then((employeesData) => {
      console.log("Success:", employeeList);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  document.querySelector("form").reset();
  window.location.assign("./login.html");

  return;
}

//CHECK VALIDATION FUNCTION
function validate(e) {
  if ($("input").val() == "") {
    var forms = document.getElementsByClassName("needs-validation");
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.classList.add("was-validated");
    });
  } else {
    //POST DATA TO API
    var forms = document.getElementsByClassName("needs-validation");
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.classList.remove("was-validated");
    });

    var email = $("#email").val();
    // alert(email);
    sendEmail();
    //POST DATA TO API
    postData();
  }
  // return (false);
}

//HANDLE SUBMIT DATA
function handleSubmitData(event) {
  event.preventDefault();
  //CHECK VALIDATION
  validate();
  // getFlagValue()
  return false;
  event.preventDefault();
}
