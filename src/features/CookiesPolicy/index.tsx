/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { BoxProps, Box, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import MainLayout from '@/layouts/MainLayout';
import { Container } from '@/components/Common';

const SpaceContent = (props: BoxProps) => <Box pl={10} {...props} />;

const TermsOfService = () => {
  return (
    <MainLayout>
      <Container py={10}>
        <Wrapper>
          <Text fontSize="xl" textAlign="center" fontWeight="bold">
            Cookie Policy
          </Text>
          <p>
            <br />
          </p>
          <ul>
            <li>
              <p className="bold underline">What is a Cookie?</p>
            </li>
          </ul>
          <p>
            <br />
          </p>
          <p>
            When you use the cylimit.com site (the "Site") and/or the CyLimit
            platform (the "Platform"), cookies, pixels and other tracers
            (hereinafter referred to together as the "Cookie" or "Cookies") are
            deposited on your browser or on your terminal.
          </p>
          <p>
            <br />
          </p>
          <p>
            A cookie is a small file, often encrypted, stored in your browser or
            your terminal and identified by a name. It is deposited when you
            visit a site or an application. Each time you return to the site or
            application in question, the cookie is retrieved from your browser
            or terminal. Thus, each time you visit the site or application, the
            browser is recognized.
          </p>
          <p>
            <br />
          </p>
          <p>
            The deposit of these cookies may allow us to access your browsing
            data and personal data about you.
          </p>
          <p>
            <br />
          </p>
          <ul>
            <li>
              <p className="bold underline">Identification of Cookies</p>
            </li>
          </ul>
          <p>
            <br />
          </p>
          <ul>
            <li>
              <p style={{ fontWeight: 'bold' }}>
                Technical and functional cookies
              </p>
            </li>
          </ul>
          <p>
            <br />
          </p>
          <p>
            Technical and functional cookies are necessary for the proper
            functioning of the Site and the Platform and to provide you with our
            services. They are used throughout your browsing experience to
            facilitate and perform certain functions.
          </p>
          <p>
            <br />
          </p>
          <p>
            A technical Cookie can be used, for example, to remember your
            answers in a form or your preferences regarding the language or the
            presentation of the Site and the Platform, when such options are
            available.
          </p>
          <p>
            <br />
          </p>
          <p>We use the following technical and functional cookies:&nbsp;</p>
          <p>
            <br />
          </p>
          <div style={{ maxWidth: '100%', overflow: 'auto' }}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <p className="bold">Cookie name</p>
                  </td>
                  <td>
                    <p className="bold">Cookie function</p>
                  </td>
                  <td>
                    <p className="bold">Shelf life</p>
                  </td>
                  <td>
                    <p className="bold">Links to the Cookie Policy</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Session</p>
                  </td>
                  <td>
                    <p>User management</p>
                  </td>
                  <td>
                    <p>90 days</p>
                  </td>
                  <td>
                    <p>
                      <a href="https://cylimit.com/cookies_policy">
                        https://cylimit.com/cookies_policy
                      </a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Stripe</p>
                  </td>
                  <td>
                    <p>Payment process</p>
                  </td>
                  <td>
                    <p>90 days</p>
                  </td>
                  <td>
                    <p>
                      <a href="https://stripe.com/fr-us/cookie-settings">
                        https://stripe.com/fr-us/cookie-settings
                      </a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Ramp</p>
                  </td>
                  <td>
                    <p>Payment process</p>
                  </td>
                  <td>
                    <p>90 days</p>
                  </td>
                  <td>
                    <p>
                      <a href="https://ramp.com/legal/privacy-policy">
                        https://ramp.com/legal/privacy-policy
                      </a>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <br />
          </p>
          <p>
            <br />
          </p>
          <ul>
            <li>
              <p className="bold">Social network cookies</p>
            </li>
          </ul>
          <p>
            <br />
          </p>
          <p>
            Social network cookies allow you to share content from our Site and
            Platform on social networks and to share your opinion or
            consultation of our services on these networks by clicking on the
            "like"&nbsp;and "share" links.&nbsp;
          </p>
          <p>
            These Cookies may also allow tracking of users' navigation on the
            Site and the Platform.
          </p>
          <p>
            <br />
          </p>
          <p>
            We invite you to consult the privacy protection policies of the
            social networks that generate these Cookies, to learn about the
            purposes for which they may use the browsing information they
            collect thanks to these Cookies and how to exercise your rights with
            these social networks.
          </p>
          <p>
            <br />
          </p>
          <p>We use the following social network cookies:&nbsp;</p>
          <p>
            <br />
          </p>
          <div style={{ maxWidth: '100%', overflow: 'auto' }}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <p className="bold">Cookie name</p>
                  </td>
                  <td>
                    <p className="bold">Cookie function</p>
                  </td>
                  <td>
                    <p className="bold">Shelf life</p>
                  </td>
                  <td>
                    <p className="bold">Links to the Cookie Policy</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Facebook</p>
                  </td>
                  <td>
                    <p>User login</p>
                  </td>
                  <td>
                    <p>90 days</p>
                  </td>
                  <td>
                    <p>
                      <a href="https://www.facebook.com/policy/cookies/">
                        https://www.facebook.com/policy/cookies/
                      </a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Gmail</p>
                  </td>
                  <td>
                    <p>User login</p>
                  </td>
                  <td>
                    <p>90 days</p>
                  </td>
                  <td style={{ maxWidth: '400px' }}>
                    <p>
                      <a href="https://policies.google.com/technologies/cookies?hl=en-US#:~:text=Google%20uses%20the%20'CONSENT'%20cookie,state%20regarding%20their%20cookies%20choices">
                        https://policies.google.com/technologies/cookies?hl=en-US#:~:text=Google%20uses%20the%20'CONSENT'%20cookie,state%20regarding%20their%20cookies%20choices
                      </a>
                      .
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <br />
          </p>
          <p>
            <br />
          </p>
          <ul>
            <li>
              <p className="bold underline">Your cookie preferences</p>
            </li>
          </ul>
          <p>
            <br />
          </p>
          <ul>
            <li>
              <p className="bold">
                Cookies that can be deposited without consent
              </p>
            </li>
          </ul>
          <p>
            <br />
          </p>
          <p>Some cookies do not require your consent, such as</p>
          <SpaceContent>
            <ul>
              <li>
                <p>
                  Technical and functional cookies that are necessary for the
                  functioning of the Site and the Platform;
                </p>
              </li>
              <li>
                <p>
                  Certain audience measurement Cookies or Cookies that allow to
                  test different versions of the Site and the Platform for the
                  purpose of optimizing editorial choices.
                </p>
              </li>
            </ul>
          </SpaceContent>
          <p>
            <br />
          </p>
          <ul>
            <li>
              <p className="bold">
                Acceptance or refusal of Cookies subject to your express consent
              </p>
            </li>
          </ul>
          <p>
            <br />
          </p>
          <p>
            All other Cookies require your consent. These are advertising
            cookies, social networking cookies, and certain audience measurement
            cookies. You can freely choose to accept or refuse the use of these
            cookies.
          </p>
          <p>
            <br />
          </p>
          <p>
            You can accept or refuse these Cookies when you first browse the
            Site or when you first consult the Platform.&nbsp;
          </p>
          <p>
            <br />
          </p>
          <p>
            Your choices to accept or decline Cookies will be retained for a
            period of six (6) months.
          </p>
          <p>
            <br />
          </p>
          <p>
            You are free to withdraw your consent and more generally to change
            your preferences at any time, via the following link.
          </p>
          <p>
            <br />
          </p>
          <ul>
            <li>
              <p className="bold">Setting up your browser</p>
            </li>
          </ul>
          <p>
            <br />
          </p>
          <p>
            It is also possible to set your browser to accept or reject certain
            cookies.&nbsp;
          </p>
          <p>
            <br />
          </p>
          <p>Each browser offers different configuration methods. &nbsp;</p>
        </Wrapper>
      </Container>
    </MainLayout>
  );
};

const Wrapper = styled('div')`
  .bold {
    font-weight: bold;
  }

  table {
    border: 1px solid black;

    tr,
    td {
      border: 1px solid black;
    }

    td {
      padding: 10px;
    }
  }

  a {
    color: blue;
    text-decoration: underline;
  }

  .underline {
    text-decoration: underline;
  }
`;

export default TermsOfService;
