import React, { useEffect, useState, Fragment } from "react";
import { getAllPatients } from "../../api/patients";
import { Select, InputLabel, MenuItem, FormControl, makeStyles, Theme, createStyles, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Paper, Fab, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { postUserSickness, getAllPatientSicknees, deleteUserSickness, putUserSickness } from '../../api/userSickness';
import { Patient, IUSickness } from '../../models/types';
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
        select: {
            width: 200,
        },
        table: {
            minWidth: 650,
        },
    }),
);

const useStylesTable = makeStyles({
    table: {
        minWidth: 650,
    },
});

type ISicknessRow = {
    id: number;
    userId: number;
    sicknessId: number;
    name: string;
    scientificNotation: string;
    description: string;
    imageUrl: string;
  };
const iniISicknessRow ={
    id: 0,
    userId: 0,
    sicknessId: 0,
    name: "",
    scientificNotation: "",
    description: "",
    imageUrl: ""
}

const UserSickness = () => {

    const classes = useStyles();
    const classesTable = useStylesTable();

    const [patients, setAllPatients] = useState<Patient[]>([]);
    const [patientsSickness, setPatientsSickness] = useState([]);
    const [patientSelect, setPatientSelect] = useState(0);

    const [sickness, setSickness] = useState([]);
    const [sicknessSelect, setSicknessSelect] = useState(0);
    const [valueForUpdate, setValueForUpdate] = useState<ISicknessRow>(iniISicknessRow);
    
    const [isHidden, setIsHidden] = useState(true);
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        getPatients();
    }, []);

    useEffect(() => {
        getSickness();
    }, []);

    function getPatients() {
        const res = getAllPatients();
        res.then((res: any) => {
            setAllPatients(res.data.value);
        });
    }

    function getSickness() {
        const res = getAllSickness();
        res.then((res: any) => {
            setSickness(res.data.value);
        });
    }

    const handleChangePatientSelect = (event: any) => {
        setPatientSelect(event.target.value);
        getAllPatientSicknees(event.target.value).then((response: any) => {
            setPatientsSickness(response.data.value);
        });
    };

    const toggleFormCreateUpdateSickness = () => {
        setIsHidden(!isHidden);
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSicknessSelect(event.target.value as number);
    };

    const removeUserSickness = (row: any) => {

        deleteUserSickness(row).then((response: any) => {
            getAllPatientSicknees(patientSelect).then((response: any) => {
                setPatientsSickness(response.data.value);
            });
        });
    }

    const updateUserSickness = (row: any) => {
        setIsHidden(false);
        setIsEditable(true);
        setSicknessSelect(row.id);
        setValueForUpdate(row);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
     
        const userSicknessToSave: IUSickness = {
            UserId: patientSelect,
            SicknessId: sicknessSelect
        }

        if (isEditable) {
            userSicknessToSave.Id = valueForUpdate.id;

            putUserSickness(userSicknessToSave).then(response => {
                getAllPatientSicknees(patientSelect).then((response: any) => {
                    setPatientsSickness(response.data.value);
                });
            })
        } else {
            postUserSickness(userSicknessToSave).then(response => {
                getAllPatientSicknees(patientSelect).then((response: any) => {
                    setPatientsSickness(response.data.value);
                });
            })
        }
    }

    return (
        <Fragment>
            {
                patients.length > 0 && (

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Patients</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={patientSelect}
                            onChange={handleChangePatientSelect}
                            className={classes.select}>
                            {
                                patients.map((patient: any) => (
                                    <MenuItem key={patient.id} value={patient.id}>{patient.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                )
            }
            <Fab color="primary" aria-label="add">
                <Add onClick={() => toggleFormCreateUpdateSickness()} />
            </Fab>
            {
                !isHidden && (
                    <form action="#">
                        <Typography variant="h6" gutterBottom>
                            {isEditable ? "Edit User Sickness" : "Add User Sickness"}
                        </Typography>
                        <InputLabel id="select-label">Sickness</InputLabel>

                        <Select className={classes.formControl}
                            labelId="select-label-sick"
                            id="simple-select-sick"
                            value={sicknessSelect}
                            onChange={handleChange}>
                            {
                                sickness.map((sick: any) => (
                                    <MenuItem key={sick.id} value={sick.id}>{sick.name}</MenuItem>
                                ))
                            }
                        </Select>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            {isEditable ? "Edit" : "Add"}
                        </Button>
                    </form>
                )
            }
            {

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
                            {patientsSickness.map((patient: any) => (
                                <TableRow key={patient.id}>
                                    <TableCell component="th" scope="row">
                                        {patient.name}
                                    </TableCell>
                                    <TableCell align="right">{patient.scientificNotation}</TableCell>
                                    <TableCell align="right">{patient.description}</TableCell>
                                    <TableCell align="right">{patient.imageUrl}</TableCell>

                                    <TableCell align="right">
                                        <Button
                                            onClick={() => updateUserSickness(patient)}
                                        >
                                            Update
                                            </Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            onClick={() => removeUserSickness(patient)}
                                        >
                                            Delete
                                            </Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Fragment>
    )
}

export default UserSickness;

