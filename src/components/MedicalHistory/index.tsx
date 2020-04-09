import React, { useEffect, useState, Fragment } from "react";
import { getAllPatients } from "../../api/patients";
import { Patient, IMedicalHistoryApp, IMedicalHistory } from "../../models/types";
import { Select, MenuItem, makeStyles, Theme, createStyles, InputLabel, FormControl, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Paper, Fab, Typography, Input } from "@material-ui/core";
import { getAllMedicalsHistories, postMedicalHistory, putMedicalHistory, deleteMedicalHistory } from '../../api/medicalHistory';
import { Add } from "@material-ui/icons";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider, KeyboardDatePicker,
} from '@material-ui/pickers';

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

const initialMedicalState = {
    id: 0,
    description: "",
    diagnostic: "",
    treatment: "",
    appointmentDate: new Date(),
    userId: 0
};

const MedicalHistory = () => {

    const classes = useStyles();

    const [patients, setAllPatients] = useState<Patient[]>([]);
    const [patientSelect, setPatientSelect] = useState(0);
    const [medicalHistory, setMedicalHistory] = useState<IMedicalHistoryApp[]>([]);
    const [oneMedicalHistory, setOneMedicalHistory] = useState<IMedicalHistoryApp>(initialMedicalState);

    const [isHidden, setIsHidden] = useState(true);
    const [isEditable, setIsEditable] = useState(false);

    const [description, setDescription] = useState("");
    const [diagnostic, setDiagnostic] = useState("");
    const [treatment, setTreatment] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        new Date('2020-03-10T21:11:54'),
    );

    useEffect(() => {
        getUserHaveMedicalHistory();
    }, []);

    function getUserHaveMedicalHistory() {
        const res = getAllPatients();
        res.then((res: any) => {
            setAllPatients(res.data.value);
        });
    }

    const handleChangePatientSelect = (event: any) => {
        setPatientSelect(event.target.value);
        getAllMedicalsHistories(event.target.value).then((response: any) => {
            setMedicalHistory(response.data.value);
        });
    };

    const toggleFormCreateUpdateSickness = () => {
        setIsHidden(!isHidden);
    }

    const handleDateChange = (date: Date | null) => {
        if (date != null) {
            setSelectedDate(date);
        }
    };

    const updateMedicalHistory = (row: IMedicalHistoryApp) => {
        setIsHidden(false);
        setIsEditable(true);
        setOneMedicalHistory(row);
        setDescription(row.description);
        setDiagnostic(row.diagnostic);
        setTreatment(row.treatment);
        setSelectedDate(row.appointmentDate);
    }

    const removeMedicalHistory = (row: IMedicalHistoryApp) => {
        deleteMedicalHistory(row.id).then((response: any) => {
            const medicalHistoryToDelete = medicalHistory.filter((p: any) => p.id !== row.id);
            setMedicalHistory(medicalHistoryToDelete);
        });
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const medicalHistoryToModify: IMedicalHistory = {
            UserId: patientSelect,
            Description: description,
            Diagnostic: diagnostic,
            Treatment: treatment,
            AppointmentDate: selectedDate != null ? selectedDate : '',
        };

        if (isEditable) {
            medicalHistoryToModify.Id = oneMedicalHistory.id;
            putMedicalHistory(medicalHistoryToModify).then(response => {
                const newMedicalHistoryState = medicalHistory.map((obj: any) => {
                    return obj.id === oneMedicalHistory.id ? response.data.value : obj
                });
                setMedicalHistory(newMedicalHistoryState);
            });

        } else {
            postMedicalHistory(medicalHistoryToModify).then((response) => {
                setMedicalHistory(medicalHistory => [...medicalHistory, response.data.value]);
            });
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
                            {isEditable ? "Edit Medical History" : "Add Medical History"}
                        </Typography>
                        <Input
                            type="text"
                            placeholder="Description"
                            name="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Diagnostic"
                            name="diagnostic"
                            value={diagnostic}
                            onChange={e => setDiagnostic(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Treatment"
                            name="treatment"
                            value={treatment}
                            onChange={e => setTreatment(e.target.value)}
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date"
                                format="yyyy/MM/dd"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            {isEditable ? "Edit" : "Add"}
                        </Button>
                    </form>
                )
            }
            {
                medicalHistory.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Description</TableCell>
                                    <TableCell align="right">Diagnostic</TableCell>
                                    <TableCell align="right">Treatment</TableCell>
                                    <TableCell align="right">Date</TableCell>
                                    <TableCell align="right">Update</TableCell>
                                    <TableCell align="right">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {medicalHistory.map((row: IMedicalHistoryApp) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" align="right" scope="row">{row.description}</TableCell>
                                        <TableCell align="right">{row.diagnostic}</TableCell>
                                        <TableCell align="right">{row.treatment}</TableCell>
                                        <TableCell align="right">{row.appointmentDate}</TableCell>
                                        <TableCell align="right">
                                            <Button onClick={() => updateMedicalHistory(row)}>
                                                Update
                                            </Button>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button onClick={() => removeMedicalHistory(row)}>
                                                Delete
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                        <span></span>
                    )
            }
        </Fragment>
    )
}

export default MedicalHistory;



