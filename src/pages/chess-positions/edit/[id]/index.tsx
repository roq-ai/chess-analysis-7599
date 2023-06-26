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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getChessPositionById, updateChessPositionById } from 'apiSdk/chess-positions';
import { Error } from 'components/error';
import { chessPositionValidationSchema } from 'validationSchema/chess-positions';
import { ChessPositionInterface } from 'interfaces/chess-position';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { AccountInterface } from 'interfaces/account';
import { getAccounts } from 'apiSdk/accounts';

function ChessPositionEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ChessPositionInterface>(
    () => (id ? `/chess-positions/${id}` : null),
    () => getChessPositionById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ChessPositionInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateChessPositionById(id, values);
      mutate(updated);
      resetForm();
      router.push('/chess-positions');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ChessPositionInterface>({
    initialValues: data,
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
            Edit Chess Position
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'chess_position',
  operation: AccessOperationEnum.UPDATE,
})(ChessPositionEditPage);
