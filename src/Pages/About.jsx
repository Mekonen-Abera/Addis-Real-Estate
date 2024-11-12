import React, { useState } from 'react';

const About = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <div className='max-w-4xl mx-auto p-4'>
            <h1 className='text-4xl text-blue-800 font-bold mb-4'>About Us</h1>
            <p className='text-3xl text-blue-600 font-bold'>Who We Are?</p>
            <p className='mb-4'>
                Addis Real Estate is a leading real estate company located in Addis Ababa, Ethiopia.
                We specialize in providing a diverse range of property solutions, including houses, apartments, and
                commercial buildings available for both sale and rent. Our commitment to quality and customer satisfaction sets
                us apart in the industry. We strive to assist our clients in finding their dream homes and lucrative investment
                opportunities in the vibrant urban landscape of Addis Ababa. Whether you are looking for a cozy apartment,
                a spacious house, or a prime commercial space, Addis Real Estate is dedicated to making your property search
                seamless and rewarding.
            </p>
            <h2 className='text-3xl font-semibold mb-2 text-blue-600'>Our Mission & Vision</h2>
            <p className='mb-4 font-italic'>"We strive to provide both quality and affordability to our customers."</p>
            <p className='mb-4'>
                At Addis Real Estate, our mission is to deliver affordable yet luxurious housing solutions for both local and foreign residents.
                We offer a range of apartment and villa developments conveniently located near the city center, ensuring easy access to essential amenities.
            </p>
            <p className='mb-4'>
                We are committed to making the dream of home ownership a reality. Utilizing the latest technology in construction, 
                we aim to build the best possible homes while fostering a culture of honesty and integrity throughout our operations.
            </p>
            <p className='mb-4'>
                <a href="/mission-vision" className='text-blue-600 hover:underline'>Learn more about our Mission and Vision</a>
            </p>
            <h2 className='text-3xl font-semibold mb-2 text-blue-600'>Contact Us</h2>
            <p className='mb-4'>We would love to speak with you. Feel free to reach out using the below details.</p>
            <h3 className='text-xl font-semibold mb-2 text-blue-600'>Get In Touch</h3>
            <p>Phone: +2519 10532107, +251-922-955-651</p>
            <p>Email: <a href="mailto:info@addisreal-estate.com" className='text-blue-600 hover:underline'>info@addisreal-estate.com</a></p>
            <p className='text-blue-600 font-bold'>Follow us:</p>
            <ul className='flex flex-col gap-4'>
                <li><a href="https://www.facebook.com" className='text-blue-600 hover:underline'>Facebook</a></li>
                <li><a href="https://www.linkedin.com" className='text-blue-600 hover:underline'>LinkedIn</a></li>
                <li><a href="https://www.youtube.com" className='text-blue-600 hover:underline'>YouTube</a></li>
                <li><a href="https://www.instagram.com" className='text-blue-600 hover:underline'>Instagram</a></li>
            </ul>
            <h2 className='text-2xl font-bold mt-6 mb-2 text-black'>Fill out the form below and we will contact you as soon as possible!</h2>
            <form onSubmit={handleSubmit} className='flex flex-col flex-wrap p-3 max-w-lg mx-auto gap-4'>
                <label htmlFor='name' className='font-bold text-black flex justify-between items-center'>Your Name</label>
                <input
                    type='text'
                    name='name'
                    id='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Your Name'
                    className='border-2 border-red-600 rounded-lg p-4'
                />
                <label htmlFor='email' className='font-bold text-black flex justify-between items-center'>Your Email</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Your Email'
                    className='border-2 border-red-600 rounded-lg p-4'
                    required
                />
                <label htmlFor='phone' className='font-bold text-black flex justify-between items-center'>Phone Number</label>
                <input
                    type='tel'
                    name='phone'
                    id='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder='Phone Number'
                    className='border-2 border-red-600 rounded-lg p-4'
                    required
                />
                <label htmlFor='message' className='font-bold text-black flex justify-between items-center'>Message</label>
                <textarea
                    name='message'
                    id='message'
                    rows='4'
                    value={formData.message}
                    onChange={handleChange}
                    placeholder='Message'
                    className='border-2 border-red-600 rounded-lg p-4'
                    required
                />
                <button type='submit' className='bg-green-600 uppercase text-white p-4 rounded hover:opacity-95 disabled:opacity-80'>
                    Send
                </button>
            </form>

            {/* Footer Section */}
            <footer className='mt-10 p-4 bg-gray-200 text-center'>
                <p className='text-gray-900'>
                    &copy; {new Date().getFullYear()} Addis Real Estate. All rights reserved.
                </p>
                <div className='flex justify-center gap-4 mt-2'>
                    <a href="https://www.facebook.com" className='text-blue-600 hover:underline'>Facebook</a>
                    <a href="https://www.linkedin.com" className='text-blue-600 hover:underline'>LinkedIn</a>
                    <a href="https://www.youtube.com" className='text-blue-600 hover:underline'>YouTube</a>
                    <a href="https://www.instagram.com" className='text-blue-600 hover:underline'>Instagram</a>
                </div>
            </footer>
        </div>
    );
};

export default About;