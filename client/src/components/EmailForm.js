import React, {useEffect, useState} from 'react';
import {Formik, Field} from 'formik';
import {Button, Error, FormFieldWrapper, FormWrapper, Label, Input, Wrapper, FormSelect, Message} from "./styles";
import * as Yup from 'yup';
import {createContact} from "../api/contact";

const LoginSchema = Yup.object().shape({
    template: Yup.string().required('Template is required'),
    email: Yup.string()
        .email('Wrong email')
        .required(`Email is required`),
    firstName: Yup.string()
        .required('Name is required')
        .min(3, 'Name is too short - minimum 3 chars')
        .matches(/[a-zA-Z]/, 'Name should only have latin letters'),
    lastName: Yup.string()
        .required('Name is required')
        .min(3, 'Name is too short - minimum 3 chars')
        .matches(/[a-zA-Z]/, 'Name should only have latin letters'),
    language: Yup.string().required('Language is required'),
});

const EmailForm = () => {
    const [templates, setTemplates] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const initialValues = { template: 'Template EN', email: '', firstName: '', lastName: '', language: 'EN'};

    const onSubmitHandler = async (values, resetForm ) => {
        const res = await createContact(values);

        if (res.errors) {
            setError(res.errors);
        } else {
            setError("");
            resetForm(initialValues);
            setMessage("Form is successfully submitted!");
        }
    };

    useEffect(() => {
        const getTemplates = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/base/get-templates");

                const data = await response.json();
                setTemplates(data);
            } catch (e) {
                console.error(e);
            }
        };

        getTemplates();
    }, []);

    return (
        <Wrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={(values, { resetForm } ) => onSubmitHandler(values, resetForm)}
            >
                {({errors, touched, handleChange, resetForm}) => (
                    <FormWrapper>
                        {error && <Error>{error}</Error>}
                        {message && <Message>{message}</Message>}
                        <Label htmlFor="template">Template</Label>
                        <FormFieldWrapper>
                            <FormSelect as="select" name="template" onChange={handleChange}>
                                {templates.map((template, index) => <option key={template.name} value={template.name}>{template.name}</option>)}
                            </FormSelect>
                        </FormFieldWrapper>

                        {errors.email && touched.email ? (
                            <Error>{errors.email}</Error>
                        ) : null}
                        <FormFieldWrapper>
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" name="email" />
                        </FormFieldWrapper>

                        {errors.firstName && touched.firstName ? (
                            <Error>{errors.firstName}</Error>
                        ) : null}
                        <FormFieldWrapper>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input type="firstName" name="firstName"/>
                        </FormFieldWrapper>

                        {errors.lastName && touched.lastName ? (
                            <Error>{errors.lastName}</Error>
                        ) : null}
                        <FormFieldWrapper>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input type="lastName" name="lastName"/>
                        </FormFieldWrapper>

                        <Label htmlFor="lang">Language</Label>
                        <FormFieldWrapper>
                            <FormSelect as="select" name="language" onChange={handleChange}>
                                <option key="EN" value="EN">EN</option>
                                <option key="DE" value="DE">DE</option>
                            </FormSelect>
                        </FormFieldWrapper>
                        <Button type="submit">Send</Button>
                    </FormWrapper>
                )}
            </Formik>
        </Wrapper>
    );
};

export default EmailForm;
