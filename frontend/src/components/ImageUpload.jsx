import React, { useState, useCallback } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import './ImageUpload.css';

export default function ImageUpload({ onUploadSuccess, label = "Upload Image", multiple = false }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files) => {
    const file = files[0]; // For now, handle single file upload visually
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    // Upload to server
    const formData = new FormData();
    formData.append('image', file);

    setIsUploading(true);
    try {
      const res = await API.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Image uploaded successfully!');
      if (onUploadSuccess) onUploadSuccess(res.data.url);
      
      // Clear preview after a few seconds if you want, or let parent unmount it
      setTimeout(() => setPreview(null), 3000); 
    } catch (err) {
      toast.error('Failed to upload image. Please try again.');
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <label className="upload-label">{label}</label>
      
      <div 
        className={`drop-zone ${isDragging ? 'drag-active' : ''} ${preview ? 'has-preview' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          accept="image/*" 
          multiple={multiple} 
          onChange={handleChange} 
          className="file-input" 
          disabled={isUploading}
        />
        
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="image-preview" />
            <div className="preview-overlay">
              {isUploading ? (
                <div className="uploading-indicator">
                  <Loader2 className="spin" size={32} />
                  <span>Uploading...</span>
                </div>
              ) : (
                <div className="success-indicator">
                  <UploadCloud size={32} />
                  <span>Done!</span>
                </div>
              )}
            </div>
            {!isUploading && (
              <button 
                type="button" 
                className="clear-btn" 
                onClick={(e) => { e.preventDefault(); setPreview(null); }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        ) : (
          <div className="drop-zone-content">
            <div className="icon-circle">
              <UploadCloud size={28} />
            </div>
            <p className="primary-text">
              <span className="gradient-text font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="secondary-text">PNG, JPG, JPEG up to 10MB</p>
          </div>
        )}
      </div>
    </div>
  );
}
