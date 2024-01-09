import { Errors } from '../domain/auth/interfaces/error-messages';

const lengthErrors = {
  message: '{errorName} Length: {currentLength}/{validLength}',
  updateConstantly: true,
};
const propsToTransform = {
  currentLength: 'actualLength',
  validLength: 'requiredLength',
};

export const ERROR_MESSAGES: Errors = {
  minlength: {
    ...lengthErrors,
    propertiesToTransform: {
      ...propsToTransform,
      errorName: 'Min',
    },
  },
  maxlength: {
    ...lengthErrors,
    propertiesToTransform: {
      ...propsToTransform,
      errorName: 'Max',
    },
  },
  email: {
    message: 'Email inválido',
    updateConstantly: false,
  },
  invalidConfirmPassword: {
    message: 'As senhas devem ser iguais',
    updateConstantly: false,
  },
};
