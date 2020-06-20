import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import uniImage from '../../media/University.jpg';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Navbar from '../layout/Navbar';

const useStyles = theme => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: uniImage,
        backgroundSize: 'auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: "100%",
        height: "500px"
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(20),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
});

class Homepage extends Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Navbar />
                <br></br>
                <CssBaseline />
                <Container maxWidth="md">
                    <main>
                        <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${uniImage})` }}>
                            <img style={{ display: 'none' }} src={uniImage} alt={'uni image'} />
                            <div className={classes.overlay} />
                            <Grid container>
                                <Grid item md={6}>
                                    <div className={classes.mainFeaturedPostContent}>
                                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                            Welcome to alumni app
                                        </Typography>
                                        <Typography variant="h5" color="inherit" paragraph>
                                            description
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </main>
                </Container>
            </React.Fragment>
        );
    }
}

Homepage.propTypes = {
    post: PropTypes.object,
};

export default (withStyles(useStyles)(Homepage));
