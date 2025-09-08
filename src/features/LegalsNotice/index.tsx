/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { TextProps } from '@chakra-ui/react';

import MainLayout from '@/layouts/MainLayout';
import { Container, Text } from '@/components/Common';

const MainTitle = (props: TextProps) => (
  <Text fontWeight="bold" fontSize="lg" textAlign="center" mt={5} {...props} />
);
const TextNomal = (props: TextProps) => <Text {...props} />;

const Help = () => {
  return (
    <MainLayout>
      <Container pb={20} textAlign="center">
        <MainTitle>Editeur du Site </MainTitle>
        <TextNomal>CYLIMIT.COM </TextNomal>
        <TextNomal>N° SIRET : 91750129800017</TextNomal>
        <TextNomal>6 RUE D ARMAILLE 75017 PARIS</TextNomal>
        <TextNomal>
          Activité (Code NAF ou APE) : Portails internet (6312Z) Portails
          internet (6312Z)
        </TextNomal>
        <TextNomal>Email : contact@cylimit.com</TextNomal>
        <MainTitle>Hébergement</MainTitle>
        <TextNomal>
          Nos Sites et Applications sont hébergés sur les serveurs localisés en
          Europe de
        </TextNomal>
        <TextNomal>
          Amazon Web Services Inc, PO Box 81226, Seattle, WA 981808-1226 – USA.
        </TextNomal>
        <TextNomal color="link" textDecoration="underline">
          <a href="https://aws.amazon.com/fr/compliance/eu-data-protection/.">
            https://aws.amazon.com/fr/compliance/eu-data-protection/.
          </a>
        </TextNomal>
      </Container>
    </MainLayout>
  );
};

export default Help;
