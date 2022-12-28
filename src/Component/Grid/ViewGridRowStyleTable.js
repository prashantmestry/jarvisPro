import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community";
import { Button } from 'antd';
import { coldDef } from './Dummy/colDef';
import { rowData as rowNew } from './Dummy/rowData';

const ViewGridRowStyleTable = (props) => {

    const [columnShow, setColumnShow] = useState(true);

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [columnDefs, setColumnDefs] = useState([
        { headerName: "Heading", field: "Heading" },
        { headerName: "Current", field: "Current" },
        {
            headerName: "Forward", field: "Forward",
            cellRenderer: (params) => {
                console.log('param', params);
                let val = params.value;
                if (params.data.display_color && params.data.display_color === 'red') {
                    val = val + '%';
                }
                return val;
            }
        }
    ]);


    const [rowData, setRowData] = useState([
        {
            "Heading": "tdm_138",
            "Current": 10,
            "Forward": -15.12
        },
        {
            "Heading": "tdm_141",
            "Current": 16,
            "Forward": 20
        },
        {
            "Heading": "tdm_145",
            "Current": 10,
            "Forward": 22.20
        },
        {
            "Heading": "tdm_151",
            "Current": 21,
            "Forward": 0.0
        },
        {
            "Heading": "tdm_158",
            "Current": 15,
            "Forward": -10.10,
            "display_color": "red",
            "display_format": "%"
        }
    ]);

    const defaultColDef = {
        flex: 1,
        sortable: true,
        resizable: true,
        enableValue: true,
        enablePivot: true,
        enableRowGroup: true,
        filter: true,
    };

    let onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    const rowStyle = { background: '#f9dada' }; // red color
    const getRowStyle = params => {
        if (params.node.rowIndex % 2 === 0) {
            return { background: '#cceacc' };  // green color
        }
    };

    const rowClass = 'my-green-class';
    const getRowClass = params => {
        if (params.node.rowIndex % 2 === 0) {
            return 'my-red-class';
        }
    };

    const rowClassRules = {
        'rag-blue': function (params) {
            return params.data.Current >= 16;
        },
        'rag-orange': function (params) {
            return params.data.Current === 15;
        },
        'rag-violet': function (params) {
            return params.data.Current === 10;
        }
    };


    return (
        <div>
            <div style={{ textAlign: 'center' }}>Grid Row Style Example</div>
            <Button onClick={() => setColumnShow(!columnShow)}>Toggle</Button>
            <div
                className="ag-theme-alpine"
                style={{
                    height: '400px',
                    width: '100%',
                    padding: '5px',
                    margin: '0 auto'
                }}
            >
                <AgGridReact
                    // columnDefs={columnDefs}
                    // defaultColDef={defaultColDef}
                    // rowData={rowData}

                    columnDefs={coldDef}
                    rowData={rowNew}

                    onGridReady={onGridReady}
                    applyColumnDefOrder={true}

                    // pivotPanelShow={'always'}
                    // rowGroupPanelShow={'always'}
                    // pivotColumnGroupTotals={'before'}

                    rowStyle={rowStyle}
                    getRowStyle={getRowStyle}

                    // rowClass={rowClass}
                    // getRowClass={getRowClass}
                    //rowClassRules={rowClassRules}
                    columnHoverHighlight={columnShow}

                />
            </div>

        </div>
    )
}

export default ViewGridRowStyleTable;