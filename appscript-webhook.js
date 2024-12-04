function updateData(e) {
      
  const url = "https://data-visualizer-zeta.vercel.app/webhook/update-data";

   // Get the active spreadsheet and the first sheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Get all the data in the sheet
  const data = sheet.getDataRange().getValues();
  
  // Initialize an array to hold the objects
  const dataArray = [];

  // Loop through each row of data (skipping the header)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    
    // Create an object based on the schema
    const dataObject = {
      day: new Date(row[0]), // Convert string date to Date object
      age: row[1],           // Age as string
      gender: row[2],        // Gender as string
      A: Number(row[3]),     // Convert to Number
      B: Number(row[4]),     // Convert to Number
      C: Number(row[5]),     // Convert to Number
      D: Number(row[6]),     // Convert to Number
      E: Number(row[7]),     // Convert to Number
      F: Number(row[8])      // Convert to Number
    };
    
    // Push the object into the array
    dataArray.push(dataObject);
  }

  // Log the resulting array of objects (optional)
  Logger.log(dataArray);

  const payload = {
    updatedData: dataArray,
    time: new Date()
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  };

  UrlFetchApp.fetch(url, options);
}
