import * as yup from 'yup';

export const chessPositionValidationSchema = yup.object().shape({
  position_data: yup.string().required(),
  account_id: yup.string().nullable(),
});
