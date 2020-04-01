import React, { useState, forwardRef } from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import './App.css';
import { CardMedia, Card, CardContent, CardActions, Button, Theme, createStyles, Input, TextField, TablePagination, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import LocalHospital from "@material-ui/icons/LocalHospital";

const USERS = [
  {
    id: 1,
    name: "Michael",
    img:
      "https://celiacos.org/wp-content/uploads/2020/03/coronavirus-768x432.jpeg",
    sickness: [
      {
        id: 1,
        name: "Coronavirus1"
      },
      {
        id: 2,
        name: "Coronavirus2"
      }
    ]
  },
  {
    id: 2,
    name: "Lindsay",
    img:
      "https://celiacos.org/wp-content/uploads/2020/03/coronavirus-768x432.jpeg",
      sickness: [{
        id: 1,
        name: "Coronavirus1"
      },
      {
        id: 2,
        name: "Coronavirus2"
      }]
  },
  {
    id: 3,
    name: "Tobias",
    img:
      "https://celiacos.org/wp-content/uploads/2020/03/coronavirus-768x432.jpeg",
      sickness: [{
        id: 1,
        name: "Coronavirus1"
      },
      {
        id: 2,
        name: "Coronavirus2"
      }]
  },
  {
    id: 4,
    name: "Byron",
    img:
      "https://celiacos.org/wp-content/uploads/2020/03/coronavirus-768x432.jpeg",
      sickness: [{
        id: 1,
        name: "Coronavirus1"
      },
      {
        id: 2,
        name: "Coronavirus2"
      }]
  },
  {
    id: 5,
    name: "Adam",
    img:
      "https://celiacos.org/wp-content/uploads/2020/03/coronavirus-768x432.jpeg",
      sickness: [{
        id: 1,
        name: "Coronavirus1"
      },
      {
        id: 2,
        name: "Coronavirus2"
      }]
  },
  {
    id: 6,
    name: "Daniel",
    img:
      "https://celiacos.org/wp-content/uploads/2020/03/coronavirus-768x432.jpeg",
      sickness: [{
        id: 1,
        name: "Coronavirus1"
      },
      {
        id: 2,
        name: "Coronavirus2"
      }]
  },
  {
    id: 7,
    name: "Thomas",
    img:
      "https://celiacos.org/wp-content/uploads/2020/03/coronavirus-768x432.jpeg",
      sickness: [{
        id: 1,
        name: "Coronavirus1"
      },
      {
        id: 2,
        name: "Coronavirus2"
      }]
  },
  {
    id: 8,
    name: "Edward",
    img:
      "https://celiacos.org/wp-content/uploads/2020/03/coronavirus-768x432.jpeg",
      sickness: [{
        id: 1,
        name: "Coronavirus1"
      },
      {
        id: 2,
        name: "Coronavirus2"
      }]
  },
  {
    id: 9,
    name: "Nathan",
    img:
      "https://celiacos.org/wp-content/uploads/2020/03/coronavirus-768x432.jpeg",
      sickness: [{
        id: 1,
        name: "Coronavirus1"
      },
      {
        id: 2,
        name: "Coronavirus2"
      }]
  },
  {
    id: 10,
    name: "Monte",
    img:
      "https://celiacos.org/wp-content/uploads/2020/03/coronavirus-768x432.jpeg",
      sickness: [{
        id: 1,
        name: "Coronavirus1"
      },
      {
        id: 2,
        name: "Coronavirus2"
      }]
  }
];

type User = {
  id: number;
  name: string;
  img: string;
  sickness: any[] ;
}

const useStyles = makeStyles({
  media: {
    height: 140
  }
});

const useStyles2 = makeStyles((theme: Theme) =>
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
  }),
);

function Patients() {
  const classesCard = useStyles();
  const classes = useStyles2();

  const [users, setUsers] = useState(USERS);
  const [user, setUser] = useState<User>({ id: 0, name: '', img: '', sickness: [] });
  const [isEditable, setIsEditable] = useState(false);
  console.log('isEditable', isEditable);

  // Dialog
  const [open, setOpen] = React.useState(false);


  const deleteSickness = (id: number) => {
    console.log(id);
    const newUsers = users.filter((sickness) => sickness.id !== id);
    console.log('newUsers', newUsers)
    setUsers(newUsers);
    setUser({ id: 0, name: '', img: '', sickness:[] });
  }

  const editSickness = (user: User) => {
    setIsEditable(true);
    setUser(user);
  }

  const handleShowSickness = (id: number) => {
    console.log("showSickness");
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    console.log('value>', event.target.value, 'useer', user);
    if (!isEditable) {
      setUser({
        id: users.length + 1,
        name: event.target.value,
        img: "https://celiacos.org/wp-content/uploads/2020/03/coronavirus-768x432.jpeg",
        sickness: []
      });
    } else {
      const index = users.findIndex(item => item.id === user.id)
      setUser({
        id: user.id,
        name: event.target.value,
        img: "https://celiacos.org/wp-content/uploads/2020/03/coronavirus-768x432.jpeg",
        sickness: []
      });

      users.splice(index, 1, user)
      setUsers(users);
      console.log('updateUser', users)
    }
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>): void => {
    console.log('handleSubmit', user);

    setUsers([...users, user]);
    setUser({ id: 0, name: '', img: '', sickness:[] });
  }

  const handleEdit = (): void => {
    console.log('handleEdit', user);
    setIsEditable(false);
    setUser({ id: 0, name: '', img: '' , sickness:[]});
  }

  return (
    <React.Fragment>

      <form>
        <TextField
          id="name"
          label="Standard"
          onChange={handleChange}
          value={user.name}
        />
        <Button onClick={isEditable ? handleEdit : handleSubmit}>{isEditable ? "Edit" : "Add"}</Button>
      </form>

      <div className={classes.root}>
        <Grid container spacing={3}>

          {users.map((user) => (

            <Grid key={user.id} item xs>
              <Card className={classes.paper}>
                <CardMedia className={classesCard.media} image={user.img} title={user.name} />
                <CardContent>
                  <ul>
                    <li>Name: {user.name}</li>
                    <li>Email: abc@abc.com</li>
                    <li>desc: img</li>
                  </ul>
                </CardContent>
                <CardActions>
                  <Button onClick={() => editSickness(user)}>
                    <Edit />
                  </Button>
                  <Button onClick={() => deleteSickness(user.id)}>
                    <Delete />
                  </Button>
                  <Button onClick={() => handleShowSickness(user.id)}>
                    <LocalHospital />
                  </Button>
                </CardActions>
              </Card>
            </Grid>

          ))}
        </Grid>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Sickness"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Patient sickness
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>

  );
}

export default Patients;
