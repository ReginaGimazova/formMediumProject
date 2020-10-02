import React, {useState} from 'react';
import styled from 'styled-components';
import useUserFormValidation from './useUserFormValidation';

const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const Label = styled.label`
  margin-bottom: 5px;
  text-align: left;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #adadad;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #228b22;
  color: #fff;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  
  &:disabled {
    background-color: #006400;
    cursor: default;
  }
`;

const Error = styled.p`
  margin: 5px 0;
  color: #ff0000;
`;

const UserForm = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  const { validateFieldOnBlur, validateFieldsOnSubmit, validationErrors } = useUserFormValidation();

  const onFirstNameChange = (event) => {
    event.preventDefault();
    setUserData({...userData, firstName: event.target.value})
  };

  const onLastNameChange = (event) => {
    event.preventDefault();
    setUserData({...userData, lastName: event.target.value})
  };

  const onEmailChange = (event) => {
    event.preventDefault();
    setUserData({...userData, email: event.target.value})
  };

  const onPhoneChange = (event) => {
    event.preventDefault();
    setUserData({...userData, phone: event.target.value})
  };

  const userFormFields = [
    {
      label: {
        text: 'First Name',
      },
      id: 'firstName',
      name: 'firstName',
      type: 'text',
      onChange: onFirstNameChange,
      onBlur: validateFieldOnBlur,
    },
    {
      label: {
        text: 'Last Name',
      },
      id: 'lastName',
      name: 'lastName',
      type: 'text',
      onChange: onLastNameChange,
      onBlur: validateFieldOnBlur,
    },
    {
      label: {
        text: 'Phone Number *',
      },
      id: 'phone',
      name: 'phone',
      type: 'tel',
      isRequired: true,
      onChange: onPhoneChange,
      onBlur: validateFieldOnBlur,
    },
    {
      label: {
        text: 'Email *',
      },
      id: 'email',
      name: 'email',
      type: 'email',
      isRequired: true,
      onChange: onEmailChange,
      onBlur: validateFieldOnBlur,
    },
  ];

  const onClick = event => {
    event.preventDefault();
    validateFieldsOnSubmit(userData)
  };

  const buttonDisabled = Object.values(validationErrors).find(value => !!value);
  return (
    <>
      <h1>User Form</h1>
      <Form>
        {userFormFields.map(
          ({ id, label, type, name, isRequired, onChange, onBlur}, index) =>
            <FormField key={index}>
              <Label htmlFor={id}>{label.text}</Label>
              <Input
                type={type}
                id={id}
                name={name}
                required={isRequired}
                onChange={onChange}
                onBlur={onBlur}
              />
              {validationErrors[name] && <Error>{validationErrors[name]}</Error>}
            </FormField>
          )}
          <Button onClick={onClick} >Check</Button>
      </Form>
    </>
  );
};

export default UserForm;