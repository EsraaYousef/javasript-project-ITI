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

let reports = [];
let flag = "";

//GET ALL USERNAMES IN JSON FILE
async function getUsernames() {
  const response = await fetch(`http://localhost:3000/employees`);
  const data = await response.json();
  console.log(data);
  //set value and id
  document.getElementById("selectStudent");
  for (var i = 0; i < data.length; i++) {
    $("#selectStudent").append(
      $("<option>", {
        value: data[i].username,
        id: data[i].id,
      }).text(data[i].username)
    );
  }
}
getUsernames();

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
  let report = {
    empId: id,
    date: "22/9/99",
    time: "4:44am",
    attendance: 1,
    late: 0,
    excuse: 0,
    absence: 0,
  };
  reports.push(report);

  localStorage.setItem("reportList", JSON.stringify(reports));
};

//POST DATA TO API
async function postReportData() {
  var id = $("#selectStudent").children(":selected").attr("id");
  addReport();
  var reportList = JSON.parse(localStorage.getItem("reportList"))[0];

  const response = await fetch("http://localhost:3000/reports", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(reportList),
  })
    .then((response) => {
      console.log("Success:", reportList);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return;
}

function getTimeStamp() {
  var now = new Date();
  return (
    now.getMonth() +
    1 +
    "/" +
    now.getDate() +
    "/" +
    now.getFullYear() +
    " " +
    now.getHours() +
    ":" +
    (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) +
    ":" +
    (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds())
  );
}

function setTime() {
  document.getElementById("time_recorder").innerText = getTimeStamp();
}

$("#confirmAttendance_btn").click(function (e) {
  e.preventDefault();
  getTimeStamp();
  postReportData();
});
