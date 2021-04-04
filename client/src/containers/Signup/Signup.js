import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label } from 'reactstrap';

const Signup = () => {

    const [users, setUsers] = useState([]);

    const [createLogin, setCreateLogin] = useState('');
    const [createEmail, setCreateEmail] = useState('');
    const [createPassword, setCreatePassword] = useState('');

    ////////////////// HTTP REQUESTS ///////////////////

    // POST
    const submitUserHandler = async () => {
        try {
            const newUser = await axios.post('http://localhost:5000/api/signup/', {
                login: createLogin,
                email: createEmail,
                password: createPassword,
            });
            const updUsers = users.concat({ ...newUser.data });
            setUsers(updUsers);
        } catch (err) {
            console.error(err);
        };
    };

    ////////////////// RENDER ///////////////////

    return (
        <Fragment>
            <br/>
            <Card outline color='secondary'>
                <CardHeader>
                    <h1>Registration</h1>
                    Please fill the fields below:
                </CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for='login'>Login:</Label>
                            <Input
                                id='login'
                                value={createLogin}
                                onChange={(event) => { setCreateLogin(event.target.value) }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='email'>E-mail:</Label>
                            <Input
                                type='email'
                                id='email'
                                value={createEmail}
                                onChange={(event) => { setCreateEmail(event.target.value) }}
                                placeholder='example@gmail.com'
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='password'>Password:</Label>
                            <Input
                                type='password'
                                id='password'
                                value={createPassword}
                                onChange={(event) => { setCreatePassword(event.target.value) }}
                            />
                        </FormGroup>
                        <br />
                        <Button outline color='success' onClick={submitUserHandler}>SUBMIT</Button>
                    </Form>
                </CardBody>
            </Card>
        </Fragment>
    );
};

export default Signup;