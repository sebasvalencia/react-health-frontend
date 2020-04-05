

import React from 'react';
import { Input, Button, Typography, makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { login } from '../../api/patients';
import { Credentials } from '../../models/types';
import { Switch } from "react-router";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Dashboard from '../Dashboard';

const useStyles = makeStyles(theme => ({
    marginAutoContainer: {
        width: 500,
        height: 200,
        display: 'flex',
    },
    marginAutoItem: {
        margin: 'auto'
    },
    alignItemsAndJustifyContent: {
        width: 500,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
    },
    root: {
        justifyContent: 'center'
    },
    popover: {
        padding: "theme.spacing(2)"
    }
}))

type LoginState = {
    username: string;
    password: string;
    isLogggedIn: boolean;
};


export class Login extends React.Component<{}, LoginState> {
    state = {
        username: "",
        password: "",
        isLogggedIn: false
    };

    handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        this.setState({ [name]: event.target.value } as any);
    };

    handleSubmit = (event: any) => {
        event.preventDefault();

        const credentials: Credentials = {
            Email: this.state.username,
            Password: this.state.password
        }

        login(credentials).then(response => {

            if (!response.data.value) {
                // this.setState({ alert: true });
                this.setState({ isLogggedIn: false });
            } else {
                this.setState({ isLogggedIn: true });
            }
        });
    };

    render() {
        return (

            this.state.isLogggedIn ?
                (
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Dashboard}></Route>
                        </Switch>
                    </Router>
                )
                :

                !this.state.isLogggedIn && (
                    <form action="#" >
                        <Typography variant="h3" gutterBottom>
                            Login
                    </Typography>
                        <Input
                            type="text"
                            placeholder="username"
                            name="username"
                            onChange={this.handleInput}
                        />
                        <Input
                            type="password"
                            placeholder="password"
                            name="password"
                            onChange={this.handleInput}
                        />
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                            Login
              </Button>
                    </form>
                )
        );
    }
}
