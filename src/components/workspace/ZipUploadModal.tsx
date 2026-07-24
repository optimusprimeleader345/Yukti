import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, UploadCloud, FileArchive, Loader2, CheckCircle2 } from 'lucide-react';
import './ZipUploadModal.css';

interface ZipUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type UploadState = 'idle' | 'uploading' | 'extracting' | 'success';

export const ZipUploadModal: React.FC<ZipUploadModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [progress, setProgress] = useState(0);
  const [fileData, setFileData] = useState<{name: string, size: string} | null>(null);

  useEffect(() => {
    if (uploadState === 'uploading') {
      const pInt = setInterval(() => setProgress(p => Math.min(p + 15, 100)), 200);
      const t1 = setTimeout(() => {
        clearInterval(pInt);
        setUploadState('extracting');
        setProgress(0);
      }, 1500);
      return () => { clearInterval(pInt); clearTimeout(t1); };
    }
    
    if (uploadState === 'extracting') {
      const pInt = setInterval(() => setProgress(p => Math.min(p + 5, 100)), 100);
      const t2 = setTimeout(() => {
        clearInterval(pInt);
        setUploadState('success');
      }, 2000);
      return () => { clearInterval(pInt); clearTimeout(t2); };
    }

    if (uploadState === 'success') {
      const t3 = setTimeout(() => {
        onClose();
        // Pass the dynamic file data via router state
        navigate('/workspace/import-success', { state: { fileData } });
      }, 1000);
      return () => clearTimeout(t3);
    }
  }, [uploadState, navigate, onClose, fileData]);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setUploadState('idle');
      setProgress(0);
      setFileData(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setFileData({ name: file.name, size: `${sizeMB} MB` });
      setUploadState('uploading');
    }
  };

  return (
    <div className="gh-modal-overlay">
      <div className="gh-modal-content">
        <button className="gh-modal-close" onClick={onClose} disabled={uploadState !== 'idle'}>
          <X size={20} />
        </button>

        <div className="gh-modal-header">
          <div className="gh-modal-icon" style={{ background: '#f5f3ff', color: '#6d28d9' }}>
            <FileArchive size={24} />
          </div>
          <h2>Import Project Data</h2>
          <p>Upload a .zip repository or documentation files (.md, .pdf)</p>
        </div>

        <div className="gh-modal-body">
          {uploadState === 'idle' && (
            <div 
              className="zip-drop-zone"
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                accept=".zip,.md,.pdf,.txt"
                onChange={handleFileSelect}
              />
              <UploadCloud size={32} color="#8b5cf6" />
              <h4>Click to select file from your computer</h4>
              <p>Supports .zip, .md, .pdf, .txt up to 500MB</p>
            </div>
          )}

          {(uploadState === 'uploading' || uploadState === 'extracting') && (
            <div className="zip-progress-container">
              <div className="zip-progress-status">
                <Loader2 size={16} className="gh-spinner" />
                <span>{uploadState === 'uploading' ? `Uploading ${fileData?.name}...` : 'Analyzing contents...'}</span>
                <span className="zip-percent">{progress}%</span>
              </div>
              <div className="zip-progress-bar">
                <div className="zip-progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}

          {uploadState === 'success' && (
            <div className="gh-status-container success" style={{ justifyContent: 'center', width: '100%' }}>
              <CheckCircle2 size={24} />
              <span>Analysis complete!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
