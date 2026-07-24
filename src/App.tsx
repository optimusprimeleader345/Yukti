import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { WorkspaceLayout } from '@/layouts/WorkspaceLayout';
import { WorkspaceEntry } from '@/pages/WorkspaceEntry';
import { RepositorySelector } from '@/pages/RepositorySelector';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
        
        {/* Workspace Routes */}
        <Route path="/workspace" element={<WorkspaceLayout />}>
          <Route index element={<WorkspaceEntry />} />
          <Route path="repositories" element={<RepositorySelector />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
