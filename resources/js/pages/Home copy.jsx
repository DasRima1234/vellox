import React, { useRef } from "react";
import BookingCalendar from "../components/BookingCalendar";
import { useState } from "react";
import UserDashboard from "../components/UserDashboard";

const Home = () => {
    const bookingRef = useRef(null);
    const [view, setView] = useState("home");
    const scrollToBooking = () => {
        bookingRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="bg-[#F8FAFC] min-h-screen font-sans text-slate-900">
            {/* --- Navigation --- */}
            <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
                <div
                    onClick={() => setView("home")}
                    className="text-2xl font-black tracking-tighter text-blue-600 cursor-pointer"
                >
                    VELLOX
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setView("dashboard")}
                        className="text-slate-500 font-bold text-sm hover:text-blue-600 px-4"
                    >
                        My Appointments
                    </button>
                    <button
                        onClick={() => {
                            scrollToBooking();
                        }}
                        className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-sm shadow-xl"
                    >
                        Book Now
                    </button>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <header className="px-6 pt-16 pb-24 max-w-7xl mx-auto text-center">
                <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                    Next-Gen Healthcare
                </span>
                <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
                    Healthcare that <br />
                    <span className="text-blue-600">moves at your speed.</span>
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-12 font-medium">
                    Skip the waiting room. Connect with world-class specialists
                    and manage your health journey through our seamless digital
                    portal.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={scrollToBooking}
                        className="w-full md:w-auto bg-blue-600 text-white px-10 py-5 rounded-3xl font-black text-lg shadow-2xl shadow-blue-200 hover:scale-105 transition-transform"
                    >
                        Schedule Appointment
                    </button>
                    <button className="w-full md:w-auto bg-white border-2 border-slate-100 px-10 py-5 rounded-3xl font-black text-lg hover:bg-slate-50 transition-all">
                        View Services
                    </button>
                </div>
            </header>

            {/* --- Stats / Bento Grid --- */}
            <section className="py-20">
                {view === "home" ? (
                    <>
                        {/* <HeroSection /> */}
                        {/* <BookingCalendar /> */}
                    </>
                ) : (
                    <UserDashboard />
                )}
            </section>

            {/* --- The Booking Section --- */}
            <section
                ref={bookingRef}
                className="py-24 bg-white mt-20 rounded-t-[4rem] shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.05)]"
            >
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black mb-4">
                        Ready to begin?
                    </h2>
                    <p className="text-slate-400 font-medium">
                        Select your doctor below to see available slots.
                    </p>
                </div>
                <BookingCalendar />
            </section>

            {/* --- Footer --- */}
            <footer className="bg-slate-900 py-20 px-8 text-white text-center">
                <div className="text-3xl font-black mb-8 italic">VELLOX</div>
                <p className="opacity-50 text-sm">
                    © 2026 Vellox Health Systems. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Home;
