const useFormValidation = ({ validationSchema, validationErrors, setValidationErrors }) => {
  const requiredErrorText = 'This field is required.';

  const validateOnBlur = ({ name, value }) => {
    if (validationSchema[name].isRequired) {
      const requiredLength = validationSchema[name] && validationSchema[name].minLength;
      const elementValidationFailed = !value || (requiredLength && value.length < requiredLength);

      setValidationErrors({
        ...validationErrors,
        [name]: elementValidationFailed ? validationSchema[name].requiredTextError || requiredErrorText : '',
      });
    }

    if (validationSchema[name].regexp && !value.match(validationSchema[name].regexp) && value) {
      setValidationErrors({ ...validationErrors, [name]: validationSchema[name].regErrorText });
    }
  };

  const validateOnSubmit = data => {
    let isValid = true;

    const updatedState = {};
    Object.assign(updatedState, validationErrors);

    Object.keys(validationErrors).forEach(key => {
      const field = {
        data: data[key],
        validation: validationSchema[key] || {},
      };

      const requiredLength = field.validation && field.validation.minLength;
      const requiredField = !field.data && field.validation.isRequired;
      const elementValidationFailed = requiredField || (requiredLength && field.data.length < requiredLength);

      updatedState[key] = elementValidationFailed ? field.validation.requiredTextError || requiredErrorText : '';

      isValid = isValid && !!field.data && !elementValidationFailed;
    });

    Object.keys(validationSchema).forEach(key => {
      if (validationSchema[key].regexp) {
        const isMatch = !!data[key].match(validationSchema[key].regexp);
        isValid = isValid && isMatch;

        if (!isMatch && !!data[key]) {
          updatedState[key] = validationSchema[key].regErrorText;
        }
      }
    });

    setValidationErrors({ ...updatedState });

    return isValid;
  };

  return { validateOnBlur, validateOnSubmit };
};

export default useFormValidation;
