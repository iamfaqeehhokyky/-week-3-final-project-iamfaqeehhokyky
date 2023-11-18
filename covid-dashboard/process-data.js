export default function processData(covidData, countryName, selectedDate) {
  const filteredData = covidData.filter((country) => {
    return country.country.toLowerCase().includes(countryName);
  });

  const sortedData = filteredData.flatMap((country) => {
    return country.statistics
      .filter((data) => !selectedDate || data.time.startsWith(selectedDate))
      .map((data) => {
        return {
          country: country.country,
          cases: data.cases,
          deaths: data.deaths,
          recoveries: data.recoveries,
        };
      });
  });

  return sortedData;
}
