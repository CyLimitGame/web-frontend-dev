/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Box, BoxProps, TextProps } from '@chakra-ui/react';

import MainLayout from '@/layouts/MainLayout';
import { Container, Text } from '@/components/Common';

const MainTitle = (props: TextProps) => (
  <Text fontWeight="bold" fontSize="lg" textAlign="center" mt={10} {...props} />
);
const Title = (props: TextProps) => (
  <Text color="link" mt={4} mb={2} {...props} />
);
const Bold = (props: TextProps) => <Text fontWeight="bold" mt={2} {...props} />;
const TextNomal = (props: TextProps) => <Text {...props} />;
const BaseContent = (props: BoxProps) => <Box pl={4} {...props} />;

const Help = () => {
  return (
    <MainLayout>
      <Container pb={20}>
        <MainTitle>SECTION 1 : CyLimit</MainTitle>
        <Title>What is CyLimit ?</Title>
        <TextNomal>
          CyLimit is the first seller of officially licensed digital cycling
          cards hosted as NFTs on the blockchain.
        </TextNomal>
        <BaseContent>
          <TextNomal>- Collect digital cards</TextNomal>
          <TextNomal>- Buy, sell, trade, and collect your cards</TextNomal>
        </BaseContent>
        <TextNomal>
          More of that, CyLimit offers to owners of CyLimit cards different
          experiences. The first of them will be a fantasy cycling game :
        </TextNomal>
        <BaseContent>
          <TextNomal>
            - Build cyclists lineups from the cards in your collection - Enter
            your lineups into a variety of cycling competitions{' '}
          </TextNomal>

          <TextNomal>
            - Scoring is based on the real-life performance of the cyclists in
            your lineup
          </TextNomal>

          <TextNomal>
            - With every competition, your players earn more XP, making them
            more powerful
          </TextNomal>
          <TextNomal>
            {' '}
            - Compete with players on global leaderboards for rewards
          </TextNomal>
        </BaseContent>
        <Title>Why CyLimit ?</Title>
        <TextNomal>
          We, CyLimit team, are big fans of cycling since our childhood and we
          have arrived to this conclusion :
        </TextNomal>
        <BaseContent>
          <TextNomal>
            - The cycling is one of the most popular sport of the world
          </TextNomal>
          <TextNomal>
            {`- However, fans can't live their passion so intensely as in other
            sports`}
          </TextNomal>
        </BaseContent>
        <TextNomal>For the fans </TextNomal>
        <Bold>
          Stop this industry in which you throw away your game every year{' '}
        </Bold>
        <TextNomal>
          With Blockchain and NFT, you are now the owner of the components of
          your game. You don't need to buy a game every year, your CyLimit cards
          are your own, and they are eternals. In CyLimit, your cards have a
          value outside of the game, and your money is never lost.
        </TextNomal>
        <Bold>Avoid as much as possible the crypto-world</Bold>
        <TextNomal>
          In CyLimit, we don't want to talk about Bitcoin or Ethereum or one of
          the billions crypto-currencies that exist.{' '}
        </TextNomal>
        <TextNomal>
          One of our main goal is that everybody in CyLimit talk in Euro or
          Dollars, and absolutely 0 crypto-knowledge is needed.
        </TextNomal>
        <Bold>You don't need to understand Crypto to play</Bold>
        <TextNomal>
          In CyLimit, we don't care about the evolution of the price of
          cryptocurrencies, we just want to use all the benefits of the
          BlockChain, without risks of drop on the market. So{' '}
          <strong>we use a StableCoin, the USDC</strong>. USDC is a
          cryptocurrency based on US Dollars. It means that this crypto is
          following as close as it can the price of the US Dollar so you can't
          feel if there is a problem on the market of cryptocurrencies.
        </TextNomal>
        <Bold>
          You are just here to play, collect or trade, not to gamble with
          cryptocurrencies.
        </Bold>
        <TextNomal>
          Moreover, to not bother you with crypto details, we pay you all the
          fees of the transactions you could make once your money is in the
          game.{' '}
        </TextNomal>
        <Bold>Build a fantasy-game for everyone</Bold>
        <TextNomal>
          Because our ambition is to include every pro-cyclist team in the game,
          we want to reach every cyclist fan. The game will be accessible for
          everyone, fun for everyone and understandable by everyone.
        </TextNomal>
        <Bold>Make the fan at the center of this adventure</Bold>
        <TextNomal>
          Opinions, reviews, feed-backs of players are our first priorities.
          CyLimit is a fun and engaging game. Your player experience is the main
          way to success for us. Satisf all-kind of players is our priority,
          collectors as traders as cycling-experts as just for fun players. For
          the pro-cyclist teams
        </TextNomal>
        <Bold>Build a new economy</Bold>
        <TextNomal>
          For now, the economy of cycling is based 100% on the sponsoring. It
          created an absolutely dependance and a stress for every teams at the
          end of the year. With CyLimit, they will get a new income, with no
          need to convince any sponsors. We reverse a part of the sells to the
          teams. It is very important for us that even the teams with a low
          budget have their share too, because cycling starts here too.
        </TextNomal>
        <TextNomal>
          Moreover, we believe it will help them to find sponsors because
          CyLimit will show them all-around the world by the game itself, by
          social media and you the owner of their cards.{' '}
        </TextNomal>
        <Bold>Begin the digitalisation they need </Bold>
        <Title>What is a CyLimit card ? </Title>
        <TextNomal>
          CyLimit cards are digital collectibles and non-fungible tokens (NFTs).
          Your CyLilmit cards are truly yours thanks to blockchain technology
          who allows provenance, true ownership, and complete freedom of
          movement, thanks to blockchain technology. With an NFT from CyLimit,
          you can use it in competitions, keep it as a collectible, sell & trade
          it In traditional digital games, you collect and use in-game items but
          you don't own them. With NFTs, you actually own your digital items,
          similar to how you own things in the physical world.
        </TextNomal>
        <Title>What is card scarcity?</Title>
        <TextNomal>
          There are three (3) levels of scarcity for CyLimit cards : Blue , Pink
          and Yellow{' '}
        </TextNomal>
        <Title>Is it free to play? </Title>
        <TextNomal>
          You can do your first steps on the game without spending any money, we
          offer you a free game with unlimited cards.
        </TextNomal>
        <TextNomal>
          It's like you compete in the game with those cards, but you can't earn
          any rewards But to really start playing with NFTS and get rewards you
          have to buy your cards
        </TextNomal>
        <MainTitle> SECTION 2 : Marketplace </MainTitle>
        <Title>What is the primary market ? </Title>
        <TextNomal>
          Cards you can buy on the primary market are brand new. It means that
          we just created them. You can get it by bidding on it, and be the last
          to bid on it. If you buy it this way, the card will get two bonuses{' '}
        </TextNomal>
        <Title>What is the secondary market ? </Title>
        <TextNomal>
          Here you can buy cards of other managers who want to sell it.{' '}
        </TextNomal>
        <TextNomal>
          You can also make offers to other managers, and include or not other
          cards in the deal !
        </TextNomal>
        <Title>How can I get my first card ?</Title>
        <TextNomal>There is some ways to get your cards :</TextNomal>
        <BaseContent>
          <TextNomal>
            - Earn it on social media : CyLimit or regular people (often on
            Twitter) could offer a GiveAway. Be on the lookout for it and share
            news about us. We never know when a gift is coming...
          </TextNomal>
          <TextNomal>
            - Buy it on Primary Market : here the cards are directly sold by us
            as soon as we edit new cards. We try to edit them as the year
            progresses. You can buy them by bidding on it.
          </TextNomal>
          <TextNomal>
            - Buy it on Secondary Market : the place where other managers want
            to sell a card. You can buy it by accepting the deal proposed by the
            seller.
          </TextNomal>
          <TextNomal>
            - Earn it by the games : after you complete an entire team of
            riders, you can compete in them. If your players performed well, you
            could be rewarded
          </TextNomal>
        </BaseContent>
        <Title>How to buy an nft card ? </Title>
        <TextNomal>
          Our platform allows you to pay your nfts directly by card (VISA,
          MASTERCARD, ...) or by your crypto balance available on your CyLimit
          wallet :
        </TextNomal>
        <TextNomal>Click on Market </TextNomal>
        <TextNomal>Select the market where you want to buy your card</TextNomal>
        <TextNomal>
          Choose the player card you want to buy. A page will open with the
          details of the card.{' '}
        </TextNomal>
        <TextNomal>Auction (primary market) </TextNomal>
        <BaseContent>
          <TextNomal>- Click on Bid </TextNomal>
          <TextNomal>
            - A popup opens and enter the amount of your bid{' '}
          </TextNomal>
          <TextNomal>- Click on bid</TextNomal>
          <TextNomal>
            - Choose your payment method: Wallet CyLimit or Credit card{' '}
          </TextNomal>
          <TextNomal>
            - You will be charged only if you win the auction
          </TextNomal>
        </BaseContent>
        <TextNomal>Direct sale (secondary market) </TextNomal>
        <BaseContent>
          <TextNomal>- Press buy this card </TextNomal>
          <TextNomal>
            - A popup opens and choose your payment method: Wallet CyLimit or
            credit card
          </TextNomal>
        </BaseContent>
        <Title>What are the payment methods? </Title>
        <TextNomal>
          You can buy NFT cards on CyLimit using your credit card or your
          CyLimit wallet
        </TextNomal>
        <Title>Can I get a refund or cancel bids and transactions? </Title>
        <TextNomal>
          Unfortunately, once a bid has been made, we cannot cancel it.
        </TextNomal>
        <TextNomal>
          We do not cancel auctions. Once you have won an auction, the card is
          yours. You will be able to sell it on the second market*.
        </TextNomal>
        <Title>I lost an auction but I saw a charge from my bank.</Title>
        <TextNomal>
          When you bid on an auction on the primary market, your bank
          temporarily authorizes a charge. We don't take money from you. If you
          win the auction, the final bid amount will be charged to your account.
          If you do not win the auction, the bank will refund your transaction.
        </TextNomal>
        <Title>How do I put my card up for sale?</Title>
        <TextNomal>To sell your CyLimit cards :</TextNomal>
        <TextNomal>Log into CyLimit and click on My Team</TextNomal>
        <TextNomal>Click on the player card you want to sell </TextNomal>
        <TextNomal>
          A form will appear near the player card and you can choose your sale
          price.
        </TextNomal>
        <TextNomal>Click on Sell NFT </TextNomal>
        <TextNomal>
          If the card does not sell, the listing will expire in 48H and the card
          will remain in your gallery
        </TextNomal>
        <TextNomal>
          If your card is sold, you will receive an in-game notification, an
          email, and it will be removed from your gallery.
        </TextNomal>
        <Title>What are the fees to pay? </Title>
        <TextNomal>
          Gas fees are payments made to cover the cost of the computer power
          required to process transactions on the Polygon blockchain
        </TextNomal>
        <TextNomal>
          We will in most cases refund the fee except when purchasing an NFT via
          credit card on the secondary market.
        </TextNomal>
        <Title>
          I am having issues with my bank card payments. What should I do?
        </Title>
        <TextNomal>
          If you are experiencing problems with your credit card, we recommend
          the following:
        </TextNomal>
        <TextNomal>Retry, it may be due to a network error.</TextNomal>
        <TextNomal>
          Check your balance and limit, your bank may cancel the transaction
          because you don't have enough funds.
        </TextNomal>
        <TextNomal>
          If none of the above worked, the best option is to contact your bank.
          We use Stripe as our payment provider and unfortunately we cannot
          approve your credit card for you.
        </TextNomal>
        <MainTitle>SECTION 3 : CyLimit wallet </MainTitle>
        <Title>What is a wallet and why do I need one? </Title>
        <TextNomal>
          By register you on CyLimit, you get a wallet on the blockchain.
        </TextNomal>
        <TextNomal>
          It means that you have your own wallet you can manage, put money in it
          and withdraw.{' '}
        </TextNomal>
        <TextNomal>
          For those who already know about crypto, you can put USDC on it with
          your Metamask wallet. If you don't, you can use our partners Ramp to
          deposit USDC on CyLimit. Once you have done that, you can buy cards on
          the market with your USDC.
        </TextNomal>
        <TextNomal>
          You can also use your credit card to directly buy card on the market.
        </TextNomal>
        <Title>How can I fund my wallet? </Title>
        <Bold>Use your credit card</Bold>
        <TextNomal>
          The fastest way and easiest way is to use our partners Ramp to fund
          your CyLimit wallet with dollars ($), euros (€), pounds (£), and other
          currencies.
        </TextNomal>
        <Bold>Use a cryptocurrency wallet</Bold>
        <TextNomal>
          If you are comfortable with blockchain and USDC transfers you can use
          a cryptocurrency wallet to fund your CyLimit account.
        </TextNomal>
        <TextNomal>
          If you have more questions on deposit methods please send a request to
          our Support.
        </TextNomal>
        <Title>How can I withdraw funds from my wallet?</Title>
        <TextNomal>
          The money you will deposit on your CyLimit wallet or generated by your
          sale on the secondary market can be withdrawn to your personal crypto
          wallet
        </TextNomal>
        <TextNomal>Go to your wallet</TextNomal>
        <TextNomal>Click on withdraw</TextNomal>
        <TextNomal>
          Enter the amount you want to withdraw, past the address on which you
          want to receive funds and enter your CyLimit account password
        </TextNomal>
        <TextNomal>Click on continue</TextNomal>
        <TextNomal>
          Paste the code verification (send on your cylimit email address)
        </TextNomal>
        <TextNomal>We will process your request as soon as possible</TextNomal>
        <TextNomal>
          You can always check the history by clicking on your wallet and the
          History Processing button
        </TextNomal>
        <Title>How do I track the state of my withdrawal ?</Title>
        <TextNomal>Go to your wallet</TextNomal>
        <TextNomal>Click on withdraw</TextNomal>
        <TextNomal>Click on History Processing : </TextNomal>
        <BaseContent>
          <TextNomal>
            if the request is in the processing state: we have received it and
            we are working on it!
          </TextNomal>
          <TextNomal>
            if the request is in the done state: your request has been processed
            and you should have received the funds on your external wallet
          </TextNomal>
        </BaseContent>
        <TextNomal>
          If there is a problem, you can contact our support team at{' '}
          <TextNomal display="inline" color="link" textDecoration="underline">
            <a href="mailto:contact@cylimit.com">contact@cylimit.com</a>
          </TextNomal>
        </TextNomal>
        <Title>What are the fees when I make a wallet transfer ? </Title>
        <TextNomal>
          For the time being CyLimit covers the costs of wallet transfer.
        </TextNomal>
        <Title>Can you help me with a Ramp issue? </Title>
        <TextNomal>
          We cannot help you with Ramp issues directly unfortunately.
        </TextNomal>
        <TextNomal>
          You will need to contact Ramp directly or visit the{' '}
          <TextNomal display="inline" color="link" textDecoration="underline">
            <a
              href="https://support.ramp.network/en/category/troubleshooting-1yc8pkt/"
              target="_blank"
              rel="noreferrer"
            >
              Ramp FAQ
            </a>
          </TextNomal>
          .
        </TextNomal>
        <MainTitle> SECTION 4 : My account</MainTitle>
        <Title>I can't log in</Title>
        <TextNomal>
          If after creating your account you are unable to log in, please check
          your personal information and try again. If the problem persists, you
          can contact our support team at{' '}
          <TextNomal display="inline" color="link" textDecoration="underline">
            <a href="mailto:contact@cylimit.com">contact@cylimit.com</a>
          </TextNomal>
        </TextNomal>
        <Title>How do I set up two-factor authentication (2FA)?</Title>
        <TextNomal>
          At the time of registration, if you register by email, we will ask you
          to verify your phone number directly.
        </TextNomal>
        <TextNomal>
          Otherwise via my account - settings - 2FA you can perform the
          procedure allowing you to validate your phone number
        </TextNomal>
        <Title>How do I change my profile picture?</Title>
        <TextNomal>Access to your account</TextNomal>
        <TextNomal>Click on the Edit profile </TextNomal>
        <TextNomal>Click on change image </TextNomal>
        <TextNomal>
          Select the new image you want to add as profile picture
        </TextNomal>
        <TextNomal>Click on "Save".</TextNomal>
        <Title>How can I change my email address?</Title>
        <TextNomal>You can change your email address at any time.</TextNomal>
        <TextNomal>
          {`From your account which is accessible by clicking on your profile picture -> my profile `}
        </TextNomal>
        <TextNomal>
          Then click on the Edit profile button and you can enter another email
          and then press "Save".
        </TextNomal>
        <Title>How can I change my password ?</Title>
        <TextNomal>You can change your password at any time.</TextNomal>
        <TextNomal>Access to your account</TextNomal>
        <TextNomal>Click on the Edit profile</TextNomal>
        <TextNomal>Click on Edit password</TextNomal>
        <TextNomal>Enter your current password and the new one</TextNomal>
        <TextNomal>Click on "Reset password".</TextNomal>
        <Title>Can I log into my friend's account to help him?</Title>
        <TextNomal>
          Logging into your friend’s account is not prohibited to help him but
          it could accidentally trigger our fraud detection, resulting in a
          temporary suspension of the account.
        </TextNomal>
        <TextNomal>
          Multi-accounting is strictly forbidden and can result in a permanent
          ban from the game
        </TextNomal>
        <TextNomal>
          Managers cannot own or control more than one CyLimit account
        </TextNomal>
        <TextNomal>Only a natural person can create an account</TextNomal>
        <TextNomal>
          You cannot act in coordination with another individual, group of
          individuals and/or a company
        </TextNomal>
        <Title>How can I delete my account? </Title>
        <TextNomal>Access to your account</TextNomal>
        <TextNomal>Click on the Edit profile</TextNomal>
        <TextNomal>Click on Delete Account</TextNomal>
        <TextNomal>Confirm the action.</TextNomal>
        <TextNomal>Why is my account blocked?</TextNomal>
        <TextNomal>
          We may block accounts for abusing the referral program,
          multi-accounting reasons, or when users break our fairness
          regulations.
        </TextNomal>
        <TextNomal>
          If you think this is why you have been blocked, please check your
          email for a message from our support team or submit a ticket.
        </TextNomal>
        <MainTitle>SECTION 5 : Blockchain</MainTitle>
        <Title>What is an NFT?</Title>
        <TextNomal>
          An NFT is a digital asset that represents real-world objects like art,
          music, in-game items and videos. They are bought and sold online,
          frequently with cryptocurrency, and they are generally encoded with
          the same underlying software as many cryptos.{' '}
        </TextNomal>
        <Title>What is a stablecoin?</Title>
        <TextNomal>
          Crypto-currencies such as USDC or DAI that are backed by a traditional
          currency such as the dollar, euro or yen are called stablecoin.{' '}
        </TextNomal>
        <Title>What is the USDC?</Title>
        <TextNomal>
          On your CyLimit wallet you will have an amount in USDC, we just want
          to use all the advantages of the Blockchain, without the risk of
          falling on the market.
        </TextNomal>
        <TextNomal>
          USDC is the 2nd largest stablecoin in the world, created by Circle and
          Coinbase
        </TextNomal>
        <TextNomal>
          USD Coin (USDC) is a digital currency fully backed by US dollar
          assets. USDC is a tokenized US dollar, with the value of a USDC coin
          being equal to the value of a US dollar in a 1:1 ratio.
        </TextNomal>
        <TextNomal>
          Since USDC is a 1:1 indexed asset to the dollar and the fiat currency
          has no issuance limit (and never will), the smart contract that
          manages the indexing is very unique, allowing for infinite issuance of
          USDC.
        </TextNomal>
        <Title>What is POLYGON?</Title>
        <TextNomal>
          At CyLimit we use POLYGON as a blockchain network for NFTS
        </TextNomal>
        <TextNomal>
          Polygon is a cryptocurrency, with the symbol MATIC, and also a
          technology platform that enables blockchain networks to connect and
          scale. Polygon launched under the name Matic Network in 2017.
        </TextNomal>
        <TextNomal>
          The Polygon platform operates using the Ethereum blockchain and
          connects Ethereum-based projects. Using the Polygon platform can
          increase the flexibility, scalability, and sovereignty of a blockchain
          project while still affording the security, interoperability, and
          structural benefits of the Ethereum blockchain.
        </TextNomal>
        <TextNomal>
          MATIC is an ERC-20 token, meaning that it's compatible with other
          Ethereum-based digital currencies. MATIC is used to govern and secure
          the Polygon network and to pay network transaction fees.
        </TextNomal>
      </Container>
    </MainLayout>
  );
};

export default Help;
