(function () {
  let employees = [];
  var flag = 0;
  const id = Date.now();

  const addEmployee = (ev) => {
    let employee = {
      id: id,
      fName: $("#fName").val(),
      lName: $("#lName").val(),
      email: $("#email").val(),
      address: $("#address").val(),
      age: $("#age").val(),
      password: $("#password").val(),
      username: $("#email").val().split("@")[0],
    };
    //for display purposes only
    console.log("added", { employee });

    employees.push(employee);
    // to clear the form for the next entries
    document.querySelector("form").reset();

    //saving to localStorage
    localStorage.setItem("MyEmployeeList", JSON.stringify(employees));
  };

  var employeesData = JSON.parse(localStorage.getItem("MyEmployeeList"));

  //register
  $("#register_btn").click(function (event) {
    event.preventDefault();
    if ($("input").val().trim() == "") {
      // alert("error submitting data");

      //form validation
      var forms = document.getElementsByClassName("needs-validation");
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.classList.add("was-validated");
      });
      return false;
    } else {
      sendEmail();
      // alert("data submitted");
      addEmployee();
      //form remove validation
      var forms = document.getElementsByClassName("needs-validation");
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.classList.remove("was-validated");
      });

      //send data
      event.preventDefault();
      fetch("http://localhost:3000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeesData),
      })
        .then((response) => response.json())
        .then((employeesData) => {
          event.preventDefault();
          console.log("Success:", employeesData);
          // window.location.assign("./login.html");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      event.preventDefault();
      return;
    }
  });

  //send mail

  //send mail()

  // var email = $("#email").val();
  // var username = $("#email").val().split("@")[0];
  // var password = $("#password").val();
  // console.log(email, username, password);
  async function sendEmail() {
    const res = await fetch(`http://localhost:3000/employees/${id}`);
    const data = await res.json();

    console.log(data);
    alert("------");
  }
})();
