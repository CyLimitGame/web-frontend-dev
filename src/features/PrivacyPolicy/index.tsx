/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { BoxProps, Box, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import MainLayout from '@/layouts/MainLayout';
import { Container } from '@/components/Common';

const SpaceContent = (props: BoxProps) => <Box pl={10} {...props} />;

const PrivacyPolicy = () => {
  return (
    <MainLayout>
      <Container py={10}>
        <Wrapper>
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            PRIVACY POLICY
          </Text>
          <br />
          <p>
            At CYLIMIT, the protection of your personal data is a
            priority.&nbsp;
          </p>
          <br />
          <p>
            When you use the cylimit.com site (the "
            <span className="bold">Site</span>") and/or the CyLimit platform
            (the "<span className="bold">Platform</span>"), we may collect
            personal data about you.
          </p>
          <br />
          <p>
            The purpose of this policy is to inform you about how we process
            such data in compliance with Regulation (EU) 2016/679 of 27 April
            2016 on the protection of individuals with regard to the processing
            of personal data and on the free movement of such data (the "
            <span className="bold">GDPR</span>").
          </p>
          <br />
          <ul>
            <li>
              <p className="bold underline">Who is the data controller?</p>
            </li>
          </ul>
          <br />
          <p>
            The data controller is CYLIMIT, a simplified joint stock company,
            registered in the Paris Trade and Companies Register under number
            917 501 298 and whose registered office is located at 6 rue
            d'Armaillé - 75017, Paris ("We"),&nbsp;
          </p>
          <br />
          <ul>
            <li>
              <p className="bold underline">What data do we collect?&nbsp;</p>
            </li>
          </ul>
          <br />
          <p>
            Personal data is data that can be used to identify an individual
            directly or by cross-checking with other data.&nbsp;
          </p>
          <br />
          <p>We collect data in the following categories:</p>
          <br />
          <ul>
            <li>
              <p className="bold">
                Identification data&nbsp;(name, first name, email address);
              </p>
            </li>
            <br />
            <li>
              <p className="bold">Data related to your NFT purchase;</p>
            </li>
            <br />
            <li>
              <p>
                <span className="bold">Data related to your races</span>
                &nbsp;(date of birth, nationality, times, results and
                rankings);&nbsp;
              </p>
            </li>
            <br />
            <li>
              <p>
                <span className="bold">Connection data</span>&nbsp;(connection
                logs, encrypted passwords);
              </p>
            </li>
            <br />
            <li>
              <p>
                If you choose to sign in using a third-party authentication
                service (e.g., Google or Facebook), certain data such as your
                name and email may be collected from that service. By choosing
                this method, you agree that the service may share this
                information with us. We do not collect your third-party account
                password.
              </p>
            </li>
            <br />
            <li>
              <p>
                <span className="bold">Browsing data</span>&nbsp;(IP address,
                pages viewed, date and time of connection, browser used,
                operating system, user ID, IFA);&nbsp;
              </p>
            </li>
            <br />
            <li>
              <p>
                <span className="bold">Economic and financial data</span>
                ?&nbsp;(credit card data);
              </p>
            </li>
            <br />
            <li>
              <p className="bold">Your public wallet address;&nbsp;</p>
            </li>
            <br />
            <li>
              <p className="bold">
                Any information you wish to send us as part of your contact
                request.
              </p>
            </li>
            <br />
          </ul>
          <p>
            Mandatory data are indicated when you provide us with your
            data.&nbsp;
          </p>
          <p>
            <br />
          </p>
          <ul>
            <li>
              <p className="bold underline">
                On what legal grounds, for what purposes and for how long do we
                keep your personal data?
              </p>
            </li>
          </ul>
          <p>
            <br />
          </p>
          <div style={{ maxWidth: '100%', overflow: 'auto' }}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <p className="bold">Objectives</p>
                  </td>
                  <td>
                    <p className="bold">Legal basis</p>
                  </td>
                  <td>
                    <p className="bold">Shelf life</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      To allow you, via the creation of your account, to buy NFT
                      available on our Site via your Metamask account or our
                      electronic wallet, to play the fantasy game and to access
                      the secondary market of NFT resale
                    </p>
                  </td>
                  <td>
                    <p>Performance of the contract you have with Us</p>
                  </td>
                  <td>
                    <p>
                      When you have created an account: your data is kept for
                      the duration of your account.&nbsp;
                    </p>
                    <br />
                    <p>Your connection logs are kept for 6 months or 1 year.</p>
                    <br />
                    <p>
                      If your account is inactive for 2 years, your personal
                      data will be deleted if you do not respond to our
                      reactivation email.
                    </p>
                    <br />
                    <p>
                      In addition, your data may be archived for evidential
                      purposes for a period of 5 years.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      Carry out operations relating to the management of our
                      customers concerning contracts, orders, invoices, and
                      follow-up of the contractual relationship with our
                      customers
                    </p>
                  </td>
                  <td>
                    <p>
                      Performance of the contract you or your company have with
                      Us
                    </p>
                  </td>
                  <td>
                    <p>
                      Personal data is kept for the duration of the contractual
                      relationship.
                    </p>
                    <br />
                    <p>
                      In addition, your data (with the exception of your bank
                      details) are archived for evidentiary purposes for a
                      period of 5 years.
                    </p>
                    <br />
                    <p>
                      Your credit card information is stored by our payment
                      service provider.
                    </p>
                    <br />
                    <p>
                      The data relating to the visual cryptogram or CVV2,
                      written on your bank card, are not stored.
                    </p>
                    <br />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="underline">
                      Build a file of customers and prospects
                    </p>
                    <br />
                  </td>
                  <td>
                    <p>
                      Our legitimate interest in developing and promoting our
                      business
                    </p>
                  </td>
                  <td>
                    <p>
                      For customers: data is kept for the duration of the
                      contractual relationship.
                    </p>
                    <br />
                    <p>
                      For prospects: data is kept for a period of 3 years from
                      your last contact, for prospecting purposes.
                    </p>
                    <br />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="underline">
                      Send newsletters, solicitations and promotional messages
                    </p>
                  </td>
                  <td>
                    <p>
                      For customers: our legitimate interest in building
                      customer loyalty and keeping customers informed of our
                      latest news
                    </p>
                    <br />
                    <p>For prospects: your consent</p>
                  </td>
                  <td>
                    <p>
                      The data is kept for 3 years from your last contact with
                      Us or until you withdraw your consent.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <br />
                    <p className="underline">
                      Respond to your information requests
                    </p>
                    <br />
                  </td>
                  <td>
                    <br />
                    <p>
                      Our legitimate interest in responding to your requests
                    </p>
                  </td>
                  <td>
                    <p>
                      The data is kept for the time necessary to process your
                      request for information and deleted once the request for
                      information has been processed.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="underline">
                      Comply with the legal obligations applicable to our
                      activity
                    </p>
                  </td>
                  <td>
                    <p>Comply with our legal and regulatory obligations</p>
                  </td>
                  <td>
                    <p>
                      For invoices: invoices are archived for a period of 10
                      years.
                    </p>
                    <p className="underline">
                      The data related to your transactions (except for bank
                      data) are kept for 5 years.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="underline">
                      Organize contests and promotional operations
                    </p>
                  </td>
                  <td>
                    <p>
                      Our legitimate interest in retaining our customers and
                      offering them gifts
                    </p>
                  </td>
                  <td>
                    <p className="underline">
                      The data is kept for the duration of the games or
                      promotional operations and may be archived for 5 years for
                      evidential purposes.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="underline">
                      To elaborate statistics for the purpose of measuring the
                      audience of the site
                    </p>
                  </td>
                  <td>
                    <br />
                    <p>
                      Our legitimate interest in analyzing the composition of
                      our customer base and improving our services
                    </p>
                  </td>
                  <td>
                    <p>The data is kept for 12 months</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="underline">
                      Delivering personalized advertising
                    </p>
                  </td>
                  <td>
                    <p>Your consent</p>
                  </td>
                  <td>
                    <p className="underline">The data is kept for 12 months.</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="underline">
                      Manage requests to exercise rights
                    </p>
                  </td>
                  <td>
                    <p className="underline">
                      Our legitimate interest in responding to your requests and
                      keeping track of them
                    </p>
                  </td>
                  <td>
                    <p>
                      If we ask you for proof of identity, we will only keep it
                      for as long as it takes to verify your identity. Once the
                      verification is complete, the proof of identity is
                      deleted.
                    </p>
                    <br />
                    <p>
                      If you exercise your right to opt-out of receiving
                      marketing communications: we keep this information for 3
                      years.
                    </p>
                    <br />
                    <br />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <br />
          </p>
          <ul>
            <li>
              <p className="bold">Who are the recipients of your data?&nbsp;</p>
            </li>
          </ul>
          <p>Will have access to your personal data:</p>
          <p>
            <br />
          </p>
          <SpaceContent>
            <ul>
              <li>
                <p>The staff of our company ;</p>
              </li>
              <li>
                <p>
                  Our subcontractors: hosting service provider, newsletter
                  sending service provider, audience measurement and analysis
                  service provider, e-mail service provider, secure payment
                  service provider, online form creation tool, accounting
                  service provider;&nbsp;
                </p>
              </li>
              <li>
                <p>
                  If applicable: public and private organizations, exclusively
                  to meet our legal obligations.
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
                Will your data be transferred outside the European Union?&nbsp;
              </p>
            </li>
          </ul>
          <br />
          <p>
            Your data is kept and stored for the duration of the processing on
            the servers of Amazon Web Services (AWS), located in the European
            Union.
          </p>
          <p>
            Within the framework of the tools we use (see article on the
            recipients concerning our subcontractors), your data may be
            transferred outside the European Union. The transfer of your data in
            this context is secured by means of the following tools:
          </p>
          <p>
            <br />
          </p>
          <SpaceContent>
            <ul>
              <li>
                <p>
                  or the data is transferred to a country that has been the
                  subject of an adequacy decision by the European Commission, in
                  accordance with Article 45 of the GDPR: in this case, this
                  country provides a level of protection deemed sufficient and
                  adequate to the provisions of the GDPR;
                </p>
              </li>
            </ul>
            <p>
              <br />
            </p>
            <ul>
              <li>
                <p>
                  or the data is transferred to a country whose level of data
                  protection has not been recognized as adequate for the RGPD:
                  in this case these transfers are based on appropriate
                  safeguards indicated in Article 46 of the RGPD, adapted to
                  each provider, including but not limited to the conclusion of
                  standard contractual clauses approved by the European
                  Commission, the application of binding corporate rules or
                  under an approved certification mechanism.
                </p>
              </li>
            </ul>
          </SpaceContent>
          <p>
            <br />
          </p>
          <ul>
            <li>
              <p>
                or the data is transferred on the basis of one of the
                appropriate safeguards described in Chapter V of the GDPR.
              </p>
            </li>
            <br />
            <li>
              <p className="bold underline">
                What are your rights to your data?
              </p>
            </li>
            <br />
          </ul>
          <p>
            You have the following rights with respect to your personal data:
          </p>
          <SpaceContent>
            <p>
              <br />
            </p>
            <ul>
              <li>
                <p>
                  <span className="bold">Right to information:</span> this is
                  precisely the reason why we have drafted this policy. This
                  right is provided for in articles 13 and 14 of the RGPD.&nbsp;
                </p>
              </li>
            </ul>
            <p>
              <br />
            </p>
            <ul>
              <li>
                <p>
                  <span className="bold">Right of access:</span> you have the
                  right to access all: ; your personal data at any time, in
                  accordance with Article 15 of the GDPR.
                </p>
              </li>
            </ul>
            <p>
              <br />
            </p>
            <ul>
              <li>
                <p>
                  <span className="bold">Right of rectification:</span> you have
                  the right to rectify your inaccurate, incomplete or outdated
                  personal data at any time in accordance with Article 16 of the
                  GDPR
                </p>
              </li>
            </ul>
            <p>
              <br />
            </p>
            <ul>
              <li>
                <p>
                  <span className="bold">Right to limitation:</span> you have
                  the right to obtain the limitation of the processing of your
                  personal data in certain cases defined in Article 18 of the
                  GDPR.
                </p>
              </li>
            </ul>
            <p>
              <br />
            </p>
            <ul>
              <li>
                <p>
                  <span className="bold">Right to erasure:</span> you have the
                  right to request that your personal data be erased, and to
                  prohibit future collection of your personal data on the
                  grounds set out in Article 17 of the GDPR.
                </p>
              </li>
            </ul>
            <p>
              <br />
            </p>
            <ul>
              <li>
                <p>
                  <span className="bold">
                    Right to lodge a complaint with a competent supervisory
                    authority
                  </span>
                  &nbsp;(in France, the CNIL), if you consider that the
                  processing of your personal data constitutes a violation of
                  the applicable texts, in accordance with Article 77 of the
                  GDPR.
                </p>
              </li>
            </ul>
            <p>
              <br />
            </p>
            <ul>
              <li>
                <p className="bold">
                  The right to set up instructions for the retention, deletion
                  and disclosure of your personal data after your death.&nbsp;
                </p>
              </li>
            </ul>
            <p>
              <br />
            </p>
            <ul>
              <li>
                <p>
                  <span className="bold">
                    Right to withdraw your consent at any time:
                  </span>{' '}
                  for purposes based on consent, Article 7 of the GDPR states
                  that you may withdraw your consent at any time. Such
                  withdrawal will not affect the lawfulness of the processing
                  carried out before the withdrawal.
                </p>
              </li>
            </ul>
            <p>
              <br />
            </p>
            <ul>
              <li>
                <p>
                  <span className="bold">Right to portability:</span> under
                  certain conditions specified in Article 20 of the GDPR, you
                  have the right to receive the personal data you have provided
                  to us in a standard machine-readable format and to request its
                  transfer to the recipient of your choice.
                </p>
              </li>
            </ul>
            <p>
              <br />
            </p>
            <ul>
              <li>
                <p>
                  <span className="bold">Right to object:</span> under Article
                  21 of the GDPR, you have the right to object to the processing
                  of your personal data. Note, however, that we may continue to
                  process them despite this objection, for legitimate reasons or
                  the defense of legal rights.
                </p>
              </li>
            </ul>
            <p>
              <br />
            </p>
            <p>
              You can exercise these rights by writing to us at the address
              below. We may ask you to provide additional information or
              documents to prove your identity.&nbsp;
            </p>
          </SpaceContent>
          <p>
            <br />
          </p>
          <br />
          <ul>
            <li>
              <p className="bold underline">What cookies do we use?</p>
            </li>
          </ul>
          <p>
            <br />
          </p>
          <p>
            To learn more about cookie management, please see our Cookie Policy.
          </p>
          <br />
          <ul>
            <li>
              <p className="bold underline">
                &nbsp;Contact point to exercise your rights&nbsp;
              </p>
            </li>
          </ul>
          <br />
          <p>Contact email : contact@cylimit.com</p>
          <p>Contact address: 6 rue d'Armaillé - 75017, Paris</p>
          <br />
          <ul>
            <li>
              <p className="bold underline">Changes</p>
            </li>
          </ul>
          <br />
          <p>
            We may amend this policy at any time, in particular to comply with
            any regulatory, legal, editorial or technical developments. These
            changes will apply as of the effective date of the modified version.
            You are therefore invited to regularly consult the latest version of
            this policy. Nevertheless, we will keep you informed of any
            significant changes to this Privacy Policy.
          </p>
          <p>Effective date: 02/12/2022</p>
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

export default PrivacyPolicy;
