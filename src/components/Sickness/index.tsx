import React, { Fragment, useEffect, useState } from "react";
import { Fab, Typography, Input, Button, makeStyles, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { Add, Edit, Delete, LocalHospital } from "@material-ui/icons";
import { ISickness, ISicknessApp } from "../../models/types";
import { getAllSickness, deleteSickness, postSickness, putSickness } from '../../api/sickness';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
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

const Sickness = () => {

    const classes = useStyles();

    const [sicks, setSicks] = useState<ISickness[]>([]);
    const [sick, setSick] = useState<ISicknessApp>(initialSicknessAppState);
    const [isHidden, setIsHidden] = useState(true);
    const [isEditable, setIsEditable] = useState(false);
    const [name, setName] = useState("");
    const [scientificNotation, setScientificNotation] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        getSickness();
    }, []);

    function getSickness() {
        const res = getAllSickness();
        res.then((res: any) => {
            setSicks(res.data.value);
        });
    }

    const toggleFormCreateUpdateSickness = () => {
        setIsHidden(!isHidden);
    }

    const removeSickness = (row: any) => {
        deleteSickness(row.id).then((response: any) => {
            if (response.data.value.id === row.id) {
                const sicknessToDelete = sicks.filter((p: any) => p.id !== row.id);
                setSicks(sicknessToDelete);
            }
        });
    }

    const updateSickness = (sickness: ISicknessApp) => {
        setIsHidden(false);
        setIsEditable(true);
        setSick(sickness);
        setName(sickness.name);
        setScientificNotation(sickness.scientificNotation);
        setDescription(sickness.description);
        setImageUrl(sickness.imageUrl);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const sicknessToModify: ISickness = {
            Name: name,
            ScientificNotation: scientificNotation,
            Description: description,
            ImageUrl: imageUrl
        };

        if (isEditable) {
            sicknessToModify.Id = sick.id;
            putSickness(sicknessToModify).then(response => {
                const newPatientsState = sicks.map((obj: any) => {
                    return obj.id === sick.id ? response.data.value : obj
                });
                setSicks(newPatientsState);
            });

        } else {
            postSickness(sicknessToModify).then((response) => {
                setSicks(sicks => [...sicks, response.data.value]);
            });
        }
    }

    return (
        <Fragment>

            <Fab color="primary" aria-label="add">
                <Add onClick={() => toggleFormCreateUpdateSickness()} />
            </Fab>
            {
                !isHidden && (
                    <form action="#">
                        <Typography variant="h2" gutterBottom>
                            {isEditable ? "Edit Sickness" : "Add Sickness"}
                        </Typography>
                        <Input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Scientific Notation"
                            name="scientificNotation"
                            value={scientificNotation}
                            onChange={e => setScientificNotation(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Description"
                            name="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Image url"
                            name="imageUrl"
                            value={imageUrl}
                            onChange={e => setImageUrl(e.target.value)}
                        />
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            {isEditable ? "Edit" : "Add"}
                        </Button>
                    </form>
                )
            }
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
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
                        {sicks.map((row: any) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.scientificNotation}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.imageUrl}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => updateSickness(row)}>
                                        Update
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => removeSickness(row)}>
                                        Delete
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
};

export default Sickness;