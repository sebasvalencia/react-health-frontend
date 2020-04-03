import React, { useState, useEffect } from 'react';
import { CardMedia, Card, CardContent, CardActions, Button, Theme, createStyles, TextField, Fab, Typography, Input } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';

import { Delete, Edit, LocalHospital, Add } from '@material-ui/icons';


import { Patient, IPatients, PatientToSave } from '../../models/types';

import avatar from '../../assets/images/img_avatar.png';
import { postPatient, updatePatient } from '../../api/patients';

const useStylesCard = makeStyles({
  media: {
    height: 200,
  }
});

const useStylesClasses = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      // padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.primary,
      border: "1px solid black",
      boxShadow: "1px 1px 1px 1px red",
    },
    addButton: {
      margin: theme.spacing(2),
      color: theme.palette.text.primary,
    }
  }),
);
const initialPatients: IPatients = {
  value: [
    {
      id: 0,
      name: '',
      email: '',
      avatarUrl: '',
      rol: 2,
      listSickness: []
    }
  ]
};
function Patients(props: IPatients) {

  console.log(props);
  

  const classesCard = useStylesCard();
  const classes = useStylesClasses();

  const [patients, setPatients] = useState<IPatients>(initialPatients);
  const [patient, setPatient] = useState<Patient>();
  const [partialPatient, setPartialPatient] = useState();
  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  
  const [openFormAddPatient, setOpenFormAddPatient] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setPatients(props);
  }, [props])

  const showFormAddPatient = () => {
    setOpenFormAddPatient(true);
  }

  const deletePatient = (patient: Patient) => {
    console.log('deleteSickness',patient);
    //   const newUsers = users.filter((sickness: any) => sickness.id !== id);
    // console.log('newUsers', newUsers)
    // setUsers(newUsers);
    // setUser(initialPatient);
  }

  const editPatient = (patient: Patient) => {
    console.log('editPatient', patient);
    setIsEditable(true);
    
    if(patient.name === null){
      setName("");
    }else{
      setName(patient.name);
    }
    if(patient.email === null){
      setEmail("");
    }else{
      setEmail(patient.email);
    }
    if(patient.avatarUrl === null){
      setAvatarUrl("");
    }else{
      setAvatarUrl(patient.avatarUrl);
    }



    setPatient(patient);
  }



  const handleShowSickness = (patient: Patient) => {
    console.log("handleShowSickness", patient);
    // setOpen(true);
  }

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
  //   event.preventDefault();
  //   console.log('value>', event.target.value, 'useer', patient);
  //   if (!isEditable) {
  //     setPatient({
  //       name: event.target.value,
  //       email: "a@a.com",
  //       avatarUrl: "https://celiacos.org/wp-content/uploads/2020/03/coronavirus-768x432.jpeg",
  //       rol:2,
  //       listSickness: []
  //     });
  //   } else {
  //     const index = users.findIndex(item => item.id === user.id)
  //     setUser({
  //       id: user.id,
  //       name: event.target.value,
  //       email: "a@a.com",
  //       avatarUrl: "https://celiacos.org/wp-content/uploads/2020/03/coronavirus-768x432.jpeg",
  //       rol:2,
  //       listSickness: []
  //     });

  //     users.splice(index, 1, user)
  //     setUsers(users);
  //     console.log('updateUser', users)
  //   }
  // }

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
  //   event.preventDefault();
  //   console.log('value>', event.target.value, 'patient', patient);
  // }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    var patientToSave = {
      Name: name,
      Email: email,
      AvatarUrl: avatarUrl,
      Rol: 2
    }

    postPatient(patientToSave).then((response) => {
          var newPatient: Patient = response.data.value;
          console.log('resp', newPatient);
          console.log('patients', patients.value);
        
          setPatient(newPatient);
          const newIP: IPatients = {value: [newPatient]};

          console.log('newIP', newIP);
          // setPatients([...patients,  ]);

        }
    );
        
    clearFormFields();
    
  }

  const clearFormFields = () => {
    setName("");
    setEmail("");
    setAvatarUrl("");
  }

  const handleEdit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setIsEditable(false);

    var patientToSave = {
      Id: patient?.id,
      Name: name,
      Email: email,
      AvatarUrl: avatarUrl,
      Rol: 2
    }
    callUpdate(patientToSave);
  }

  const callUpdate = (patientToSave: PatientToSave) => {
    updatePatient(patientToSave).then((response) => {
      console.log('response', response.data.value);
    });

    console.log('patients', patients);
    
  }

  return (

    <React.Fragment>
      <Fab color="primary" aria-label="add">
        <Add onClick={showFormAddPatient} />
      </Fab>

      {
        openFormAddPatient &&

        <form onSubmit={isEditable ? handleEdit : handleSubmit}>
          <Input
            type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="text"
            placeholder="avatarUrl"
            name="avatarUrl"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />

          <Button variant="contained" color="primary" type="submit">
            {isEditable ? "Edit" : "Add"}
          </Button>
        </form>

      }


      <div className={classes.root}>
        <Grid container spacing={3}>

          {
            patients.value.map((patient: Patient) => (

              <Grid key={patient.id} item xs>
                <Card className={classes.paper}>
                  <CardMedia className={classesCard.media} image={patient.avatarUrl ? patient.avatarUrl : avatar} title={patient.name} />
                  <CardContent>
                    <ul>
                      <li>Name: {patient.name}</li>
                      <li>Email: {patient.email}</li>
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => editPatient(patient)}>
                      <Edit />
                    </Button>
                    <Button onClick={() => deletePatient(patient)}>
                      <Delete />
                    </Button>
                    <Button onClick={() => handleShowSickness(patient)}>
                      <LocalHospital />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

            ))}
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default Patients;
