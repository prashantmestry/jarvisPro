import React, { useReducer, useState } from "react";
import { Input, Button } from "antd";
import styled from "styled-components";


const inititalState = [{ id: Date.now(), name: 'Prashant', email: 'pgm@gmail.com' }];
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_PORTFOLIO':
            console.log('case c');
            return [...state, action.payload]
        case 'DELETE_PORTFOLIO':
            return state.filter(val => val.id !== action.payload.id)
        default:
            return new Error()
    }
}


const CreatePortfolio = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [state, dispatch] = useReducer(reducer, inititalState)

    console.log('render portfolio...');

    return (
        <FormBox className="flex flex-direc-col justify-center align-center pad-10">
            <div className="flex flex-direc-col justify-center align-center" style={{ width: '60%', border: '1px solid red' }}>

                <div className="flex flex-direc-col">
                    <div className="mar-b-10">
                        <div>Enter Name</div>
                        <Input
                            style={{ width: '400px' }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mar-b-10">
                        <div>Enter Email</div>
                        <Input
                            style={{ width: '400px' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={() => {
                            console.log('add');
                            dispatch({ type: 'ADD_PORTFOLIO', payload: { id: Date.now(), name, email } });
                            // setName('');
                            // setEmail('');
                        }}>
                            Submit
                        </Button>
                    </div>
                </div>

                <div className="flex flex-direc-col">
                    {
                        state.map(val => {
                            return (
                                <div className="flex justify-between" key={val.id}>
                                    <div>{val.name}</div>
                                    <div>{val.email}</div>
                                    <Button onClick={() => dispatch({ type: 'DELETE_PORTFOLIO', payload: { id: val.id } })}>Delete</Button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </FormBox>
    )
}

const FormBox = styled.div`
    border : 1px solid ${props => props.theme.color.bgBorder};
    padding:10px;
    margin-top:20px;    
`;

export default CreatePortfolio;