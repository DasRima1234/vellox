import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';

const LandingPage = ({ onGetStarted }) => {
    return (
        <div className="bg-white min-h-screen font-sans">

            <Navbar onGetStarted={onGetStarted} />
            {/* 1. THE HERO BOX: Rounded bottom for a modern feel */}
            <section className="relative bg-[#1D4ED8] rounded-b-[5rem] pb-32 pt-10">
                <div className="max-w-7xl mx-auto px-8 mt-[50px] flex flex-col md:flex-row items-center justify-between">
                    
                    {/* Left Side: Bold Typography */}
                    <div className="md:w-1/2 text-left z-10 py-20">
                        <h1 className="text-white text-6xl md:text-7xl font-black tracking-tighter leading-[1.05] mb-6">
                            Book Your Doctor <br />
                            <span className="text-blue-200 italic">Appointment Online.</span>
                        </h1>
                        <p className="text-blue-100/80 text-lg font-medium max-w-md mb-10 leading-relaxed">
                            A Healthier Tomorrow Starts Today: Schedule Your Appointment! Your Wellness, Our Expertise.
                        </p>
                        <div className="flex gap-4">
                            <button onClick={onGetStarted} className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black shadow-2xl hover:bg-blue-50 transition-all active:scale-95">
                                Book An Appointment
                            </button>
                            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-black hover:bg-white/10 transition-all">
                                📞 Call now
                            </button>
                        </div>
                    </div>

                    {/* Right Side: The Doctor (Visual Anchor) */}
                    <div className="md:w-1/2 relative flex justify-end">
                        <div className="w-[550px] h-[550px] bg-blue-500/20 rounded-[4rem] border-8 border-white/10 relative overflow-hidden shadow-2xl">
                            <img 
                                src="/assets/images/doctor.png"
                                className="w-full h-full object-cover"
                                alt="Professional Doctor"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. THE FLOATING SEARCH BAR: This "connects" the sections */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 w-full max-w-5xl px-8 z-30">
                    <div className="bg-white p-5 rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.15)] flex flex-col md:flex-row items-center gap-2 min-h-[110px]">
                        
                        {/* Selector 1 */}
                        <div className="flex-1 flex items-center gap-4 px-6 border-r border-slate-100 py-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">📅</div>
                            <select className="bg-transparent border-none outline-none font-bold text-slate-700 w-full text-sm">
                                <option>Select Date & Time</option>
                            </select>
                        </div>

                        {/* Search Input */}
                        <div className="flex-[1.5] flex items-center gap-4 px-6 py-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">🔍</div>
                            <input 
                                type="text" 
                                placeholder="Search doctors, specialty..."
                                className="bg-transparent border-none outline-none font-bold text-slate-700 w-full text-sm"
                            />
                        </div>

                        {/* Final Action */}
                        <button className="bg-blue-600 text-white h-[70px] px-10 rounded-2xl font-black tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 uppercase text-xs">
                            Search Now
                        </button>
                    </div>
                </div>
            </section>

            {/* 3. THE "HOW IT WORKS" (Fill the lower empty space) */}
            <section className="pt-32 pb-20 max-w-7xl mx-auto px-8 text-center">
                <h2 className="text-4xl font-black tracking-tighter mb-16">How It Works!</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <StepCard number="01" title="Find a Doctor" desc="Search from our vetted list of specialists." />
                    <StepCard number="02" title="Pick a Time" desc="Real-time slots that fit your lifestyle." />
                    <StepCard number="03" title="Get Treatment" desc="Visit or consult online with ease." />
                </div>
            </section>
        </div>
    );
};

const StepCard = ({ number, title, desc }) => (
    <div className="relative p-10 bg-slate-50 rounded-[3rem] group hover:bg-white hover:shadow-xl transition-all duration-500">
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-black italic shadow-lg">
            {number}
        </span>
        <h3 className="text-xl font-black mb-3 mt-4 tracking-tight">{title}</h3>
        <p className="text-slate-500 font-medium text-sm leading-relaxed">{desc}</p>
    </div>
);

export default LandingPage;