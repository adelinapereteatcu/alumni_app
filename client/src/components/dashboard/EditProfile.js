import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
});

class EditProfile extends Component {
    render() {
        const { classes } = this.props;
        return (
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Edit profile
                        </Typography>
                        <br />
                        <form
                            className={classes.form}
                            onSubmit={this.handleSubmit}
                            noValidate>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">
                                    Upload photo
                                </Button>
                            </label>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="user_email"
                                label="Email"
                                name="user_email"
                                autoComplete="user_email"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="cnp"
                                label="CNP"
                                name="cnp"
                                autoComplete="cnp"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="first_name"
                                label="First Name"
                                name="first_name"
                                autoComplete="first_name"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="last_name"
                                label="Last Name"
                                name="last_name"
                                autoComplete="last_name"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="graduation_year"
                                label="Graduation Year"
                                name="graduation_year"
                                autoComplete="graduation_year"
                                autoFocus
                                onChange={this.handleChange}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onSubmit={this.handleSubmit}
                            >
                                Submit
                        </Button>
                        </form>
                    </div>
                </Container>
        )
    }
}

export default (withStyles(useStyles)(EditProfile));