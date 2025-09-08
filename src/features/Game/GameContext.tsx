import React, { useState, createContext, useContext } from 'react';

type Values = {
  isOpenModal?: boolean;
  isOpenMyTeam?: boolean;
  divisionId?: string;
  activeIndex?: number;
  gameId?: string;
};

type Context = {
  gameContext: Values;
  setGameContext: (values: Values) => void;
};

export const GameContext = createContext<Context>({
  gameContext: { isOpenModal: false, activeIndex: 1 },
  setGameContext: () => undefined,
});

type Props = {
  children: React.ReactNode;
};

const GameProvider = ({ children }: Props) => {
  const [gameContext, setGameContext] = useState<Context['gameContext']>({
    isOpenModal: false,
    activeIndex: 0,
    isOpenMyTeam: false,
  });

  const handleChangeContext = (values: any) => {
    setGameContext((current) => ({ ...current, ...values }));
  };

  return (
    <GameContext.Provider
      value={{ gameContext, setGameContext: handleChangeContext }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const { gameContext, setGameContext } = useContext(GameContext);
  return { gameContext, setGameContext };
};

export default GameProvider;
