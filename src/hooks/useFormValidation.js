const requiredErrorText = 'This field is required.';
const regExpErrorText = 'This field is not valid';

const checkRequiredField = ({schemaElement, value}) => {
  const requiredLength = schemaElement.minLength;
  const elementValidationFailed = !value || (requiredLength && value.length < requiredLength);

  return elementValidationFailed && (schemaElement.requiredErrorText || requiredErrorText);
};

const checkRegExpForField = ({schemaElement, value}) => {
  const elementValidationFailed = !value.match(schemaElement.regexp);
  return elementValidationFailed && (schemaElement.regexpErrorText || regExpErrorText);
};

const useFormValidation = ({ validationSchema, validationErrors, setValidationErrors }) => {

  const validateOnBlur = ({ name, value }) => {
    const schemaElement = validationSchema[name];

    if (schemaElement.isRequired) {
      const error = checkRequiredField({schemaElement, value});

      setValidationErrors({
        ...validationErrors,
        [name]: error,
      });
    }

    if (schemaElement.regexp && value) {
      const error = checkRegExpForField({schemaElement, value});
      setValidationErrors({
        ...validationErrors,
        [name]: error
      })
    }
  };

  const validateOnSubmit = data => {
    let isValid = true;

    const updatedState = {};
    Object.assign(updatedState, validationErrors);

    Object.keys(validationSchema).forEach(key => {
      const value = data[key];
      const schemaElement = validationSchema[key];

      if (schemaElement.isRequired){
        const error = checkRequiredField({schemaElement, value});
        isValid = isValid && !!value && !error;
        updatedState[key] = error;
      }

      if (schemaElement.regexp && value){
        const error = checkRegExpForField({schemaElement, value});
        isValid = isValid && error;
        updatedState[key] = error;
      }
    });

    setValidationErrors({ ...updatedState });

    return isValid;
  };

  return { validateOnBlur, validateOnSubmit };
};

export default useFormValidation;
