import React from 'react'
import { Grid, FormControl, FormLabel, FormGroup, TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import {useFormik} from "formik";
import {useDarkStyleForm} from "../../styleForm/useDarkStyleForm";


export const Login = () => {

    const {InputLabelProps, InputProps} = useDarkStyleForm()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    })

    return <Grid container justifyContent={'center'}>
        <Grid container justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormLabel>
                    <p style={{color: "white"}}>To log in get registered
                        <a style={{textDecoration: "none", color: "limegreen"}} href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p style={{color: "white"}}>or use common test account credentials:</p>
                    <p style={{color: "white"}}>Email: free@samuraijs.com</p>
                    <p style={{color: "white"}}>Password: free</p>
                </FormLabel>
                <FormGroup>
                    <TextField
                        label="Email"
                        margin="normal"
                        InputLabelProps={InputLabelProps}
                        InputProps={InputProps}
                    />
                    <TextField
                        type="password"
                        label="Password"
                        margin="normal"
                        InputLabelProps={InputLabelProps}
                        InputProps={InputProps}
                    />
                    <FormControlLabel label={'Remember me'} control={<Checkbox/>}/>
                    <Button style={{backgroundColor: "limegreen"}} type={'submit'} variant={'contained'} >
                        Login
                    </Button>
                </FormGroup>
            </FormControl>
            </form>
        </Grid>
    </Grid>
}