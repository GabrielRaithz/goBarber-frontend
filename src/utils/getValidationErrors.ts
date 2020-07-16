import { ValidationError } from 'yup'

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validaionErros: Errors = {};

  err.inner.forEach(error => {
    validaionErros[error.path] = error.message;
  })

  return validaionErros;
}
