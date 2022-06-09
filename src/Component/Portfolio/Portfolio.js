import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { MyHomeContext } from '../Home/Context/HomeContext';
import Folder from './Folder';
import './Portfolio.css';
import { Input } from 'antd';
import RatingDropDowns from './RatingDropDowns';
const { Search } = Input;

const Portfolio = (props) => {

    const [folders, setFolders] = useState(
        {
            name: 'root',
            type: 'folder',
            child: [
                {
                    type: 'folder',
                    name: 'public',
                    child: [
                        {
                            type: 'folder',
                            name: 'image',
                            child: [
                                {
                                    type: 'file',
                                    name: 'image1.jpg'
                                },
                                {
                                    type: 'file',
                                    name: 'image2.jpg'
                                }
                            ]
                        },
                        {
                            type: 'file',
                            name: 'index.html'
                        },
                        {
                            type: 'file',
                            name: 'index.css'
                        }
                    ]
                },
                {
                    type: 'folder',
                    name: 'src',
                    child: [
                        {
                            type: 'file',
                            name: 'app.js'
                        },
                        {
                            type: 'file',
                            name: 'index.js'
                        },
                        {
                            type: 'file',
                            name: 'index.css'
                        }
                    ]
                },
                {
                    type: 'file',
                    name: 'root.html'
                }
            ]
        }
    )

    const [searchTxt, setSearchTxt] = useState("");

    //Debounce
    const myDbounce = (cb, duration) => {
        let timeID = 0;
        return (...args) => {
            console.log('args', args);
            if (timeID) {
                clearTimeout(timeID);
            }
            timeID = setTimeout(() => {
                cb(args);
            }, duration);
        }
    }

    const onSearchD = myDbounce((event) => {
        console.log('here is time', event[1]);
        setSearchTxt(event[0].target.value);
    }, 300);



    //Throttling
    const myThrottle = (cb, duration) => {
        let oldT = 0;
        return (args) => {
            let newT = new Date().getTime();
            if (newT - oldT > duration) {
                setTimeout(() => {
                    cb(args);
                }, duration);
                oldT = newT;
            }
        }
    }

    const onSearchT = myThrottle((e, tt) => {
        setSearchTxt(e.target.value);
    }, 500);

    // useEffect(() => {
    //     props.getportfolioist();
    // }, []);


    useEffect(() => {

        var y = 1;
        if(function f(){}){
             y += typeof y;

             y = y + typeof y
        }

        console.log('y' , y);

        console.log('===');


        // 0 1 1 2 3 5 8 13

        let prevNum = 0;
        let nextNum = 1;
        let final = 0;

        do {
            final = prevNum + nextNum;
            prevNum = nextNum;
            nextNum = final;
            console.log(final + " ");
        }
        while (final < 100);



        // console.log(prevNum + " ");
        // console.log(nextNum + " ");

        // while (final < 100) {

        //     final = prevNum + nextNum;              // 0 + 1    
        //     prevNum = nextNum;          // 1 3
        //     nextNum = final;            // 1 2

        //     console.log(final + " ");

        // }


        // for (let i = 1; i <= 50; i++) {
        //     let count = 0;
        //     for (let j = 1; j <= i; j++) {
        //         if (i % j === 0) {
        //             count++;
        //         }
        //         if (count > 2) {
        //             break;
        //         }
        //     }             
        //     if (count === 2) {
        //         console.log('prime number', i);
        //     }
        // }
    }, [])

    return (
        <>
            <div>
                <Folder rootFolder={folders} />
                <div style={{ marginTop: '40px' }}>

                    <Input placeholder="input search text" onChange={(e) => onSearchD(e, 'prashant')} style={{ width: 300 }} />
                    <div>Debounce Enter Text : <span>{searchTxt}</span></div>

                    <div style={{ marginTop: '20px' }} />

                    <Input placeholder="input search text" onChange={(e) => onSearchT(e, 'mestry')} style={{ width: 300 }} />
                    <div>Throttle Enter Text : <span>{searchTxt}</span></div>

                </div>
                <RatingDropDowns />
            </div>
        </>
    )
}



let mapStateToProps = (state) => {
    return {
        //portfolioList = state.po
    }
}

let mapDispatchToProps = dispatch => {
    return {
        getportfolioist: () => dispatch(actions.getportfolioList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);