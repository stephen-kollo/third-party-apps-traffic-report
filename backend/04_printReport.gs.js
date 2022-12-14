function printReport(report, report_sheets) {
  console.log("------- Printing Report -------")
  const general_report_list = report_sheets.getSheetByName("General report");
  const campaign_report_list = report_sheets.getSheetByName("Campaign report");
  const errors_list = report_sheets.getSheetByName("Error report");
  
  printTotals(report.totals, general_report_list)
  printRegions(report.regions, general_report_list)
  printApps(report.apps, general_report_list)

  printCombinedCampaingData(report.report_data, campaign_report_list)

  printErrors(report.report_data, errors_list)
  
  console.log("================ REPORT PRINTED ================")
}

function printTotals(totlas, report_list) {
  const column_names = [["Source", "Convertions", "Revenue", "Installs", "Cost", "Profit", "ROI"]]
  report_list.getRange(1,1,1,7).setBorder(true,true,true,true,true,true).mergeAcross().setFontWeight("bold").setHorizontalAlignment("center").setBackground("#c3e8c3")
  report_list.getRange(2,1,1,7).setValues(column_names).setFontWeight("bold").setBorder(true,true,true,true,true,true).setBackground("#dedede")
  report_list.getRange(1,1).setValue("Totals")
  
  var data_array = []
  totlas.forEach(source => {
    data_array.push([
      source.source_name.toString(), 
      source.total_convertions,
      source.total_revenue,
      source.total_installs,
      source.total_cost,
      source.total_profit,
      source.total_roi
    ])
  })
  var last_row = report_list.getLastRow()
  report_list.getRange(last_row + 1, 1, data_array.length, 7).setValues(data_array)
  last_row = report_list.getLastRow()
  styleTable(report_list, {
    start_row: 1,
    last_row: last_row,
    start_column: 1,
    last_column: 7
  })
  
  console.log("..totals printed!")
}

function printRegions(region_data, report_list) {
  region_data.forEach(source => {
    const start_row = report_list.getLastRow() + 2
    const column_names = [["Region", "Convertions", "Revenue", "Installs", "Cost", "Profit", "ROI"]]
    report_list.getRange(start_row,1,1,7).setBorder(true,true,true,true,true,true).mergeAcross().setFontWeight("bold").setHorizontalAlignment("center").setBackground("#d1c3e8")
    report_list.getRange(start_row + 1,1,1,7).setValues(column_names).setFontWeight("bold").setBorder(true,true,true,true,true,true).setBackground("#dedede")
    report_list.getRange(start_row,1).setValue(`Regions: ${source.source}`)

    var data_array = []
    source.regions.forEach(region => {
      data_array.push([
        region.region.toString(), 
        region.convertions,
        region.revenue,
        region.installs,
        region.cost,
        region.profit,
        region.roi
      ])
    })
    var last_row = report_list.getLastRow()
    report_list.getRange(last_row + 1, 1, data_array.length, 7).setValues(data_array)
    last_row = report_list.getLastRow()
    styleTable(report_list, {
      start_row: start_row,
      last_row: last_row,
      start_column: 1,
      last_column: 7
    })
  })

  console.log("..regions printed!")
}

function printApps(app_data, report_list) {
  app_data.forEach(source => {
    const start_row = report_list.getLastRow() + 2
    const column_names = [["App", "Convertions", "Revenue", "Installs", "Cost", "Profit", "ROI"]]
    report_list.getRange(start_row,1,1,7).setBorder(true,true,true,true,true,true).mergeAcross().setFontWeight("bold").setHorizontalAlignment("center").setBackground("#b1dce3")
    report_list.getRange(start_row + 1,1,1,7).setValues(column_names).setFontWeight("bold").setBorder(true,true,true,true,true,true).setBackground("#dedede")
    report_list.getRange(start_row,1).setValue(`Apps: ${source.source}`)
   
    var data_array = []
    source.apps.forEach(app => {
      data_array.push([
        app.app.toString(), 
        app.convertions,
        app.revenue,
        app.installs,
        app.cost,
        app.profit,
        app.roi
      ])
    })
    var last_row = report_list.getLastRow()
    report_list.getRange(last_row + 1, 1, data_array.length, 7).setValues(data_array)
    last_row = report_list.getLastRow()
    styleTable(report_list, {
      start_row: start_row,
      last_row: last_row,
      start_column: 1,
      last_column: 7
    })
  })

  console.log("..apps printed!")
}

function printCombinedCampaingData(report_data, report_list) {
  report_data.forEach(source => {
    let start_row
    if(report_list.getLastRow() > 0) {
      start_row = report_list.getLastRow() + 2
    } else {
      start_row = 1
    }
    const column_names = [["App", "Region", "Convertions", "Revenue", "Installs", "Cost", "Profit", "ROI"]]
    report_list.getRange(start_row,1,1,8).setBorder(true,true,true,true,true,true).mergeAcross().setFontWeight("bold").setHorizontalAlignment("center").setBackground("#b1dce3")
    report_list.getRange(start_row + 1,1,1,8).setValues(column_names).setFontWeight("bold").setBorder(true,true,true,true,true,true).setBackground("#dedede")
    report_list.getRange(start_row,1).setValue(`Combined campaign data: ${source.source_name}`)
   
    var data_array = []
    source.data.forEach(unit => {
      const cost = Number(unit.cost)
      const revenue = Number(unit.revenue)
      data_array.push([
        unit.tags.app.toString(), 
        unit.tags.region.toString(), 
        unit.convertions,
        revenue,
        unit.installs,
        cost,
        (revenue - cost),
        ((revenue - cost) / cost)
      ])
    })

    var last_row = report_list.getLastRow()
    report_list.getRange(last_row + 1, 1, data_array.length, 8).setValues(data_array)
    last_row = report_list.getLastRow()
    styleTable(report_list, {
      start_row: start_row,
      last_row: last_row,
      start_column: 1,
      last_column: 8
    })
  })

  console.log("..combined campaign report printed!")
}

function printErrors(report_data, report_list) {
  report_data.forEach(source => {
    if(source.errors.length > 0) {

      let start_row
      if(report_list.getLastRow() > 0) {
        start_row = report_list.getLastRow() + 2
      } else {
        start_row = 1
      }
      const column_names = [["Error name", "Located at", "Campaign name", "Convertions", "Revenue", "Installs", "Cost"]]
      report_list.getRange(start_row,1,1,7).setBorder(true,true,true,true,true,true).mergeAcross().setFontWeight("bold").setHorizontalAlignment("center").setBackground("#b1dce3")
      report_list.getRange(start_row + 1,1,1,7).setValues(column_names).setFontWeight("bold").setBorder(true,true,true,true,true,true).setBackground("#dedede")
      report_list.getRange(start_row,1).setValue(`Error data: ${source.source_name}`)
    
      var data_array = []
      source.errors.forEach(error => {
        const location = Number(error.convertions) > 0 ? "tracker_data" : "source_data"
        data_array.push([
          error.campaign_name.error.error_name.toString(), 
          location,
          error.campaign_name.error.campaign_name.toString(),  
          error.convertions,
          error.revenue,
          error.installs,
          error.cost,
        ])
      })

      var last_row = report_list.getLastRow()
      report_list.getRange(last_row + 1, 1, data_array.length, 7).setValues(data_array)
      last_row = report_list.getLastRow()
      styleErrorTable(report_list, {
        start_row: start_row,
        last_row: last_row,
        start_column: 1,
        last_column: 7
      })
    }
  })

  console.log("..errors printed!")
}

function styleTable(list, range) {
  list.getRange(
    range.start_row + 2,
    range.start_column,
    range.last_row - 1 - range.start_row,
    range.last_column
  ).setBorder(true,true,true,true,true,true)

  list.getRange(
    range.start_row + 1,
    range.start_column,
    range.last_row - range.start_row,
    range.last_column
  ).setHorizontalAlignment("left")

  list.getRange(
    range.start_row + 2,
    range.last_column,
    range.last_row - range.start_row,
    1
  ).setNumberFormat("##.#%")

  list.getRange(
    range.start_row + 2,
    range.last_column - 4,
    range.last_row - range.start_row,
    1
  ).setNumberFormat("$#,##0.00;$(#,##0.00)")

  list.getRange(
    range.start_row + 2,
    range.last_column - 2,
    range.last_row - range.start_row,
    2
  ).setNumberFormat("$#,##0.00;$(#,##0.00)")
}

function styleErrorTable(list, range) {
  list.getRange(
    range.start_row + 2,
    range.start_column,
    range.last_row - 1 - range.start_row,
    range.last_column
  ).setBorder(true,true,true,true,true,true)

  list.getRange(
    range.start_row + 1,
    range.start_column,
    range.last_row - range.start_row,
    range.last_column
  ).setHorizontalAlignment("left")

  list.getRange(
    range.start_row + 2,
    range.last_column,
    range.last_row - range.start_row,
    1
  ).setNumberFormat("$#,##0.00;$(#,##0.00)")

  list.getRange(
    range.start_row + 2,
    range.last_column - 2,
    range.last_row - range.start_row,
    1
  ).setNumberFormat("$#,##0.00;$(#,##0.00)")
}
