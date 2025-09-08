import React, { useState } from 'react';
import { Box, Flex, IconButton, ModalProps, Progress } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useDropzone } from 'react-dropzone';
import { RiDeleteBinLine } from 'react-icons/ri';

import { Text } from '@/components/Common';
import { UploadIcon } from '@/icons';
import { BaseModal } from '@/components/Modal';
import { BaseButton } from '@/components/Button';
import { useUpdateCover } from '@/queries/useUser';
import { getBase64 } from '@/utils/common';
import { useToastMessage } from '@/hooks/useToastMessage';

type Props = Omit<ModalProps, 'children'> & {
  accept?: string[];
};

const UploadBackgroundProfileModal = ({
  accept = ['image/png', 'image/jpg', 'image/jpeg'],
  ...props
}: Props) => {
  const { onClose } = props;
  const { t } = useTranslation();
  const toast = useToastMessage();

  const handleUploadProgress = (value: number) => {
    setProgress(value);
  };
  const { mutateAsync, isLoading } = useUpdateCover(handleUploadProgress);

  const [progress, setProgress] = useState(0);
  const [imgView, setImgView] = useState('');
  const [image, setImage] = useState<File>();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      const limit = 1048576 * 5;
      if (files[0].size > limit) {
        return toast({
          title: t('error'),
          description: t('message:the_size_limit_for_images_and_documents', {
            size: '5.0 MB',
          }),
          status: 'error',
        });
      }

      if (accept.includes(files[0].type)) {
        getBase64(files[0], setImgView);
        setImage(files[0]);
      }
    },
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    disabled: isLoading,
  });

  const handleRemoveImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setImgView('');
  };

  const handleSubmitFile = async () => {
    image && (await mutateAsync(image));
    onClose();
  };

  const handleCloseModal = () => {
    setImgView('');
    setImage(undefined);
    setProgress(0);
  };

  return (
    <BaseModal
      title="upload_image_cover"
      size="2xl"
      onCloseComplete={handleCloseModal}
      isUseDrawerForMobile
      closeable
      {...props}
    >
      <Box
        {...getRootProps()}
        borderRadius="md"
        bg="gray.100"
        cursor="pointer"
        height="125px"
        backgroundImage={imgView && !isLoading ? `url("${imgView}")` : 'none'}
        backgroundSize="cover"
        outline="2px dashed"
        outlineColor="gray.300"
        outlineOffset="0"
        position="relative"
      >
        {isLoading ? (
          <Flex
            maxWidth="70%"
            margin="auto"
            textAlign="center"
            flexDirection="column"
            justifyContent="center"
            height="100%"
          >
            <Text fontWeight="bold">
              {t('uploading_total', { total: progress })}
            </Text>
            <Progress
              value={progress}
              my={2}
              colorScheme="primary"
              borderRadius="md"
              bg="primary.100"
            />
            <Text
              color="gray.400"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              {image?.name}
            </Text>
          </Flex>
        ) : (
          <React.Fragment>
            {imgView && (
              <IconButton
                aria-label="delete"
                position="absolute"
                top="6px"
                right="6px"
                bg="white"
                isRound
                size="sm"
                onClick={handleRemoveImage}
              >
                <RiDeleteBinLine />
              </IconButton>
            )}
            {imgView ? null : (
              <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
              >
                <input {...getInputProps()} />
                <Box textAlign="center">
                  <UploadIcon width="50px" height="50px" />
                </Box>
                <Flex>
                  <Text mr={2}>{t('drop_your_file_here')}</Text>
                  <Text fontWeight="bold" color="primary.500">
                    {t('browse')}
                  </Text>
                </Flex>
              </Flex>
            )}
          </React.Fragment>
        )}
      </Box>
      <Flex justifyContent="center" mt={6}>
        <BaseButton
          colorScheme="primary"
          onClick={handleSubmitFile}
          width="220px"
          isLoading={isLoading}
        >
          {t('save')}
        </BaseButton>
      </Flex>
    </BaseModal>
  );
};

export default UploadBackgroundProfileModal;
