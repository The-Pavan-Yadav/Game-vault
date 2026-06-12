import React, { createContext, useContext } from 'react';
import { Game } from '../types';
import { games as staticGames } from '../data/games.js';

interface GameVaultContextType {
  games: Game[];
}

const GameVaultContext = createContext<GameVaultContextType | undefined>(undefined);

export const GameVaultProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const games: Game[] = staticGames as Game[];

  return (
    <GameVaultContext.Provider value={{ games }}>
      {children}
    </GameVaultContext.Provider>
  );
};

export const useGameVault = () => {
  const context = useContext(GameVaultContext);
  if (context === undefined) {
    throw new Error('useGameVault must be used within a GameVaultProvider');
  }
  return context;
};
