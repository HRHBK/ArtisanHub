import { createTheme } from '@mui/material/styles';

export const COLORS = {
    background: '#FFFFFF',      // White
    text: '#4E3B31',            // Chocolate Brown
    accent: '#F5F5DC',          // Soft Beige
    hover: '#3B2A24',           // Darker Brown
    hoverText: '#FFFFFF',       // White
};

const theme = createTheme({
    palette: {
        primary: {
            main: COLORS.accent,         // Soft Beige for primary buttons
            contrastText: COLORS.text,   // Chocolate Brown text
        },
        secondary: {
            main: COLORS.text,           // Chocolate Brown for secondary
            contrastText: COLORS.accent, // Beige text on brown
        },
        background: {
            default: COLORS.background,
            paper: COLORS.background,
        },
        text: {
            primary: COLORS.text,
            secondary: COLORS.hover,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    backgroundColor: COLORS.accent,
                    color: COLORS.text,
                    '&:hover': {
                        backgroundColor: COLORS.hover,
                        color: COLORS.hoverText,
                    },
                },
                containedPrimary: {
                    backgroundColor: COLORS.accent,
                    color: COLORS.text,
                    '&:hover': {
                        backgroundColor: COLORS.hover,
                        color: COLORS.hoverText,
                    },
                },
                outlinedPrimary: {
                    borderColor: COLORS.text,
                    color: COLORS.text,
                    '&:hover': {
                        backgroundColor: COLORS.accent,
                        borderColor: COLORS.hover,
                        color: COLORS.text,
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: COLORS.background,
                    color: COLORS.text,
                    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.08)',
                    backgroundColor: COLORS.background,
                },
            },
        },
    },
    typography: {
        fontFamily: ['"Roboto"', 'sans-serif'].join(','),
        h4: { color: COLORS.text, fontWeight: 600 },
        h5: { color: COLORS.text, fontWeight: 500 },
        body1: { color: COLORS.text },
    },
});

export default theme;