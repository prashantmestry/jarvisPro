import React from 'react';
import styled from 'styled-components';


export const DragTable1 = (props) => {

    return (

        <DragTable>
            <table width='100%'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>age</th>
                        <th>Location</th>
                        <th>color</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Prashant</td>
                        <td>35</td>
                        <td>Mumbai</td>
                        <td>Red</td>
                    </tr>
                    <tr>
                        <td>Prashant</td>
                        <td>35</td>
                        <td>Mumbai</td>
                        <td>Red</td>
                    </tr>
                    <tr>
                        <td>Prashant</td>
                        <td>35</td>
                        <td>Mumbai</td>
                        <td>Red</td>
                    </tr>
                    <tr>
                        <td>Prashant</td>
                        <td>35</td>
                        <td>Mumbai</td>
                        <td>Red</td>
                    </tr>
                    <tr>
                        <td>Prashant</td>
                        <td>35</td>
                        <td>Mumbai</td>
                        <td>Red</td>
                    </tr>
                </tbody>
            </table>
        </DragTable>
    )
}


export const DragTable2 = (props) => {

    return (

        <DragTable>
            <table width='100%'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>age</th>
                        <th>Location</th>
                        <th>color</th>
                        <th>Summary</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Prashant</td>
                        <td>35</td>
                        <td>Mumbai</td>
                        <td>Red</td>
                        <td>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </td>
                        <td>Edit</td>
                    </tr>
                    <tr>
                        <td>Prashant</td>
                        <td>35</td>
                        <td>Mumbai</td>
                        <td>Red</td>
                        <td>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </td>
                        <td>Edit</td>
                    </tr>
                    <tr>
                        <td>Prashant</td>
                        <td>35</td>
                        <td>Mumbai</td>
                        <td>Red</td>
                        <td>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </td>
                        <td>Edit</td>
                    </tr>
                    <tr>
                        <td>Prashant</td>
                        <td>35</td>
                        <td>Mumbai</td>
                        <td>Red</td>
                        <td>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </td>
                        <td>Edit</td>
                    </tr>
                    <tr>
                        <td>Prashant</td>
                        <td>35</td>
                        <td>Mumbai</td>
                        <td>Red</td>
                        <td>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </td>
                        <td>Edit</td>
                    </tr>
                </tbody>
            </table>
        </DragTable>
    )
}

let DragTable = styled.div`;
    table{
        border-collapase : collapse;
        tr td , tr th {
            border : 1px solid gray;
            padding:10px;
        }
    }
`
