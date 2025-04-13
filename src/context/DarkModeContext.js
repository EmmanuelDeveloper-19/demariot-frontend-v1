import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    };

    const [theme, setTheme] = useState(getPreferredTheme());

    const applyTheme = (newTheme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    };

    useEffect(() => {
        applyTheme(getPreferredTheme());

        // 🟡 También puedes escuchar cambios en el tema del sistema:
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            const savedTheme = localStorage.getItem('theme');
            if (!savedTheme) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
