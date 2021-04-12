import {createMuiTheme} from "@material-ui/core";

const Excudo = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#A4C639',
        },
        secondary: {
            main: '#992C7E',
        },
        text: {
            primary: '#A4C639',
            secondary: '#2B2B2B',
        },
        background: {
            default: '#000000',
            paper: '#2B2B2B',
        },
    }
});

export default Excudo;