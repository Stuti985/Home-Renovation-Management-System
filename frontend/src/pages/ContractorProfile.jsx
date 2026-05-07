import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import { Star, MapPin, Phone, Mail, Calendar, CheckCircle2 } from 'lucide-react';

export default function ContractorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contractor, setContractor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const fetchContractor = async () => {
      try {
        const res = await API.get(`/contractors/${id}`);
        setContractor(res.data);
      } catch (err) {
        toast.error('Failed to load contractor profile');
        navigate('/contractors');
      } finally {
        setLoading(false);
      }
    };
    fetchContractor();
  }, [id, navigate]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setIsBooking(true);
    try {
      await API.post('/bookings', {
        contractorId: id,
        date: bookingDate,
        notes: bookingNotes
      });
      toast.success('Booking requested successfully!');
      setBookingDate('');
      setBookingNotes('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setIsBooking(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading profile...</div>;
  if (!contractor) return null;

  return (
    <div className="fade-in" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Header Profile Section */}
      <Card style={{ marginBottom: '2rem', overflow: 'hidden', padding: 0 }}>
        <div style={{ height: '150px', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-hover))' }}></div>
        <div style={{ padding: '2rem', position: 'relative' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ marginTop: '-4rem' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--bg-primary)', border: '4px solid var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                👨‍🔧
              </div>
              <h1 style={{ fontSize: '2rem', marginTop: '1rem', marginBottom: '0.25rem' }}>{contractor.name}</h1>
              <p style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '1.1rem' }}>
                {contractor.service?.name || 'General Contractor'}
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', color: '#facc15', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  <Star fill="currentColor" size={24} /> {contractor.rating?.toFixed(1)}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {contractor.reviewCount} Reviews
                </div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                  ${contractor.rate}/hr
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  Standard Rate
                </div>
              </div>
            </div>
          </div>

        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Left Column: Details & Reviews */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Card>
            <h2 style={{ marginBottom: '1rem' }}>About</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {contractor.service?.description || 'Experienced professional ready to handle your renovation needs with quality and care.'}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <MapPin size={18} /> Serving Metro Area
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <Phone size={18} /> {contractor.contact || 'Contact available upon booking'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success)' }} /> Licensed & Insured
              </div>
            </div>
          </Card>

          <Card>
            <h2 style={{ marginBottom: '1rem' }}>Recent Reviews</h2>
            <div style={{ color: 'var(--text-secondary)' }}>
              Reviews will be populated here as users complete projects.
            </div>
          </Card>
        </div>

        {/* Right Column: Booking Form */}
        <div>
          <Card style={{ position: 'sticky', top: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={20} /> Request Booking
            </h2>
            
            <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Preferred Date</label>
                <input 
                  type="date" 
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Project Details</label>
                <textarea 
                  rows="4" 
                  placeholder="Describe what you need help with..."
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }}
                ></textarea>
              </div>

              <Button type="submit" disabled={isBooking} fullWidth>
                {isBooking ? 'Submitting...' : 'Request Appointment'}
              </Button>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '0.5rem' }}>
                You won't be charged yet. The contractor will confirm the date.
              </p>
            </form>
          </Card>
        </div>

      </div>
    </div>
  );
}
