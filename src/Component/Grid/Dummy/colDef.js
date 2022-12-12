
function roundValue(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function formatValueNew(frml_id, value, refrence) {
  //const state = store.getState();
  let formattedValue = value;
  if (typeof value !== 'string' && typeof value !== 'boolean') {

    if (refrence) {
      if (refrence.displayFormat === "float" && refrence.dpts) {
        formattedValue = roundValue(value, refrence.dpts || 2);
      } else if (refrence.displayFormat === "perc") {
        formattedValue = roundValue(parseFloat(value * 100), refrence.dpts || 2);
      } else {
        formattedValue = parseInt(value);
      }
    } else {
      formattedValue = roundValue(value, 2);
    }
  } else {
    if (value === 'NaN' || value === 'nan' || isNaN(value)) {
      formattedValue = '-'
    }
  }
  return formattedValue
}


export const coldDef = [
  {
    "field": "company",
    "headerName": "Company",
    "enableRowGroup": true,
    "enablePivot": false,
    "enableValue": false,
    "sortable": true,
    "filter": true,
    "hide": false,
    "rowDrag": true,
    "resizable": true,
    "type": false,
    "wrapText": true,
    "autoHeight": true,
    "pinned": "left"
  },
  {
    "field": "comp_id",
    "headerName": "Company Id",
    "enableRowGroup": true,
    "enablePivot": false,
    "enableValue": false,
    "sortable": true,
    "filter": true,
    "hide": true,
    "rowDrag": false,
    "resizable": true,
    "type": "numericColumn",
    "wrapText": false,
    "autoHeight": false,
    "pinned": false,

  },
  {
    "field": "frml_12",
    "headerName": "Asdf_asdf_r",
    "enableRowGroup": true,
    "enablePivot": true,
    "enableValue": true,
    "sortable": true,
    "filter": true,
    "hide": false,
    "rowDrag": false,
    "resizable": true,
    "type": "numericColumn",
    "wrapText": false,
    "autoHeight": false,
    "pinned": false,
    "displayFormat": 'perc',
    "dpts": '2',
    cellRenderer: (params) => {
      console.log('param', params);
      let val = formatValueNew(null, params.value, {
        displayFormat: 'perc',
        dpts: 2
      });
      return val;
    }
  },
  {
    "field": "pat_r",
    "headerName": "PAT margin",
    "enableRowGroup": true,
    "enablePivot": true,
    "pivot": true,
    "enableValue": true,
    "sortable": true,
    "filter": true,
    "resizable": true,
    "type": "numericColumn",
    "displayFormat": 'perc',
    "dpts": '2',
    cellRenderer: (params) => {
      console.log('param', params);
      let val = formatValueNew(null, params.value, {
        displayFormat: 'perc',
        dpts: 2
      });
      if (val !== '-') {
        return val + '%';
      }
      return val;

    }
    // "comparator": (valueA, valueB) => {
    //   return valueA && valueA.toString().localeCompare(valueB, undefined, {
    //     numeric: true,
    //     sensitivity: 'base'
    //   })
    // }
  }
]