import { validateName, validateEmail, validatePassword } from "../components/nav/sign-up/validators";


export function displayReducer(resultDisplayStyle, action) {
  switch(action.type) {
    case 'none': 
      return {displayProp: 'none'};
    case 'block':
      return {displayProp: 'block'};
    default:
      return {displayProp: action.type};
  }
}


export function resultAttributeReducer(resultAttributes, action) {
  switch(action.increment) {
    case 'wpm':
      return {...resultAttributes, wpm: resultAttributes.wpm + 1,};
    case 'acc':
      return { ...resultAttributes, acc: resultAttributes.acc + 1};
    default:
      return {wpm: 0, acc: 0};
  }
}

export function validatorReducer(validator, action) {
  switch(action.type) {
    case 'Username':
      return {...validator, username: validateName(action.value)};
    case 'Email': 
      return {...validator, email: validateEmail(action.value)};
    case 'Password': 
      return {...validator, password: validatePassword(action.value)};
    default:
      return validator;
  }
}

