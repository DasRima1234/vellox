import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = ({ userId = 1 }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = () => {
        setLoading(true);
        axios.get(`/api/users/${userId}/bookings`).then(res => {
            setBookings(res.data);
            setLoading(false);
        });
    };

    useEffect(() => { fetchBookings(); }, []);

    const cancelBooking = (id) => {
        if (!confirm("Are you sure you want to cancel this appointment?")) return;
        
        axios.delete(`/api/bookings/${id}`).then(() => {
            fetchBookings(); // Refresh list
        });
    };

    if (loading) return <div className="text-center py-20 text-slate-400">Loading your health plan...</div>;

    return (
        <div className="max-w-4xl mx-auto px-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-slate-900">My Schedule</h2>
                <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs font-bold">
                    {bookings.length} Appointments
                </span>
            </div>

            {bookings.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-16 text-center">
                    <p className="text-slate-400 font-medium">No upcoming appointments found.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map(booking => (
                        <div key={booking.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition-all">
                            <div className="flex items-center gap-5">
                                <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center text-xl font-bold text-blue-600">
                                    {booking.bookable?.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Dr. {booking.bookable?.name}</h4>
                                    <p className="text-slate-500 text-sm font-medium">
                                        {new Date(booking.start_time).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                    </p>
                                    <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mt-1">
                                        {new Date(booking.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => cancelBooking(booking.id)}
                                className="w-full md:w-auto px-6 py-3 bg-red-50 text-red-500 rounded-xl font-bold text-sm hover:bg-red-500 hover:text-white transition-all"
                            >
                                Cancel Visit
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserDashboard;