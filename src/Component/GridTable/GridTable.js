import React from 'react';
import TestTable from './TestTable';
import CellStyleTable from './CellStyleTable';
import RowStyleTable from './RowStyleTable';

const GridTable = (props) => {
    return (
        <div>
            <TestTable />
            {/* <CellStyleTable />
            <RowStyleTable /> */}
        </div>
    )
}

export default GridTable;