import React, { Fragment, useEffect, useState } from "react";
import { FormControlLabel, Checkbox, FormGroup, FormControl, InputLabel, Select, MenuItem, Theme, makeStyles, createStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { getAllPatients } from "../../api/patients";
import { Patient } from "../../models/types";
import { getAllWellness, postWellness } from "../../api/wellness";

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

type WellnessPatient = {
    id: number;
    UserId: number;
    checkBasketball: boolean;
    checkSwimming: boolean;
    checkRunning: boolean;
    checkRugby: boolean;
}

const initWellness = {
    id: 0,
    UserId: 0,
    checkBasketball: false,
    checkSwimming: false,
    checkRunning: false,
    checkRugby: false,
}

const Wellness = () => {

    const classes = useStyles();


    const [patients, setPatients] = useState<Patient[]>([]);
    const [patientSelect, setPatientSelect] = useState(0);

    const [wellness, setWellness] = useState<WellnessPatient>(initWellness);


    useEffect(() => {
        getPatients();
    }, []);

    function getPatients() {
        const res = getAllPatients();
        res.then((res: any) => {
            setPatients(res.data.value);
        });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWellness({ ...wellness, [event.target.name]: event.target.checked });
    };

    const handleChangePatientSelect = (event: any) => {
        setPatientSelect(event.target.value);

        getAllWellness(event.target.value).then((response: any) => {

            if (response.data.value.length !== 0) {
                const checkBasketball = response.data.value[0].checkBasketball;
                const checkSwimming = response.data.value[0].checkSwimming;
                const checkRunning = response.data.value[0].checkRunning;
                const checkRugby = response.data.value[0].checkRugby;
                const UserId = response.data.value[0].userId;
                const id = response.data.value[0].id;

                const arr = {
                    checkBasketball,
                    checkSwimming,
                    checkRunning,
                    checkRugby,
                    UserId,
                    id
                }
                setWellness( arr );
            }
        });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const wellnessPatient = {
            ...wellness
        };
        postWellness(wellnessPatient).then((response) => {
            setWellness(wellnessPatient);
        });
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
            <FormGroup row>

                <FormControlLabel
                    control={<Checkbox checked={wellness.checkBasketball} onChange={handleChange} name="checkBasketball" id="1" color="primary" />}
                    label="Basketball"
                />
                <FormControlLabel
                    control={<Checkbox checked={wellness.checkSwimming} onChange={handleChange} name="checkSwimming" id="2" color="primary" />}
                    label="Swimming"
                />
                <FormControlLabel
                    control={<Checkbox checked={wellness.checkRunning} onChange={handleChange} name="checkRunning" id="3" color="primary" />}
                    label="Running"
                />
                <FormControlLabel
                    control={<Checkbox checked={wellness.checkRugby} onChange={handleChange} name="checkRugby" id="4" color="primary" />}
                    label="Rugby"
                />


                <Button onClick={handleSubmit}>Add</Button>

            </FormGroup>

        </Fragment>
    )
}

export default Wellness;




