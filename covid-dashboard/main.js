import './style.css';
import covidData from './covid-data';
import processData from './process-data';

const countryInput = document.getElementById('countryInput');
const filterButton = document.getElementById('filterButton');
const dateFilter = document.getElementById('dateFilter');
const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

const uniqueDates = Array.from(new Set(covidData.flatMap(country => country.statistics.map(data => data.time))));

uniqueDates.forEach(date => {
  const option = document.createElement('option');
  option.value = date;
  option.textContent = date;
  dateFilter.appendChild(option);
});

filterButton.addEventListener('click', () => {
  const countryName = countryInput.value.trim().toLowerCase();
  const selectedDate = dateFilter.value;

  const filteredData = processData(covidData, countryName, selectedDate);
  displayData(filteredData);
});

function displayData(data) {
  dataTable.innerHTML = '';

  data.forEach((entry) => {
    const row = dataTable.insertRow();
    row.innerHTML = `
      <td>${entry.country}</td>
      <td>${entry.cases}</td>
      <td>${entry.deaths}</td>
      <td>${entry.recoveries}</td>
    `;
  });
}

// Initial data display
displayData(covidData);
