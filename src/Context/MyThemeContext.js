import React, { createContext, useState } from 'react'
export const MyThemeContext = createContext();

let darkThemeColor = {
    currentTheme: 'dark',
    color: {
        text: '#e1e1e1',

        bg: '#03214e',
        bg2: '#0a2c60',        
        green: '#19c991',
        yellow: '#e3de20',
        red: '#ff6353'
    }
};

let lightThemeColor = {
    currentTheme: 'light',
    color: {
        text: '#1e1e1e',
        bgPlain: '#fff',
        bg: '#fff',
        bg2: '#efefef',        

        green: '#19c991',
        yellow: '#e3de20',
        red: '#ff6353'
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
