import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label } from 'reactstrap';

const Signin = () => {

    const [users, setUsers] = useState([]);

    const [createEmail, setCreateEmail] = useState('');
    const [createPassword, setCreatePassword] = useState('');

    ////////////////// HTTP REQUESTS ///////////////////

    // POST
    const submitUserHandler = async () => {
        try {
            const newUser = await axios.post('http://localhost:5000/api/signin/', {
                email: createEmail,
                password: createPassword,
            });
            console.log(newUser)
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
                    <h1>Authorization</h1>
                    Please fill the fields below:
                </CardHeader>
                <CardBody>
                    <Form>
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

export default Signin;