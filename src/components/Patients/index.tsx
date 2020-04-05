import React, { Component, Fragment } from "react";
import { postPatient, getAllPatients, deletePatient } from '../../api/patients';
import { Fab, Typography, Input, Button, Grid, Card, CardMedia, CardContent, CardActions, makeStyles, createStyles, Theme, Avatar } from "@material-ui/core";
import { Add, Edit, Delete, LocalHospital } from "@material-ui/icons";
import { Patient } from "../../models/types";
import avatar from '../../assets/images/img_avatar.png';
import "./patients.css";

type PatientsState = {
    name: string;
    email: string;
    avatarUrl: string;
    loadingPatients: boolean;
    isHidden: boolean;
    patients: Patient[];
}

class Patients extends Component<{}, PatientsState> {

    state = {
        name: "",
        email: "",
        avatarUrl: "",
        loadingPatients: false,
        isHidden: true,
        patients: []
    }

    componentDidMount() {
        getAllPatients().then(response => {
            console.log('response', response);
            this.setState({ loadingPatients: true });
            this.setState({ patients: response.data.value });
        }).catch(error => {
            console.log('error:', error);
            this.setState({ loadingPatients: false });
        });
    }

    toggleFormCreatePatient = () => {
        this.setState({
            isHidden: !this.state.isHidden
        });
    }

    handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        this.setState({ [name]: event.target.value } as any);
    };

    handleSubmit = (event: any) => {
        event.preventDefault();

        const newPatient = {
            Name: this.state.name,
            Email: this.state.email,
            AvatarUrl: this.state.avatarUrl,
            Rol: 2
        }

        postPatient(newPatient).then(response => {
            this.setState({ patients: [...this.state.patients, response.data.value] });
        }).catch(error => {
            console.log('err', error);
        });
    };

    showAvatar = (avatarUrl: string) => {
        console.log( (avatarUrl !== null || avatarUrl !== "") ? avatarUrl : avatar);
        return avatar;
    }
    
    removePatient = (patient: Patient) => {
        const patientToDelete = {
            Id: patient.id,
            Name: patient.name,
            Email: patient.email,
            AvatarUrl: patient.avatarUrl,
            Rol: patient.rol
        };

        deletePatient(patientToDelete).then(response => {
            if(response.data.value){
            this.setState({patients:  this.state.patients.filter((p: any) => p.id !== patient.id)  }); 
            }
        }).catch(error => {
            console.log('err', error);
        });
    }

    render() {
        return (
            this.state.loadingPatients ?
                (
                    //condition 0 patients
                    <Fragment>
                        <Fab color="primary" aria-label="add">
                            <Add onClick={this.toggleFormCreatePatient} />
                        </Fab>
                        {
                            !this.state.isHidden && (
                                <form action="#">
                                    <Typography variant="h3" gutterBottom>
                                        Add Patient
                                    </Typography>
                                    <Input
                                        type="text"
                                        placeholder="name"
                                        name="name"
                                        onChange={this.handleInput}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="email"
                                        name="email"
                                        onChange={this.handleInput}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="avatarUrl"
                                        name="avatarUrl"
                                        onChange={this.handleInput}
                                    />
                                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                                        Add Patient
                                    </Button>
                                </form>
                            )
                        }
                        <div className='root'>
                            <Grid container 
                            spacing={3}
                            //  alignItems="stretch"
                            
                             >
                                {
                                    this.state.patients.map((patient: Patient) => (

                                        <Grid key={patient.id} 
                                              item
                                              >
                                            <Card  style={{maxWidth: 345}}>
                                                <CardMedia 
                                                image={avatar} 
                                                style={{paddingTop: '56.25%', height: 140}}
                                                title={patient.name} />
                                                      
                                                <CardContent>
                                                    <ul>
                                                        <li style={{textOverflow: "ellipsis"}}>Name: {patient.name}</li>
                                                        <li>Email: {patient.email}</li>
                                                    </ul>
                                                </CardContent>
                                                <CardActions>
                                                    <Button 
                                                    // onClick={() => this.editPatient(patient)}
                                                    >
                                                        <Edit />
                                                    </Button>
                                                    <Button onClick={() => this.removePatient(patient)}>
                                                        <Delete />
                                                    </Button>
                                                    <Button 
                                                    // onClick={() => this.handleShowSickness(patient)}
                                                    >
                                                        <LocalHospital />
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>

                                    ))}
                            </Grid>
                        </div>
                    </Fragment>
                )
                :
                (
                    <h1>Sorry an error occurs trying to load patients</h1>
                )
        )
    }
}

export default Patients;