import React, { useEffect, useState, Fragment } from "react";
import clsx from 'clsx';
import { getPatientsWithSickness } from "../../api/patients";
import { Fab, Select, InputLabel, MenuItem, FormControl, makeStyles, Theme, createStyles, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions, Collapse, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Paper } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Sickness from '../Sickness/index';

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

const UserSickness = () => {

    const classes = useStyles();
    const classesCard = useStylesCard();
    const classesTable = useStylesTable();


    const [patientsSickness, setPatientsSickness] = useState([]);
    const [isHidden, setIsHidden] = useState(true);
    const [expanded, setExpanded] = React.useState(false);

    const [age, setAge] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };

    useEffect(() => {
        getSickness();
    }, []);

    function getSickness() {
        const res = getPatientsWithSickness();
        res.then((res: any) => {
            console.log('res', res);
            setPatientsSickness(res.data.value);
        });
    }

    const toggleFormCreateUpdateUserSickness = () => {
        setIsHidden(!isHidden);
    }

    const removeUserSickness = (row: any) => {
        console.log('removeUserSickness', row);

        // deleteSickness(row.id).then((response: any) => {
        //     if (response.data.value.id === row.id) {
        //         const sicknessToDelete = sicks.filter((p: any) => p.id !== row.id);
        //         setSicks(sicknessToDelete);
        //     }
        // });
    }

    const updateUserSickness = (row: any) => {
        console.log('updateUserSickness', row);

        setIsHidden(false);
        // setIsEditable(true);
        // setSick(sickness);
        // setName(sickness.name);
        // setScientificNotation(sickness.scientificNotation);
        // setDescription(sickness.description);
        // setImageUrl(sickness.imageUrl);
    }

    return (

        patientsSickness.length <= 0 ? (
            <h1>No Data found</h1>
        ) :
            (
                <Fragment>
                    <h1>User Sickness</h1>

                    {
                        patientsSickness.map((patient: any) => (

                            <Card key={patient.id} className={classesCard.root}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" className={classesCard.avatar}>
                                            A
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <Add onClick={() => toggleFormCreateUpdateUserSickness()} />
                                        </IconButton>
                                    }
                                    title={patient.name}
                                    subheader={patient.email}
                                />
                                {
                                    !isHidden && (
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="select-label">Sickness</InputLabel>
                                            <Select
                                                labelId="select-label"
                                                id="simple-select"
                                                value={age}
                                                onChange={handleChange}>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )
                                }
                                
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
                                                            <Button onClick={() => updateUserSickness(row)}>
                                                                Update
                                                    </Button>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Button onClick={() => removeUserSickness(row)}>
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

