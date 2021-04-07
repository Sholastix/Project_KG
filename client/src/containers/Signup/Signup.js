import React, { Fragment, useContext, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label } from 'reactstrap';

import { AuthContext } from '../../contexts/authContext';

const Signup = () => {

    // Отримуємо функцію реєстрації з контексту.
    const { signup } = useContext(AuthContext);

    const [createLogin, setCreateLogin] = useState('');
    const [createEmail, setCreateEmail] = useState('');
    const [createPassword, setCreatePassword] = useState('');

    const submitUserHandler = async () => {
        try {
            await signup({
                login: createLogin,
                email: createEmail,
                password: createPassword,
            });
            console.log('Тут буде код перенаправлення на сторінку авторизації.')
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