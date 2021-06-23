$(document).ready(function () {
  "use strict";

  $(".EnableLoader").click(function (event) {
    $(".global-loader").fadeIn("slow");
    $("body").css({ overflow: "hidden" });
    setTimeout(function () {
      $(".global-loader").fadeOut("slow");
      $("body").css({ overflow: "visible" });
    }, 2000);
  });
});

$(window).on("load", function () {
  $(".global-loader").delay(500).fadeOut("slow");
});

//CHECK VALIDATION FUNCTION
function validate(e) {
  if ($("input").val() == "") {
    var forms = document.getElementsByClassName("needs-validation");
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.classList.add("was-validated");
    });
  }
  return false;
}

//Authenticate user function
function checkAuthentication() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  async function getData() {
    const response = await fetch(
      `http://localhost:3000/employees?username=${username}`
    );
    const data = await response.json();
    if (!data.length) {
      alert("wrong username");
      return;
    } else if (data[0].password != password) {
      alert("Please enter valid password.");
      var forms = document.getElementsByClassName("needs-validation");
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.classList.add("was-validated");
      });

      document.getElementById("password").value = "";
      return;
    } else {
      console.log("Flag value is ==> ", data[0].flag);
      alert("Login SUCCESS");

      if (data[0].flag == 1) {
        alert("go to admin profile");
        window.location.href = "./profile-admin.html";
      } else if (data[0].flag == 0) {
        alert("go to employee profile");
        window.location.href = "./profile-employee.html";
      } else if (data[0].flag == 2) {
        alert("go to student profile");
        window.location.href = "./profile-student.html";
      }
    }
  }
  getData();
}

//and check user authentication
$("#login_btn").click(function (e) {
  e.preventDefault();
  validate();
  checkAuthentication();
});
