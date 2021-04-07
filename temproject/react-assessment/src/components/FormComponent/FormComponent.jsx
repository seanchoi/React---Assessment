import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from "formik";

const _ = require("lodash");
function FormComponent(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const [currentSelected, setCurrentSelected] = useState('');

    const [data, setData] = useState([]);

    const getData = () => {
        fetch('./data.json')
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                const sortedOrder = _.sortBy(myJson.data.fields,
                    [
                        function (o) { 
                            return o.displayOrder; 
                        }
                    ]);
                setData(sortedOrder);
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        getData()
    }, [])

    const onChange = (e) => {
        if (e.target.name === "name.first") {
            setFirstName(e.target.value);
        } else if (e.target.name === "name.first") {
            setLastName(e.target.value);
        } else if (e.target.name === "contact.email") {
            setEmail(e.target.value);
        } else if (e.target.name === "address.street") {
            setAddress(e.target.value);
        }
    };
    const onFocus = (e) => {
        setCurrentSelected(e.target.name);
    };

    return (
        <div className="row">
            <div className="col-md-12 wow fadeInRight animated">
                <h3 className="blog-comment-heading">Simple React Form</h3>
                <Formik
                    initialValues={{}}                    
                >
                    <Form>
                        {
                            data && data.length > 0 && data.map((item, index) => (
                                <div className="row" key={index}>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            {
                                                item.type === "select" ? (
                                                    <Field onFocus={onFocus} as="select" name={item.name}>
                                                        {
                                                            item.options.map((option, index) => (
                                                                <option key={index} value={option}>{option}</option>
                                                            ))
                                                        }
                                                    </Field>
                                                ) : (
                                                    item.type === "radio" ? (
                                                        <div onFocus={onFocus} id={item.name + "-radio-group"}>{item.label}
                                                            <div role="group" aria-labelledby={item.name + "-radio-group"}>
                                                                {
                                                                    item.options.map((option, index) => (
                                                                        <label key={index}>
                                                                            <Field type="radio" name={item.name} value={option} />
                                                                            {option}
                                                                        </label>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <Field onFocus={onFocus} className="form-control" name={item.name} type={item.name.indexOf("email") === -1 ? "text" : "email"} placeholder={item.label} onChange={onChange} />
                                                    )
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        {currentSelected === item.name ? item.description : ""}
                                    </div>
                                </div>
                            ))
                        }
                        <div className="row">
                            <div className="col-md-12">
                                <button className="btn" type="submit">Submit</button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export {FormComponent};