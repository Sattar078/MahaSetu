import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import MainLayout from '../../components/MainLayout';
import { Search, ChevronRight, FileText } from 'lucide-react';
import { demoAPI } from '../../../utils/demoState';

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
    if (q) {
      setResults(demoAPI.searchServices(q));
    } else {
      setResults([]);
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col min-h-[100dvh] bg-slate-50">
        <AppHeader title="Search Results" onBack={() => navigate(-1)} />

        <div className="px-5 pt-4 pb-6 flex-1">
          <form onSubmit={handleSearch} className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search government services..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] shadow-sm transition-all"
            />
          </form>

          {query && (
            <p className="text-xs text-slate-500 mb-4">
              Found <span className="font-bold text-slate-900">{results.length} services</span> for "{query}"
            </p>
          )}

          {results.length > 0 ? (
            <div className="space-y-3">
              {results.map((r) => (
                <button
                  key={r.id}
                  onClick={() => navigate(`/service-details/${r.id}`)}
                  className="w-full flex flex-col p-4 bg-white border border-slate-200 shadow-sm rounded-2xl hover:border-[#0d599f] transition text-left"
                >
                  <div className="flex items-start justify-between w-full mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0d599f]">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{r.name}</h4>
                        <p className="text-[10px] text-slate-500">{r.department}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{r.description}</p>
                </button>
              ))}
            </div>
          ) : (
            query && (
              <div className="text-center py-10">
                <p className="text-sm font-bold text-slate-700 mb-2">No matching service found.</p>
                <button 
                  onClick={() => navigate('/services')}
                  className="text-xs text-[#0d599f] font-bold mt-4 px-4 py-2 bg-blue-50 rounded-xl"
                >
                  Browse All Services
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </MainLayout>
  );
}
