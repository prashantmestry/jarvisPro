import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Checkbox } from 'antd';
import GridTableContainer from '../Common/GridTableContainer/GridTableContainer';

const TestTable = (props) => {
    const [gridApi, setGridApi] = useState(null);
    const [colDef, setColDef] = useState([
        { field: 'name' }, { field: 'age' }, { field: 'color' },
        {
            field: 'action', headerName: '', width: '160px', resizable: false,
            cellRenderer: 'ActionCellRenderer'
        }
    ]);

    const gridRef = useRef();

    const [rowData, setRowData] = useState([
        { id: '1', name: 'raju', age: '21', color: 'red' },
        { id: '2', name: 'kiran', age: '20', color: 'green' },
        { id: '3', name: 'prashant', age: '32', color: 'pink', isCheck: true, isLoading: true },

        { id: '4', name: 'rajesh', age: '20', color: 'red' },
        { id: '5', name: 'swati', age: '30', color: 'green' },
        { id: '6', name: 'abhai', age: '32', color: 'pink', isCheck: true, isLoading: true }
    ]);

    const defaultColDef = {
        sortable: true,
        filter: true,
        resizable: true,
        enableValue: true,
        enablePivot: true,
        enableRowGroup: true,
    }

    const onGridReady = (params) => {
        setGridApi(params.api);
    }

    useEffect(() => {
        console.log('rowData', rowData);
    }, [rowData]);

    const getRowId = useCallback((params) => {
        return params.data.id;
    }, []);

    const onCheck = (params) => {
        let item = params.data;

        console.log('on check', params);



        //console.log('item', item);
        setRowData(prev => prev.map(val => (
            val.id === item.id ?
                { ...val, isCheck: !item.isCheck, isLoading: !item.isLoading }
                :
                val
        )));
    }

    const getRowInfo = () => {
        var rowNode = gridApi.getRowNode('2');
        console.log('rowNode', rowNode);


    }

    const actionComp = props => {
        return (
            <div className='flex justify-left align-center'>
                <div>
                    <Checkbox style={{ minWidth: '20px' }}
                        checked={props.data?.isCheck || false}
                        onChange={(val) => onCheck(props)} />
                </div>
                <div className='margin-l-8'>
                    {
                        props.data?.isCheck ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                </div>
            </div>
        )
    }

    return (
        <div>
            <Button onClick={() => getRowInfo()}>Click</Button>
            <GridTableContainer
                totalRow={(rowData.length + 1) * 37}
                rowHeight
            >
                <AgGridReact
                    ref={gridRef}
                    columnDefs={colDef}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    rowHeight={35}
                    headerHeight={40}
                    onGridReady={onGridReady}
                    animateRows
                    frameworkComponents={{
                        ActionCellRenderer: actionComp,
                    }}
                    getRowId={getRowId}
                //loadingOverlayComponent={'customLoadingOverlay'}
                />
            </GridTableContainer>
        </div>
    )
}

export default TestTable;