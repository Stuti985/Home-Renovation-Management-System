import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { Helmet } from 'react-helmet-async';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Search, MapPin, Star, Briefcase, Filter } from 'lucide-react';

export default function Contractors() {
  const [contractors, setContractors] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search state
  const [search, setSearch] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [minRating, setMinRating] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [contractorsRes, servicesRes] = await Promise.all([
        API.get('/contractors', { params: { search, service: selectedService, minRating } }),
        API.get('/contractors/services')
      ]);
      setContractors(contractorsRes.data);
      setServices(servicesRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedService, minRating]); // Refetch when filters change

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="fade-in" style={{ padding: '2rem' }}>
      <Helmet>
        <title>Find Contractors | RenovatePro</title>
        <meta name="description" content="Browse our directory of verified and top-rated home renovation contractors in your area." />
      </Helmet>

      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Find Contractors</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Discover top-rated professionals for your renovation project.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
            <Search size={20} style={{ color: 'var(--text-secondary)', marginRight: '0.5rem' }} />
            <input 
              type="text" 
              placeholder="Search by name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: 'none', background: 'transparent', color: 'var(--text-primary)', outline: 'none', width: '100%' }}
            />
          </div>
          
          <div style={{ flex: '1 1 200px' }}>
            <select 
              value={selectedService} 
              onChange={(e) => setSelectedService(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
            >
              <option value="">All Services</option>
              {services.map(s => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div style={{ flex: '1 1 150px' }}>
            <select 
              value={minRating} 
              onChange={(e) => setMinRating(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
            >
              <option value="">Any Rating</option>
              <option value="4">4+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
            </select>
          </div>

          <Button type="submit">Search</Button>
        </form>
      </Card>

      {/* Results */}
      {loading ? (
        <p>Loading contractors...</p>
      ) : contractors.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: '3rem' }}>
          <Briefcase size={48} style={{ color: 'var(--text-secondary)', margin: '0 auto 1rem' }} />
          <h3>No contractors found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search criteria.</p>
        </Card>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {contractors.map(contractor => (
            <Card key={contractor._id} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{contractor.name}</h3>
                  <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'var(--bg-secondary)', borderRadius: '999px', fontSize: '0.875rem', color: 'var(--accent-primary)', fontWeight: 500 }}>
                    {contractor.service?.name || 'General'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(250, 204, 21, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '8px', color: '#facc15' }}>
                  <Star size={16} fill="currentColor" />
                  <span style={{ fontWeight: 600 }}>{contractor.rating?.toFixed(1)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} /> <span>Serving Local Area</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Briefcase size={16} /> <span>${contractor.rate}/hr</span>
                </div>
              </div>

              <Link to={`/contractors/${contractor._id}`} style={{ width: '100%' }}>
                <Button variant="outline" fullWidth>View Profile</Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
