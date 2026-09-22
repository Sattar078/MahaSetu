import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import { PrimaryButton } from '../../components/Buttons';
import { CheckCircle2, Search, Plus, ChevronRight } from 'lucide-react';

export default function DocumentWallet() {
  const navigate = useNavigate();

  // Hardcoded to match user's mockup precisely
  const documents = [
    { name: "Identity Proof", status: "Verified", available: true, date: "12 Aug 2026" },
    { name: "Address Proof", status: "Verified", available: true },
    { name: "Income Proof", status: "Verified", available: true }
  ];

  return (
    <div className="flex flex-col min-h-[100dvh] bg-slate-50">
      <AppHeader title="MY DOCUMENTS" onBack={() => navigate('/home')} />

      <div className="flex-1 px-5 pt-4 pb-6 flex flex-col">
        {/* Search Bar */}
        <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 border border-slate-200 mb-6 shadow-sm">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search documents" 
            className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
          />
        </div>

        {/* Document List */}
        <div className="space-y-4">
          {documents.map((doc, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col relative overflow-hidden">
              {/* Accent Line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#138808]"></div>
              
              <div className="flex items-start gap-3 pl-2">
                <CheckCircle2 size={18} className="text-[#138808] shrink-0 mt-0.5" />
                
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-800">{doc.name}</h3>
                  <p className="text-[11px] font-medium mt-0.5 text-[#138808]">
                    {doc.status}
                  </p>
                  
                  {doc.date && (
                    <p className="text-[10px] text-slate-400 mt-1 font-medium">Added: {doc.date}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-3 border-t border-slate-50 pt-3">
                <button className="flex items-center gap-1 text-[11px] font-bold text-[#000080] hover:text-blue-900 transition-colors">
                  View <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Button */}
        <div className="mt-auto pt-8">
          <PrimaryButton className="flex items-center justify-center gap-2 w-full py-3.5 shadow-md">
            <Plus size={18} /> Upload Document
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
