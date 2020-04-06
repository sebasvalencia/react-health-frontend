import React, { Component, Fragment } from "react";
import { postPatient, getAllPatients, deletePatient, updatePatient } from '../../api/patients';
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
    isEditable: boolean;
    patient: Patient;
    patients: Patient[];
}

class Patients extends Component<{}, PatientsState> {

    state = {
        name: "",
        email: "",
        avatarUrl: "",
        loadingPatients: false,
        isHidden: true,
        isEditable: false,
        patient: {
            id: 0,
            name: "",
            email: "",
            avatarUrl: "",
            rol: 2,
            listSickness: []
        },
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

    toggleFormCreateUpdatePatient = () => {
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

        if (this.state.isEditable) {
            const patientToUpdate = {
                Id: this.state.patient.id,
                Name: this.state.name,
                Email: this.state.email,
                AvatarUrl: this.state.avatarUrl,
                Rol: this.state.patient.rol
            };

            updatePatient(patientToUpdate).then(response => {
                const newPatientsState = this.state.patients.map((obj: any) => {
                    return obj.id === this.state.patient.id ? response.data.value : obj
                });
                this.setState({ patients: newPatientsState });
            }).catch(error => {
                console.log('err', error);
            });

        } else {
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
        }


    };

    showAvatar = (avatarUrl: string) => {
        console.log((avatarUrl !== null || avatarUrl !== "") ? avatarUrl : avatar);
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
            if (response.data.value) {
                this.setState({ patients: this.state.patients.filter((p: any) => p.id !== patient.id) });
            }
        }).catch(error => {
            console.log('err', error);
        });
    }

    editPatient = (patient: Patient) => {
        this.setState({ isHidden: false });
        this.setState({ isEditable: true });
        this.setState({ patient: patient });
        this.setState({ name: patient.name });
        this.setState({ email: patient.email });
        this.setState({ avatarUrl: patient.avatarUrl });
    }

    render() {
        return (
            this.state.loadingPatients ?
                (
                    //condition 0 patients
                    <Fragment>
                        <Fab color="primary" aria-label="add">
                            <Add onClick={this.toggleFormCreateUpdatePatient} />
                        </Fab>
                        {
                            !this.state.isHidden && (
                                <form action="#">
                                    <Typography variant="h3" gutterBottom>
                                        Add Patient
                                    </Typography>
                                    <Input
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleInput}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleInput}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Avatar Url"
                                        name="avatarUrl"
                                        value={this.state.avatarUrl}
                                        onChange={this.handleInput}
                                    />
                                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                                        {this.state.isEditable ? "Edit" : "Add"}
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
                                            <Card style={{ maxWidth: 345 }}>
                                                <CardMedia
                                                    image={avatar}
                                                    style={{ paddingTop: '56.25%', height: 140 }}
                                                    title={patient.name} />

                                                <CardContent>
                                                    <ul>
                                                        <li style={{ textOverflow: "ellipsis" }}>Name: {patient.name}</li>
                                                        <li>Email: {patient.email}</li>
                                                    </ul>
                                                </CardContent>
                                                <CardActions>
                                                    <Button
                                                        onClick={() => this.editPatient(patient)}
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