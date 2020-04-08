import React, { useEffect, useState, Fragment } from "react";
import { getPatientsWithSickness, getAllPatients } from "../../api/patients";
import { Select, InputLabel, MenuItem, FormControl, makeStyles, Theme, createStyles, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions, Collapse, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Paper, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";
import { deleteUserSickness, postUserSickness } from "../../api/userSickness";
import { IUserSickness, IUserSicknessApp, ISickness, Patient, ISicknessApp } from '../../models/types';
import { getAllSickness } from "../../api/sickness";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

const useStylesCard = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 850,
        },
        media: {
            height: 0,
            paddingTop: '16.25%',//'56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }),
);

const useStylesTable = makeStyles({
    table: {
        minWidth: 650,
    },
});

const initialSicknessAppState = {
    id: 0,
    name: "",
    scientificNotation: "",
    description: "",
    imageUrl: ""
}



const UserSickness = () => {

    const classes = useStyles();
    const classesCard = useStylesCard();
    const classesTable = useStylesTable();

    const [sicks, setSicks] = useState<ISicknessApp[]>([]);
    const [sick, setSick] = useState<ISicknessApp>(initialSicknessAppState);
    const [patientsSickness, setPatientsSickness] = useState<IUserSicknessApp[]>([]);
    const [isEditable, setIsEditable] = useState(false);
    
    const [isHidden, setIsHidden] = useState(true);
    
    const [sickSelect, setSickSelect] = useState(0);
    const [patientSelect, setPatientSelect] = useState(0);
    const [allPatient, setGetAllPatient] = useState<Patient[]>([]);
    

    useEffect(() => {
        getPSickness();
    }, []);

    function getPSickness() {
        const res = getPatientsWithSickness();
        res.then((res: any) => {
            console.log('res', res);
            setPatientsSickness(res.data.value);
        });
    }

    useEffect(() => {
        getSickness();
    }, []);

    function getSickness() {
        const res = getAllSickness();
        res.then((res: any) => {
            console.log('sicks', res.data.value);
            setSicks(res.data.value);
        });
    }

    useEffect(() => {
        getAllPatient();
    }, []);

    function getAllPatient() {
        const res = getAllPatients();
        res.then((res: any) => {
            console.log('patient', res.data.value);
            setGetAllPatient(res.data.value);
        });
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSickSelect(event.target.value as number);
    };

    const handleChangePatientSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPatientSelect(event.target.value as number);
    };

    const toggleFormCreateUpdateUserSickness = () => {
        // e.preventDefault();
        setIsHidden(!isHidden);
    }

    const removeUserSickness = (idPatient: number, idSickness: number, row: any) => {
        console.log('removeUserSickness', idPatient, idSickness, row);

        const userId = 40;
        const sicknessId = 10;
        if (userId === idPatient && sicknessId === idSickness) {
            console.log(' cool');

        }
    }

    const updateUserSickness = (row: any, patient: any) => {
        console.log('updateUserSickness', row);

        setIsHidden(false);
        setIsEditable(true);
        setSickSelect(row.id);
        setPatientSelect(patient.id);

        // setSick(sickness);
        // setName(sickness.name);
        // setScientificNotation(sickness.scientificNotation);
        // setDescription(sickness.description);
        // setImageUrl(sickness.imageUrl);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const userPatient = {
            UserId: patientSelect,
            SicknessId: sickSelect
        };
        postUserSickness(userPatient).then((response: any) => {
            console.log('response', response.data);


            // const elementToAdd = sicks.map( (e:any) => {
            //     if(e.id === sickSelect){
            //         return e; 
            //     }
            // });

            // let patientForSaveSickness = allPatient.find( e => e.id === patientSelect);
            // console.log('patientToSave', patientForSaveSickness);

            // console.log('sicks', sicks);
            
            // let sickToSave =  sicks.find( e => e.id === sickSelect);
            // console.log('sickToSave', sickToSave);
            
            // const psickness = patientForSaveSickness.listSickness;

            // console.log('psickness', psickness);
            



           // setSicks(sicks => [...sicks, response.data.value]);
        });

    }

    return (

        patientsSickness.length <= 0 ? (
            <h1>No Data found</h1>
        ) :
            (
                <Fragment>
                    <h1>User Sickness</h1>
                    <Fab color="primary" aria-label="add" size="small">
                        <Add onClick={() => toggleFormCreateUpdateUserSickness()} />
                    </Fab>
                    {
                        !isHidden && (
                            <FormControl className={classes.formControl}>
                                <InputLabel id="select-label">Sickness</InputLabel>

                                <Select
                                    labelId="select-label-sick"
                                    id="simple-select-sick"
                                    value={sickSelect}
                                    onChange={handleChange}>
                                    {
                                        sicks.map((sick: any) => (
                                            <MenuItem key={sick.id} value={sick.id}>{sick.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                                <Select
                                    labelId="select-label-patient"
                                    id="simple-select-patient"
                                    value={patientSelect}
                                    onChange={handleChangePatientSelect}>
                                    {
                                        allPatient.map((patient: any) => (
                                               <MenuItem key={patient.id} value={patient.id}>{patient.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                                <Button variant="contained" color="primary" onClick={handleSubmit}>
                                    {isEditable ? "Edit" : "Add"}
                                </Button>
                            </FormControl>)
                    }
                    {
                        patientsSickness.map((patient: any) => (

                            <Card key={patient.id} className={classesCard.root}>

                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" className={classesCard.avatar}>
                                            A
                                        </Avatar>
                                    }
                                    title={patient.name}
                                    subheader={patient.email}
                                />
                                <CardContent>
                                    <TableContainer component={Paper}>
                                        <Table className={classesTable.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell align="right">Scientific Notation</TableCell>
                                                    <TableCell align="right">Description</TableCell>
                                                    <TableCell align="right">Image</TableCell>
                                                    <TableCell align="right">Update</TableCell>
                                                    <TableCell align="right">Delete</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {patient.listSickness.map((row: any) => (
                                                    <TableRow key={row.id}>
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align="right">{row.scientificNotation}</TableCell>
                                                        <TableCell align="right">{row.description}</TableCell>
                                                        <TableCell align="right">{row.imageUrl}</TableCell>
                                                        <TableCell align="right">
                                                            <Button onClick={() => updateUserSickness(row, patient)}>
                                                                Update
                                                    </Button>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Button onClick={() => removeUserSickness(patient.id, row.id, patient)}>
                                                                Delete
                                                    </Button>
                                                        </TableCell>

                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                            </Card>
                        ))
                    }
                </Fragment>
            )
    )

}

export default UserSickness;

