import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ListingItem from '../Container/ListingItem';

export default function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: [],
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const initialData = {
            searchTerm: urlParams.get('searchTerm') || '',
            type: urlParams.getAll('type') || [],
            parking: urlParams.get('parking') === 'true',
            furnished: urlParams.get('furnished') === 'true',
            offer: urlParams.get('offer') === 'true',
            sort: urlParams.get('sort') || 'created_at',
            order: urlParams.get('order') || 'desc',
        };

        setSidebardata(initialData);
        fetchListings(initialData);
    }, [location.search]);

    const fetchListings = async (params) => {
        setLoading(true);
        setShowMore(false);
        const searchQuery = new URLSearchParams(params).toString();
        try {
            const res = await fetch(`/API/listing/get?${searchQuery}`);
            if (!res.ok) throw new Error('Failed to fetch listings');
            const data = await res.json();
            setListings(data);
            setShowMore(data.length > 8);
        } catch (error) {
            console.error("Error fetching listings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { id, type, checked } = e.target;

        if (type === 'checkbox') {
            if (id === 'parking' || id === 'furnished' || id === 'offer') {
                // Toggle amenities
                setSidebardata((prevData) => ({
                    ...prevData,
                    [id]: checked,
                }));
            } else {
                // Handle type checkboxes
                setSidebardata((prevData) => {
                    const newTypes = checked
                        ? [...prevData.type, id]
                        : prevData.type.filter((t) => t !== id);
                    return {
                        ...prevData,
                        type: newTypes,
                    };
                });
            }
        } else {
            // Handle radio button for All
            setSidebardata((prevData) => ({
                ...prevData,
                type: id === 'all' ? [] : [id], // Clear types if 'All' is selected
            }));
        }
    };

    const handleSortChange = (e) => {
        const { id, value } = e.target;
        setSidebardata((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchQuery = new URLSearchParams(sidebardata).toString();
        navigate(`/search?${searchQuery}`);
    };

    const onShowMoreClick = async () => {
        const startIndex = listings.length;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();

        try {
            const res = await fetch(`/API/listing/get?${searchQuery}`);
            if (!res.ok) throw new Error('Failed to fetch more listings');
            const data = await res.json();
            setListings((prevListings) => [...prevListings, ...data]);
            setShowMore(data.length >= 9);
        } catch (error) {
            console.error("Error fetching more listings:", error);
        }
    };

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                        <input
                            type='text'
                            id='searchTerm'
                            placeholder='Search...'
                            className='border rounded-lg p-3 w-full'
                            value={sidebardata.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Type:</label>
                        <div className='flex gap-2'>
                            <input
                                type='radio'
                                id='all'
                                name='type'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.type.length === 0}
                            />
                            <label htmlFor='all'>All</label>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='rent'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.type.includes('rent')}
                            />
                            <label htmlFor='rent'>Rent</label>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='sale'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.type.includes('sale')}
                            />
                            <label htmlFor='sale'>Sale</label>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Amenities:</label>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='parking'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.parking}
                            />
                            <label htmlFor='parking'>Parking</label>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='furnished'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.furnished}
                            />
                            <label htmlFor='furnished'>Furnished</label>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='offer'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.offer}
                            />
                            <label htmlFor='offer'>Offer</label>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort By:</label>
                        <select
                            onChange={handleSortChange}
                            value={sidebardata.sort}
                            id='sort'
                            className='border rounded-lg p-3'
                        >
                            <option value='regularPrice_desc'>Price high to low</option>
                            <option value='regularPrice_asc'>Price low to high</option>
                            <option value='createdAt_desc'>Latest</option>
                            <option value='createdAt_asc'>Oldest</option>
                        </select>
                        <select
                            onChange={handleSortChange}
                            value={sidebardata.order}
                            id='order'
                            className='border rounded-lg p-3'
                        >
                            <option value='asc'>Ascending</option>
                            <option value='desc'>Descending</option>
                        </select>
                    </div>
                    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
                        Search
                    </button>
                </form>
            </div>
            <div className='flex-1'>
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
                    Listing Results:
                </h1>
                <div className='p-7 flex flex-wrap gap-4'>
                    {!loading && listings.length === 0 && (
                        <p className='text-xl text-slate-700'>No listing found!</p>
                    )}
                    {loading && (
                        <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>
                    )}
                    {!loading && listings.map((listing) => (
                        <ListingItem key={listing._id} listing={listing} />
                    ))}
                    {showMore && (
                        <button
                            onClick={onShowMoreClick}
                            className='text-green-800 hover:underline p-8 text-center w-full'
                        >
                            Show More
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}