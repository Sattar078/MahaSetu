import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Mic, Send, Bot, CheckCircle2, AlertCircle, Upload, ArrowRight, 
  FileText, Sparkles, MessageSquare, User, Lock, ShieldCheck, Globe, LogOut, Bell, Clock,
  Star, Bookmark, BookmarkCheck
} from 'lucide-react';
import { 
  demoAPI, detectIntent, getProfile, getConsentSettings, getLanguage, logout,
  getSavedServices, saveService, removeSavedService 
} from '../../../utils/demoState';
import MainLayout from '../../components/MainLayout';

export default function AIAssistant() {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceContext = location.state?.serviceContext;

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Refresh state from localStorage and attach service context if present
  useEffect(() => {
    demoAPI.init();
    const history = demoAPI.getChatHistory() || [];
    
    if (serviceContext) {
      const contextMsg = {
        id: `ctx_${Date.now()}`,
        sender: 'ai',
        text: `You're viewing ${serviceContext.name}.\n\nWhat would you like to know?`,
        type: 'service_context_greeting',
        payload: {
          service: serviceContext,
          suggestedQuestions: [
            "Am I eligible?",
            "What documents do I need?",
            "How do I apply?",
            "Start application"
          ]
        },
        timestamp: new Date().toISOString()
      };
      setMessages([...history, contextMsg]);
    } else {
      setMessages(history);
    }
  }, [serviceContext]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addAiMessage = (text, customPayload = null, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      const msg = { sender: 'ai', text, type: customPayload ? customPayload.type : 'text', payload: customPayload };
      const newMsg = demoAPI.addChatMessage(msg);
      setMessages(prev => [...prev, newMsg]);
      setIsTyping(false);
    }, delay);
  };

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMsg = demoAPI.addChatMessage({ sender: 'user', text, type: 'text' });
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    
    // Process intent
    const result = detectIntent(text);
    
    if (result.intent === 'APPLY_SERVICE') {
      addAiMessage(`Sure. I can help you apply for an ${result.service.name}.`, {
        type: 'service_detected',
        service: result.service
      }, 1000);
    } else if (result.intent === 'TRACK_APPLICATION') {
      addAiMessage(`Your ${result.application.serviceName} application is currently: ${result.application.status}.`, {
        type: 'track_application',
        application: result.application
      }, 1000);
    } else if (result.intent === 'DOCUMENT_QUERY' || result.intent === 'CHECK_DOCUMENTS') {
      const docs = result.documents || demoAPI.getDocuments();
      const specific = result.specificDoc;
      const count = docs.length;
      let text = `Your DOWLET1 Document Wallet contains ${count} documents:\n\n` + 
        docs.map(d => `${d.status === 'verified' ? '✓' : '●'} ${d.name}`).join('\n');
      if (specific) {
        text += `\n\n${specific.name} is available for reuse.`;
      } else {
        text += `\n\nIncome Proof is available for reuse.`;
      }

      addAiMessage(text, {
        type: 'document_wallet',
        documents: docs,
        specificDoc: specific
      }, 1000);
    } else if (result.intent === 'NOTIFICATION_QUERY') {
      const unreadCount = result.unreadCount !== undefined ? result.unreadCount : (result.notifications || []).filter(n => !n.read).length;
      const notifs = result.notifications || [];
      const text = unreadCount > 0 
        ? `You have ${unreadCount} unread updates in your DOWLET1 Notification Centre.` 
        : `You are all caught up! There are no unread notifications right now.`;

      addAiMessage(text, {
        type: 'notification_query',
        notifications: notifs.slice(0, 4),
        unreadCount: unreadCount
      }, 800);
    } else if (result.intent === 'APPLICATION_UPDATE_QUERY') {
      const app = result.application;
      const notif = result.notification;
      const text = `Your ${app.serviceName} application is currently under ${app.currentStatus || app.status}.`;
      
      addAiMessage(text, {
        type: 'application_update_query',
        application: app,
        notification: notif
      }, 800);
    } else if (result.intent === 'PROFILE_INFORMATION') {
      const prof = result.profile || getProfile();
      addAiMessage(`Here is your DOWLET1 profile.`, {
        type: 'profile_card',
        profile: prof
      }, 700);
    } else if (result.intent === 'CONSENT_QUERY') {
      addAiMessage(`Here are your current data-sharing preferences.`, {
        type: 'consent_card',
        consentSettings: result.consentSettings || getConsentSettings()
      }, 700);
    } else if (result.intent === 'PRIVACY_QUERY') {
      addAiMessage(`Here are your privacy and account security settings.`, {
        type: 'privacy_card'
      }, 700);
    } else if (result.intent === 'SETTINGS_QUERY') {
      addAiMessage(`Here are your profile and portal settings.`, {
        type: 'settings_card'
      }, 700);
    } else if (result.intent === 'LANGUAGE_QUERY') {
      addAiMessage(`You can update your preferred language for DOWLET1.`, {
        type: 'language_card',
        language: result.language || getLanguage()
      }, 700);
    } else if (result.intent === 'LOGOUT_QUERY') {
      addAiMessage(`Are you sure you want to log out of your session?`, {
        type: 'logout_card'
      }, 700);
    } else if (result.intent === 'SAVED_SERVICES') {
      const saved = result.savedServices || getSavedServices();
      const count = saved.length;
      const text = count > 0 
        ? `Here are the services you saved for later (${count} saved):`
        : `You have not saved any services yet. Explore services to bookmark what you need!`;
      addAiMessage(text, {
        type: 'saved_services_card',
        services: saved
      }, 700);
    } else if (result.intent === 'OPEN_SAVED_SERVICE') {
      addAiMessage(`Opening your Saved Services page.`, {
        type: 'open_saved_card'
      }, 600);
    } else if (result.intent === 'REMOVE_SAVED_SERVICE') {
      const svc = result.service;
      const text = svc 
        ? `Removed ${svc.name} from your Saved Services.`
        : `No matching saved service was found to remove.`;
      addAiMessage(text, {
        type: 'remove_saved_card',
        service: svc
      }, 700);
    } else if (result.intent === 'APPLY_SAVED_SERVICE') {
      const svc = result.service;
      const saved = result.savedServices || getSavedServices();
      const text = svc 
        ? `You can apply directly for your saved service: ${svc.name}.`
        : `Here are your saved services ready for application:`;
      addAiMessage(text, {
        type: 'apply_saved_card',
        service: svc,
        services: saved
      }, 700);
    } else if (result.intent === 'HELP') {
      addAiMessage(`What would you like help with?`, { type: 'help_options' }, 800);
    } else {
      addAiMessage(result.message, null, 1500);
    }
  };

  const handleServiceAction = (action, service) => {
    if (action === 'check_eligibility') {
      addAiMessage("Let me check your eligibility...", { type: 'loading' }, 0);
      
      setTimeout(() => {
        // Remove loading message and add eligibility result
        setMessages(prev => prev.filter(m => m.type !== 'loading'));
        addAiMessage("You appear eligible to continue. (Prototype eligibility check)", {
          type: 'eligibility_result',
          service: service
        }, 0);
      }, 2000);
    } else if (action === 'view_requirements') {
      addAiMessage(`Here are the requirements for ${service.name}: \n\n- ${service.requiredDocuments.join('\n- ')}`);
    }
  };

  const handleEligibilityContinue = (service) => {
    const user = demoAPI.getUser();
    addAiMessage("You have already provided this information. DOWLET1 can securely reuse eligible information for this application.", {
      type: 'reuse_info',
      user: user,
      service: service
    });
  };

  const handleUseVerifiedInfo = (service) => {
    const docs = demoAPI.getDocuments();
    addAiMessage(`Let's check if you have the required documents for ${service.name}.`, {
      type: 'document_check',
      service: service,
      documents: docs
    });
  };

  const handleDocumentContinue = (service) => {
    // Navigate to the Review/Autofill screen
    navigate('/ai/review', { state: { serviceId: service.id } });
  };

  const handleSuggestedQuestion = (question, service) => {
    // Add user message
    const userMsg = demoAPI.addChatMessage({ sender: 'user', text: question, type: 'text' });
    setMessages(prev => [...prev, userMsg]);

    if (question === "Am I eligible?") {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const aiMsg = {
          sender: 'ai',
          text: `Based on your available profile information (Age: 21, State: Rajasthan) and verified identity, you may meet the basic requirements in this prototype.`,
          type: 'eligibility_result',
          payload: { service: service }
        };
        demoAPI.addChatMessage(aiMsg);
        setMessages(prev => [...prev, aiMsg]);
      }, 800);
    } else if (question === "What documents do I need?") {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const docs = demoAPI.getDocuments();
        const aiMsg = {
          sender: 'ai',
          text: `Here are the required documents for ${service.name} and your wallet availability status:`,
          type: 'document_check',
          payload: { service: service, documents: docs }
        };
        demoAPI.addChatMessage(aiMsg);
        setMessages(prev => [...prev, aiMsg]);
      }, 800);
    } else if (question === "How do I apply?") {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const aiMsg = {
          sender: 'ai',
          text: `Here is the DOWLET1 4-step streamlined workflow for ${service.name}:\n\n1. Eligibility & profile verification check\n2. Digital document reuse from your DigiLocker / wallet\n3. Pre-filled form verification and citizen consent\n4. Submission with instant tracking ID`,
          type: 'apply_guidance',
          payload: { service: service }
        };
        demoAPI.addChatMessage(aiMsg);
        setMessages(prev => [...prev, aiMsg]);
      }, 800);
    } else if (question === "Start application") {
      navigate(`/apply/${service.id}/start`);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col min-h-full pb-20 lg:pb-6">
        {/* Mobile Header */}
        <div className="bg-white px-4 py-3 flex items-center shadow-sm sticky top-0 z-10 lg:hidden">
          <button onClick={() => navigate('/home')} className="text-slate-600 p-1 -ml-1 mr-3 hover:bg-slate-100 rounded-lg">
            <ArrowLeft size={22} />
          </button>
          <div>
            <h1 className="font-bold text-[#000080] text-lg flex items-center gap-2">
              <Bot size={20} className="text-[#FF9933]" /> DOWLET1 AI
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">Your intelligent government service assistant</p>
          </div>
        </div>

        {/* Responsive Container */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:bg-white lg:rounded-3xl lg:border lg:border-slate-200 lg:shadow-sm overflow-hidden lg:h-[78vh]">
          
          {/* Desktop Left Sidebar (Prompt Suggestions & Copilot Info) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-between p-6 bg-slate-50 border-r border-slate-200 overflow-y-auto">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#000080] text-white flex items-center justify-center shadow-md">
                  <Bot size={22} className="text-[#FF9933]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">DOWLET1 AI Copilot</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Natural Language Scheme Guide</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Ask questions in English, Hindi, or regional languages. I can assess your eligibility, explain scheme criteria, or guide you through 1-click applications.
              </p>

              <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                Suggested Prompts
              </h4>
              <div className="space-y-2 mb-6">
                {[
                  "Meri profile dikhao",
                  "Meri consent settings dikhao",
                  "Settings kholo",
                  "Meri language change karni hai",
                  "Kya mere application ka koi update hai?",
                  "Mere notifications dikhao",
                  "Am I eligible for Post-Matric Scholarship?"
                ].map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSend(prompt)}
                    className="w-full text-left text-xs p-2.5 rounded-xl bg-white hover:bg-blue-50/60 border border-slate-200 hover:border-blue-200 text-slate-700 hover:text-[#000080] transition-colors leading-snug flex items-start gap-2 shadow-2xs"
                  >
                    <Sparkles size={13} className="text-[#FF9933] shrink-0 mt-0.5" />
                    <span>{prompt}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-1">
                <CheckCircle2 size={13} className="text-[#138808]" />
                <span>Pre-Verified Citizen Mesh Active</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                Logged in as Rahul Kumar (Jaipur, Rajasthan). Answers automatically adapt to your demographics.
              </p>
            </div>
          </div>

          {/* Right Column: Chat Stream & Input Area */}
          <div className="col-span-1 lg:col-span-8 flex flex-col h-full bg-slate-50 lg:bg-white overflow-hidden">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={msg.id || idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-[#000080] text-white rounded-br-none' 
                : 'bg-white border border-slate-100 text-slate-800 rounded-bl-none'
            }`}>
              
              {msg.text && <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>}
              
              {/* Context Greeting Suggested Questions */}
              {msg.type === 'service_context_greeting' && msg.payload?.suggestedQuestions && (
                <div className="mt-3 space-y-2 pt-2 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Suggested Questions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {msg.payload.suggestedQuestions.map((q, qIdx) => (
                      <button
                        key={qIdx}
                        onClick={() => handleSuggestedQuestion(q, msg.payload.service)}
                        className="text-left bg-blue-50 hover:bg-blue-100 text-[#000080] border border-blue-200 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <Sparkles size={12} className="text-[#FF9933] shrink-0" />
                        <span>{q}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Apply Guidance */}
              {msg.type === 'apply_guidance' && msg.payload?.service && (
                <div className="mt-3 pt-2 border-t border-slate-100">
                  <button 
                    onClick={() => navigate(`/apply/${msg.payload.service.id}/start`)}
                    className="w-full bg-[#000080] text-white text-xs font-bold py-2.5 rounded-lg text-center flex justify-center items-center gap-1.5 shadow-sm hover:bg-blue-900 transition-colors"
                  >
                    Start Application <ArrowRight size={14} />
                  </button>
                </div>
              )}
              
              {/* Custom Payloads */}
              {msg.type === 'service_detected' && msg.payload?.service && (
                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Service detected:</p>
                  <p className="font-bold text-slate-800">{msg.payload.service.name}</p>
                  <p className="text-[11px] text-[#000080] mb-3">{msg.payload.service.department}</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleServiceAction('check_eligibility', msg.payload.service)} className="flex-1 bg-[#000080] text-white text-xs font-bold py-2 rounded-lg text-center">Check Eligibility</button>
                    <button onClick={() => handleServiceAction('view_requirements', msg.payload.service)} className="flex-1 bg-white border border-slate-200 text-slate-700 text-xs font-bold py-2 rounded-lg text-center">View Requirements</button>
                  </div>
                </div>
              )}

              {msg.type === 'loading' && (
                <div className="mt-2 flex items-center gap-2 text-slate-500 text-sm">
                  <div className="w-4 h-4 border-2 border-slate-300 border-t-[#FF9933] rounded-full animate-spin"></div>
                  Checking...
                </div>
              )}

              {msg.type === 'eligibility_result' && msg.payload?.service && (
                <div className="mt-3">
                  <div className="space-y-1 mb-3">
                    <p className="text-xs flex items-center gap-1 text-green-600"><CheckCircle2 size={14}/> Profile information available</p>
                    <p className="text-xs flex items-center gap-1 text-green-600"><CheckCircle2 size={14}/> State information available</p>
                    <p className="text-xs flex items-center gap-1 text-green-600"><CheckCircle2 size={14}/> Basic eligibility conditions checked</p>
                  </div>
                  <button onClick={() => handleEligibilityContinue(msg.payload.service)} className="w-full bg-[#138808] text-white text-xs font-bold py-2.5 rounded-lg text-center flex justify-center items-center gap-1">
                    Continue <ArrowRight size={14} />
                  </button>
                </div>
              )}

              {msg.type === 'reuse_info' && msg.payload?.user && (
                <div className="mt-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 mb-2 text-[#000080]">
                    <CheckCircle2 size={16} />
                    <span className="font-bold text-xs uppercase tracking-wider">Verified Information</span>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase">Full Name</p>
                      <p className="text-sm font-semibold">{msg.payload.user.fullName}</p>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase">DOB</p>
                        <p className="text-xs font-medium">{msg.payload.user.dob}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase">Mobile</p>
                        <p className="text-xs font-medium text-green-600 flex items-center gap-1"><CheckCircle2 size={12}/> Verified</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleUseVerifiedInfo(msg.payload.service)} className="w-full bg-[#000080] text-white text-xs font-bold py-2.5 rounded-lg text-center shadow-sm">
                    Use Verified Information
                  </button>
                </div>
              )}

              {msg.type === 'document_check' && (
                <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <p className="font-bold text-sm mb-2 text-slate-800">Required Documents</p>
                  <div className="space-y-2 mb-4">
                    {msg.payload.service.requiredDocuments.map((docReq, i) => {
                      const userDoc = msg.payload.documents.find(d => d.name.includes(docReq) || docReq.includes(d.name));
                      const isAvailable = userDoc?.available;
                      return (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <span className="text-slate-600">{docReq}</span>
                          {isAvailable ? (
                            <span className="text-green-600 font-medium flex items-center gap-1"><CheckCircle2 size={12}/> Available</span>
                          ) : (
                            <span className="text-red-500 font-medium flex items-center gap-1"><AlertCircle size={12}/> Missing</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* If any missing, show upload, else just continue */}
                  {msg.payload.service.requiredDocuments.some(docReq => {
                    const userDoc = msg.payload.documents.find(d => d.name.includes(docReq) || docReq.includes(d.name));
                    return !userDoc?.available;
                  }) ? (
                    <div className="space-y-2 border-t border-slate-100 pt-3">
                      <p className="text-xs text-red-500 mb-2">Some documents are missing.</p>
                      <button onClick={() => {
                        // Mock upload
                        demoAPI.uploadMockDocument("Income Proof");
                        addAiMessage("Income Proof has been successfully uploaded to your Document Wallet.", null, 500);
                        setTimeout(() => handleUseVerifiedInfo(msg.payload.service), 1500);
                      }} className="w-full bg-slate-100 text-slate-800 text-xs font-bold py-2 rounded-lg flex justify-center items-center gap-2">
                        <Upload size={14} /> Mock Upload Missing
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => handleDocumentContinue(msg.payload.service)} className="w-full bg-[#138808] text-white text-xs font-bold py-2.5 rounded-lg text-center flex justify-center items-center gap-1">
                      Continue to Application <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              )}

              {msg.type === 'track_application' && msg.payload?.application && (
                <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{msg.payload.application.serviceName}</p>
                      <p className="text-[10px] text-slate-500">{msg.payload.application.department}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      msg.payload.application.statusType === 'completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : msg.payload.application.statusType === 'action-required'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200 animate-pulse'
                          : 'bg-blue-50 text-[#000080] border border-blue-200'
                    }`}>
                      {msg.payload.application.status}
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-slate-100 mb-3 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 text-[11px]">Application No:</span>
                      <span className="font-mono font-bold text-slate-800 text-[11px]">{msg.payload.application.id}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 text-[11px]">Submitted:</span>
                      <span className="text-slate-700 text-[11px]">{msg.payload.application.submittedDate}</span>
                    </div>
                    {msg.payload.application.actionRequiredMessage && (
                      <div className="mt-1 pt-1.5 border-t border-amber-100 text-[11px] text-amber-800 font-medium">
                        ⚠️ {msg.payload.application.actionRequiredMessage}
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => navigate(`/applications/${msg.payload.application.id}`)} 
                    className="w-full bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Track Status & Timeline</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}

              {msg.type === 'verified_info' && (
                <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl shadow-sm space-y-2.5">
                  <div className="flex items-center gap-2 text-[#000080]">
                    <span className="text-sm">🔐</span>
                    <p className="font-extrabold text-xs tracking-wider uppercase">Your DOWLET1 Information</p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-100 space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                      <CheckCircle2 size={13} className="text-[#138808]" />
                      <span>Name available (Rahul Kumar)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                      <CheckCircle2 size={13} className="text-[#138808]" />
                      <span>Address available (Jaipur, Rajasthan)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                      <CheckCircle2 size={13} className="text-[#138808]" />
                      <span>Mobile available (+91 XXXXX XXXXX)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                      <CheckCircle2 size={13} className="text-[#138808]" />
                      <span>Identity available (Government ID)</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/verified-info')} 
                    className="w-full bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>View Verified Information</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}

              {msg.type === 'document_wallet' && (
                <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm space-y-2.5">
                  <div className="flex items-center gap-2 text-[#000080]">
                    <FileText size={16} />
                    <p className="font-extrabold text-xs tracking-wider uppercase">DOWLET1 Document Wallet</p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
                    {(msg.payload?.documents || []).map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {doc.status === 'verified' ? (
                            <CheckCircle2 size={13} className="text-[#138808]" />
                          ) : (
                            <Clock size={13} className="text-amber-600" />
                          )}
                          <span className="font-bold text-slate-800">{doc.name}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          doc.status === 'verified' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {doc.status === 'verified' ? 'Verified' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate('/documents')}
                    className="w-full bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Open Document Wallet</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}

              {/* 🔔 Notification Query Card */}
              {msg.type === 'notification_query' && (
                <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between text-[#000080]">
                    <div className="flex items-center gap-2">
                      <Bell size={16} />
                      <p className="font-extrabold text-xs tracking-wider uppercase">DOWLET1 Notifications</p>
                    </div>
                    {msg.payload?.unreadCount > 0 && (
                      <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                        {msg.payload.unreadCount} unread
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    {(msg.payload?.notifications || []).map((notif, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => navigate('/notifications')}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                          !notif.read ? 'bg-white border-blue-200 shadow-2xs' : 'bg-slate-100/60 border-slate-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <p className="font-bold text-slate-800 text-[11px] leading-snug">{notif.title}</p>
                          {!notif.read ? (
                            <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded-md shrink-0">
                              ● Unread
                            </span>
                          ) : (
                            <span className="text-[9px] text-slate-400 shrink-0">
                              ✓ Read
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 line-clamp-1">{notif.message}</p>
                        <span className="text-[9px] text-slate-400 mt-1 block">{notif.time || "Recent"}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate('/notifications')}
                    className="w-full bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Open Notification Centre</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}

              {/* 📋 Application Update Query Card (Section 22 & 39) */}
              {msg.type === 'application_update_query' && msg.payload?.application && (
                <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-extrabold text-slate-900 text-xs">
                        {msg.payload.application.serviceName}
                      </p>
                      <p className="text-[10px] text-slate-500">{msg.payload.application.department}</p>
                    </div>
                    <span className="text-[10px] font-bold bg-blue-100 text-[#000080] border border-blue-200 px-2 py-0.5 rounded-full shrink-0">
                      {msg.payload.application.currentStatus || msg.payload.application.status}
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
                    <div className="flex justify-between text-slate-600">
                      <span className="text-[11px] text-slate-400">Application ID:</span>
                      <span className="font-mono font-bold text-slate-800 text-[11px]">{msg.payload.application.id}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="text-[11px] text-slate-400">Current Stage:</span>
                      <span className="font-semibold text-emerald-700">{msg.payload.application.currentStatus || msg.payload.application.status}</span>
                    </div>
                    {msg.payload.notification && (
                      <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                        🔔 <em>{msg.payload.notification.message}</em>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/applications/${msg.payload.application.id}`)}
                      className="flex-1 bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1 shadow-sm transition-colors"
                    >
                      <span>View Application</span>
                      <ArrowRight size={13} />
                    </button>
                    <button
                      onClick={() => navigate('/notifications')}
                      className="flex-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1 shadow-2xs transition-colors"
                    >
                      <span>View Notification</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 👤 Profile Card */}
              {msg.type === 'profile_card' && (
                <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#000080] to-blue-800 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                      {msg.payload?.profile?.fullName ? msg.payload.profile.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'RK'}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-xs">{msg.payload?.profile?.fullName || 'Rahul Kumar'}</p>
                      <p className="text-[10px] text-slate-500">{msg.payload?.profile?.district || 'Jaipur'}, {msg.payload?.profile?.state || 'Rajasthan'}</p>
                    </div>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 text-[11px]">Profile Completeness:</span>
                      <span className="font-bold text-[#000080] text-[11px]">85%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#000080] rounded-full" style={{ width: '85%' }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-emerald-700 pt-1 font-semibold">
                      <span>✓ Demo Verified Citizen</span>
                      <span>✓ Active Identity</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/profile')}
                    className="w-full bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Open Profile</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              )}

              {/* 🔐 Consent Card */}
              {msg.type === 'consent_card' && (
                <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm space-y-2.5">
                  <div className="flex items-center gap-2 text-amber-700">
                    <Lock size={15} />
                    <p className="font-extrabold text-xs tracking-wider uppercase">Consent & Data Sharing</p>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-slate-600">Profile Information Reuse</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded text-[10px]">ON</span>
                    </div>
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-slate-600">Document Reuse</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded text-[10px]">ON</span>
                    </div>
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-slate-600">Application Data Sharing</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded text-[10px]">ON</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/profile?section=consent')}
                    className="w-full bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Manage Consent</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              )}

              {/* 🛡 Privacy & Security Card */}
              {msg.type === 'privacy_card' && (
                <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm space-y-2.5">
                  <div className="flex items-center gap-2 text-[#000080]">
                    <ShieldCheck size={16} />
                    <p className="font-extrabold text-xs tracking-wider uppercase">Privacy & Security</p>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">OTP Verification</span>
                      <span className="font-bold text-emerald-700">✓ Enabled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Session Security</span>
                      <span className="font-bold text-blue-700">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Password Controls</span>
                      <span className="text-slate-500">Configured</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/privacy')}
                    className="w-full bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Security Settings</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              )}

              {/* ⚙ Settings Card */}
              {msg.type === 'settings_card' && (
                <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm space-y-2.5">
                  <p className="font-extrabold text-xs tracking-wider uppercase text-slate-800">DOWLET1 Settings</p>
                  <p className="text-slate-500 text-[11px]">Manage your profile, consent toggles, language, and security.</p>
                  <button
                    onClick={() => navigate('/profile')}
                    className="w-full bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Open Settings</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              )}

              {/* 🌐 Language Card */}
              {msg.type === 'language_card' && (
                <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm space-y-2.5">
                  <div className="flex items-center gap-2 text-[#000080]">
                    <Globe size={15} />
                    <p className="font-extrabold text-xs tracking-wider uppercase">Language / भाषा</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                    <span className="text-slate-500 text-[11px]">Current Selection: </span>
                    <strong className="text-slate-800">{msg.payload?.language || 'English'}</strong>
                  </div>
                  <button
                    onClick={() => navigate('/profile?section=language')}
                    className="w-full bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Change Language</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              )}

              {/* 🚪 Logout Card */}
              {msg.type === 'logout_card' && (
                <div className="mt-3 p-3.5 bg-red-50/60 border border-red-200 rounded-2xl shadow-sm space-y-2.5">
                  <div className="flex items-center gap-2 text-red-700">
                    <LogOut size={15} />
                    <p className="font-extrabold text-xs tracking-wider uppercase">Session Sign Out</p>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Are you sure you want to log out of DOWLET1?
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => logout(navigate)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 rounded-xl shadow-sm transition-colors"
                    >
                      Logout
                    </button>
                    <button
                      onClick={() => navigate('/home')}
                      className="flex-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-xl shadow-2xs transition-colors"
                    >
                      Stay Signed In
                    </button>
                  </div>
                </div>
              )}

              {/* ⭐ Saved Services Card */}
              {msg.type === 'saved_services_card' && (
                <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-center justify-between text-[#000080]">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-amber-500 fill-amber-400" />
                      <p className="font-extrabold text-xs tracking-wider uppercase">Saved Services</p>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500">
                      {(msg.payload?.services || []).length} saved
                    </span>
                  </div>

                  {(msg.payload?.services || []).length > 0 ? (
                    <div className="space-y-2">
                      {(msg.payload?.services || []).map((service, idx) => (
                        <div key={service.id || idx} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <span className="text-xl">{service.icon || '📄'}</span>
                              <div>
                                <h4 className="text-xs font-bold text-slate-900 leading-tight">{service.name}</h4>
                                <p className="text-[10px] text-slate-500">{service.department}</p>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#0d599f] border border-blue-100">
                              {service.category}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                            <button
                              onClick={() => navigate(`/service-details/${service.id || service.canonicalId}`, { state: { service } })}
                              className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg transition-colors text-center"
                            >
                              View
                            </button>
                            <button
                              onClick={() => navigate(`/apply/${service.id || service.canonicalId}/start`)}
                              className="flex-1 py-1.5 px-2 bg-[#000080] hover:bg-blue-900 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm"
                            >
                              <span>Apply</span>
                              <ArrowRight size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                      <p className="text-xs text-slate-500 mb-2">No saved services found right now.</p>
                      <button
                        onClick={() => navigate('/services')}
                        className="text-xs font-bold text-[#000080] underline hover:text-blue-900"
                      >
                        Explore Services
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => navigate('/saved')}
                    className="w-full bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Open Saved Services Page</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              )}

              {/* 📂 Open Saved Services Card */}
              {msg.type === 'open_saved_card' && (
                <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm space-y-2.5">
                  <div className="flex items-center gap-2 text-[#000080]">
                    <Star size={16} className="text-amber-500 fill-amber-400" />
                    <p className="font-extrabold text-xs tracking-wider uppercase">Saved Services Portal</p>
                  </div>
                  <p className="text-slate-600 text-xs">
                    Quickly view and manage all government services you bookmarked for later.
                  </p>
                  <button
                    onClick={() => navigate('/saved')}
                    className="w-full bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Open Saved Services</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              )}

              {/* 🗑️ Remove Saved Card */}
              {msg.type === 'remove_saved_card' && (
                <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm space-y-2.5">
                  <div className="flex items-center gap-2 text-slate-800">
                    <CheckCircle2 size={16} className="text-[#138808]" />
                    <p className="font-extrabold text-xs tracking-wider uppercase">Saved Services Updated</p>
                  </div>
                  <p className="text-slate-600 text-xs">
                    {msg.payload?.service ? `Removed ${msg.payload.service.name} from your saved bookmarks.` : 'Saved services updated.'}
                  </p>
                  <div className="flex items-center gap-2">
                    {msg.payload?.service && (
                      <button
                        onClick={() => {
                          saveService(msg.payload.service.id);
                          setMessages(prev => [...prev, {
                            sender: 'ai',
                            text: `Restored ${msg.payload.service.name} to Saved Services.`,
                            type: 'open_saved_card'
                          }]);
                        }}
                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold py-2 rounded-xl transition-colors text-center"
                      >
                        Undo
                      </button>
                    )}
                    <button
                      onClick={() => navigate('/saved')}
                      className="flex-1 bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold py-2 rounded-xl transition-colors text-center"
                    >
                      View Saved
                    </button>
                  </div>
                </div>
              )}

              {/* 📝 Apply Saved Card */}
              {msg.type === 'apply_saved_card' && (
                <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm space-y-2.5">
                  <div className="flex items-center gap-2 text-[#000080]">
                    <Star size={16} className="text-amber-500 fill-amber-400" />
                    <p className="font-extrabold text-xs tracking-wider uppercase">Apply for Saved Service</p>
                  </div>
                  {msg.payload?.service ? (
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{msg.payload.service.icon || '📄'}</span>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{msg.payload.service.name}</h4>
                          <p className="text-[10px] text-slate-500">{msg.payload.service.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                        <button
                          onClick={() => navigate(`/service-details/${msg.payload.service.id || msg.payload.service.canonicalId}`, { state: { service: msg.payload.service } })}
                          className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors text-center"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => navigate(`/apply/${msg.payload.service.id || msg.payload.service.canonicalId}/start`)}
                          className="flex-1 py-1.5 bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm"
                        >
                          <span>Apply Now</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate('/saved')}
                      className="w-full bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                    >
                      <span>Select from Saved Services</span>
                      <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              )}

            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <span className="text-xs text-slate-400 ml-1">DOWLET1 AI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 flex gap-2 overflow-x-auto hide-scrollbar border-t border-slate-50">
          {["Income Certificate", "Scholarship", "Pension", "Birth Certificate"].map(chip => (
            <button 
              key={chip}
              onClick={() => handleSend(`Mujhe ${chip} banana hai`)}
              className="whitespace-nowrap bg-white border border-[#FF9933]/30 text-[#000080] px-3 py-1.5 rounded-full text-xs font-medium shadow-sm hover:bg-orange-50"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white p-3 border-t border-slate-100 flex items-center gap-2 pb-6 lg:pb-3">
        <button className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full">
          <Mic size={20} />
        </button>
        <div className="flex-1 bg-slate-50 rounded-full px-4 py-2 flex items-center border border-slate-200 focus-within:border-[#000080]">
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about government services..."
            className="bg-transparent border-none outline-none w-full text-sm placeholder:text-slate-400"
          />
        </div>
        <button 
          onClick={() => handleSend()}
          disabled={!inputValue.trim()}
          className={`p-2 rounded-full flex items-center justify-center transition-colors ${inputValue.trim() ? 'bg-[#000080] text-white' : 'bg-slate-100 text-slate-400'}`}
        >
          <Send size={18} className="ml-1" />
        </button>
      </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
