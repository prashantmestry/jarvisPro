import React, { createContext, useState } from 'react'
export const MyThemeContext = createContext();

let darkThemeColor = {
    currentTheme: 'dark',
    color: {
        text: '#e1e1e1',
        plainBg: '#001528',
        bg: '#03214e',
        bgBorder: '#174387',

        bg2: '#0a2c60',
        bg2Border: '#204683',

        bgComp: 'red',
        green: '#19c991',
        yellow: '#e3de20',
        red: '#ff6353',

        active: '#0a9b39'
    }
};

let lightThemeColor = {
    currentTheme: 'light',
    color: {
        text: '#1e1e1e',
        plainBg: '#fff',
        bg: '#fdfdfd',
        bgBorder: '#d5d5d5',

        bg2: '#efefef',
        bg2Border: '#d7d7d7',

        bgComp: 'green',
        green: '#19c991',
        yellow: '#e3de20',
        red: '#ff6353',

        active: '#585858'
    }
};

const MyThemeContextProvider = (props) => {

    const [theme, setTheme] = useState(darkThemeColor);
    const [currentTheme, setCurrentTheme] = useState("dark");

    const toggleTheme = (which) => {
        if (which === "dark") {
            setTheme(darkThemeColor);
            setCurrentTheme("dark");
        } else if (which === "light") {
            setTheme(lightThemeColor);
            setCurrentTheme("light");
        }
    }

    return (
        <MyThemeContext.Provider value={{
            theme,
            currentTheme,
            toggleTheme
        }}>
            {props.children}
        </MyThemeContext.Provider>
    )
}

export default MyThemeContextProvider
