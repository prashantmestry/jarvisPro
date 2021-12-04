import React, { useContext } from 'react';
import styled from 'styled-components';
import { headerYearFormatChange } from '../../Utils/globalFunctions';
import moment from 'moment';

const JustTable = (props) => {

    return (
        <div>
            <TableBox>
                <h3>{props.title || 'Table'}</h3>
                <div className='table-scroll'>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                {
                                    props.headerData && props.headerData.map((v, i) => {
                                        return (
                                            <th key={i}>{headerYearFormatChange(v, 'YYYY-MM-DD', 'DD-MM-YYYY')}</th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.bodyData && props.bodyData.map((v, i) => {
                                    return (
                                        <tr key={i}>
                                            <th>{props.replaceTitle[v.attr] || v.attr}</th>
                                            {
                                                props.headerData && props.headerData.map((v1, index) => {
                                                    return (
                                                        <td key={index}> {v.data[v1]}</td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </TableBox>
        </div>
    )
}

let TableBox = styled.div`
h3{
    margin:10px;
    text-transform : capitalize;
}
.table-scroll {
    position: relative;
    width:100%;
    z-index: 1;
    margin: auto;
    overflow: auto;    

    padding-bottom:12px;    

    table {
        width: 100%;
        min-width: 1280px;
        margin: auto;
        border-collapse: separate;
        border-spacing: 0;   
        border-right: 1px solid #000;
        border-left: 1px solid #000;        


      th, td {
        padding: 5px 10px;
        border-bottom: 1px solid #000;
        border-right: 1px solid #000;
        background: none;
        vertical-align: top;

        :last-child{
            border-right: none;
        }
      }     
      thead th {
        background: none;
        color: green;
        position: -webkit-sticky;
        position: sticky;
        top: 0;       
        min-width:130px; 
        padding:8px 5px;  
        font-weight : 500;  
        text-align:center;
      }
      tbody td{
          text-align : right;
      }
      tbody th{
        color: #000;
      }
        th:first-child {
            position: -webkit-sticky;
            position: sticky;
            left: 0;
            z-index: 2;
            background: pink;
        }
        thead th:first-child{
            background: green;
            z-index: 5;
        }
        thead tr{
            background : gray;
        }          
    }
}
`;

export default JustTable;