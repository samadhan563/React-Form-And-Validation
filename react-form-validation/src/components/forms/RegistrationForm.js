// 'use strict';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCalendar, faEnvelope, faEye, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {

    const [userDetail, setUserDetail] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        password: '',
        confirmPassword: '',
        aggree: false
    });

    const [formErrors, setFormErrors] = useState({});
    const [message, setMessage] = useState();
    const [error, setError] = useState(false);

    const onChange = (e) => {
        const { name, value } = e.target
        setUserDetail((val) =>
            ({ ...val, [name]: value })
        );
    }

    const onChangeAggree = (e) => {
        const { name } = e.target
        setUserDetail((val) =>
            ({ ...val, [name]: !userDetail.aggree })
        );
    }

    const validate = (values) => {
        let errors = {}
        if (values.firstName === '') {
            errors.firstName = "First Name is Required...."
        }

        if (values.lastName === '') {
            errors.lastName = "Last Name is Required...."
        }

        if (values.email === '') {
            errors.email = "Email is Required...."
        }

        if (values.dateOfBirth === '') {
            errors.dateOfBirth = "Date of Birth is Required...."
        }

        if (values.password === '') {
            errors.password = "Password is Required...."
        }
        else if (values.password.length < 6) {
            errors.password = "Password length should be 6 or more ...."
        }

        if (values.confirmPassword === '') {
            errors.confirmPassword = "Confirm Password is Required...."
        }
        else if (values.confirmPassword.length < 6) {
            errors.confirmPassword = "Confirm Password length should be 6 or more ...."
        }

        if (values.aggree === false) {
            errors.aggree = "Please Check Aggrement"
        }
        setFormErrors(errors);
        return errors;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // setFormErrors(validate(userDetail));
        if (Object.keys(validate(userDetail)).length === 0) {
            console.log(JSON.stringify(userDetail));
            setError(false);
            setMessage('Registration successful, welcome to system ... ')
        } else {
            console.log("Error");
            setError(true);
            setMessage('Registration Failed, please retry ... ')
        }
    }

    return (
        <div className="offset-md-3 col-md-6">
            <form onSubmit={onSubmit}>
                <div className="card ">
                    <div className="card-header bg-dark">
                        <h4 className="text-center text-light"> Registration Form</h4>
                    </div>
                    <div className='mt-2'>
                        {error && message && <div className='h5 text-center text-danger'>{message}</div>}
                    </div>
                    <div className='mt-2'>
                        {!error && message && <div className='h5 text-center text-success'>{message}</div>}
                    </div>
                    <div className="card-body">
                        <div className="form-row">
                            <div className="col-md-12">
                                <div className="input-group mb-1 mr-sm-2">
                                    <div className="h4 text-danger mr-1">* </div>
                                    <div>Asterisk indicate all mandatory fields</div>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <div className="input-group mb-1 mr-sm-2">
                                    <div className="h4 text-danger ">* </div>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><FontAwesomeIcon icon={faUser} /></div>
                                    </div>
                                    <input type="text"
                                        className="form-control form-control-lg"
                                        id="firstName"
                                        placeholder="First name"
                                        name='firstName'
                                        value={userDetail.firstName}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="ml-2 mb-2 mt-0">
                                    {formErrors.firstName && <div className="alert alert-danger">{formErrors.firstName}</div>}
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="input-group mb-2 mr-sm-2">
                                    <div className="h4 text-danger ">* </div>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><FontAwesomeIcon icon={faUser} /></div>
                                    </div>
                                    <input type="text"
                                        className="form-control form-control-lg"
                                        id="lastName"
                                        placeholder="Last name"
                                        name='lastName'
                                        value={userDetail.lastName}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className=" mb-2 mt-0">
                                    {formErrors.lastName && <div className="alert alert-danger">{formErrors.lastName}</div>}
                                </div>
                            </div>
                        </div>
                        {/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <div className="input-group mb-2 mr-sm-2">
                                    <div className="h4 text-danger ">* </div>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></div>
                                    </div>
                                    <input type="email"
                                        className="form-control form-control-lg"
                                        id="email"
                                        placeholder="Email"
                                        name='email'
                                        value={userDetail.email}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className=" mb-2 mt-0">
                                    {formErrors.email && <div className="ml-2 alert alert-danger">{formErrors.email}</div>}
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="input-group mb-2 mr-sm-2">
                                    <div className="h4 text-danger ">* </div>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><FontAwesomeIcon icon={faCalendar} /></div>
                                    </div>
                                    <input type="date"
                                        className="form-control form-control-lg"
                                        id="dateOfBirth"
                                        placeholder="Date Of Birth"
                                        name='dateOfBirth'
                                        value={userDetail.dateOfBirth}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className=" mb-2 mt-0">
                                    {formErrors.dateOfBirth && <div className="ml-2 alert alert-danger">{formErrors.dateOfBirth}</div>}
                                </div>
                            </div>
                        </div>
                        {/* ----------------------------------------------------------------------------------------------------- */}
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <div className="input-group mb-2 mr-sm-2">
                                    <div className="h4 text-danger ">* </div>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><FontAwesomeIcon icon={faKey} /></div>
                                    </div>
                                    <input type="password"
                                        className="form-control form-control-lg"
                                        id="password"
                                        placeholder="Password"
                                        name='password'
                                        value={userDetail.password}
                                        onChange={onChange}
                                    />
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><FontAwesomeIcon icon={faEye} /></div>
                                    </div>
                                </div>
                                <div className=" mb-2 mt-0">
                                    {formErrors.password && <div className="ml-2 alert alert-danger">{formErrors.password}</div>}
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="input-group mb-2 mr-sm-2">
                                    <div className="h4 text-danger ">* </div>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><FontAwesomeIcon icon={faKey} /></div>
                                    </div>
                                    <input type="password"
                                        className="form-control form-control-lg"
                                        id="confirmPassword"
                                        placeholder="Confirm Password"
                                        name='confirmPassword'
                                        value={userDetail.confirmPassword}
                                        onChange={onChange}
                                    />
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><FontAwesomeIcon icon={faEye} /></div>
                                    </div>
                                </div>
                                <div className=" mb-2 mt-0">
                                    { formErrors.confirmPassword && <div className="ml-2 alert alert-danger">{formErrors.confirmPassword}</div>}
                                </div>
                            </div>
                        </div>
                        {/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                        <div className="form-row">
                            <div className="input-group mb-0 mr-sm-2">
                                <div className="h4 text-danger mx-1">* </div>
                                <div className="form-check">

                                    <input className="form-check-input"
                                        type="checkbox" value={userDetail.aggree}
                                        id="aggree" onChange={onChangeAggree}
                                        name="aggree" />

                                    <label className="form-check-label" for="aggree">
                                        Agree to terms and conditions
                                    </label>
                                </div>
                            </div>
                            <div className=" mb-2 mt-0">
                                {formErrors.aggree && <div className="ml-2 alert alert-danger">{formErrors.aggree}</div>}
                            </div>
                        </div>

                    </div>
                    <div className="card-footer">
                        <div className="form-row">
                            <div className="col-md-6 ">
                                <button type="submit" className="btn btn-outline-info btn-block m-1 ">Register</button>
                            </div>
                            <div className="col-md-6 ">
                                <button className="btn btn-outline-danger btn-block m-1">Cancel</button>
                            </div>
                        </div>
                        <div className="mt-2">
                            <h6 className="text-center"> Or</h6>
                        </div>
                        <div className="form-row">
                            <div className="h6 m-2">
                                Already have an account ? <Link> login here <FontAwesomeIcon icon={faArrowRight} /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default RegistrationForm;
