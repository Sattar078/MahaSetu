import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import MainLayout from '../../components/MainLayout';
import {
  GraduationCap, Landmark, Briefcase, Users,
  Bus, Heart, FileText, Wheat, Search, ChevronRight, CheckCircle2, Bookmark, BookmarkCheck
} from 'lucide-react';
import { demoAPI } from '../../../utils/demoState';

const categories = [
  { id: 'certificates', label: 'Certificates', icon: FileText, color: 'bg-amber-50 text-amber-600' },
  { id: 'education', label: 'Education', icon: GraduationCap, color: 'bg-blue-50 text-[#0d599f]' },
  { id: 'jobs', label: 'Jobs', icon: Briefcase, color: 'bg-orange-50 text-orange-600' },
  { id: 'agriculture', label: 'Agriculture', icon: Wheat, color: 'bg-lime-50 text-lime-600' },
  { id: 'health', label: 'Health', icon: Heart, color: 'bg-red-50 text-red-500' },
  { id: 'transport', label: 'Transport', icon: Bus, color: 'bg-cyan-50 text-cyan-600' },
  { id: 'welfare', label: 'Welfare', icon: Users, color: 'bg-purple-50 text-purple-600' },
  { id: 'all', label: 'More', icon: Landmark, color: 'bg-slate-50 text-slate-600' },
];

export default function ServiceCategories() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [recommended, setRecommended] = useState([]);
  const [popular, setPopular] = useState([]);
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    demoAPI.init();
    setRecommended(demoAPI.getRecommendedServices());
    setPopular(demoAPI.getPopularServices());
    setSavedIds(demoAPI.getState().savedServices || []);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleSave = (id) => {
    if (demoAPI.isServiceSaved(id)) {
      demoAPI.removeSavedService(id);
    } else {
      demoAPI.saveService(id);
      // Optional: add toast here
    }
    setSavedIds(demoAPI.getState().savedServices || []);
  };

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-full pb-24">
        <AppHeader title="Explore Services" onBack={() => navigate('/home')} />
        
        <div className="px-5 pt-4">
          <p className="text-sm text-slate-500 font-medium mb-4">Find government services in one place</p>
          
          <form onSubmit={handleSearch} className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search government services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] shadow-sm transition-all"
            />
          </form>

          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Explore By Category</h3>
          <div className="grid grid-cols-4 gap-y-6 gap-x-2 mb-8">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => navigate(cat.id === 'all' ? '/services/certificates' : `/services/${cat.id}`)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-slate-100`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 text-center">{cat.label}</span>
                </button>
              );
            })}
          </div>

          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Recommended For You</h3>
          <div className="space-y-3 mb-8">
            {recommended.map(s => (
              <div key={s.id} className="bg-gradient-to-br from-[#0d599f] to-[#000080] p-5 rounded-2xl text-white shadow-md relative overflow-hidden">
                <div className="absolute -right-4 -top-4 opacity-10">
                  <FileText size={100} />
                </div>
                <h4 className="font-bold mb-1 relative z-10 flex items-center gap-2">
                  <GraduationCap size={16} />
                  {s.name}
                </h4>
                <div className="space-y-1 mb-4 relative z-10">
                  <p className="text-[10px] text-blue-100 flex items-center gap-1"><CheckCircle2 size={12}/> Profile information available</p>
                  <p className="text-[10px] text-blue-100 flex items-center gap-1"><CheckCircle2 size={12}/> Required documents available</p>
                </div>
                <div className="flex items-center gap-3 relative z-10">
                  <button 
                    onClick={() => navigate(`/service-details/${s.id}`)}
                    className="bg-white/20 hover:bg-white/30 transition text-xs font-bold py-2 px-4 rounded-xl backdrop-blur-sm"
                  >
                    View Details
                  </button>
                  <span className="text-[10px] text-white/50 italic">Prototype recommendation</span>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Popular Services</h3>
          <div className="space-y-3">
            {popular.map(s => {
              const isSaved = savedIds.includes(s.id);
              return (
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
                  <div className="flex gap-2 mt-auto pt-2 border-t border-slate-50">
                    <button 
                      onClick={() => navigate(`/service-details/${s.id}`)}
                      className="flex-1 bg-slate-50 hover:bg-slate-100 text-[#0d599f] font-bold text-xs py-2.5 rounded-xl transition"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => toggleSave(s.id)}
                      className={`flex items-center justify-center gap-1 px-4 rounded-xl font-bold text-xs transition border ${isSaved ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                    >
                      {isSaved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                      {isSaved ? 'Saved' : 'Save'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
