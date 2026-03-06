import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import BookingCalendar from '../components/BookingCalendar';
import UserDashboard from '../components/UserDashboard';
import LandingPage from './LandingPage';

const Home = () => {
    const [isStarted, setIsStarted] = useState(false); // New state to track if user entered the app
    const [activeTab, setActiveTab] = useState('explore');

    // 1. If not started, show the Landing Page
    if (!isStarted) {
        return <LandingPage onGetStarted={() => setIsStarted(true)} />;
    }

    const renderMainContent = () => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Main Booking Card - Primary Focus */}
                <div className="md:col-span-8 space-y-6">
                    <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm">
                        <header className="mb-8">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Schedule Consultation</h2>
                            <p className="text-slate-500 font-medium">Select a doctor and your preferred time slot.</p>
                        </header>
                        
                        <BookingCalendar />
                    </div>
                </div>

                {/* Side Stats - Simple & Classic */}
                <div className="md:col-span-4 space-y-6">
                    {/* Welcome Card */}
                    <div className="bg-blue-600 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-100">
                        <h3 className="text-xl font-bold mb-2">Good Afternoon, John</h3>
                        <p className="text-blue-100 text-sm mb-6">You have no health alerts today. Stay hydrated!</p>
                        <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Next Appointment</p>
                            <p className="font-bold text-lg">Not Scheduled</p>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 text-center">
                            <p className="text-2xl mb-1">🩸</p>
                            <p className="text-xs font-black text-slate-400 uppercase">Blood</p>
                            <p className="font-bold text-slate-900">O+</p>
                        </div>
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 text-center">
                            <p className="text-2xl mb-1">⚖️</p>
                            <p className="text-xs font-black text-slate-400 uppercase">Weight</p>
                            <p className="font-bold text-slate-900">72kg</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div className="flex-1 lg:ml-72">
                {/* Minimal Header */}
                <header className="h-20 px-10 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-40">
                    <div className="flex gap-6">
                        {['Services', 'Find Doctors', 'About'].map(link => (
                            <button key={link} className="text-xs font-bold text-slate-400 hover:text-blue-600 transition uppercase tracking-widest">
                                {link}
                            </button>
                        ))}
                    </div>
                    <button className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition">🔔</button>
                </header>

                <main className="p-10">
                    {activeTab === 'explore' ? renderMainContent() : <UserDashboard />}
                </main>
            </div>
        </div>
    );
};

export default Home;