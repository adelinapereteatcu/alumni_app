import React, { Component } from 'react';
import axios from 'axios';
import { ExcelRenderer, OutTable } from 'react-excel-renderer';
import { InputGroup, Card } from 'reactstrap';
import './Upload.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

const useStyles = theme => ({
    button: {
        margin: theme.spacing(1),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '50%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
});

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dataLoaded: false,
            isFormInvalid: false,
            rows: null,
            cols: null,
            selectedFile: null,
            error_code: 1
        }
        this.fileHandler = this.fileHandler.bind(this);
        this.toggle = this.toggle.bind(this);
        this.openFileBrowser = this.openFileBrowser.bind(this);
        this.renderFile = this.renderFile.bind(this);
        this.fileInput = React.createRef();
    }

    renderFile = (fileObj) => {
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                this.setState({
                    dataLoaded: true,
                    cols: resp.cols,
                    rows: resp.rows
                });
            }
        });
    }

    fileHandler = event => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
            error_code: 1
        })

        if (event.target.files.length) {
            let fileObj = event.target.files[0];
            console.log("FILE OBJ: " + fileObj);
            let fileName = fileObj.name;

            //check for file extension and pass only if it is .xlsx and display error message otherwise
            if (fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
                this.setState({
                    uploadedFileName: fileName,
                    isFormInvalid: false
                });
                this.renderFile(fileObj)
            }
            else {
                this.setState({
                    isFormInvalid: true,
                    uploadedFileName: ""
                })
            }
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    openFileBrowser = () => {
        this.fileInput.current.click();
    }

    onClickHandler = () => {
        console.log("onClickHandler");
        const data = new FormData();
        data.append('file', this.state.selectedFile);
        axios.post("/upload", data, {
        })
            .then(res => {
                console.log("RESPONSE FROM REACT");
                console.log(res.statusText);
                console.log(res.data.error_code);
                this.setState({
                    error_code: res.data.error_code,
                    dataLoaded: false
                });
            })
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment >
                <Container component="main" maxWidth="xl">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Choose the file to upload:
                    </Typography>
                        <form
                            className={classes.form}
                        >
                            <InputGroup>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={this.openFileBrowser.bind(this)}>
                                    Browse file&hellip;
                             </Button>
                                <input
                                    type="file"
                                    className="inputfile"
                                    onChange={this.fileHandler.bind(this)}
                                    ref={this.fileInput}
                                    onClick={(event) => { event.target.value = null }} style={{ "padding": "10px" }} />
                                <br></br>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    variant="outlined"
                                    margin="normal"
                                    required

                                    value={this.state.uploadedFileName}
                                    readOnly
                                    invalid={this.state.isFormInvalid} />
                                {/* <FormFeedback>
                                <Fade in={this.state.isFormInvalid} tag="h6" style={{ fontStyle: "italic" }}>
                                    Please select a .xlsx file only !
                                    </Fade>
                            </FormFeedback> */}
                            </InputGroup>

                            {this.state.dataLoaded &&
                                <div>
                                    <Card body outline color="secondary" className="restrict-card">
                                        <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
                                    </Card>
                                </div>}
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<CloudUploadIcon />}
                                onClick={this.onClickHandler}
                            >
                                Upload
                        </Button>
                        </form>
                        {!this.state.error_code ?
                            <div>
                                <Alert severity="success">File uploaded successfully!</Alert>
                            </div>
                            : null}
                    </div>
                </Container>
            </React.Fragment>
        );
    }

}

export default (withStyles(useStyles)(Upload));
