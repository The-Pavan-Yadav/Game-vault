/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter, Routes, Route } from 'react-router-dom';
import { GameVaultProvider } from './context/GameVaultContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { MyGames } from './pages/MyGames';
import { Statistics } from './pages/Statistics';

export default function App() {
  return (
    <GameVaultProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/games" element={<MyGames />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </Layout>
      </HashRouter>
    </GameVaultProvider>
  );
}
