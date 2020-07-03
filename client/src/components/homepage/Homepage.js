import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import uniImage from '../../media/University.jpg';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Navbar from '../layout/Navbar';
import { connect } from 'react-redux';
import { getAlumniByYear } from '../../store/actions/alumniActions';

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
        height: "400px"
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
    table: {
        width: 500,
        margin: 'auto'
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        width: 600,
    },
});

class Homepage extends Component {
   

    componentDidMount() {
        this.props.getAlumniByYear();
    }

    render() {
        const { classes } = this.props;
        console.log(this.props.alumni.resultArr);
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
                                            
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </main>
                </Container>
                <Container maxWidth="xl" className={classes.container}>
                <Paper className={classes.paper}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Class</b></TableCell>
                                        <TableCell align="right"><b>Number of alumni</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.alumni.resultArr.map((row) => (
                                <TableRow key={row.class}>
                                    <TableCell component="th" scope="row">
                                        {row.class}
                                    </TableCell>
                                    <TableCell align="right">{row.number}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Paper>
                </Container>
            </React.Fragment>
        );
    }
}

Homepage.propTypes = {
    post: PropTypes.object,
    getAlumniByYear: PropTypes.func.isRequired,
    alumni: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    alumni: state.alumni //from root reducer
})

const mapDispatchtoProps = dispatch => {
    return {
        getAlumniByYear: () => dispatch(getAlumniByYear())
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(withStyles(useStyles)(Homepage));
