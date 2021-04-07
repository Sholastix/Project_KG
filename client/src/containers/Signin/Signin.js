import React, { Fragment, useContext, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label } from 'reactstrap';

import { AuthContext } from '../../contexts/authContext';

const Signin = () => {

    // Отримуємо функцію авторизації з контексту.
    const { signin } = useContext(AuthContext);

    const [createEmail, setCreateEmail] = useState('');
    const [createPassword, setCreatePassword] = useState('');

    // Беремо дані з форми авторизації та спрямовуємо їх у функцію авторизації, яку раніше отримали з контексту.
    const submitUserHandler = async () => {
        try {
            await signin({
                email: createEmail,
                password: createPassword,
            });
        } catch (err) {
            console.error(err);
        };
    };

    ////////////////// RENDER ///////////////////

    return (
        <Fragment>
            <br />
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