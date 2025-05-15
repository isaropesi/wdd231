const currentYear = new Date().getFullYear();

const lastUpdateElement = document.getElementById("last-update");
const currentYearElement = document.getElementById("current-year");

if (lastUpdateElement) {
  lastUpdateElement.innerText = document.lastModified;
}
if (currentYearElement) {
  currentYearElement.innerText = currentYear;
}