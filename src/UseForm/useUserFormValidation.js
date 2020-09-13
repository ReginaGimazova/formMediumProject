import {useState} from "react";
import useFormValidation from "../hooks/useFormValidation";

export const phoneRegularExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
export const emailRegularExp = /\S+@\S+\.\S+/;

const phoneRegErrorText = 'Phone number is not valid';
const emailRegErrorText = 'Email is not valid';

const validationSchema = {
  email: {
    isRequired: true,
    regexp: emailRegularExp,
    regErrorText: emailRegErrorText,
    requiredTextError: 'Email field is required',
  },
  phone: {
    isRequired: true,
    regexp: phoneRegularExp,
    regErrorText: phoneRegErrorText,
    requiredTextError: 'Phone field is required',
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
    firstName: '',
    lastName: '',
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