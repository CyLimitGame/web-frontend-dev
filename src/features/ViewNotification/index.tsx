import dynamic from 'next/dynamic';
import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import '@uiw/react-markdown-preview/dist/markdown.css';

import { MainLayout } from '@/layouts';
import { useGetNotificationtDetails } from '@/queries/useNotification';
import { Container, Loader } from '@/components/Common';
import fonts from '@/theme/foundations/fonts';

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
});

function HomePage() {
  const { query } = useRouter();
  const id = _.get(query, 'id', '');

  const { data, isLoading } = useGetNotificationtDetails(id as string);

  return (
    <MainLayout>
      <Container py={5}>
        {isLoading && (
          <Flex justifyContent="center">
            <Loader />
          </Flex>
        )}
        <Box data-color-mode="light">
          <MarkdownPreview
            style={{ fontFamily: fonts.body }}
            source={_.get(data, 'description')}
            components={{
              img: ({ ...props }) => {
                const hasMp4Extension = _.endsWith(props.src, '.mp4');
                if (hasMp4Extension) {
                  return <video src={props.src} muted={false} controls />;
                }
                return <img src={props.src} />;
              },
            }}
          />
        </Box>
      </Container>
    </MainLayout>
  );
}

export default HomePage;
