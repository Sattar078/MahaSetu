import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Mic, Send, Bot, CheckCircle2, AlertCircle, Upload, ArrowRight, FileText, Sparkles } from 'lucide-react';
import { demoAPI, detectIntent } from '../../../utils/demoState';

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
    } else if (result.intent === 'CHECK_DOCUMENTS') {
      addAiMessage(`Here is your current Document Wallet status.`, {
        type: 'document_wallet',
        documents: demoAPI.getDocuments()
      }, 1000);
    } else if (result.intent === 'PROFILE_INFORMATION') {
      addAiMessage(`Here is your verified profile information.`, {
        type: 'verified_info',
        user: demoAPI.getUser()
      }, 1000);
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
    <div className="flex flex-col h-[100dvh] bg-slate-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center shadow-sm sticky top-0 z-10">
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

      {/* Chat Area */}
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
      <div className="bg-white p-3 border-t border-slate-100 flex items-center gap-2 pb-6">
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
  );
}
