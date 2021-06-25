$(window).on("load", function () {
  $(".global-loader").delay(500).fadeOut("slow");
});

//GET ATTENDANCE TIME
//CHECK STATUS OF ATTENDANCE
function getTimeStamp() {
  var now = new Date();
  // Current Date
  var date =
    now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  document.getElementById("current_date").innerHTML = date;

  // Current Time
  var hour = now.getHours();
  var minutes = now.getMinutes();
  var second = now.getSeconds();
  var time = hour + ":" + minutes + ":" + second;
  document.getElementById("current_time").innerHTML = time;

  //CHECK STATUS
  var status;
  if (hour == 8 || hour == 9) {
    status = {
      attendance: 1,
      late: 0,
      excuse: 0,
      absence: 0,
    };
    alert("Perfect you are on time");
  }
  if ((hour == 9 && minutes < 1) || hour == 10) {
    status = {
      attendance: 1,
      late: 1,
      excuse: 1,
      absence: 0,
    };
    alert("You are late");
  } else {
    status = {
      attendance: 0,
      late: 0,
      excuse: 1,
      absence: 1,
    };
    alert("Employee is Absence");
  }
  localStorage.setItem("status", JSON.stringify(status));
}

//GET ALL MAIN DATA FROM EMPLOYEES[]
async function getUsername() {
  const response = await fetch(`http://localhost:3000/employees`);
  const empData = await response.json();
  console.log(empData);
  //set value and id
  document.getElementById("selectStudent");
  for (var i = 0; i < empData.length; i++) {
    $("#selectStudent").append(
      $("<option>", {
        value: empData[i].username,
        id: empData[i].id,
      }).text(empData[i].username)
    );
  }
}
getUsername();

//ADD DISABLED ATTRIBUTE TO BUT BEFORE SELECT
if ($("#selectStudent option").val() == "default-option") {
  $("#confirmAttendance_btn").prop("disabled", true);
}

//select user to attend
function selectUserToAttend() {
  $("#selectStudent").change(function () {
    $("#confirmAttendance_btn").prop("disabled", false);
    var username = $(this).val();
    //set username at modal
    $("#username").append(`"${username}"`);
  });
  //empty username after confirmation
  $("#confirmModal").on("hidden.bs.modal", function (e) {
    $("#username").empty();
  });
}
selectUserToAttend();

//REPORT
const addReport = () => {
  var id = $("#selectStudent").children(":selected").attr("id");
  getTimeStamp();
  var currentStatus = JSON.parse(localStorage.getItem("status"));

  let report = {
    empId: parseInt(id),
    date: $("#current_date").text(),
    time: $("#current_time").text(),
    ...currentStatus,
  };

  localStorage.setItem("reportData", JSON.stringify(report));
};

//POST DATA TO API
async function postReportData() {
  addReport();
  var reportData = JSON.parse(localStorage.getItem("reportData"));

  const response = await fetch("http://localhost:3000/reports", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(reportData),
  })
    .then((response) => {
      console.log("Success:", reportData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return;
}

// END CLOCK SCRIPT
$("#confirmAttendance_btn").click(function (e) {
  e.preventDefault();
  // getTimeStamp();
  postReportData();
});
