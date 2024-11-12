import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/API/user/${listing.userRef}`);
                const data = await res.json();
                if (data) {
                    setLandlord(data);
                } else {
                    setError(true);
                }
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchLandlord();
    }, [listing.userRef]);

    return (
        <>
            {loading && <p className='text-center'>Loading landlord information...</p>}
            {error && <p className='text-red-500 text-center'>Failed to load landlord information.</p>}
            {landlord && (
                <div className='flex flex-col gap-2'>
                    <p>
                        Contact <span className='font-semibold'>{landlord.username}</span> for{' '}
                        <span className='font-semibold'>{listing.name.toLowerCase()}</span>
                    </p>
                    <textarea
                        name='message'
                        id='message'
                        rows='2'
                        value={message}
                        onChange={onChange}
                        placeholder='Enter your message here...'
                        className='w-full border p-3 rounded-lg'
                        aria-label="Message to landlord"
                    />
                    <Link
                        to={`mailto:${landlord.email}?subject=Regarding ${encodeURIComponent(listing.name)}&body=${encodeURIComponent(message)}`}
                        className={`bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95 ${!message ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={(e) => {
                            if (!message) {
                                e.preventDefault(); // Prevent navigation if message is empty
                            }
                        }}
                    >
                        Send Message
                    </Link>
                </div>
            )}
        </>
    );
}