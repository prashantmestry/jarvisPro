import React, { createContext, useState } from 'react'
export const MyThemeContext = createContext();

let lightThemeColor = {
    currentTheme: 'light',
    color: {
        text: '#000',
        bg: '#dbdbdb'
    }
};

let darkThemeColor = {
    currentTheme: 'dark',
    color: {
        text: '#fff',
        bg: '#6b98c1'
    }
};

const MyThemeContextProvider = (props) => {

    const [theme, setTheme] = useState(lightThemeColor);
    const [currentTheme, setCurrentTheme] = useState("light");

    const toggleTheme = (which) => {
        console.log('www', which);
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
