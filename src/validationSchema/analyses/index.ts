import * as yup from 'yup';

export const analysisValidationSchema = yup.object().shape({
  analysis_data: yup.string().required(),
  chess_position_id: yup.string().nullable(),
});
