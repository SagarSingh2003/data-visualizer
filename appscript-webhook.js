function updateData(e) {
      
    const url = "";
  
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const data = sheet.getDataRange().getValues();
  
    const payload = {
      updatedData: data,
      time: new Date()
    };
  
    const options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
    };
  
    UrlFetchApp.fetch(url, options);
  }