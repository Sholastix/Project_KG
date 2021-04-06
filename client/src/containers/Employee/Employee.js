// import axios from 'axios'; // Потрібно розкоментувати для VARIANT 2.

import React, { useContext, useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

import { employeeSex } from '../../constants/employeeSex';
import { AuthContext } from '../../contexts/authContext';
import { axiosUser } from '../../services/axiosCreateInstance';

const Employee = () => {

    // Отримуємо токен, він потрібен бо дані з Employees захищені від неавторизованого доступу.
    const { token } = useContext(AuthContext);

    const [employees, setEmployees] = useState([]);

    const [createEmployeeName, setCreateEmployeeName] = useState('');
    const [createEmployeeSex, setCreateEmployeeSex] = useState(employeeSex[0]);
    const [createEmployeeBirthday, setCreateEmployeeBirthday] = useState('');
    const [createEmployeeContacts, setCreateEmployeeContacts] = useState('');
    const [createEmployeePosition, setCreateEmployeePosition] = useState('');
    const [createEmployeeSalary, setCreateEmployeeSalary] = useState('');

    const [editEmployeeId, setEditEmployeeId] = useState('');
    const [editEmployeeName, setEditEmployeeName] = useState('');
    const [editEmployeeSex, setEditEmployeeSex] = useState('');
    const [editEmployeeBirthday, setEditEmployeeBirthday] = useState('');
    const [editEmployeeContacts, setEditEmployeeContacts] = useState('');
    const [editEmployeePosition, setEditEmployeePosition] = useState('');
    const [editEmployeeSalary, setEditEmployeeSalary] = useState('');

    const [createEmployeeModal, setCreateEmployeeModal] = useState(false);
    const [editEmployeeModal, setEditEmployeeModal] = useState(false);

    useEffect(() => {
        getEmployees();
    }, []);

    const toggleCreateEmployeeModal = () => setCreateEmployeeModal(!createEmployeeModal);
    const toggleEditEmployeeModal = () => setEditEmployeeModal(!editEmployeeModal);

    // Допоміжна функція, що очищує поля вводу даних у модальному вікні createEmployeeModal.
    const clearInput = async () => {
        try {
            setCreateEmployeeName('');
            setCreateEmployeeSex(employeeSex[0]);
            setCreateEmployeeBirthday('');
            setCreateEmployeeContacts('');
            setCreateEmployeePosition('');
            setCreateEmployeeSalary('');
        } catch (err) {
            console.error(err);
        };
    };

    ////////////////// HTTP REQUESTS ///////////////////

    // GET
    const getEmployees = async () => {
        try {
            // VARIANT 1 - з використанням попередньо створеного генератора інстансів від axios.
            const employeesList = await axiosUser(token).get('/employees/');

            // // VARIANT 2  - звичайний підхід. Аналогічно й у кожному HTTP-запиті.
            // const employeesList = await axios.get('http://localhost:5000/api/employees/', {
            //     headers: {
            //         Authorization: token,
            //     },
            // });
            setEmployees(employeesList.data.docs);
        } catch (err) {
            console.error(err);
        };
    };

    // POST
    const addEmployeeHandler = async () => {
        try {
            const newEmployee = await axiosUser(token).post('/employees/', {
                name: createEmployeeName,
                sex: createEmployeeSex,
                birthday: createEmployeeBirthday,
                contacts: createEmployeeContacts,
                position: createEmployeePosition,
                salary: createEmployeeSalary,
            });
            const updEmployees = employees.concat({ ...newEmployee.data });
            setEmployees(updEmployees);
            toggleCreateEmployeeModal();
            clearInput();
            getEmployees();
        } catch (err) {
            console.error(err);
        };
    };

    // PUT
    const updateEmployeeHandler = async () => {
        try {
            await axiosUser(token).put('/employees/' + editEmployeeId, {
                name: editEmployeeName,
                sex: editEmployeeSex,
                birthday: editEmployeeBirthday,
                contacts: editEmployeeContacts,
                position: editEmployeePosition,
                salary: editEmployeeSalary,
            });
            const index = employees.findIndex((el) => el._id === editEmployeeId);
            const oldElement = employees[index];
            const updElement = {
                ...oldElement,
                name: editEmployeeName,
                sex: editEmployeeSex,
                birthday: editEmployeeBirthday,
                contacts: editEmployeeContacts,
                position: editEmployeePosition,
                salary: editEmployeeSalary,
            };
            const updEmployees = [
                ...employees.slice(0, index),
                updElement,
                ...employees.slice(index + 1)
            ];
            setEmployees(updEmployees);
            toggleEditEmployeeModal();
            getEmployees();
        } catch (err) {
            console.error(err);
        };
    };

    const editEmployeeHandler = async (_id) => {
        try {
            const employee = employees.find((el) => el._id === _id);
            setEditEmployeeId(_id);
            setEditEmployeeName(employee.name);
            setEditEmployeeSex(employee.sex);
            setEditEmployeeBirthday(employee.birthday);
            setEditEmployeeContacts(employee.contacts);
            setEditEmployeePosition(employee.position);
            setEditEmployeeSalary(employee.salary);
            toggleEditEmployeeModal();
        } catch (err) {
            console.error(err);
        };
    };

    // DELETE
    const deleteEmployeeHandler = async (_id) => {
        try {
            await axiosUser(token).delete('/employees/' + _id);
            const index = employees.findIndex((el) => el._id === _id);
            const updEmployees = [
                ...employees.slice(0, index),
                ...employees.slice(index + 1),
            ];
            setEmployees(updEmployees);
        } catch (err) {
            console.error(err);
        };
    };

    ////////////////// RENDER ///////////////////

    return (
        <div className='App container'>
            <br />
            <h1>List of Employees</h1>
            <br />
            <Button color='success' outline onClick={toggleCreateEmployeeModal}>ADD NEW EMPLOYEE</Button>
            <br />
            <br />
            <Modal isOpen={createEmployeeModal} toggle={toggleCreateEmployeeModal}>
                <ModalHeader toggle={toggleCreateEmployeeModal}>Please add a new employee:</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for='name'>Name:</Label>
                            <Input
                                id='name'
                                value={createEmployeeName}
                                onChange={(event) => { setCreateEmployeeName(event.target.value) }}
                                placeholder='John Smith'
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='sex'>Sex:</Label>
                            <Input
                                type='select'
                                id='sex'
                                value={createEmployeeSex}
                                onChange={(event) => { setCreateEmployeeSex(event.target.value) }}
                            >
                                {
                                    employeeSex.map((sex, index) => {
                                        return <option key={index} >{sex}</option>
                                    })
                                }
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for='birthday'>Birthday:</Label>
                            <Input
                                type='date'
                                id='birthday'
                                value={createEmployeeBirthday}
                                onChange={(event) => { setCreateEmployeeBirthday(event.target.value) }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='contacts'>Contacts:</Label>
                            <Input
                                type='textarea'
                                id='contacts'
                                value={createEmployeeContacts}
                                onChange={(event) => { setCreateEmployeeContacts(event.target.value) }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='position'>Position:</Label>
                            <Input
                                id='position'
                                value={createEmployeePosition}
                                onChange={(event) => { setCreateEmployeePosition(event.target.value) }}
                                placeholder='manager'
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='salary'>Salary:</Label>
                            <Input
                                id='salary'
                                value={createEmployeeSalary}
                                onChange={(event) => { setCreateEmployeeSalary(event.target.value) }}
                                placeholder='1000.00'
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={addEmployeeHandler}>ADD</Button>{' '}
                    <Button color='secondary' onClick={toggleCreateEmployeeModal}>CANCEL</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={editEmployeeModal} toggle={toggleEditEmployeeModal}>
                <ModalHeader toggle={toggleEditEmployeeModal}>Please edit info:</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for='name'>Name:</Label>
                            <Input
                                id='name'
                                value={editEmployeeName}
                                onChange={(event) => { setEditEmployeeName(event.target.value) }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='sex'>Sex:</Label>
                            <Input
                                type='select'
                                id='sex'
                                value={editEmployeeSex}
                                onChange={(event) => { setEditEmployeeSex(event.target.value) }}
                            >
                                {
                                    employeeSex.map((sex, index) => {
                                        return <option key={index} >{sex}</option>
                                    })
                                }
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for='birthday'>Birthday:</Label>
                            <Input
                                type='date'
                                id='birthday'
                                value={editEmployeeBirthday}
                                onChange={(event) => { setEditEmployeeBirthday(event.target.value) }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='contacts'>Contacts:</Label>
                            <Input
                                type='textarea'
                                id='contacts'
                                value={editEmployeeContacts}
                                onChange={(event) => { setEditEmployeeContacts(event.target.value) }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='position'>Position:</Label>
                            <Input
                                id='position'
                                value={editEmployeePosition}
                                onChange={(event) => { setEditEmployeePosition(event.target.value) }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='salary'>Salary:</Label>
                            <Input
                                id='salary'
                                value={editEmployeeSalary}
                                onChange={(event) => { setEditEmployeeSalary(event.target.value) }}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={updateEmployeeHandler}>UPDATE</Button>{' '}
                    <Button color='secondary' onClick={toggleEditEmployeeModal}>CANCEL</Button>
                </ModalFooter>
            </Modal>

            <Table bordered striped size='sm'>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>SEX</th>
                        <th>BIRTHDAY</th>
                        <th>CONTACTS</th>
                        <th>POSITION</th>
                        <th>SALARY</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.name}</td>
                            <td>{employee.sex}</td>
                            <td>{employee.birthday}</td>
                            <td>{employee.contacts}</td>
                            <td>{employee.position}</td>
                            <td>{employee.salary}</td>
                            <td>
                                <Button color='secondary' size='sm' className='mr-2' outline onClick={() => { editEmployeeHandler(employee._id) }}>EDIT</Button>{' '}
                                <Button color='danger' size='sm' outline onClick={() => { deleteEmployeeHandler(employee._id) }}>DELETE</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Employee;