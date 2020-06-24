import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';
import _ from "lodash";
import { connect } from 'react-redux';
import { getUsers } from '../../store/actions/usersAction';
import PropTypes from 'prop-types';
import userIcon from "../../media/userIcon.png";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const useStyles = theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    fixedHeight: {
        height: 500,
    },
    imagePaper: {
        height: 500,
        flex: 1
    },
    // depositContext: {
    //     flex: 1,
    // },
    media: {
        height: 500,
        //paddingTop: '56.25%', // 16:9
    },
});

class UserProfile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        // console.log(this.props.users.users);
        // console.log(this.props.id);
        const id = parseInt(this.props.id);
        const myUser = _.find(this.props.users.users, { 'id': id });
        console.log(myUser);
        return (
            <React.Fragment>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* User image here */}
                        <Grid item xs={12} md={5} lg={5}>
                            <Paper className={classes.imagePaper}>
                                <Card className={classes.root}>
                                    {/* <CardHeader
                                        title={myUser.first_name + " " + myUser.last_name}
                                    /> */}
                                    <CardMedia
                                        className={classes.media}
                                        image={userIcon}
                                        title="User Profile"
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {myUser.first_name + " " + myUser.last_name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Grid>
                        {/* User details */}
                        <Grid item xs={12} md={8} lg={7}>
                            <Paper className={classes.fixedHeight}>
                                <Typography color="textSecondary" className={classes.depositContext}>
                                    user details here
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    users: state.users //from root reducer
})

export default connect(mapStateToProps, null)(withStyles(useStyles)(UserProfile));