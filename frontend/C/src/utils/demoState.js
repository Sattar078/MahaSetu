/**
 * demoState.js
 * 
 * Frontend-only mock state management and utility functions for the DOWLET1 SIH Prototype.
 * Uses localStorage to persist demo data across page reloads without a backend.
 */

// Initial pristine state for the demo
const INITIAL_STATE = {
  user: {
    name: "Rahul Kumar",
    fullName: "Rahul Kumar",
    age: 21,
    state: "Rajasthan",
    profileComplete: true,
    dob: "12 May 2005",
    address: "Jaipur, Rajasthan",
    mobile: "9876543210",
    identity: "Verified",
    income: "₹2,40,000"
  },
  verifiedInformation: {
    name: true,
    dob: true,
    address: true,
    mobile: true,
    identity: true
  },
  documents: [
    { name: "Identity Proof", status: "verified", available: true, verified: true },
    { name: "Address Proof", status: "verified", available: true, verified: true },
    { name: "Marksheet", status: "verified", available: true, verified: true },
    { name: "Income Proof", status: "missing", available: false, verified: false }
  ],
  services: [
    {
      id: "scholarship",
      name: "Scholarship Application",
      department: "Education Department",
      category: "Education",
      shortDescription: "Financial assistance for higher education and undergraduate studies.",
      description: "Apply for state scholarship for higher education.",
      eligibility: "Students with above 75% marks and family income below 2.5 LPA.",
      requiredDocuments: ["Identity Proof", "Marksheet", "Bank Account Proof"],
      recommendationTags: ["student", "education"],
      processingTime: "30 days",
      online: true,
      icon: "🎓"
    },
    {
      id: "income_certificate",
      name: "Income Certificate",
      department: "Revenue Department",
      category: "Certificates",
      shortDescription: "Official certificate verifying annual household income for benefits.",
      description: "Apply for an income certificate through DOWLET1 to prove your annual income for various schemes.",
      eligibility: "Residents meeting applicable eligibility conditions.",
      requiredDocuments: ["Identity Proof", "Address Proof", "Income Proof"],
      recommendationTags: ["certificate"],
      processingTime: "7–15 working days",
      online: true,
      icon: "📄"
    },
    {
      id: "employment",
      name: "Employment Registration",
      department: "Employment Department",
      category: "Jobs",
      shortDescription: "Official state registration for job notifications and public recruitments.",
      description: "Register for state employment exchange to receive employment assistance and job notices.",
      eligibility: "Unemployed youth aged 18-35.",
      requiredDocuments: ["Identity Proof", "Education Certificate"],
      recommendationTags: ["employment", "jobs"],
      processingTime: "2 working days",
      online: true,
      icon: "💼"
    },
    {
      id: "employment_registration",
      name: "Employment Registration",
      department: "Employment Department",
      category: "Jobs",
      shortDescription: "Official state registration for job notifications and public recruitments.",
      description: "Register for state employment exchange to receive employment assistance and job notices.",
      eligibility: "Unemployed youth aged 18-35.",
      requiredDocuments: ["Identity Proof", "Education Certificate"],
      recommendationTags: ["employment", "jobs"],
      processingTime: "2 working days",
      online: true,
      icon: "💼"
    },
    {
      id: "skill_development",
      name: "Skill Development Registration",
      department: "Skill Development Dept",
      category: "Jobs",
      shortDescription: "Govt certified skill training courses with placement support.",
      description: "Register for free skill training courses across technical, digital, and vocational disciplines.",
      eligibility: "10th pass candidates aged 18-30.",
      requiredDocuments: ["Identity Proof", "Marksheet"],
      recommendationTags: ["student", "youth", "employment"],
      processingTime: "Instant",
      online: true,
      icon: "🛠️"
    },
    {
      id: "residence_certificate",
      name: "Residence Certificate",
      department: "Revenue Department",
      category: "Certificates",
      shortDescription: "Domicile verification certificate for admission and state services.",
      description: "Apply for a residence certificate to prove your domicile.",
      eligibility: "Continuous resident for required number of years.",
      requiredDocuments: ["Identity Proof", "Address Proof", "Electricity Bill"],
      recommendationTags: ["certificate"],
      processingTime: "7–15 working days",
      online: true,
      icon: "🏠"
    },
    {
      id: "birth_certificate",
      name: "Birth Certificate",
      department: "Municipal Corporation",
      category: "Certificates",
      shortDescription: "Official birth record issued by municipal administration.",
      description: "Apply for or download a digital birth certificate.",
      eligibility: "Born within the jurisdiction of the municipality.",
      requiredDocuments: ["Hospital Record", "Parent Identity Proof"],
      recommendationTags: ["certificate"],
      processingTime: "7 working days",
      online: true,
      icon: "👶"
    },
    {
      id: "caste_certificate",
      name: "Caste Certificate",
      department: "Revenue Department",
      category: "Certificates",
      shortDescription: "Official certificate for availing constitutional reservations.",
      description: "Apply for a caste certificate for availing reservations.",
      eligibility: "Belongs to the recognized SC/ST/OBC categories.",
      requiredDocuments: ["Identity Proof", "Address Proof", "Affidavit"],
      recommendationTags: ["certificate"],
      processingTime: "15 working days",
      online: true,
      icon: "📜"
    },
    {
      id: "scholarship_renewal",
      name: "Student Scholarship Renewal",
      department: "Education Department",
      category: "Education",
      shortDescription: "Annual scholarship continuation for enrolled college students.",
      description: "Renew your existing scholarship application.",
      eligibility: "Must have passed previous year exams.",
      requiredDocuments: ["Identity Proof", "Marksheet", "Bank Account Proof"],
      recommendationTags: ["student", "education"],
      processingTime: "15 days",
      online: true,
      icon: "🎓"
    },
    {
      id: "education_assistance",
      name: "Education Assistance",
      department: "Education Department",
      category: "Education",
      shortDescription: "Financial assistance for academic books, tools, and uniforms.",
      description: "Financial assistance for purchasing books and uniforms.",
      eligibility: "Students from BPL families.",
      requiredDocuments: ["Identity Proof", "School ID", "Income Proof"],
      recommendationTags: ["student", "education"],
      processingTime: "15 days",
      online: true,
      icon: "📚"
    },
    {
      id: "pension",
      name: "Pension Application",
      department: "Social Welfare Department",
      category: "Welfare",
      shortDescription: "Monthly direct pension support for senior citizens and disabled.",
      description: "Apply for old age, widow, or disability pension.",
      eligibility: "Meeting age/disability criteria.",
      requiredDocuments: ["Identity Proof", "Age/Disability Proof", "Bank Account Proof"],
      recommendationTags: ["welfare", "pension"],
      processingTime: "45 days",
      online: true,
      icon: "👴"
    },
    {
      id: "social_welfare",
      name: "Social Welfare Scheme",
      department: "Social Welfare Department",
      category: "Welfare",
      shortDescription: "State welfare provisions and community sustenance grants.",
      description: "Apply for miscellaneous welfare benefits.",
      eligibility: "Vulnerable groups.",
      requiredDocuments: ["Identity Proof", "Relevant Certificate"],
      recommendationTags: ["welfare"],
      processingTime: "30 days",
      online: true,
      icon: "🤝"
    },
    {
      id: "health_scheme",
      name: "Universal Health Scheme",
      department: "Health Department",
      category: "Health",
      shortDescription: "Cashless secondary and tertiary hospital treatment cover.",
      description: "Register for the universal health insurance scheme.",
      eligibility: "All state residents.",
      requiredDocuments: ["Identity Proof", "Address Proof"],
      recommendationTags: ["health"],
      processingTime: "5 working days",
      online: true,
      icon: "🏥"
    },
    {
      id: "health_assistance",
      name: "Critical Health Assistance",
      department: "Health Department",
      category: "Health",
      shortDescription: "Emergency medical fund reimbursement for major operations.",
      description: "Apply for financial assistance for critical illnesses.",
      eligibility: "BPL card holders with diagnosed conditions.",
      requiredDocuments: ["Identity Proof", "Medical Certificate", "Income Proof"],
      recommendationTags: ["health"],
      processingTime: "20 days",
      online: true,
      icon: "🩺"
    },
    {
      id: "farmer_assistance",
      name: "Farmer Assistance Scheme",
      department: "Agriculture Department",
      category: "Agriculture",
      shortDescription: "Direct income support installment for agricultural landholders.",
      description: "Apply for annual financial assistance for farmers.",
      eligibility: "Landholding farmers.",
      requiredDocuments: ["Identity Proof", "Land Record", "Bank Account Proof"],
      recommendationTags: ["farmer", "agriculture"],
      processingTime: "30 days",
      online: true,
      icon: "🌾"
    },
    {
      id: "agriculture_subsidy",
      name: "Agriculture Subsidy",
      department: "Agriculture Department",
      category: "Agriculture",
      shortDescription: "Capital grant on drip irrigation and solar water pumps.",
      description: "Apply for subsidy on agricultural equipment.",
      eligibility: "Registered farmers.",
      requiredDocuments: ["Identity Proof", "Equipment Quotation", "Land Record"],
      recommendationTags: ["agriculture"],
      processingTime: "45 days",
      online: true,
      icon: "🚜"
    },
    {
      id: "driving_licence",
      name: "Driving Licence",
      department: "Transport Department",
      category: "Transport",
      shortDescription: "New learner or permanent licence with slot appointment.",
      description: "Apply for a new driving licence or learner's licence.",
      eligibility: "Age 18 and above.",
      requiredDocuments: ["Identity Proof", "Address Proof", "Age Proof"],
      recommendationTags: ["transport"],
      processingTime: "30 days",
      online: true,
      icon: "🚗"
    },
    {
      id: "vehicle_registration",
      name: "Vehicle Registration",
      department: "Transport Department",
      category: "Transport",
      shortDescription: "Online RC issuance and transfer for motor vehicles.",
      description: "Register your new vehicle.",
      eligibility: "Vehicle owners.",
      requiredDocuments: ["Identity Proof", "Purchase Invoice", "Insurance"],
      recommendationTags: ["transport"],
      processingTime: "15 days",
      online: true,
      icon: "🚘"
    }
  ],
  savedServices: [],
  applications: [],
  notifications: [],
  chatHistory: [
    {
      id: "init_1",
      sender: "ai",
      text: "👋 Hello Rahul!\n\nHow can I help you today?",
      type: "text",
      timestamp: new Date().toISOString()
    }
  ]
};

// Realistic mock applications for DOWLET1 demonstration
export const INITIAL_APPLICATIONS = [
  {
    id: "INC-RJ-2026-001245",
    serviceId: "income_certificate",
    serviceName: "Income Certificate",
    department: "Revenue Department",
    category: "Certificates",
    submittedDate: "22 Sep 2026",
    currentStatus: "Verification in Progress",
    status: "Verification in Progress",
    statusType: "in-progress", // 'in-progress' | 'action-required' | 'completed'
    statusStep: 2, // 0: Application Submitted, 1: Documents Received, 2: Verification in Progress, 3: Officer Verification, 4: Certificate Issued
    totalSteps: 5,
    applicantName: "Rahul Kumar",
    state: "Rajasthan",
    timeline: [
      {
        title: "Application Submitted",
        status: "completed",
        date: "22 Sep 2026",
        desc: "Online application submitted via DOWLET1 portal"
      },
      {
        title: "Documents Received",
        status: "completed",
        date: "22 Sep 2026",
        desc: "Identity & Address proofs received from Document Wallet"
      },
      {
        title: "Verification in Progress",
        status: "current",
        date: "Current Stage",
        desc: "Revenue inspector database and field verification"
      },
      {
        title: "Officer Verification",
        status: "pending",
        date: null,
        desc: "Tehsildar / Sub-Divisional Magistrate approval"
      },
      {
        title: "Certificate Issued",
        status: "pending",
        date: null,
        desc: "Digitally signed e-Certificate"
      }
    ],
    documents: [
      { name: "Identity Proof", type: "Aadhaar Card", verified: true },
      { name: "Address Proof", type: "Domicile / Bill", verified: true },
      { name: "Income Proof", type: "Salary / Land Slip", verified: true }
    ],
    nextSteps: "Your documents are being checked. The next step in this prototype is officer verification."
  },
  {
    id: "SCH-RJ-2026-004218",
    serviceId: "scholarship",
    serviceName: "Scholarship Application",
    department: "Education Department",
    category: "Education",
    submittedDate: "18 Sep 2026",
    currentStatus: "Action Required",
    status: "Action Required",
    statusType: "action-required",
    statusStep: 1,
    totalSteps: 5,
    applicantName: "Rahul Kumar",
    state: "Rajasthan",
    actionRequiredMessage: "Bank Account Proof is required to proceed with scholarship disbursement.",
    requiredActionDocument: "Bank Account Proof",
    timeline: [
      {
        title: "Application Submitted",
        status: "completed",
        date: "18 Sep 2026",
        desc: "Scholarship renewal form submitted"
      },
      {
        title: "Documents Received",
        status: "completed",
        date: "19 Sep 2026",
        desc: "Class 12 Marksheet and Identity proof received"
      },
      {
        title: "Action Required",
        status: "current",
        date: "Pending Action",
        desc: "Bank Account Proof needed for Direct Benefit Transfer"
      },
      {
        title: "Officer Verification",
        status: "pending",
        date: null,
        desc: "Nodal Institute / Education Officer sanction"
      },
      {
        title: "Scholarship Disbursed",
        status: "pending",
        date: null,
        desc: "Direct Benefit Transfer to bank account"
      }
    ],
    documents: [
      { name: "Identity Proof", type: "Aadhaar Card", verified: true },
      { name: "Marksheet", type: "Class 12 Marksheet", verified: true }
    ],
    nextSteps: "Please provide Bank Account Proof to continue with the application process."
  },
  {
    id: "RES-RJ-2026-009182",
    serviceId: "residence_certificate",
    serviceName: "Residence Certificate",
    department: "Revenue Department",
    category: "Certificates",
    submittedDate: "10 Sep 2026",
    currentStatus: "Certificate Issued",
    status: "Certificate Issued",
    statusType: "completed",
    statusStep: 4,
    totalSteps: 5,
    applicantName: "Rahul Kumar",
    state: "Rajasthan",
    certificateNumber: "RC-RJ-2026-8849102",
    issueDate: "18 Sep 2026",
    timeline: [
      {
        title: "Application Submitted",
        status: "completed",
        date: "10 Sep 2026",
        desc: "Online application submitted via DOWLET1"
      },
      {
        title: "Documents Received",
        status: "completed",
        date: "11 Sep 2026",
        desc: "Electricity Bill & Identity Proof verified"
      },
      {
        title: "Verification in Progress",
        status: "completed",
        date: "14 Sep 2026",
        desc: "Area patwari and address verification done"
      },
      {
        title: "Officer Verification",
        status: "completed",
        date: "16 Sep 2026",
        desc: "Tehsildar signed application"
      },
      {
        title: "Certificate Issued",
        status: "completed",
        date: "18 Sep 2026",
        desc: "Digitally signed e-Certificate generated"
      }
    ],
    documents: [
      { name: "Identity Proof", type: "Aadhaar Card", verified: true },
      { name: "Address Proof", type: "Electricity Bill", verified: true },
      { name: "Affidavit", type: "Self Declaration", verified: true }
    ],
    nextSteps: "Your certificate has been issued and is available for download."
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif_app_1",
    title: "Application Update",
    message: "Your Income Certificate application (INC-RJ-2026-001245) is currently under Verification in Progress.",
    targetUrl: "/applications/INC-RJ-2026-001245",
    applicationId: "INC-RJ-2026-001245",
    read: false,
    timestamp: "Just now"
  },
  {
    id: "notif_app_2",
    title: "Action Required",
    message: "Scholarship Application (SCH-RJ-2026-004218) requires Bank Account Proof.",
    targetUrl: "/applications/SCH-RJ-2026-004218",
    applicationId: "SCH-RJ-2026-004218",
    read: false,
    timestamp: "1 hour ago"
  },
  {
    id: "notif_app_3",
    title: "Certificate Issued",
    message: "Your Residence Certificate (RES-RJ-2026-009182) has been issued.",
    targetUrl: "/applications/RES-RJ-2026-009182",
    applicationId: "RES-RJ-2026-009182",
    read: true,
    timestamp: "4 days ago"
  }
];

// Initial mock verified information for Rahul Kumar (SIH Prototype)
export const INITIAL_VERIFIED_INFO = {
  personal: {
    id: "personal",
    title: "Personal Information",
    icon: "👤",
    fullName: "Rahul Kumar",
    dob: "15 May 2005",
    gender: "Male",
    state: "Rajasthan",
    district: "Jaipur",
    status: "Demo Verified",
    statusType: "verified", // "verified" | "needs-update" | "not-available"
    lastUpdated: "12 Sep 2026",
    description: "Name, DOB, Gender, State, District"
  },
  contact: {
    id: "contact",
    title: "Contact Information",
    icon: "📱",
    mobile: "+91 XXXXX XXXXX",
    email: "rahul@example.com",
    rawMobile: "9876543210",
    status: "Demo Verified",
    statusType: "verified",
    lastUpdated: "12 Sep 2026",
    description: "Mobile number, Email address"
  },
  address: {
    id: "address",
    title: "Address Information",
    icon: "📍",
    addressLine: "Plot 42, Malviya Nagar",
    district: "Jaipur",
    state: "Rajasthan",
    pin: "3020XX",
    status: "Demo Verified",
    statusType: "verified",
    lastUpdated: "12 Sep 2026",
    description: "Residential address, District, State, PIN"
  },
  identity: {
    id: "identity",
    title: "Government Identity",
    icon: "🪪",
    identityType: "Government ID",
    idNumber: "XXXX-XXXX-XXXX",
    documentRef: "Identity Proof",
    status: "Connected for Demo",
    statusType: "verified",
    lastUpdated: "10 Sep 2026",
    description: "Government ID connection (Demo verification)"
  }
};

// Initial mock consent & data sharing settings
export const INITIAL_CONSENT_SETTINGS = {
  serviceDataSharing: true,
  profileReuse: true,
  documentReuse: true
};

// Initial mock information usage history
export const INITIAL_INFORMATION_USAGE = [
  {
    id: "usage_1",
    serviceName: "Income Certificate",
    serviceId: "income_certificate",
    action: "Information reused",
    date: "Today",
    timestamp: "22 Sep 2026",
    fieldsReused: ["Name", "Address", "Identity"]
  },
  {
    id: "usage_2",
    serviceName: "Scholarship Application",
    serviceId: "scholarship",
    action: "Information reused",
    date: "Yesterday",
    timestamp: "21 Sep 2026",
    fieldsReused: ["Name", "DOB", "Address", "Mobile"]
  },
  {
    id: "usage_3",
    serviceName: "Residence Certificate",
    serviceId: "residence_certificate",
    action: "Information reused",
    date: "18 Sep 2026",
    timestamp: "18 Sep 2026",
    fieldsReused: ["Name", "Address", "Identity"]
  }
];

// Core API to interact with LocalStorage State
export const demoAPI = {
  /**
   * Initializes state if it doesn't exist or upgrades existing demo state
   */
  init() {
    const existing = localStorage.getItem('dowlet1_demo_state');
    if (!existing) {
      localStorage.setItem('dowlet1_demo_state', JSON.stringify({
        ...INITIAL_STATE,
        applications: INITIAL_APPLICATIONS,
        notifications: INITIAL_NOTIFICATIONS,
        verifiedInfo: INITIAL_VERIFIED_INFO,
        consentSettings: INITIAL_CONSENT_SETTINGS,
        informationUsage: INITIAL_INFORMATION_USAGE
      }));
    } else {
      try {
        const parsed = JSON.parse(existing);
        let updated = false;
        
        // Ensure user has profileComplete, age, state
        if (!parsed.user || parsed.user.age === undefined || !parsed.user.state) {
          parsed.user = { ...INITIAL_STATE.user, ...(parsed.user || {}) };
          updated = true;
        }
        
        // Ensure verifiedInfo exists
        if (!parsed.verifiedInfo || !parsed.verifiedInfo.personal) {
          parsed.verifiedInfo = INITIAL_VERIFIED_INFO;
          updated = true;
        }

        // Ensure consentSettings exists
        if (!parsed.consentSettings) {
          parsed.consentSettings = INITIAL_CONSENT_SETTINGS;
          updated = true;
        }

        // Ensure informationUsage exists
        if (!parsed.informationUsage || parsed.informationUsage.length === 0) {
          parsed.informationUsage = INITIAL_INFORMATION_USAGE;
          updated = true;
        }

        // Ensure Marksheet is in documents
        if (!parsed.documents || !parsed.documents.some(d => d.name.toLowerCase().includes('marksheet'))) {
          parsed.documents = INITIAL_STATE.documents;
          updated = true;
        }

        // Ensure applications list contains complete mock applications with timelines
        if (!parsed.applications || parsed.applications.length === 0 || !parsed.applications[0].timeline) {
          parsed.applications = INITIAL_APPLICATIONS;
          updated = true;
        }

        // Ensure notifications exist
        if (!parsed.notifications || parsed.notifications.length === 0) {
          parsed.notifications = INITIAL_NOTIFICATIONS;
          updated = true;
        }

        // Sync services to ensure updated fields (shortDescription, recommendationTags, etc.)
        if (!parsed.services || parsed.services.length < 5 || !parsed.services[0].shortDescription) {
          parsed.services = INITIAL_STATE.services;
          updated = true;
        }

        if (updated) {
          localStorage.setItem('dowlet1_demo_state', JSON.stringify(parsed));
        }
      } catch (err) {
        localStorage.setItem('dowlet1_demo_state', JSON.stringify({
          ...INITIAL_STATE,
          applications: INITIAL_APPLICATIONS,
          notifications: INITIAL_NOTIFICATIONS,
          verifiedInfo: INITIAL_VERIFIED_INFO,
          consentSettings: INITIAL_CONSENT_SETTINGS,
          informationUsage: INITIAL_INFORMATION_USAGE
        }));
      }
    }
  },

  /**
   * Resets the entire demo state
   */
  reset() {
    localStorage.setItem('dowlet1_demo_state', JSON.stringify({
      ...INITIAL_STATE,
      applications: INITIAL_APPLICATIONS,
      notifications: INITIAL_NOTIFICATIONS,
      verifiedInfo: INITIAL_VERIFIED_INFO,
      consentSettings: INITIAL_CONSENT_SETTINGS,
      informationUsage: INITIAL_INFORMATION_USAGE
    }));
  },

  /**
   * Gets the full current state
   */
  getState() {
    this.init();
    return JSON.parse(localStorage.getItem('dowlet1_demo_state'));
  },

  /**
   * Updates part of the state
   */
  updateState(partialState) {
    const currentState = this.getState();
    const newState = { ...currentState, ...partialState };
    localStorage.setItem('dowlet1_demo_state', JSON.stringify(newState));
    return newState;
  },

  /**
   * Append a message to chat history
   */
  addChatMessage(message) {
    const state = this.getState();
    const newMessage = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString()
    };
    state.chatHistory.push(newMessage);
    this.updateState({ chatHistory: state.chatHistory });
    return newMessage;
  },

  /**
   * Retrieve chat history
   */
  getChatHistory() {
    return this.getState().chatHistory;
  },

  /**
   * Get User Info
   */
  getUser() {
    return this.getState().user;
  },

  /**
   * Get Documents
   */
  getDocuments() {
    return this.getState().documents;
  },

  /**
   * Update Document status (e.g. mock upload)
   */
  uploadMockDocument(docName) {
    const state = this.getState();
    const updatedDocs = state.documents.map(d => 
      d.name.includes(docName) || docName.includes(d.name)
        ? { ...d, status: "uploaded", available: true }
        : d
    );
    this.updateState({ documents: updatedDocs });
  },

  /**
   * Find a specific service
   */
  getService(id) {
    if (!id) return null;
    if (id === 'employment' || id === 'employment_registration') {
      return this.getState().services.find(s => s.id === 'employment' || s.id === 'employment_registration');
    }
    return this.getState().services.find(s => s.id === id);
  },

  /**
   * Get services by category
   */
  getServicesByCategory(category) {
    const services = this.getState().services;
    return services.filter(s => s.category.toLowerCase() === category.toLowerCase());
  },

  /**
   * Search services
   */
  searchServices(query) {
    const q = query.toLowerCase();
    const services = this.getState().services;
    return services.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.category.toLowerCase().includes(q) || 
      s.department.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
    );
  },

  /**
   * Mock recommended services
   */
  getRecommendedServices() {
    return getRecommendedServices();
  },
  
  /**
   * Mock popular services
   */
  getPopularServices() {
    const services = this.getState().services;
    return [
      services.find(s => s.id === 'income_certificate'),
      services.find(s => s.id === 'scholarship'),
      services.find(s => s.id === 'birth_certificate'),
      services.find(s => s.id === 'pension')
    ].filter(Boolean);
  },

  /**
   * Save a service
   */
  saveService(id) {
    const state = this.getState();
    if (!state.savedServices) state.savedServices = [];
    if (!state.savedServices.includes(id)) {
      state.savedServices.push(id);
      this.updateState({ savedServices: state.savedServices });
    }
  },

  removeSavedService(id) {
    const state = this.getState();
    if (!state.savedServices) return;
    const filtered = state.savedServices.filter(s => s !== id);
    this.updateState({ savedServices: filtered });
  },

  isServiceSaved(id) {
    const state = this.getState();
    return (state.savedServices || []).includes(id);
  },

  getSavedServices() {
    const state = this.getState();
    const savedIds = state.savedServices || [];
    return state.services.filter(s => savedIds.includes(s.id));
  },

  /**
   * Gets all mock applications
   */
  getApplications() {
    return this.getState().applications || [];
  },
  
  /**
   * Gets a specific application
   */
  getApplication(id) {
    return (this.getState().applications || []).find(a => a.id === id);
  },

  /**
   * Submit a new mock application
   */
  submitApplication(serviceId, formData) {
    const state = this.getState();
    const service = this.getService(serviceId);
    
    // Generate mock ID like INC-RJ-2026-001245
    const prefix = service.name.substring(0, 3).toUpperCase();
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const appId = `${prefix}-RJ-2026-${randomNum}`;

    const newApplication = {
      id: appId,
      serviceId: service.id,
      serviceName: service.name,
      department: service.department,
      status: "Application Submitted",
      statusStep: 0, // 0: Submitted, 1: Documents Verified, 2: Officer Verification, 3: Issued
      formData: formData,
      submittedAt: new Date().toISOString()
    };

    const updatedApps = [newApplication, ...state.applications];
    this.updateState({ applications: updatedApps });
    
    return newApplication;
  },

  /**
   * Updates and advances an application's status along the official 5-step lifecycle
   */
  updateApplicationStatus(appId) {
    const state = this.getState();
    const apps = state.applications || [];
    const index = apps.findIndex(a => a.id === appId);
    if (index === -1) return null;

    const app = apps[index];
    const statusFlow = [
      "Application Submitted",
      "Documents Received",
      "Verification in Progress",
      "Officer Verification",
      "Certificate Issued"
    ];

    // If currently action-required, resolve to Verification in Progress
    if (app.statusType === 'action-required') {
      return this.resolveActionRequired(appId, app.requiredActionDocument || "Bank Account Proof");
    }

    // Do not progress if already completed
    if (app.statusType === 'completed' || app.statusStep >= statusFlow.length - 1) {
      return app;
    }

    const nextStep = app.statusStep + 1;
    const nextStatus = statusFlow[nextStep];
    const isCompleted = nextStep === statusFlow.length - 1;

    // Next steps dynamic narrative
    const nextStepsMap = {
      0: "Your application has been submitted online and queued for document intake.",
      1: "Your documents have been received. The next step is field and revenue database verification.",
      2: "Your submitted information is being verified. The next step in this prototype is officer verification.",
      3: "Your application is awaiting final officer approval and digital signature.",
      4: "Your certificate has been issued and is available for preview and download."
    };

    // Update timeline steps
    const updatedTimeline = (app.timeline || []).map((t, idx) => {
      if (idx < nextStep) {
        return {
          ...t,
          status: 'completed',
          date: t.date && t.date !== 'Pending' && t.date !== 'Current Stage' ? t.date : '22 Sep 2026'
        };
      } else if (idx === nextStep) {
        return {
          ...t,
          status: isCompleted ? 'completed' : 'current',
          date: isCompleted ? '22 Sep 2026' : 'Current Stage'
        };
      } else {
        return {
          ...t,
          status: 'pending',
          date: null
        };
      }
    });

    const updatedApp = {
      ...app,
      statusStep: nextStep,
      status: nextStatus,
      currentStatus: nextStatus,
      statusType: isCompleted ? 'completed' : 'in-progress',
      timeline: updatedTimeline,
      nextSteps: nextStepsMap[nextStep] || "Processing your application.",
      certificateNumber: isCompleted && !app.certificateNumber ? `RC-RJ-2026-${Math.floor(1000000 + Math.random() * 9000000)}` : app.certificateNumber,
      issueDate: isCompleted && !app.issueDate ? '22 Sep 2026' : app.issueDate,
      updatedAt: new Date().toISOString()
    };

    apps[index] = updatedApp;
    this.updateState({ applications: apps });

    // Generate real-time notification
    this.createNotification(
      updatedApp,
      `Your ${updatedApp.serviceName} application status has changed to '${nextStatus}'.`
    );

    return updatedApp;
  },

  /**
   * Alias for backwards compatibility
   */
  progressApplicationStatus(appId) {
    return this.updateApplicationStatus(appId);
  },

  /**
   * Resolves an Action Required state by providing the missing document
   */
  resolveActionRequired(appId, docName = "Bank Account Proof") {
    const state = this.getState();
    const apps = state.applications || [];
    const index = apps.findIndex(a => a.id === appId);
    if (index === -1) return null;

    const app = apps[index];
    const docs = Array.isArray(app.documents) ? [...app.documents] : [];
    
    // Add document if not already present
    if (!docs.some(d => (d.name || d) === docName)) {
      docs.push({ name: docName, type: "Bank Passbook / Statement", verified: true });
    }

    const updatedTimeline = (app.timeline || []).map((t, idx) => {
      if (idx <= 1) {
        return { ...t, status: 'completed', date: t.date || '22 Sep 2026' };
      } else if (idx === 2) {
        return { ...t, title: "Verification in Progress", status: 'current', date: 'Current Stage', desc: "Eligibility and document verification in progress" };
      } else {
        return { ...t, status: 'pending', date: null };
      }
    });

    const updatedApp = {
      ...app,
      status: "Verification in Progress",
      currentStatus: "Verification in Progress",
      statusType: "in-progress",
      statusStep: 2,
      actionRequiredMessage: null,
      requiredActionDocument: null,
      documents: docs,
      timeline: updatedTimeline,
      nextSteps: "Your documents have been received. Field and eligibility verification is now in progress.",
      updatedAt: new Date().toISOString()
    };

    apps[index] = updatedApp;
    this.updateState({ applications: apps });

    this.createNotification(
      updatedApp,
      `Action resolved: ${docName} uploaded. ${updatedApp.serviceName} is now under Verification in Progress.`
    );

    return updatedApp;
  },

  /**
   * Creates an in-app notification for an application status change
   */
  createNotification(app, message) {
    const state = this.getState();
    const notifs = state.notifications || [];
    const newNotif = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      title: "Application Update",
      message: message || `Status changed for ${app.serviceName}.`,
      targetUrl: `/applications/${app.id}`,
      applicationId: app.id,
      read: false,
      timestamp: "Just now"
    };

    const updatedNotifs = [newNotif, ...notifs].slice(0, 15);
    this.updateState({ notifications: updatedNotifs });
    return newNotif;
  },

  /**
   * Gets notifications
   */
  getNotifications() {
    return this.getState().notifications || INITIAL_NOTIFICATIONS;
  },

  /**
   * Mark all notifications as read
   */
  markNotificationsAsRead() {
    const notifs = (this.getState().notifications || []).map(n => ({ ...n, read: true }));
    this.updateState({ notifications: notifs });
  },

  /**
   * Get all verified information categories
   */
  getVerifiedInformation() {
    return this.getState().verifiedInfo || INITIAL_VERIFIED_INFO;
  },

  /**
   * Get specific category of verified info
   */
  getInformationCategory(category) {
    const info = this.getVerifiedInformation();
    return info[category] || null;
  },

  /**
   * Update category fields and record update
   */
  updateInformation(category, updatedFields) {
    const state = this.getState();
    const info = state.verifiedInfo || { ...INITIAL_VERIFIED_INFO };
    
    if (info[category]) {
      info[category] = {
        ...info[category],
        ...updatedFields,
        status: updatedFields.status || "Demo Verified",
        statusType: updatedFields.statusType || "verified",
        lastUpdated: "Just now"
      };

      // Also sync user profile object if personal / address was changed
      const user = state.user || {};
      if (category === 'personal') {
        if (updatedFields.fullName) {
          user.name = updatedFields.fullName;
          user.fullName = updatedFields.fullName;
        }
        if (updatedFields.dob) user.dob = updatedFields.dob;
        if (updatedFields.state) user.state = updatedFields.state;
      } else if (category === 'address') {
        if (updatedFields.addressLine || updatedFields.district || updatedFields.state) {
          user.address = `${updatedFields.district || user.district || 'Jaipur'}, ${updatedFields.state || user.state || 'Rajasthan'}`;
        }
        if (updatedFields.state) user.state = updatedFields.state;
      }

      this.updateState({ verifiedInfo: info, user });
    }
    return info[category];
  },

  /**
   * Overwrite all verified information
   */
  saveVerifiedInformation(newInfo) {
    return this.updateState({ verifiedInfo: newInfo });
  },

  /**
   * Get consent settings
   */
  getConsentSettings() {
    return this.getState().consentSettings || INITIAL_CONSENT_SETTINGS;
  },

  /**
   * Update specific consent toggle
   */
  updateConsentSetting(key, value) {
    const state = this.getState();
    const settings = { ...(state.consentSettings || INITIAL_CONSENT_SETTINGS), [key]: value };
    this.updateState({ consentSettings: settings });
    return settings;
  },

  /**
   * Get recent information usage log
   */
  getInformationUsage() {
    return this.getState().informationUsage || INITIAL_INFORMATION_USAGE;
  },

  /**
   * Record a new information reuse entry
   */
  addInformationUsage(serviceName, fields = ["Name", "Address", "Identity"]) {
    const state = this.getState();
    const current = state.informationUsage || INITIAL_INFORMATION_USAGE;
    const newEntry = {
      id: `usage_${Date.now()}`,
      serviceName,
      action: "Information reused",
      date: "Today",
      timestamp: "Just now",
      fieldsReused: fields
    };
    const updated = [newEntry, ...current].slice(0, 10);
    this.updateState({ informationUsage: updated });
    return updated;
  }
};

/**
 * MOCK INTENT DETECTION ENGINE
 * Simulates a real NLP AI by matching keywords in the query to predefined intents and entities.
 */
export const detectIntent = (query) => {
  const q = (query || '').toLowerCase();
  
  // 1. Check for specific applications in progress (Tracking)
  if (
    q.includes("kaha") || 
    q.includes("status") || 
    q.includes("track") || 
    q.includes("pahucha") ||
    q.includes("application")
  ) {
    const state = demoAPI.getState();
    const apps = state.applications || [];
    
    if (apps.length > 0) {
      // Find matching app by specific service or keyword
      const matchedApp = apps.find(a => 
        (q.includes("scholarship") && a.serviceName.toLowerCase().includes("scholarship")) ||
        (q.includes("income") && a.serviceName.toLowerCase().includes("income")) ||
        (q.includes("residence") && a.serviceName.toLowerCase().includes("residence")) ||
        q.includes(a.serviceName.toLowerCase()) ||
        q.includes((a.id || '').toLowerCase())
      ) || apps[0];

      return {
        intent: "TRACK_APPLICATION",
        application: matchedApp
      };
    } else {
      return {
        intent: "NO_APPLICATION_FOUND",
        message: "I couldn't find any active applications to track."
      };
    }
  }

  // 2. Check for Service Application
  if (q.includes("apply") || q.includes("banana") || q.includes("chahiye")) {
    const state = demoAPI.getState();
    
    // Find matching service
    const matchedService = state.services.find(s => 
      q.includes(s.name.toLowerCase().split(' ')[0]) || 
      (q.includes("income") && s.id === "income_certificate") ||
      (q.includes("scholarship") && s.id === "scholarship") ||
      (q.includes("birth") && s.id === "birth_certificate") ||
      (q.includes("pension") && s.id === "pension")
    );

    if (matchedService) {
      return {
        intent: "APPLY_SERVICE",
        service: matchedService
      };
    }
  }

  // 3. Document inquiries
  if (q.includes("document") || q.includes("kaunse") || q.includes("wallet")) {
    return { intent: "CHECK_DOCUMENTS" };
  }

  // 4. Profile & Verified Information inquiries (English & Hindi)
  if (
    q.includes("profile") || 
    q.includes("information") || 
    q.includes("verified") || 
    q.includes("kya hai") || 
    q.includes("details") || 
    q.includes("address") ||
    q.includes("pehchan") ||
    q.includes("meri jankari") ||
    q.includes("mera naam")
  ) {
    return { 
      intent: "PROFILE_INFORMATION",
      verifiedInfo: demoAPI.getVerifiedInformation()
    };
  }

  // 5. Help / General
  if (q.includes("help") || q.includes("madad") || q.includes("hi") || q.includes("hello")) {
    return { intent: "HELP" };
  }

  // Default fallback
  return {
    intent: "UNKNOWN",
    message: "I couldn't find an exact matching service. Try searching for certificates, scholarships, pensions or welfare services."
  };
};

// ==================================================
// RECOMMENDATION SYSTEM FUNCTIONS (DOWLET1 PROTOTYPE)
// ==================================================

/**
 * Calculates mock relevance score and matched items for a service.
 * Used internally for ranking. Numerical scores are NOT displayed to the citizen.
 */
export function calculateRecommendationRelevance(service, user, documents = [], verifiedInfo = {}, activity = []) {
  let score = 0;
  const availableDocs = documents
    .filter(d => d.available || d.verified)
    .map(d => (d.name || '').toLowerCase());

  // 1. Profile information match (completeness)
  const isProfileMatched = Boolean(user && user.profileComplete);
  if (isProfileMatched) {
    score += 2;
  }

  // 2. Demographic / Age relevance
  if (user && user.age !== undefined) {
    const age = Number(user.age);
    // Student & Youth age bracket (18-25)
    if (age >= 18 && age <= 25) {
      if (
        service.category?.toLowerCase() === 'education' ||
        service.recommendationTags?.includes('student') ||
        service.recommendationTags?.includes('youth')
      ) {
        score += 4;
      }
      if (service.category?.toLowerCase() === 'jobs' || service.recommendationTags?.includes('employment')) {
        score += 2;
      }
    }
  }

  // 3. Document match - checks available user documents against required documents
  let matchedDocs = [];
  if (Array.isArray(service.requiredDocuments)) {
    service.requiredDocuments.forEach(reqDoc => {
      const reqLower = reqDoc.toLowerCase();
      const hasMatch = availableDocs.some(userDoc => 
        userDoc.includes(reqLower) || reqLower.includes(userDoc)
      );
      if (hasMatch) {
        score += 3;
        matchedDocs.push(reqDoc);
      }
    });
  }

  // Flagship student scholarship priority for citizen with verified Marksheet
  if (service.id === 'scholarship' && matchedDocs.some(d => d.toLowerCase().includes('marksheet'))) {
    score += 6;
  }

  // 4. State affinity
  if (user && user.state) {
    score += 1;
  }

  // 5. Activity match (previous applications or saved services)
  if (activity && Array.isArray(activity)) {
    const hasActivity = activity.some(act => act.serviceId === service.id || act.category === service.category);
    if (hasActivity) {
      score += 2;
    }
  }

  return {
    score,
    matchedDocs,
    isProfileMatched,
    hasDocuments: matchedDocs.length > 0
  };
}

/**
 * Retrieves the user's available and verified documents.
 */
export function getAvailableDocuments() {
  const docs = demoAPI.getDocuments();
  return docs.filter(d => d.available || d.verified);
}

/**
 * Retrieves the current prototype profile context.
 */
export function getProfileContext() {
  const state = demoAPI.getState();
  return {
    user: state.user,
    verifiedInformation: state.verifiedInformation,
    documents: state.documents
  };
}

/**
 * Returns prioritized recommended services based on the user profile, documents, and activity.
 */
export function getRecommendedServices(customUser, customServices) {
  demoAPI.init();
  const state = demoAPI.getState();
  const user = customUser || state.user || {};
  const services = customServices || state.services || [];
  const docs = state.documents || [];
  const verifiedInfo = state.verifiedInformation || {};
  const applications = state.applications || [];
  const savedList = state.savedServices || [];

  // Deduplicate services (in case of aliases like employment / employment_registration)
  const seenIds = new Set();
  const uniqueServices = services.filter(s => {
    if (seenIds.has(s.id)) return false;
    seenIds.add(s.id);
    return true;
  });

  const scoredServices = uniqueServices.map(service => {
    const relevance = calculateRecommendationRelevance(service, user, docs, verifiedInfo, applications);

    // Build human-friendly available info badges
    const availableInfo = [];
    if (relevance.isProfileMatched) {
      availableInfo.push("Profile information available");
    }

    if (relevance.matchedDocs.length > 0) {
      relevance.matchedDocs.forEach(d => {
        availableInfo.push(`${d} available`);
      });
    } else {
      availableInfo.push("Required documents available");
    }

    return {
      ...service,
      relevanceScore: relevance.score,
      matchedDocs: relevance.matchedDocs,
      availableInfo: availableInfo.slice(0, 3),
      isSaved: savedList.includes(service.id),
      recommendationReason: "Recommended based on your available profile information.",
      prototypeDisclaimer: "Prototype recommendation based on available profile information."
    };
  });

  // Sort by highest relevance score
  return scoredServices.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * Save / unsave service helpers
 */
export function saveService(id) {
  demoAPI.saveService(id);
}

export function removeSavedService(id) {
  demoAPI.removeSavedService(id);
}

export function isServiceSaved(id) {
  return demoAPI.isServiceSaved(id);
}

export function getSavedServices() {
  return demoAPI.getSavedServices();
}

/**
 * Navigation actions
 */
export function openServiceDetails(navigate, serviceId) {
  navigate(`/service-details/${serviceId}`);
}

export function openAIForService(navigate, service) {
  navigate('/ai', { state: { serviceContext: service } });
}

export function startApplication(navigate, serviceId) {
  navigate(`/apply/${serviceId}/start`);
}

/**
 * Refresh recommendations (recalculates from current state)
 */
export function refreshRecommendations() {
  return getRecommendedServices();
}

// ==================================================
// MY APPLICATIONS SYSTEM FUNCTIONS (DOWLET1 PROTOTYPE)
// ==================================================

/**
 * Returns all mock applications from central state
 */
export function getApplications() {
  demoAPI.init();
  return demoAPI.getApplications();
}

/**
 * Gets a specific application by its ID
 */
export function getApplicationById(id) {
  demoAPI.init();
  return demoAPI.getApplication(id);
}

/**
 * Filters applications by statusType ('all', 'in-progress', 'completed', 'action-required')
 */
export function filterApplications(statusType = 'all', appsList = null) {
  const apps = appsList || getApplications();
  if (!statusType || statusType.toLowerCase() === 'all') {
    return apps;
  }
  const norm = statusType.toLowerCase();
  if (norm === 'in progress' || norm === 'in-progress') {
    return apps.filter(a => a.statusType === 'in-progress');
  }
  if (norm === 'completed') {
    return apps.filter(a => a.statusType === 'completed');
  }
  if (norm === 'needs action' || norm === 'action-required' || norm === 'action required') {
    return apps.filter(a => a.statusType === 'action-required');
  }
  return apps;
}

/**
 * Searches applications by ID, service name, or department
 */
export function searchApplications(query = '', appsList = null) {
  const apps = appsList || getApplications();
  if (!query || !query.trim()) return apps;
  const q = query.toLowerCase().trim();
  return apps.filter(a => 
    (a.id || '').toLowerCase().includes(q) ||
    (a.serviceName || '').toLowerCase().includes(q) ||
    (a.department || '').toLowerCase().includes(q) ||
    (a.currentStatus || a.status || '').toLowerCase().includes(q)
  );
}

/**
 * Opens an application details view
 */
export function openApplication(navigate, id) {
  navigate(`/applications/${id}`);
}

/**
 * Progresses an application to its next status
 */
export function updateApplicationStatus(id) {
  return demoAPI.updateApplicationStatus(id);
}

/**
 * Returns the next status string without modifying state
 */
export function getNextStatus(currentStatus) {
  const statusFlow = [
    "Application Submitted",
    "Documents Received",
    "Verification in Progress",
    "Officer Verification",
    "Certificate Issued"
  ];
  const idx = statusFlow.indexOf(currentStatus);
  if (idx > -1 && idx < statusFlow.length - 1) {
    return statusFlow[idx + 1];
  }
  if (currentStatus === "Action Required") {
    return "Verification in Progress";
  }
  return null;
}

/**
 * Resolves an action required state (e.g. uploading missing document)
 */
export function resolveActionRequired(id, docName) {
  return demoAPI.resolveActionRequired(id, docName);
}

/**
 * Creates an in-app notification
 */
export function createNotification(application, message) {
  return demoAPI.createNotification(application, message);
}

/**
 * Saves applications array to state
 */
export function saveApplications(apps) {
  demoAPI.updateState({ applications: apps });
}

/**
 * Loads applications from state
 */
export function loadApplications() {
  return getApplications();
}

/**
 * Developer / Demo reset function: restores initial mock applications
 */
export function resetDemoData() {
  demoAPI.reset();
}

/**
 * Notifications access
 */
export function getNotifications() {
  return demoAPI.getNotifications();
}

export function markNotificationsAsRead() {
  demoAPI.markNotificationsAsRead();
}

// ==================================================
// VERIFIED INFORMATION SYSTEM FUNCTIONS (DOWLET1 PROTOTYPE)
// ==================================================

/**
 * Returns all verified information categories from central state
 */
export function getVerifiedInformation() {
  demoAPI.init();
  return demoAPI.getVerifiedInformation();
}

/**
 * Gets a specific information category (personal, contact, address, identity)
 */
export function getInformationCategory(category) {
  demoAPI.init();
  return demoAPI.getInformationCategory(category);
}

/**
 * Updates a specific information category with new mock data
 */
export function updateInformation(category, data) {
  return demoAPI.updateInformation(category, data);
}

/**
 * Saves entire verified information object
 */
export function saveVerifiedInformation(info) {
  return demoAPI.saveVerifiedInformation(info);
}

/**
 * Loads verified information from state
 */
export function loadVerifiedInformation() {
  return getVerifiedInformation();
}

/**
 * Gets current mock consent and data sharing settings
 */
export function getConsentSettings() {
  demoAPI.init();
  return demoAPI.getConsentSettings();
}

/**
 * Updates a specific consent setting toggle
 */
export function updateConsentSetting(key, value) {
  return demoAPI.updateConsentSetting(key, value);
}

/**
 * Gets mock recent information usage history
 */
export function getInformationUsage() {
  demoAPI.init();
  return demoAPI.getInformationUsage();
}

/**
 * Records an information reuse event into recent usage history
 */
export function addInformationUsage(serviceName, fields) {
  return demoAPI.addInformationUsage(serviceName, fields);
}

/**
 * Opens information detail modal/view
 */
export function openInformationDetails(navigate, category) {
  navigate(`/verified-info?category=${category}&action=view`);
}

/**
 * Opens edit modal/view for a category
 */
export function openEditInformation(navigate, category) {
  navigate(`/verified-info?category=${category}&action=edit`);
}

/**
 * Opens consent modal helper
 */
export function openConsentModal(service) {
  return { isOpen: true, service };
}

/**
 * Initiates application flow using pre-filled verified information
 */
export function reuseInformation(navigate, serviceId) {
  navigate(`/apply/${serviceId}?reuse=true`);
}



