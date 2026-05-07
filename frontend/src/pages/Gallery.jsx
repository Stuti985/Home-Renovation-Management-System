import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import Card from '../components/ui/Card';
import { Camera, ArrowRight } from 'lucide-react';
import './Gallery.css';

export default function Gallery() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch all projects that have completed status and images
        const res = await API.get('/projects'); 
        // For the gallery, we filter locally or we could have a specific endpoint
        const galleryProjects = res.data.filter(p => p.beforeImages?.length > 0 || p.afterImages?.length > 0);
        setProjects(galleryProjects);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="fade-in" style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Transformation <span className="gradient-text">Gallery</span></h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Discover the incredible before-and-after transformations powered by RenovatePro contractors.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>Loading masterpieces...</div>
      ) : projects.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: '4rem' }}>
          <Camera size={48} style={{ color: 'var(--text-secondary)', margin: '0 auto 1rem' }} />
          <h3>No Transformations Yet</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Complete a project and upload photos to see them here.</p>
        </Card>
      ) : (
        <div className="masonry-grid">
          {projects.map(project => (
            <Card key={project._id} className="gallery-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="comparison-container">
                <div className="image-wrapper before-image">
                  <span className="image-badge">Before</span>
                  <img src={project.beforeImages[0] || '/placeholder-before.jpg'} alt="Before" />
                </div>
                <div className="comparison-divider">
                  <ArrowRight size={20} />
                </div>
                <div className="image-wrapper after-image">
                  <span className="image-badge success">After</span>
                  <img src={project.afterImages[0] || '/placeholder-after.jpg'} alt="After" />
                </div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  {project.description || 'A beautiful home renovation transformation.'}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
