import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import { 
  Bell, ArrowLeft, CheckCircle2, Clock, Trash2, 
  Search, Filter, ChevronRight, AlertCircle, RefreshCw,
  ClipboardList, FileText, Settings, ExternalLink,
  ShieldCheck, X, Sparkles, CheckCheck, Eye
} from 'lucide-react';
import { 
  getNotifications, 
  getUnreadCount, 
  markAsRead, 
  markAllAsRead, 
  deleteNotification,
  resetNotificationDemo,
  demoAPI
} from '../../../utils/demoState';

const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'application', label: 'Applications' },
  { id: 'document', label: 'Documents' },
  { id: 'service', label: 'Services' },
  { id: 'system', label: 'System' }
];

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'unread'
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Load notifications from central demoState
  const loadData = () => {
    try {
      setIsLoading(true);
      demoAPI.init();
      const notifs = getNotifications();
      setNotifications(notifs);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Mark single notification as read
  const handleMarkAsRead = (id, e) => {
    if (e) e.stopPropagation();
    markAsRead(id);
    setNotifications(getNotifications());
    showToast("Notification marked as read");
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    markAllAsRead();
    setNotifications(getNotifications());
    showToast("✓ All notifications marked as read");
  };

  // Delete notification
  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    deleteNotification(deleteConfirmId);
    setNotifications(getNotifications());
    setDeleteConfirmId(null);
    if (selectedNotification && selectedNotification.id === deleteConfirmId) {
      setSelectedNotification(null);
    }
    showToast("Notification removed");
  };

  // Reset to initial notifications
  const handleResetDemo = () => {
    resetNotificationDemo();
    setNotifications(getNotifications());
    showToast("Notifications reset to default values");
  };

  // Open notification detail modal
  const handleOpenDetail = (notif) => {
    markAsRead(notif.id);
    setNotifications(getNotifications());
    setSelectedNotification({ ...notif, read: true });
  };

  // Action button inside detail modal (View Application / View Document / View Service)
  const handleDetailAction = (notif) => {
    setSelectedNotification(null);
    if (notif.applicationId) {
      navigate(`/applications/${notif.applicationId}`);
    } else if (notif.documentId) {
      navigate(`/documents/${notif.documentId}`);
    } else if (notif.serviceId) {
      navigate(`/service-details/${notif.serviceId}`);
    } else if (notif.targetUrl) {
      navigate(notif.targetUrl);
    }
  };

  // Filter & Search Logic
  const filteredNotifications = notifications.filter(n => {
    // Category Filter
    if (activeFilter !== 'all') {
      const normTab = activeFilter.replace(/s$/, '').toLowerCase();
      const normType = (n.type || '').replace(/s$/, '').toLowerCase();
      if (normType !== normTab) return false;
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const titleMatch = (n.title || '').toLowerCase().includes(q);
      const msgMatch = (n.message || '').toLowerCase().includes(q);
      const appMatch = (n.applicationId || '').toLowerCase().includes(q);
      const docMatch = (n.documentId || '').toLowerCase().includes(q);
      const srvMatch = (n.serviceId || '').toLowerCase().includes(q);
      const typeMatch = (n.type || '').toLowerCase().includes(q);
      if (!titleMatch && !msgMatch && !appMatch && !docMatch && !srvMatch && !typeMatch) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    if (sortBy === 'unread') {
      if (!a.read && b.read) return -1;
      if (a.read && !b.read) return 1;
    }
    if (sortBy === 'oldest') {
      return new Date(a.timestamp || 0) - new Date(b.timestamp || 0);
    }
    // Default newest first
    return new Date(b.timestamp || 0) - new Date(a.timestamp || 0);
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  // Render type icon
  const renderTypeIcon = (type) => {
    switch (type) {
      case 'application':
        return (
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#000080] border border-blue-200 flex items-center justify-center shrink-0">
            <ClipboardList size={18} />
          </div>
        );
      case 'document':
        return (
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
            <FileText size={18} />
          </div>
        );
      case 'service':
        return (
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
            <Bell size={18} />
          </div>
        );
      case 'system':
      default:
        return (
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center shrink-0">
            <Settings size={18} />
          </div>
        );
    }
  };

  // Empty state message per filter tab
  const getEmptyMessage = () => {
    switch (activeFilter) {
      case 'application':
        return "No application updates yet.";
      case 'document':
        return "No document updates yet.";
      case 'service':
        return "No service updates yet.";
      case 'system':
        return "No system notifications yet.";
      default:
        return "No new updates at the moment.";
    }
  };

  return (
    <MainLayout>
      <div className="min-h-full pb-20 lg:pb-12 max-w-4xl mx-auto px-4 lg:px-6">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold z-50 transition-all border border-slate-700 animate-in fade-in slide-in-from-top-3">
            <CheckCircle2 size={16} className="text-[#138808]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ═══════════════ PAGE HEADER ═══════════════ */}
        <div className="pt-4 pb-4 border-b border-slate-200/80 mb-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <button 
              onClick={() => navigate(-1)} 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#000080] transition-colors p-1 -ml-1 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#000080] border border-blue-200 tracking-wide uppercase">
                OFFICIAL ALERTS
              </span>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#000080] hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1 rounded-xl transition-all shadow-2xs"
                >
                  <CheckCheck size={13} />
                  <span>Mark all as read</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Notification Centre</span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Stay updated on your applications, documents and services.
              </p>
            </div>
            
            <button
              onClick={handleResetDemo}
              className="text-[11px] font-semibold text-slate-500 hover:text-red-600 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 px-2.5 py-1 rounded-xl flex items-center gap-1 transition-all self-start sm:self-auto shadow-2xs"
              title="Reset notifications to defaults"
            >
              <RefreshCw size={12} />
              <span>Reset to Defaults</span>
            </button>
          </div>
        </div>

        {/* ═══════════════ NOTIFICATION SUMMARY BANNER ═══════════════ */}
        <div className="bg-gradient-to-r from-blue-900 via-[#000080] to-slate-900 rounded-3xl p-5 text-white shadow-lg mb-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#FF9933] shadow-md shrink-0">
                <Bell size={24} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-white/70 uppercase tracking-widest">
                  CITIZEN NOTIFICATIONS
                </p>
                <h3 className="text-lg lg:text-xl font-extrabold text-white leading-tight">
                  {unreadCount > 0 ? `${unreadCount} unread updates` : "You're all caught up!"}
                </h3>
                <p className="text-xs text-white/80 mt-0.5">
                  Total updates: {notifications.length} • {notifications.length - unreadCount} read
                </p>
              </div>
            </div>

            {unreadCount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FF9933] text-slate-950 self-start sm:self-center shadow-sm">
                <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                <span>Actionable Updates</span>
              </span>
            )}
          </div>
        </div>

        {/* ═══════════════ SEARCH & SORTING CONTROLS ═══════════════ */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Search notifications (Income, Scholarship, Address)..."
              className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#000080]/20 focus:border-[#000080] shadow-2xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 hidden sm:inline">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 rounded-2xl px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#000080] shadow-2xs"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="unread">Unread first</option>
            </select>
          </div>
        </div>

        {/* ═══════════════ FILTER TABS ═══════════════ */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 hide-scrollbar">
          {FILTER_TABS.map(tab => {
            const count = tab.id === 'all' 
              ? notifications.length 
              : notifications.filter(n => (n.type || '').replace(/s$/, '').toLowerCase() === tab.id).length;
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive 
                    ? 'bg-[#000080] text-white shadow-sm shadow-blue-900/20' 
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ═══════════════ LOADING & ERROR STATES ═══════════════ */}
        {isLoading && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center my-6">
            <div className="w-8 h-8 border-3 border-blue-200 border-t-[#000080] rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-bold text-slate-700">Loading notifications...</p>
          </div>
        )}

        {hasError && (
          <div className="bg-white rounded-3xl p-8 border border-red-200 text-center my-6">
            <AlertCircle size={32} className="text-red-500 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-slate-800">Something went wrong</h4>
            <p className="text-xs text-slate-500 mt-1 mb-4">Unable to load notifications at this time.</p>
            <div className="flex justify-center gap-3">
              <button onClick={loadData} className="px-4 py-2 bg-[#000080] text-white text-xs font-bold rounded-xl">
                Try Again
              </button>
              <button onClick={() => navigate(-1)} className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl">
                Back
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ NOTIFICATIONS LIST ═══════════════ */}
        {!isLoading && !hasError && sortedNotifications.length > 0 && (
          <div className="space-y-3">
            {sortedNotifications.map((notif) => {
              const isUnread = !notif.read;
              return (
                <div
                  key={notif.id}
                  onClick={() => handleOpenDetail(notif)}
                  className={`group relative bg-white rounded-3xl p-4 lg:p-5 border transition-all cursor-pointer shadow-sm hover:shadow-md text-left flex items-start gap-3.5 ${
                    isUnread 
                      ? 'border-blue-200 bg-gradient-to-r from-blue-50/40 via-white to-white' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Visual Unread Left Accent Bar */}
                  {isUnread && (
                    <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#000080] rounded-r-full" />
                  )}

                  {/* Type Icon */}
                  {renderTypeIcon(notif.type)}

                  {/* Body Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          {notif.type}
                        </span>
                        <h4 className="text-xs lg:text-sm font-bold text-slate-900 group-hover:text-[#000080] transition-colors leading-snug">
                          {notif.title}
                        </h4>
                      </div>

                      {/* Read / Unread Status Badge */}
                      <div className="shrink-0 flex items-center gap-1.5">
                        {isUnread ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded-full border border-blue-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                            <span>● Unread</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                            <CheckCircle2 size={11} className="text-slate-400" />
                            <span>✓ Read</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mt-0.5">
                      {notif.message}
                    </p>

                    {/* Metadata & Actions row */}
                    <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-slate-100/80 text-[11px]">
                      <div className="flex items-center gap-2 text-slate-400 font-medium">
                        <Clock size={12} />
                        <span>{notif.time || "Recent"}</span>
                        {notif.applicationId && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-slate-500 font-semibold">{notif.applicationId}</span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {isUnread && (
                          <button
                            onClick={(e) => handleMarkAsRead(notif.id, e)}
                            className="text-[11px] font-bold text-[#000080] hover:underline px-2 py-0.5 rounded-lg hover:bg-blue-50 transition-colors"
                            title="Mark as Read"
                          >
                            Mark as Read
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmId(notif.id);
                          }}
                          className="text-slate-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors"
                          title="Remove notification"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══════════════ EMPTY STATES ═══════════════ */}
        {!isLoading && !hasError && sortedNotifications.length === 0 && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center my-6 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-[#000080] border border-blue-100 flex items-center justify-center mx-auto mb-3.5 shadow-sm">
              <Bell size={24} />
            </div>
            <h3 className="text-base font-extrabold text-slate-800">
              {searchQuery ? "No matching notifications found." : (activeFilter === 'all' ? "You're all caught up!" : "No updates in this category")}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5 leading-relaxed">
              {searchQuery 
                ? `No notifications matched "${searchQuery}". Try a different keyword or reset filters.` 
                : getEmptyMessage()}
            </p>
            {searchQuery ? (
              <button 
                onClick={() => setSearchQuery('')}
                className="px-5 py-2.5 bg-[#000080] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-blue-900 transition-colors"
              >
                Clear Search
              </button>
            ) : (
              <button 
                onClick={() => navigate('/services')}
                className="px-5 py-2.5 bg-[#000080] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-blue-900 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Explore Services</span>
                <ChevronRight size={14} />
              </button>
            )}
          </div>
        )}

        {/* ═══════════════ NOTIFICATION DETAIL MODAL ═══════════════ */}
        {selectedNotification && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              
              {/* Modal Top Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-[#000080] uppercase tracking-wider">
                    🔔 Notification Details
                  </span>
                </div>
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Icon & Title */}
              <div className="flex items-start gap-3.5 mb-4">
                {renderTypeIcon(selectedNotification.type)}
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
                    {selectedNotification.type} Update
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1 leading-snug">
                    {selectedNotification.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <Clock size={12} />
                    <span>{selectedNotification.time || "Recently received"}</span>
                  </p>
                </div>
              </div>

              {/* Description Body */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-5">
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {selectedNotification.message}
                </p>
              </div>

              {/* Metadata details if applicable */}
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200 mb-6 space-y-2 text-xs">
                {selectedNotification.applicationId && (
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-500">Application ID:</span>
                    <span className="font-mono font-bold text-slate-900">{selectedNotification.applicationId}</span>
                  </div>
                )}
                {selectedNotification.documentId && (
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-500">Document ID:</span>
                    <span className="font-mono font-bold text-slate-900">{selectedNotification.documentId}</span>
                  </div>
                )}
                {selectedNotification.serviceId && (
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-500">Service Reference:</span>
                    <span className="font-bold text-[#000080]">{selectedNotification.serviceId}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Verification / Channel:</span>
                  <span className="font-bold text-emerald-700">DOWLET1 Verified Channel</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                >
                  Close
                </button>
                {(selectedNotification.applicationId || selectedNotification.documentId || selectedNotification.serviceId || selectedNotification.targetUrl) && (
                  <button
                    onClick={() => handleDetailAction(selectedNotification)}
                    className="flex-1 py-2.5 bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/20"
                  >
                    <span>
                      {selectedNotification.applicationId ? "View Application" :
                       selectedNotification.documentId ? "View Document" :
                       selectedNotification.serviceId ? "View Service" : "Open Target"}
                    </span>
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ═══════════════ DELETE CONFIRMATION MODAL ═══════════════ */}
        {deleteConfirmId && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 border border-red-100 flex items-center justify-center mx-auto mb-3">
                <Trash2 size={20} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Remove Notification?</h3>
              <p className="text-xs text-slate-500 mt-1 mb-5">
                Are you sure you want to remove this notification from your DOWLET1 inbox?
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ SECURITY & PRIVACY NOTICE ═══════════════ */}
        <div className="mt-8 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-[11px] text-slate-500 flex items-start gap-2.5">
          <ShieldCheck size={16} className="text-[#000080] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-700 uppercase tracking-wide">
              🔐 NOTIFICATION PRIVACY
            </span>
            <p className="mt-0.5 leading-relaxed text-slate-600">
              Notifications shown here are delivered through the secure DOWLET1 citizen mesh. All alerts reflect verified service milestones and document activity.
            </p>
          </div>
        </div>

      </div>
    </MainLayout>
  );
}
