import React from 'react'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from '@material-ui/core';
import {useFormik} from "formik";
import {useDarkStyleForm} from "../../styleForm/useDarkStyleForm";
import {loginTC} from "./auth-reducer";
import {useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";

export const Login = () => {

    //const isLogged = useSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const {InputLabelProps, InputProps} = useDarkStyleForm()

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}

            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Must be 3 characters or more';
            }

            return errors
        },

        onSubmit: values => {
            //alert(JSON.stringify(values));
            dispatch(loginTC(values))
            formik.resetForm()
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

                        {...formik.getFieldProps('email')}
                    />

                    {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}

                    <TextField
                        type="password"
                        label="Password"
                        margin="normal"
                        InputLabelProps={InputLabelProps}
                        InputProps={InputProps}

                        {...formik.getFieldProps('password')}
                    />

                    {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}

                    <FormControlLabel
                        label={'Remember me'}
                        control={<Checkbox/>}
                        onChange={formik.handleChange}
                        checked={formik.values.rememberMe}
                    />
                    <Button style={{backgroundColor: "limegreen"}} type={'submit'} variant={'contained'} >
                        Login
                    </Button>
                </FormGroup>
            </FormControl>
            </form>
        </Grid>
    </Grid>
}