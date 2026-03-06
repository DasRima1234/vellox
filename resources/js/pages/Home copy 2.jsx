import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import BookingCalendar from '../components/BookingCalendar';
import UserDashboard from '../components/UserDashboard';

const AppContainer = () => {
    const [view, setView] = useState('home'); // Top-level navigation
    const [activeTab, setActiveTab] = useState('booking'); // Internal dashboard navigation

    const renderMainContent = () => {
        // If we are on Home, show the Dashboard layout
        if (view === 'home') {
            return (
                <div className="flex flex-col lg:flex-row min-h-[calc(100-80px)]">
                    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                    
                    <main className="flex-1 p-6 lg:p-12">
                        {activeTab === 'booking' && <BookingCalendar />}
                        {activeTab === 'appointments' && <UserDashboard userId={1} />}
                        {/* Add more tabs as needed */}
                    </main>
                </div>
            );
        }

        // Other top-level pages
        return (
            <div className="max-w-7xl mx-auto py-20 px-6 text-center">
                <h2 className="text-4xl font-black capitalize">{view} Page</h2>
                <p className="text-slate-500 mt-4">This section is currently under development.</p>
                <button 
                    onClick={() => setView('home')}
                    className="mt-8 text-blue-600 font-bold underline"
                >
                    Return to Dashboard
                </button>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header setView={setView} setActiveTab={setActiveTab} />
            {renderMainContent()}
        </div>
    );
};

export default AppContainer;