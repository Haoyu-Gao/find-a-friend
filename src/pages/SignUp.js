import React from "react";
import { AppBar, Avatar, Button, Grid, Link, Paper, Toolbar, TextField, Typography} from '@material-ui/core';
import {Redirect} from 'react-router-dom'; 
import {
    authFunctions
} from '../firebase';
 
const gridStyle = {
    width: "100%",
    margin: "0px"
}

const leftPaperStyle = {
    width: "100%",
    backgroundColor: "#4051B5"
}

const rightPaperStyle = {
    padding: "20px",
    height: "60vh",
    width: "280px",
    margin: "20px auto"
}

const h3style = {
    color: "#FFFFFF",
    padding: "20px"
}

const buttonStyle = {
    margin: "10px 0"
}

class SignUp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            success: false,
            login: false,
            uid: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectToLogIn = this.redirectToLogIn.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        authFunctions.signUp(
            this.state.firstname,
            this.state.lastname,
            this.state.email,
            this.state.password
        );
        authFunctions.onUserActive((uid) => {
            this.setState({success: true, uid: uid});
        })
        event.preventDefault();
    }

    redirectToLogIn() {
        this.setState({login: true});
    }

    render() { 
        if (this.state.login) {
            return <Redirect to='./login'/>
        }
        if (this.state.success) {
            return <Redirect to="./home"/>
        }
        return ( 
            <div> 
                <AppBar position="static">
                    <Toolbar>
                        <h1>FIND-A-Friend</h1>
                    </Toolbar>
                </AppBar>
                <Grid container style={gridStyle} spacing={2}>
                    <Grid item xs={9}>
                        <Paper style={leftPaperStyle}>
                            <div>
                                <h3 style={h3style}>
                                    终于成功了！
                                </h3>
                                <img src="https://image.baidu.com/search/detail?ct=503316480&z=&tn=baiduimagedetail&ipn=d&word=mac%20%E5%A3%81%E7%BA%B8&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&hd=&latest=&copyright=&cs=343736123,2333414042&os=137020204,573411825&simid=4232865056,679346772&pn=10&rn=1&di=125950&ln=1951&fr=&fmq=1616242559042_R&ic=&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252F5b0988e595225.cdn.sohucs.com%252Fimages%252F20190329%252F682c7856811d42a79fa0cf6d9940b947.jpeg%26refer%3Dhttp%253A%252F%252F5b0988e595225.cdn.sohucs.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1618834559%26t%3Ddf99ad3356ee158293ed3b3964e541b4&rpstart=0&rpnum=0&adpicid=0&force=undefined" alt="a pic"
                                width="60%"/>
                            </div>

                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper style={rightPaperStyle} elevation={10}>
                            <Grid align='center'>
                                <Avatar></Avatar>
                                <h2>Sign up</h2>
                            </Grid>
                            <form onSubmit={this.handleSubmit}>
                            <TextField label="First name" placeholder="Una" name="firstname" id="firstname" fullWidth required autoFocus onChange={this.handleChange} value={this.state.firstname}/>
                                <TextField label="Last name" placeholder="Appleseed" name="lastname"
                                id="lastname" fullWidth required onChange={this.handleChange}
                                value={this.state.lastname}/>
                                <TextField label="Email" placeholder="Enter email" name="email"
                                id="email" fullWidth required onChange={this.handleChange}
                                value={this.state.email}/>
                                <TextField label="Password" placeholder="Enter password" name="password"
                                id="password" fullWidth required 
                                onChange={this.handleChange}
                                value={this.state.password} />
                                <Button type="submit" color="primary" variant="contained" fullWidth
                                style={buttonStyle}>SignUp</Button>
                            </form>
                            <Typography>
                                Already have an account?<Link href="" onClick={this.redirectToLogIn}>Log in</Link>
                            </Typography>
                        </Paper>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default SignUp;