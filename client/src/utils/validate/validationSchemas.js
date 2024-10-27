import * as yup from 'yup';
import CONSTANTS from '../../constants';

const { GENDERS } = CONSTANTS;

// TODO password regexp

export const USER_VALIDATION_SCHEMA = yup.object({
  nickname: yup.string().min(3).max(50).required(),
  email: yup.string().email().required(),
  passwHash: yup.string().required(),
  birthday: yup.date().max(new Date()),
  gender: yup.string().oneOf(GENDERS),
  userPhoto: yup.mixed(),
});
