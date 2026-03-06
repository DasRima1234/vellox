import React from 'react';

const Banner = () => {
    const partners = [
        "Mayo Clinic", "Cleveland Clinic", "Johns Hopkins", 
        "BlueCross", "UnitedHealth", "Vellox Pro", "Aetna"
    ];

    return (
        <div className="bg-[#0F172A] py-6 overflow-hidden border-y border-white/10">
            <div className="flex whitespace-nowrap animate-marquee">
                {/* We double the list to create a seamless loop */}
                {[...partners, ...partners].map((partner, index) => (
                    <div key={index} className="flex items-center mx-12">
                        <span className="text-white/30 text-xs font-black uppercase tracking-[0.3em] hover:text-blue-500 transition-colors cursor-default">
                            {partner}
                        </span>
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full ml-12 opacity-50"></div>
                    </div>
                ))}
            </div>

            {/* Add this to your Global CSS or Tailwind config for the animation */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
            `}} />
        </div>
    );
};

export default Banner;