import React from 'react';

const Header = ({ setView, setActiveTab }) => {
    const navLinks = [
        { name: 'Home', view: 'home' },
        { name: 'Find a Doctor', view: 'home', tab: 'booking' },
        { name: 'Services', view: 'services' },
        { name: 'About Us', view: 'about' },
        { name: 'Contact', view: 'contact' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                {/* Logo */}
                <div 
                    onClick={() => setView('home')} 
                    className="text-2xl font-black text-blue-600 tracking-tighter cursor-pointer hover:opacity-80 transition"
                >
                    VELLOX
                </div>

                {/* Main Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => {
                                setView(link.view);
                                if (link.tab) setActiveTab(link.tab);
                            }}
                            className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
                        >
                            {link.name}
                        </button>
                    ))}
                </nav>

                {/* Right Action */}
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => {
                            setView('home');
                            setActiveTab('booking');
                        }}
                        className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all"
                    >
                        Book Appointment
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;