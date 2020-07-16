import { ValidationError } from 'yup';

interface CustomValidationError {
    [key: string]: string;
}

export default class Helpers {
    public static getValidationErrors(err: ValidationError): CustomValidationError {
        const validationErrors: CustomValidationError = {};

        err.inner.forEach(error => {
            validationErrors[error.path] = error.message;
        });

        return validationErrors;
    }
}