import {useState} from "react";
import useFormValidation from "../hooks/useFormValidation";

export const phoneRegularExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
export const emailRegularExp = /\S+@\S+\.\S+/;

const fields = {
  email: 'Email',
  phone: 'Phone number'
};

const regExpErrorText = field => `${field} is not valid`;
const requiredErrorText = field => `${field} field is required`;

const validationSchema = {
  email: {
    isRequired: true,
    regexp: emailRegularExp,
    regErrorText: regExpErrorText(fields.email),
    requiredTextError: requiredErrorText(fields.email),
  },
  phone: {
    isRequired: true,
    regexp: phoneRegularExp,
    regErrorText: regExpErrorText(fields.phone),
    requiredTextError: requiredErrorText(fields.phone),
  },
  firstName: {
    isRequired: false,
  },
  lastName: {
    isRequired: false,
  }
};

const useUserFormValidation = () => {
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    phone: '',
  });

  const { validateOnBlur, validateOnSubmit } = useFormValidation({
    validationSchema,
    validationErrors,
    setValidationErrors,
  });

  const validateFieldOnBlur = ({ target: { name, value } }) => {
    validateOnBlur({ name, value });
  };

  const validateFieldsOnSubmit = userData => {
    validateOnSubmit(userData);
  };

  return {validateFieldOnBlur, validateFieldsOnSubmit, validationErrors}
};

export default useUserFormValidation;