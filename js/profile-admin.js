$(window).on("load", function () {
  $(".global-loader").delay(500).fadeOut("slow");
});

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
  const fetchEmployees = await fetch("http://localhost:3000/employees");
  const employeesJson = await fetchEmployees.json();

  const fetchReports = await fetch(`http://localhost:3000/reports`);
  const reportsJson = await fetchReports.json();

  console.log("Reports Before grouping ==> ", reportsJson);

  let reportsGroupedArr = groupArrayOfObjectsByValue(reportsJson, "empId");

  console.log("Reports grouped for each Employee ==> ", reportsGroupedArr);

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

  //reports ordered by date
  var recentDay = reportGroupedByDay[reportGroupedByDay.length - 1];
  console.log("reports ordered by date", recentDay, recentDay.length);
  //SORT BY ID
  recentDay.sort((a, b) => (a.empId > b.empId ? 1 : -1));
  console.log("reports ordered by ", recentDay);
  //GET DATE
  let recentTimeVal = recentDay.map(({ time }) => time);
  let currentTextStatusVal = recentDay.map(
    ({ currentTextStatus }) => currentTextStatus
  );
  console.log(currentTextStatusVal);

  //DRAW TABLE
  const body = document.querySelector("tbody");

  console.log("employeesJson.length", employeesJson.length);
  console.log("reportGroupedByDay.length", reportGroupedByDay.length);

  for (let i = 0; i < employeesJson.length; i++) {
    const { id, fName, lName, email, username } = employeesJson[i];
    const body = document.querySelector("tbody");
    const htmlTemplate = `
            <tr id="employee-${id}">
              <td>${id}</td>
              <td>${fName + " " + lName}</td>
              <td>${username}</td>
              <td>${email}</td>
              <td>${recentTimeVal[i]} </td>
              <td class="status"><span class="badge">${
                currentTextStatusVal[i]
              }</span></td>
            </tr>
            `;
    body.innerHTML += htmlTemplate;
  }
  //SET status CLASS
  function checkStatus() {
    $("table tr")
      .find("td.status span")
      .each(function () {
        var elem = $(this);
        if ($(this).text().includes("Attend")) {
          elem.addClass("badge-success");
        } else if ($(this).text().includes("Late")) {
          elem.addClass("badge-warning");
        } else {
          elem.addClass("badge-danger");
        }
      });
  }
  checkStatus();
}
getEmployeesData();

// getEmployeesData();
//getDailyReports()
function getDailyReports() {
  getEmployeesData();
}
//getDailyReports()
function getMonthlyReports() {
  getEmployeesData();
}
