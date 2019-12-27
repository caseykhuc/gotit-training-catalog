export const errorMessage = {
  username: {
    TOO_SHORT: 'Name length must be at least 5 characters.',
  },
  name: {
    TOO_SHORT: 'Name length must be at least 5 characters.',
  },
  email: {
    INVALID: 'Not valid email',
  },
  password: {
    NOT_MATCH: 'Password and confirm password do not match',
    TOO_SHORT: 'Password must be longer than 8 characters.',
    TOO_SIMPLE: 'Password has to have the length of more than 8 characters, at least one letter and one number.',
  },
  price: {
    IS_NOT_NUMERIC: 'Price is not a valid number',
  },
  category: {
    IS_NOT_DEFINED: 'Category is not defined',
  },
}

export const MIN_NAME_LENGTH = 5;

export const MIN_PASSWORD_LENGTH = 8;
