
export const companyList = [
    { companyId: 1234, companyName: 'HCL Technology' },
    { companyId: 2345, companyName: 'Axis Bank' },
    { companyId: 3456, companyName: 'ICICI Bank' },
    { companyId: 4567, companyName: 'Ashok Layland' },
    { companyId: 5678, companyName: 'Maruti Suzuki India Ltd.' }
];

export const companyStatementList = [
    { stmtId: 1, stmtName: 'pl interim' },
    { stmtId: 2, stmtName: 'pl annual' },
    { stmtId: 3, stmtName: 'balance sheet' },
    { stmtId: 4, stmtName: 'cash flow' },
    { stmtId: 5, stmtName: 'ratio' }
];

export const companySubStatementList = [
    { stmtId: 'sa', stmtName: 'standard', shortName: 'sa' },
    { stmtId: 'con', stmtName: 'consolidated', shortName: 'con' },
    { stmtId: 'conp', stmtName: 'conslidated priority', shortName: 'conp' }
];

export const frequencyList = [
    { id: 'annually', title: 'annually', picker: 'year' },
    { id: 'quarterly', title: 'quartely', picker: 'quarter' },
    { id: 'monthly', title: 'monthly', picker: 'month' },
    { id: 'weekly', title: 'weekly', picker: 'week' },
    { id: 'daily', title: 'daily', picker: null },
    { id: 'specific_date', title: 'specific date', picker: null }
];