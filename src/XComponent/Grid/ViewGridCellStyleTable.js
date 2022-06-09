import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community";
import Button from '@restart/ui/esm/Button';

const ViewGridCellStyleTable = (props) => {

    const [columnShow, setColumnShow] = useState(true);    
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    let myClassRules = {
        'rag-orange': params => params.data.Current === 10,
        'cell-blue-right-class': params => params.data.Current >= 16
    }

    const [columnDefs, setColumnDefs] = useState([
        { headerName: "Heading", field: "Heading", cellClass: 'text-cell' },
        { headerName: "Current", field: "Current", cellClassRules: myClassRules, editable: true },
        {
            headerName: "Forward", field: "Forward",
            cellClass: 'number-cell',
            cellRendererSelector: params => {

                const greenDetails = {
                    component: "greenCellRenderer"
                };
                const redDetails = {
                    component: "redCellRenderer"
                };

                if (params.data.Forward < 20) {
                    return greenDetails;
                }

                if (params.data.Forward <= 20 && params.data.Forward >= 22) {
                    return redDetails;
                }
                return null;
            },
            valueFormatter: params => {
                return '$' + params.data.Forward
            }
        }
    ]);

    const [rowData, setRowData] = useState([
        {
            "Heading": "tdm_138",
            "Current": 10,
            "Forward": 15
        },
        {
            "Heading": "tdm_141",
            "Current": 16,
            "Forward": 20
        },
        {
            "Heading": "tdm_145",
            "Current": 10,
            "Forward": 22
        },
        {
            "Heading": "tdm_151",
            "Current": 21,
            "Forward": 62
        },
        {
            "Heading": "tdm_158",
            "Current": 15,
            "Forward": 10,
        }
    ]);

    const defaultColDef = {
        flex: 1,
        sortable: true,
        resizable: true,
        enableValue: true,
        enablePivot: true,
        enableRowGroup: true,
        filter: true
    };


    let onGridReady = (params) => {        
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    let onUpdateSomeValues = () => {
        var rowCount = gridApi.getDisplayedRowCount();        
        for (var i = 0; i < 5; i++) {
            var row = Math.floor(Math.random() * rowCount);
            var rowNode = gridApi.getDisplayedRowAtIndex(row);
            var col = ['Current', 'Forward'][i % 2];
            rowNode.setDataValue(col, Math.floor(Math.random() * 30));
        }
    }

    return (
        <div>
            <div style={{ margin: '10px auto', textAlign: 'center' }}>Grid Cell Style Example</div>
            <div style={{ textAlign: 'center' }}>
                {/* <Button onClick={() => setColumnShow(!columnShow)}>Toggle</Button>&nbsp; */}
                <Button onClick={() => onUpdateSomeValues()}>Update Some Data</Button>

            </div>
            <div
                className="ag-theme-alpine"
                style={{
                    height: '400px',
                    width: '80%',
                    padding: '5px',
                    margin: '0 auto'
                }}
            >
                <AgGridReact
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowData={rowData}

                    onGridReady={onGridReady}
                    applyColumnDefOrder={true}
                    pivotPanelShow={'always'}
                    rowGroupPanelShow={'always'}
                    pivotColumnGroupTotals={'before'}

                    cellFlashDelay={2000}
                    cellFadeDelay={500}

                />

            </div>

        </div>
    )
}

export default ViewGridCellStyleTable;