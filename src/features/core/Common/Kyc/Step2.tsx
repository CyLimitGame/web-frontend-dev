import React, { useState } from 'react';
import { Box, Center, Flex, Icon, Image } from '@chakra-ui/react';
import { BsPersonVcard } from 'react-icons/bs';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'next-i18next';
import { FaRegFilePdf } from 'react-icons/fa';
import _ from 'lodash';

import { Text } from '@/components/Common';
import { BaseButton } from '@/components/Button';
import { useToastMessage } from '@/hooks/useToastMessage';
import { getBase64 } from '@/utils/common';
import { useKycAutoVerify, useKycDocument } from '@/queries/useUser';

type Props = {
  onBack: () => void;
  onSuccess: () => void;
};

const Step2 = ({ onBack, onSuccess }: Props) => {
  const { t } = useTranslation();
  const [imgView, setImgView] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File>();
  const toast = useToastMessage();

  const accept = ['image/png', 'image/jpg', 'image/jpeg'];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      const limit = 1048576 * 10;
      if (files[0].size > limit) {
        return toast({
          title: t('error'),
          description: t('message:the_size_limit_for_images_and_documents', {
            size: '10 MB',
          }),
          status: 'error',
        });
      }

      if (accept.includes(files[0].type)) {
        getBase64(files[0], setImgView);
      }
      setFile(files[0]);
      setMessage('');
    },
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    },
    disabled: false,
  });

  const { mutateAsync: kycDocument, isLoading: isLoadingDocument } =
    useKycDocument();
  const { mutateAsync: kycAutoVerify, isLoading: isLoadingAutoVerify } =
    useKycAutoVerify();

  const handleSubmit = async () => {
    await kycDocument({ file: file as File });
    kycAutoVerify()
      .then(() => {
        setMessage('');
        onSuccess();
      })
      .catch((error: any) => {
        const message = _.get(error, 'response.data.message');
        setMessage(message);
      });
  };

  const renderFileView = () => {
    if (file?.type === 'application/pdf') {
      return <Icon as={FaRegFilePdf} fontSize="160px" />;
    }
    return <Image src={imgView} objectFit="cover" w="100%" h="100%" />;
  };

  return (
    <Box>
      <Text fontWeight="bold" translateText="upload_an_image_of_your_id" />
      <Text fontSize="xs" mt={4} translateText="make_sure_your_photos" />
      <Center
        {...getRootProps()}
        border="1px dashed white"
        textTransform="initial"
        flexDirection="column"
        borderRadius="md"
        mt={4}
        h="200px"
        userSelect="none"
        cursor="pointer"
        _hover={{ bg: 'input' }}
        transition="background .2s"
        overflow="hidden"
      >
        <input {...getInputProps()} />
        {file ? (
          <>{renderFileView()}</>
        ) : (
          <>
            <Icon as={BsPersonVcard} fontSize="2xl" />
            <Text fontWeight="bold" my={2} translateText="upload_your_id" />
            <Text fontSize="sm" translateText="file_types_only" />
            <Text fontSize="xs" translateText="max_file_10_mb" />
          </>
        )}
      </Center>
      {message && (
        <Box mt={2}>
          <Text fontSize="sm" textTransform="initial" color="error.500">
            {t(`message:${message}`)}
          </Text>
          <Text fontSize="sm" textTransform="initial" color="error.500">
            {t(`message:${message}_details`)}
          </Text>
        </Box>
      )}
      <Flex justifyContent="space-between" mt={4}>
        <BaseButton onClick={onBack}>{t('back')}</BaseButton>
        <BaseButton
          variant="light"
          onClick={handleSubmit}
          isLoading={isLoadingDocument || isLoadingAutoVerify}
          isDisabled={!file}
        >
          {t('submit_id')}
        </BaseButton>
      </Flex>
    </Box>
  );
};

export default Step2;
