import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Checkbox } from 'antd';
import GridTableContainer from '../Common/GridTableContainer/GridTableContainer';

import * as actions from '../../redux/actions';
import { connect } from 'react-redux';

const TestTable = (props) => {
    const gridRef = useRef();
    const [gridApi, setGridApi] = useState(null);
    const { userList, userLoading } = props.users;

    const [customLoading, setCustomLoading] = useState(false);

    const [colDef, setColDef] = useState([]);
    const [rowData, setRowData] = useState([]);

    const defaultColDef = {
        sortable: true,
        filter: true,
        resizable: true,
        enableValue: true,
        enablePivot: true,
        enableRowGroup: true,
    }

    useEffect(() => {
        props.fetchUserList(1, 0);
    }, []);

    useEffect(() => {
        if (userList?.length > 0) {

            let tempHeader = Object.keys(userList[0]).map(head => {
                let obj = {
                    field: head,
                    // cellRenderer: params => {
                    //     return params.value
                    // }
                }

                if (head === 'id') {
                    obj.width = 15;
                }

                if (head === 'address') {
                    obj.cellRenderer = params => {
                        let { street, zipcode } = params.value;
                        return street + ' ' + zipcode;
                    }
                }
                if (head === 'company') {
                    obj.cellRenderer = params => {
                        console.log('params', params);
                        let { name } = params.value;
                        return name;
                    }
                }


                return obj;
            });
            tempHeader.push({
                field: 'action', headerName: '', width: '160px', resizable: false,
                cellRenderer: 'ActionCellRenderer'
            });

            setColDef(tempHeader);
            setRowData(userList);

        } else {
            setRowData([]);
        }
    }, [userList]);


    const onGridReady = (params) => {
        setGridApi(params.api);
    }

    const LoaderComp = useMemo(() => {
        return CustomLoadingOverlay;
    }, []);

    useEffect(() => {
        if (gridApi) {
            if ((userLoading || customLoading)) {
                gridApi.showLoadingOverlay();
            } else {
                gridApi.hideOverlay();
            }
        }
    }, [userLoading, customLoading]);

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
            <Button onClick={() => {
                var rowNode = gridApi.getRowNode('2');
                console.log('rowNode', rowNode);
            }}>Get Row Info</Button>

            <Button onClick={() => {
                setCustomLoading(true);
                setTimeout(() => {
                    setCustomLoading(false);
                }, 3000)
            }}>Show Loading {customLoading && 'loading'}</Button>

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
                        customLoadingOverlay: CustomLoadingOverlay,
                    }}
                    getRowId={getRowId}
                    loadingOverlayComponent={'customLoadingOverlay'}
                />
            </GridTableContainer>
        </div>
    )
}

const CustomLoadingOverlay = () => {
    return (
        <div style={{ height: '20%', color: '#fff' }}>
            <LoadingOutlined /> New Loading...
        </div>
    )
}


let mapStateToProps = state => {
    return {
        users: state.users
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        fetchUserList: (pageNum, offset) => dispatch(actions.fetchUserList(pageNum, offset)),
        setUserInfo: (data) => dispatch(actions.setUserInfo(data)),
        fetchUserPosts: (userId) => dispatch(actions.fetchUserPosts(userId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TestTable);