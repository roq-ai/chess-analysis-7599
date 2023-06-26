import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createAnalysis } from 'apiSdk/analyses';
import { Error } from 'components/error';
import { analysisValidationSchema } from 'validationSchema/analyses';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ChessPositionInterface } from 'interfaces/chess-position';
import { getChessPositions } from 'apiSdk/chess-positions';
import { AnalysisInterface } from 'interfaces/analysis';

function AnalysisCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AnalysisInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAnalysis(values);
      resetForm();
      router.push('/analyses');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AnalysisInterface>({
    initialValues: {
      analysis_data: '',
      chess_position_id: (router.query.chess_position_id as string) ?? null,
    },
    validationSchema: analysisValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Analysis
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="analysis_data" mb="4" isInvalid={!!formik.errors?.analysis_data}>
            <FormLabel>Analysis Data</FormLabel>
            <Input
              type="text"
              name="analysis_data"
              value={formik.values?.analysis_data}
              onChange={formik.handleChange}
            />
            {formik.errors.analysis_data && <FormErrorMessage>{formik.errors?.analysis_data}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<ChessPositionInterface>
            formik={formik}
            name={'chess_position_id'}
            label={'Select Chess Position'}
            placeholder={'Select Chess Position'}
            fetcher={getChessPositions}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.position_data}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'analysis',
  operation: AccessOperationEnum.CREATE,
})(AnalysisCreatePage);
