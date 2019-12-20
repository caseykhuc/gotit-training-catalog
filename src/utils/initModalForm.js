import validator from 'validator';
import * as errorMessage from './inputError';

export const registerModal = {
  initialState: {
    inputValue: {
      username: '',
      email: '',
      name: '',
      password: '',
      confirm: '',
    },
    inputError: {
    },
    requestError: '',
  },

  fields: [
    { name: 'username', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'name', type: 'text' },
    { name: 'password', type: 'password' },
    { name: 'confirm', type: 'password' },
  ],

  validate: ({
    username, email, password, confirm,
  }) => {
    const inputError = {};
    if (username && username.length < 5) inputError.username = errorMessage.username.tooShort;
    if (email && !validator.isEmail(email)) inputError.email = errorMessage.email.invalid;
    if (password && (password.length < 8
      || !validator.isAlphanumeric(password)
      || validator.isAlpha(password)
      || validator.isNumeric(password))) {
      inputError.password = errorMessage.password.tooSimple;
    }
    if (confirm && confirm !== password) {
      inputError.confirm = errorMessage.password.notMatch;
    }
    return inputError;
  },
}

export const signinModal = {
  initialState: {
    inputValue: {
      username: '',
      password: '',
    },
    inputError: {
    },
    requestError: '',
  },

  fields: [{ name: 'username', type: 'text' }, {
    name: 'password', type: 'password',
  }],
}

export const addItemModal = () => ({
  initialState: {
    inputValue: {
      name: '',
      description: '',
      price: '',
      category_id: '',
    },
    inputError: {
    },
    requestError: '',
  },

  fields: [
    { name: 'name', type: 'text' },
    { name: 'description', type: 'text' },
    { name: 'price', type: 'text' },
    { name: 'category_id', type: 'select' },
  ],
})
