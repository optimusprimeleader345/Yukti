import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { WorkspaceLayout } from '@/layouts/WorkspaceLayout';
import { WorkspaceEntry } from '@/pages/WorkspaceEntry';
import { RepositorySelector } from '@/pages/RepositorySelector';
import { RepositoryImportSuccess } from '@/pages/RepositoryImportSuccess';
import { RepositoryProcessing } from '@/pages/RepositoryProcessing';
import { WorkspaceChat } from '@/pages/WorkspaceChat';

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
          <Route path="import-success" element={<RepositoryImportSuccess />} />
          <Route path="processing" element={<RepositoryProcessing />} />
          <Route path="chat" element={<WorkspaceChat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
