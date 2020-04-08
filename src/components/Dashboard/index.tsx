import React, {useState} from "react";
import { createMuiTheme, createStyles, WithStyles, ThemeProvider, withStyles, Theme } from "@material-ui/core/styles";
import { CssBaseline, Typography, List, ListItem, ListItemIcon, ListItemText, DrawerProps, Link} from "@material-ui/core";
import Header from "../Header";
import Patients from "../Patients/index";
import MedicalHistory from '../MedicalHistory/index';
import clsx from 'clsx';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link as LinkRouter
} from "react-router-dom";
import Sickness from "../Sickness";
import HomeIcon from '@material-ui/icons/Home';
import { Person, Assignment, LocalHospital, SportsHandball, EnhancedEncryption } from "@material-ui/icons";
import UserSickness from '../UserSickness/index';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/sebasvalencia">
                Sebastián Valencia Navarro
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

let theme2 = createMuiTheme({
    palette: {
        primary: {
            light: '#63ccff',
            main: '#009be5',
            dark: '#006db3',
        },
    },
    typography: {
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
        },
    },
    shape: {
        borderRadius: 8,
    },
    props: {
        MuiTab: {
            disableRipple: true,
        },
    },
    mixins: {
        toolbar: {
            minHeight: 48,
        },
    },
});

theme2 = {
    ...theme2,
    overrides: {
        MuiDrawer: {
            paper: {
                backgroundColor: '#18202c',
            },
        },
        MuiButton: {
            label: {
                textTransform: 'none',
            },
            contained: {
                boxShadow: 'none',
                '&:active': {
                    boxShadow: 'none',
                },
            },
        },
        MuiTabs: {
            root: {
                marginLeft: theme2.spacing(1),
            },
            indicator: {
                height: 3,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
                backgroundColor: theme2.palette.common.white,
            },
        },
        MuiTab: {
            root: {
                textTransform: 'none',
                margin: '0 16px',
                minWidth: 0,
                padding: 0,
                [theme2.breakpoints.up('md')]: {
                    padding: 0,
                    minWidth: 0,
                },
            },
        },
        MuiIconButton: {
            root: {
                padding: theme2.spacing(1),
            },
        },
        MuiTooltip: {
            tooltip: {
                borderRadius: 4,
            },
        },
        MuiDivider: {
            root: {
                backgroundColor: '#404854',
            },
        },
        MuiListItemText: {
            primary: {
                fontWeight: theme2.typography.fontWeightMedium,
            },
        },
        MuiListItemIcon: {
            root: {
                color: 'inherit',
                marginRight: 0,
                '& svg': {
                    fontSize: 20,
                },
            },
        },
        MuiAvatar: {
            root: {
                width: 32,
                height: 32,
            },
        },
    },
};

const drawerWidth = 256;


const styles = (theme: Theme) =>
    createStyles({
        categoryHeader: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        categoryHeaderPrimary: {
            color: theme.palette.common.white,
        },
        item: {
            paddingTop: 1,
            paddingBottom: 1,
            color: '#4fc3f7',
            '&:hover,&:focus': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
            
        },
        itemCategory: {
            backgroundColor: '#232f3e',
            boxShadow: '0 -1px 0 #404854 inset',
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        firebase: {
            fontSize: 24,
            color: theme.palette.common.white,
        },
        itemActiveItem: {
            color: '#4fc3f7',
        },
        itemPrimary: {
            fontSize: 'inherit',
        },
        itemIcon: {
            minWidth: 'auto',
            marginRight: theme.spacing(2),
        },
        divider: {
            marginTop: theme.spacing(2),
        },
        root: {
            display: 'flex',
            minHeight: '100vh',
        },
        drawer: {
            [theme2.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
                background:'#232f3e',
            },
        },
        app: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid black',
        },
        main: {
            flex: 1,
            padding: theme2.spacing(6, 4),
            background: '#eaeff1',
        },
        footer: {
            padding: theme2.spacing(2),
            background: '#eaeff1',
        },

    });

export interface PaperbaseProps extends Omit<DrawerProps, 'classes'>, WithStyles<typeof styles> { }
const routes = [
    {
        path: "/",
        exact: true,
        title: 'Home'
    },
    {
        path: "/Sickness",
        title: 'Sickness',
        componentToRender: Sickness
    },
    {
        path: "/Patients",
        title: 'Patients',
        componentToRender: Patients
    },
    {
        path: "/UserSickness",
        title: 'User Sickness',
        componentToRender: UserSickness
    },
    {
        path: "/MedicalHistory",
        title: 'Medical History',
        componentToRender: MedicalHistory
    }
];
function Paperbase(props: PaperbaseProps) {

    const { classes } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <ThemeProvider theme={theme2}>
            <div className={classes.root}>
                <CssBaseline />
                <Router>
                    <div className={classes.drawer}>
                        <List disablePadding>
                            <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
                                Medical App
                            </ListItem>
                            <ListItem className={clsx(classes.item, classes.itemCategory)}>
                                <ListItemIcon className={classes.itemIcon}><HomeIcon /></ListItemIcon>
                                <ListItemText classes={{ primary: classes.itemPrimary, }}>
                                    Project Overview
                                </ListItemText>
                            </ListItem>

                            <List disablePadding>
                                <ListItem className={clsx(classes.item, classes.itemCategory)}>
                                    <ListItemIcon className={classes.itemIcon}><Person /></ListItemIcon>
                                    <LinkRouter to="/Patients" className={classes.itemActiveItem}><ListItemText>Patients</ListItemText></LinkRouter>
                                </ListItem>
                                <ListItem className={clsx(classes.item, classes.itemCategory)}>
                                    <ListItemIcon className={classes.itemIcon}><LocalHospital /></ListItemIcon>
                                    <LinkRouter to="/sickness" className={classes.itemActiveItem}><ListItemText>Sickness</ListItemText></LinkRouter>
                                </ListItem>
                                <ListItem className={clsx(classes.item, classes.itemCategory)}>
                                    <ListItemIcon className={classes.itemIcon}><EnhancedEncryption /></ListItemIcon>
                                    <LinkRouter to="/userSickness" className={classes.itemActiveItem}><ListItemText>User Sickness</ListItemText></LinkRouter>
                                </ListItem>
                                <ListItem className={clsx(classes.item, classes.itemCategory)}>
                                    <ListItemIcon className={classes.itemIcon}><Assignment /></ListItemIcon>
                                    <LinkRouter to="/medicalHistory" className={classes.itemActiveItem}><ListItemText>Medical History</ListItemText></LinkRouter>
                                </ListItem>
                                <ListItem className={clsx(classes.item, classes.itemCategory)}>
                                    <ListItemIcon className={classes.itemIcon}><SportsHandball /></ListItemIcon>
                                    <LinkRouter to="/wellness" className={classes.itemActiveItem}><ListItemText>Wellness</ListItemText></LinkRouter>
                                </ListItem>
                            </List>

                        </List>

                    </div>
                    <div className={classes.app}>

                        <Switch>
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={<Header onDrawerToggle={handleDrawerToggle} title={route.title} />}
                                />
                            ))}
                        </Switch>

                        <main className={classes.main}>
                            <Switch>
                                {routes.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        component={route.componentToRender}
                                    />
                                ))}
                            </Switch>
                        </main>

                        <footer className={classes.footer}>
                            <Copyright />
                        </footer>
                    </div>
                </Router>
            </div>
        </ThemeProvider>
    )
}

export default withStyles(styles)(Paperbase);
