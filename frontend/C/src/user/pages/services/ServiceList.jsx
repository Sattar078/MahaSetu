import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import MainLayout from '../../components/MainLayout';
import { Search, ChevronRight, FileText } from 'lucide-react';
import { demoAPI } from '../../../utils/demoState';

export default function ServiceList() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (category) {
      setServices(demoAPI.getServicesByCategory(category));
    }
  }, [category]);

  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) + ' Services' : 'Services';

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-full pb-20">
        <AppHeader title={categoryTitle} onBack={() => navigate('/services')} />

        <div className="px-5 pt-4 pb-6">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder={`Search ${categoryTitle.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] shadow-sm transition-all"
            />
          </div>

          {filteredServices.length > 0 ? (
            <div className="space-y-3">
              {filteredServices.map((s) => (
                <div key={s.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0d599f]">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{s.name}</h4>
                        <p className="text-[10px] text-slate-500">{s.department}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mb-4 line-clamp-2">{s.description}</p>
                  
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                      Documents required: {s.requiredDocuments.length}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                    <button 
                      onClick={() => navigate(`/service-details/${s.id}`)}
                      className="flex items-center gap-1 text-[#0d599f] font-bold text-xs"
                    >
                      View Details <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-sm font-bold text-slate-700 mb-2">No services found.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
