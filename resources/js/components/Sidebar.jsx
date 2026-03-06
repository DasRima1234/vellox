import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menu = [
        { id: 'explore', label: 'Book Appointment', icon: '🩺' },
        { id: 'schedule', label: 'My Appointments', icon: '📅' },
        { id: 'doctors', label: 'Our Specialists', icon: '👨‍⚕️' },
        { id: 'history', label: 'Medical Records', icon: '📄' },
    ];

    return (
        <aside className="fixed inset-y-0 left-0 w-72 bg-[#0F172A] flex flex-col z-50 shadow-2xl">
            <div className="p-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <span className="text-white font-bold text-xl">+</span>
                </div>
                <h1 className="text-white text-2xl font-black tracking-tighter">VELLOX</h1>
            </div>

            <nav className="flex-1 px-4 mt-4 space-y-1">
                {menu.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-200 ${
                            activeTab === item.id 
                            ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <span className="text-lg">{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="p-6 border-t border-slate-800">
                <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-2xl">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white">JD</div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-white text-sm font-bold truncate">John Doe</p>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Patient ID: #8821</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;