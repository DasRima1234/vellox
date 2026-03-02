import React, { useState, useEffect } from "react";
import axios from "axios";

const BookingCalendar = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    // Fetch doctors on mount
    useEffect(() => {
        axios
            .get("/api/doctors")
            .then((res) => {
                setDoctors(res.data);
                if (res.data.length > 0) {
                    setSelectedDoctor(res.data[0].id);
                }
            })
            .catch(() => {
                alert("Failed to load doctors");
            });
    }, []);

    // Fetch slots when doctor/date changes
    useEffect(() => {
        if (!selectedDoctor) return;

        setLoading(true);
        setSelectedSlot(null);

        axios
            .get(`/api/doctors/${selectedDoctor}/slots?date=${date}`)
            .then((res) => {
                setSlots(res.data.slots);
            })
            .catch(() => {
                alert("Failed to load slots");
            })
            .finally(() => setLoading(false));
    }, [selectedDoctor, date]);

    const handleBooking = async (slot) => {
    if (isSubmitting) return;

    // 1. Create the EXACT same string ID used in the .map() loop
    const slotId = `${selectedDoctor}-${date}-${slot.start}`;
    
    try {
        setIsSubmitting(true);
        setSelectedSlot(slotId); // Set STRING, not Object

        await axios.post("/api/bookings", {
            doctor_id: selectedDoctor,
            user_id: 1,
            start_time: `${date} ${slot.start}:00`,
            end_time: `${date} ${slot.end}:00`,
        });

        setShowSuccess(true);

        // 2. REFETCH: This tells the server "Give me the updated list"
        const res = await axios.get(`/api/doctors/${selectedDoctor}/slots?date=${date}`);
        setSlots(res.data.slots); // This updates the UI grid
        
    } catch (err) {
        console.error(err);
        setSelectedSlot(null);
    } finally {
        setIsSubmitting(false);
    }
};

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                        Vellox Health
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Select a specialist and a convenient time.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Doctors Sidebar */}
                    <aside className="lg:col-span-4 space-y-4">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">
                            Doctors
                        </h2>

                        {doctors.map((doc) => (
                            <div
                                key={doc.id}
                                onClick={() =>
                                    !isSubmitting && setSelectedDoctor(doc.id)
                                }
                                className={`cursor-pointer p-5 rounded-3xl border-2 transition-all duration-300 flex items-center gap-4 ${
                                    selectedDoctor === doc.id
                                        ? "bg-white border-blue-600 shadow-xl shadow-blue-100"
                                        : "bg-transparent border-transparent hover:bg-slate-100"
                                }`}
                            >
                                <div
                                    className={`h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-lg ${
                                        selectedDoctor === doc.id
                                            ? "bg-blue-600 text-white"
                                            : "bg-slate-200 text-slate-500"
                                    }`}
                                >
                                    {doc.name.charAt(0)}
                                </div>

                                <span className="font-bold text-slate-800">
                                    {doc.name}
                                </span>
                            </div>
                        ))}
                    </aside>

                    {/* Slots Section */}
                    <main className="lg:col-span-8 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 md:p-12 relative isolate">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-2xl font-bold text-slate-900">
                                Available Times
                            </h2>

                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="px-5 py-3 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none font-semibold text-slate-700 transition-all"
                            />
                        </div>

                        {loading ? (
                            <div className="h-64 flex items-center justify-center text-slate-300 font-bold animate-pulse">
                                Fetching slots...
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {slots.map((slot) => {
                                    const slotId = `${selectedDoctor}-${date}-${slot.start}`;
                                    const isActive = selectedSlot === slotId;

                                    const isLoadingSlot =
                                        isSubmitting && isActive;

                                    return (
                                        <button
                                            key={`${date}-${slot.start}`}
                                            disabled={
                                                !slot.available || isLoadingSlot
                                            }
                                            onClick={() => handleBooking(slot)}
                                            className={`group py-5 rounded-2xl border-2 font-black text-sm transition-all duration-200 ${
                                                !slot.available
                                                    ? "bg-slate-50 border-slate-50 text-slate-200 cursor-not-allowed opacity-60"
                                                    : isLoadingSlot
                                                      ? "bg-blue-400 border-blue-400 text-white cursor-wait"
                                                      : isActive
                                                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 scale-95"
                                                        : "bg-white border-slate-100 text-slate-700 hover:border-blue-600 hover:text-blue-600"
                                            }`}
                                        >
                                            {slot.start}

                                            {!slot.available && (
                                                <span className="block text-[9px] font-bold uppercase tracking-tighter opacity-40">
                                                    {slot.status === "past"
                                                        ? "Passed"
                                                        : "Taken"}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-6">
                    <div className="bg-white rounded-[3rem] p-12 max-w-sm w-full text-center shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg
                                className="w-10 h-10"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="4"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>

                        <h3 className="text-3xl font-black text-slate-900 mb-2">
                            You're All Set!
                        </h3>

                        <p className="text-slate-500 mb-8 font-medium">
                            Confirmation has been sent to your account.
                        </p>

                        <button
                            onClick={() => {
                                setShowSuccess(false);
                                setSelectedSlot(null);
                            }}
                            className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingCalendar;
