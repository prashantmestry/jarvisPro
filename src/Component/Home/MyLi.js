import React, { useContext, useEffect, useState } from 'react';
import Loading from '../Common/Loading';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import { MyThemeContext } from '../../Context/MyThemeContext';

const MyLi = (props) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const { userName } = useContext(MyThemeContext);
    //const { name } = useContext(UserContext);

    const userOne = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1);
            }, 500);
        });
    }

    const userTwo = (userId) => {
        return new Promise((resolve, reject) => {
            const userData = [{ id: 1, name: 'Prashant' }, { id: 2, name: 'Kiran' }];
            setTimeout(() => {
                resolve(userData.filter(val => val.id === userId));
            }, 1000);
        });
    }


    const getAllList = async () => {
        setLoading(true);
        const userId = await userOne();
        const userInfo = await userTwo(userId);
        setLoading(false);
        //console.log('userinfo ', userInfo);
        setData(userInfo);
    }

    useEffect(() => {
        //console.log('data : ', data);
    }, [data]);

    // return ReactDom.createPortal(
    //     <MyPortalBox>
    //         Here is my portal
    //     </MyPortalBox>
    //     ,
    //     document.getElementById('myPortal')
    // )

    return (
        <div style={{ border: '1px solid red' }}>
            My List {userName} {loading && <Loading />}
            <div>
                <button onClick={() => getAllList()}>Get User Info</button>
            </div>
            <div style={{ width: '200px' }}>
                {
                    (data?.length > 0) && data.map(val => {
                        return (
                            <div id={val.id}>{val.name}</div>
                        )
                    })
                }
            </div>

            <div style={{ fontSize: '30px' }}>

                <div style={{ fontSize: '20px' }}>

                    <div Xstyle={{ fontSize: '10px' }}>

                        <div style={{ fontSize: '1rem' }}>Prashant Mestry</div>

                        <div style={{ fontSize: '1em' }}>Reshma Mestry</div>

                    </div>

                </div>
            </div>

        </div>
    )
}

const MyPortalBox = styled.div`
    position : relative;
    background : gray;
    padding:20px;
    top:0;
    height:100vh;
    z-index:2;
`;

export default MyLi;