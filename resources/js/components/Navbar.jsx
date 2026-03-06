import React, { useState, useEffect } from 'react';

const Navbar = ({ onGetStarted }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 p-8 h-20 flex items-center justify-between ${
            scrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}>
            {/* Logo */}
            <div className={`text-2xl font-black tracking-tighter transition-colors ${
                scrolled ? 'text-blue-600' : 'text-white'
            }`}>
                VELLOX<span className={scrolled ? 'text-slate-900' : 'text-blue-200'}>HEALTH</span>
            </div>

            {/* Navigation Links */}
            <div className={`hidden md:flex gap-10 text-xs font-black uppercase tracking-widest transition-colors ${
                scrolled ? 'text-slate-500' : 'text-white/80'
            }`}>
                {['Home', 'Find Doctor', 'Services', 'About'].map((item) => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-400 transition-colors">
                        {item}
                    </a>
                ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <button className={`text-xs font-black uppercase tracking-widest transition-colors ${
                    scrolled ? 'text-slate-900' : 'text-white'
                }`}>
                    Login
                </button>
                <button 
                    onClick={onGetStarted}
                    className={`px-6 py-3 rounded-xl font-black text-xs transition-all active:scale-95 ${
                        scrolled 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                        : 'bg-white text-blue-600 shadow-xl'
                    }`}
                >
                    BOOK APPOINTMENT
                </button>
            </div>
        </nav>
    );
};

export default Navbar;