$(window).on("load", function () {
  $(".global-loader").delay(500).fadeOut("slow");
});

// getEmployeesData();
//getDailyReports()
function getDailyReports() {
  getEmployeesData();
}
//getDailyReports()
function getMonthlyReports() {
  alert("getMonthlyReports");
}
//arrange
function groupArrayOfObjectsByValue(list, key) {
  let arrOfObjects = list.reduce(function (prev, cur) {
    (prev[cur[key]] = prev[cur[key]] || []).push(cur);
    return prev;
  }, []);

  // Filtering empty elements out of the array
  return arrOfObjects.filter(function (e) {
    return e != null;
  });
}
async function getEmployeesData() {
  const fetchEmps = await fetch("http://localhost:3000/employees");
  const empsJson = await fetchEmps.json();

  // var tr = $("tr");
  // for (var newId = tr.index() + 1; newId > tr.length; newId++) {

  // }
  const fetchReports = await fetch(`http://localhost:3000/reports`);
  const reportsJson = await fetchReports.json();

  console.log("reports json => ", reportsJson);

  console.log("Before grouping ==> ", reportsJson);

  let reportsGroupedArr = groupArrayOfObjectsByValue(reportsJson, "empId");

  console.log("After grouping ==> ", reportsGroupedArr);

  var copyOfReport = [];
  for (let i = 0; i < reportsJson.length; i++) {
    // Copying report into a new array
    copyOfReport.push(reportsJson[i]);

    // Getting month number from date in report
    var parseDate = Date.parse(reportsJson[i].date);
    var dayNum = new Date(parseDate).getDate();

    // Overwriting date from full string to only month number
    copyOfReport[i] = { ...copyOfReport[i], date: dayNum };
  }

  // Grouping the cloned array by month number
  let reportGroupedByDay = groupArrayOfObjectsByValue(copyOfReport, "date");

  console.log("reportGroupedByDay", reportGroupedByDay);
  const body = document.querySelector("tbody");

  empsJson.forEach((employee) => {
    const { id, fName, lName, email, username } = employee;
    const body = document.querySelector("tbody");
    const htmlTemplate = `
            <tr id="employee-${id}">
              <td>${id}</td>
              <td>${fName + " " + lName}</td>
              <td>${username}</td>
              <td>${email}</td>
              <td>checkIn </td>
            </tr>
            `;
    body.innerHTML += htmlTemplate;
  });
}
