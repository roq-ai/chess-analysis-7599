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
import { createChessPosition } from 'apiSdk/chess-positions';
import { Error } from 'components/error';
import { chessPositionValidationSchema } from 'validationSchema/chess-positions';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { AccountInterface } from 'interfaces/account';
import { getAccounts } from 'apiSdk/accounts';
import { ChessPositionInterface } from 'interfaces/chess-position';

function ChessPositionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ChessPositionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createChessPosition(values);
      resetForm();
      router.push('/chess-positions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ChessPositionInterface>({
    initialValues: {
      position_data: '',
      account_id: (router.query.account_id as string) ?? null,
    },
    validationSchema: chessPositionValidationSchema,
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
            Create Chess Position
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="position_data" mb="4" isInvalid={!!formik.errors?.position_data}>
            <FormLabel>Position Data</FormLabel>
            <Input
              type="text"
              name="position_data"
              value={formik.values?.position_data}
              onChange={formik.handleChange}
            />
            {formik.errors.position_data && <FormErrorMessage>{formik.errors?.position_data}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<AccountInterface>
            formik={formik}
            name={'account_id'}
            label={'Select Account'}
            placeholder={'Select Account'}
            fetcher={getAccounts}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
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
  entity: 'chess_position',
  operation: AccessOperationEnum.CREATE,
})(ChessPositionCreatePage);
