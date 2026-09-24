/**
 * demoState.js
 * 
 * Frontend-only mock state management and utility functions for the DOWLET1 SIH Prototype.
 * Uses localStorage to persist demo data across page reloads without a backend.
 */

// Initial pristine documents for Document Wallet module
export const INITIAL_DOCUMENTS = [
  {
    id: "DOC-001",
    name: "Identity Proof",
    type: "identity",
    category: "Identity",
    fileName: "identity_proof.pdf",
    fileSize: "1.4 MB",
    status: "verified", // "verified" | "pending" | "action_required" | "not_verified"
    addedDate: "18 Sep 2026",
    issuer: "UIDAI / Govt of India",
    docNumberMasked: "XXXX-XXXX-4819",
    expiryDate: "Permanent / Lifetime",
    usedIn: [],
    available: true,
    verified: true
  },
  {
    id: "DOC-002",
    name: "Address Proof",
    type: "address",
    category: "Address",
    fileName: "address_proof.pdf",
    fileSize: "850 KB",
    status: "verified",
    addedDate: "19 Sep 2026",
    issuer: "Rajasthan DISCOM / Electricity Dept",
    docNumberMasked: "RJ-DIS-88219",
    expiryDate: "Valid for 6 months",
    usedIn: ["INC-RJ-2026-001245"],
    available: true,
    verified: true
  },
  {
    id: "DOC-003",
    name: "Income Proof",
    type: "income",
    category: "Income",
    fileName: "income_proof.pdf",
    fileSize: "1.2 MB",
    status: "pending",
    addedDate: "20 Sep 2026",
    issuer: "Revenue Department, Rajasthan",
    docNumberMasked: "INC-SAL-2026-991",
    expiryDate: "31 Mar 2027",
    usedIn: [],
    available: true,
    verified: false
  }
];

export const INITIAL_DOCUMENT_ACTIVITY = [
  {
    id: "ACT-001",
    title: "Income Proof uploaded",
    time: "Today, 10:30 AM",
    date: "20 Sep 2026",
    type: "upload",
    docId: "DOC-003",
    status: "pending"
  },
  {
    id: "ACT-002",
    title: "Identity Proof reused for Income Certificate",
    time: "Yesterday, 04:15 PM",
    date: "19 Sep 2026",
    type: "reuse",
    docId: "DOC-001",
    status: "reused"
  },
  {
    id: "ACT-003",
    title: "Address Proof verified via DISCOM mesh",
    time: "20 Sep 2026, 02:00 PM",
    date: "20 Sep 2026",
    type: "verified",
    docId: "DOC-002",
    status: "verified"
  }
];

// Initial pristine saved services for Saved Services module
export const INITIAL_SAVED_SERVICES = [
  {
    id: "scholarship-001",
    canonicalId: "scholarship",
    name: "Scholarship Application",
    category: "Education",
    department: "Education Department",
    description: "Apply for eligible education assistance and scholarship services.",
    shortDescription: "Explore scholarship and education assistance services.",
    icon: "🎓",
    status: "Saved",
    profileAvailable: true,
    documentsAvailable: true,
    recommendationNote: "Based on your available profile information."
  },
  {
    id: "income-001",
    canonicalId: "income_certificate",
    name: "Income Certificate",
    category: "Certificates",
    department: "Revenue Department",
    description: "Apply for an income certificate through the relevant service workflow.",
    shortDescription: "Apply for an income certificate through the service workflow.",
    icon: "📄",
    status: "Saved",
    profileAvailable: true,
    documentsAvailable: true,
    recommendationNote: "Based on your available profile information."
  },
  {
    id: "pension-001",
    canonicalId: "pension",
    name: "Pension Service",
    category: "Welfare",
    department: "Social Welfare Department",
    description: "Explore pension-related government services and application requirements.",
    shortDescription: "Explore pension-related government services.",
    icon: "🏦",
    status: "Saved",
    profileAvailable: true,
    documentsAvailable: true,
    recommendationNote: "Based on your available profile information."
  }
];

// Initial pristine state for the demo
const INITIAL_STATE = {
  savedServices: ["scholarship", "income_certificate", "pension", "scholarship-001", "income-001", "pension-001"],
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
  documents: INITIAL_DOCUMENTS,
  documentActivity: INITIAL_DOCUMENT_ACTIVITY,
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
      name: "Pension Service",
      department: "Social Welfare Department",
      category: "Welfare",
      shortDescription: "Explore pension-related government services.",
      description: "Explore pension-related government services and application requirements.",
      eligibility: "Meeting age/disability criteria.",
      requiredDocuments: ["Identity Proof", "Age/Disability Proof", "Bank Account Proof"],
      recommendationTags: ["welfare", "pension"],
      processingTime: "45 days",
      online: true,
      icon: "🏦"
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
    nextSteps: "Your documents are being checked. The next step is officer verification."
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
    id: "NOT-001",
    type: "application",
    title: "Application Status Updated",
    message: "Your Income Certificate application is now under Verification in Progress.",
    time: "2 min ago",
    timestamp: "2026-09-24T18:30:00",
    read: false,
    applicationId: "INC-RJ-2026-001245",
    targetUrl: "/applications/INC-RJ-2026-001245"
  },
  {
    id: "NOT-002",
    type: "document",
    title: "Document Available",
    message: "Your Income Proof is available for reuse in eligible services.",
    time: "1 hour ago",
    timestamp: "2026-09-24T17:30:00",
    read: false,
    documentId: "DOC-003",
    targetUrl: "/documents/DOC-003"
  },
  {
    id: "NOT-003",
    type: "application",
    title: "Scholarship Application Update",
    message: "Your Scholarship Application has moved to Officer Verification.",
    time: "Yesterday",
    timestamp: "2026-09-23T14:15:00",
    read: false,
    applicationId: "SCH-RJ-2026-004218",
    targetUrl: "/applications/SCH-RJ-2026-004218"
  },
  {
    id: "NOT-004",
    type: "document",
    title: "Document Verification",
    message: "Your Address Proof has completed verification.",
    time: "2 days ago",
    timestamp: "2026-09-22T10:00:00",
    read: true,
    documentId: "DOC-002",
    targetUrl: "/documents/DOC-002"
  },
  {
    id: "NOT-005",
    type: "service",
    title: "New Service Available",
    message: "A new Education Assistance service has been added to DOWLET1.",
    time: "3 days ago",
    timestamp: "2026-09-21T09:00:00",
    read: true,
    serviceId: "education_assistance",
    targetUrl: "/service-details/education_assistance"
  },
  {
    id: "NOT-006",
    type: "system",
    title: "Profile Information Updated",
    message: "Your DOWLET1 profile information was updated.",
    time: "4 days ago",
    timestamp: "2026-09-20T11:20:00",
    read: true,
    targetUrl: "/verified-info"
  }
];

// Initial verified information for Rahul Kumar
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
    status: "Verified",
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
    status: "Verified",
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
    status: "Verified",
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
    status: "Connected",
    statusType: "verified",
    lastUpdated: "10 Sep 2026",
    description: "Government ID connection (Verified)"
  }
};

// Initial profile information for Rahul Kumar
export const INITIAL_PROFILE = {
  fullName: "Rahul Kumar",
  email: "rahul@example.com",
  mobile: "+91 XXXXX XXXXX",
  rawMobile: "9876543210",
  dob: "15 May 2005",
  gender: "Male",
  occupation: "Student",
  income: "₹1,00,000 – ₹2,00,000",
  annualIncome: "₹1,00,000 – ₹2,00,000",
  state: "Rajasthan",
  district: "Jaipur",
  address: "Plot 42, Malviya Nagar, Jaipur, Rajasthan",
  pincode: "302017",
  profileCompletion: 85,
  isProfileComplete: true,
  governmentId: "Government ID",
  idNumberMasked: "XXXX-XXXX-XXXX",
  identityStatus: "Connected",
  identityVerified: true
};

// Initial mock consent & data sharing settings
export const INITIAL_CONSENT_SETTINGS = {
  profileInfoReuse: true,
  profileReuse: true,
  documentReuse: true,
  applicationDataSharing: true,
  serviceDataSharing: true,
  personalizedRecommendations: true,
  notifications: true
};

// Initial mock notification preferences
export const INITIAL_NOTIFICATION_SETTINGS = {
  applicationUpdates: true,
  documentUpdates: true,
  serviceUpdates: true,
  systemNotifications: true
};

// Initial mock security & login settings
export const INITIAL_SECURITY_SETTINGS = {
  mobileEmailLogin: true,
  otpVerification: true,
  otpEnabled: true,
  rememberMe: true,
  sessionSecurity: "Active",
  lastPasswordChange: "15 Aug 2026",
  activeSessionsCount: 1
};

// Initial mock consent history log
export const INITIAL_CONSENT_HISTORY = [
  {
    id: "CH-001",
    service: "Income Certificate",
    serviceName: "Income Certificate",
    purpose: "Information shared for application",
    description: "Information shared for application",
    date: "24 Sep 2026",
    time: "Today, 11:30 AM",
    sharedFields: ["Full Name", "Address Proof", "Government ID"]
  },
  {
    id: "CH-002",
    service: "Scholarship Application",
    serviceName: "Scholarship Application",
    purpose: "Profile information reused",
    description: "Profile information reused",
    date: "22 Sep 2026",
    time: "22 Sep 2026, 03:15 PM",
    sharedFields: ["Full Name", "DOB", "Student Marksheet", "Income Proof"]
  },
  {
    id: "CH-003",
    service: "Residence Certificate",
    serviceName: "Residence Certificate",
    purpose: "Address & Identity verified",
    description: "Address & Identity verified",
    date: "18 Sep 2026",
    time: "18 Sep 2026, 10:00 AM",
    sharedFields: ["Address", "Aadhaar e-KYC"]
  }
];

// Initial FAQs for Help & Support accordion
export const INITIAL_FAQS = [
  {
    q: "What is DOWLET1?",
    a: "DOWLET1 is a unified government service delivery platform. It allows citizens to discover schemes, verify their profile once, and reuse credentials securely across all eligible state and central services without redundant paperwork."
  },
  {
    q: "How does document reuse work?",
    a: "Once you upload and verify a document (such as Identity Proof, Address Proof, or Income Proof) in your Document Wallet, you can authorize its reuse in subsequent government service applications with a single click and granular citizen consent."
  },
  {
    q: "How can I track an application?",
    a: "Navigate to My Applications to view real-time stage progression across the 5 official milestone stages: Application Submitted → Documents Received → Verification in Progress → Officer Verification → Certificate Issued."
  },
  {
    q: "How does citizen consent work?",
    a: "DOWLET1 strictly adheres to citizen-first data governance. Before any verified personal record or document is shared with a department, a clear consent disclosure is shown detailing exactly which fields and files are being transferred."
  },
  {
    q: "What is Verified Information?",
    a: "Verified Information is your pre-verified digital citizen record (e-KYC Personal details, Address, and Government ID). It forms the foundational mesh that enables zero-form-filling when applying for public services."
  },
  {
    q: "Can I update my profile?",
    a: "Yes! You can edit your personal details, update contact parameters, or adjust your language and consent preferences directly from the Profile & Settings module."
  }
];

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
    if (!localStorage.getItem('dowlet1_saved_services')) {
      localStorage.setItem('dowlet1_saved_services', JSON.stringify(INITIAL_SAVED_SERVICES));
    }
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

        // Ensure profile exists
        if (!parsed.profile || !parsed.profile.fullName) {
          parsed.profile = { ...INITIAL_PROFILE, ...(parsed.profile || {}) };
          updated = true;
        }

        // Ensure consentSettings exists and has all keys
        if (!parsed.consentSettings || parsed.consentSettings.profileInfoReuse === undefined) {
          parsed.consentSettings = { ...INITIAL_CONSENT_SETTINGS, ...(parsed.consentSettings || {}) };
          updated = true;
        }

        // Ensure notificationSettings exists
        if (!parsed.notificationSettings) {
          parsed.notificationSettings = INITIAL_NOTIFICATION_SETTINGS;
          updated = true;
        }

        // Ensure securitySettings exists
        if (!parsed.securitySettings) {
          parsed.securitySettings = INITIAL_SECURITY_SETTINGS;
          updated = true;
        }

        // Ensure consentHistory exists
        if (!parsed.consentHistory || parsed.consentHistory.length === 0) {
          parsed.consentHistory = INITIAL_CONSENT_HISTORY;
          updated = true;
        }

        // Ensure language exists
        if (!parsed.language) {
          parsed.language = "English";
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

        // Ensure notifications exist with rich mock structure
        if (!parsed.notifications || parsed.notifications.length === 0 || !parsed.notifications[0].id || parsed.notifications[0].id.startsWith('notif_app_')) {
          parsed.notifications = INITIAL_NOTIFICATIONS;
          updated = true;
        }

        // Sync services to ensure updated fields (shortDescription, recommendationTags, etc.)
        if (!parsed.services || parsed.services.length < 5 || !parsed.services[0].shortDescription) {
          parsed.services = INITIAL_STATE.services;
          updated = true;
        }

        // Ensure rich documents and activity exist
        if (!parsed.documents || parsed.documents.length === 0 || !parsed.documents[0].id) {
          parsed.documents = INITIAL_DOCUMENTS;
          parsed.documentActivity = INITIAL_DOCUMENT_ACTIVITY;
          updated = true;
        }
        if (!parsed.documentActivity) {
          parsed.documentActivity = INITIAL_DOCUMENT_ACTIVITY;
          updated = true;
        }

        if (updated) {
          localStorage.setItem('dowlet1_demo_state', JSON.stringify(parsed));
        }
      } catch (err) {
        localStorage.setItem('dowlet1_demo_state', JSON.stringify({
          ...INITIAL_STATE,
          documents: INITIAL_DOCUMENTS,
          documentActivity: INITIAL_DOCUMENT_ACTIVITY,
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
    localStorage.setItem('dowlet1_saved_services', JSON.stringify(INITIAL_SAVED_SERVICES));
    localStorage.setItem('dowlet1_demo_state', JSON.stringify({
      ...INITIAL_STATE,
      documents: INITIAL_DOCUMENTS,
      documentActivity: INITIAL_DOCUMENT_ACTIVITY,
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
    const cleanId = String(id).trim().toLowerCase();
    if (cleanId === 'scholarship-001' || cleanId === 'scholarship') {
      return this.getState().services.find(s => s.id === 'scholarship');
    }
    if (cleanId === 'income-001' || cleanId === 'income_certificate' || cleanId === 'income') {
      return this.getState().services.find(s => s.id === 'income_certificate');
    }
    if (cleanId === 'pension-001' || cleanId === 'pension') {
      return this.getState().services.find(s => s.id === 'pension');
    }
    if (cleanId === 'employment' || cleanId === 'employment_registration') {
      return this.getState().services.find(s => s.id === 'employment' || s.id === 'employment_registration');
    }
    return this.getState().services.find(s => s.id === id || s.id.toLowerCase() === cleanId);
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
   * Save a service (delegates to centralized savedServices system)
   */
  saveService(id) {
    return saveService(id);
  },

  removeSavedService(id) {
    return removeSavedService(id);
  },

  isServiceSaved(id) {
    return isServiceSaved(id);
  },

  toggleSavedService(id) {
    return toggleSavedService(id);
  },

  getSavedServices() {
    return getSavedServices();
  },

  searchSavedServices(query) {
    return searchSavedServices(query);
  },

  filterSavedServices(category) {
    return filterSavedServices(category);
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
      2: "Your submitted information is being verified. The next step is officer verification.",
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
  createNotification(appOrData, message) {
    if (appOrData && typeof appOrData === 'object' && appOrData.title && appOrData.message) {
      return createNotification(appOrData);
    }
    const app = appOrData || {};
    return createNotification({
      type: "application",
      title: "Application Status Updated",
      message: message || `Status changed for ${app.serviceName || 'Application'}.`,
      applicationId: app.id,
      targetUrl: `/applications/${app.id}`
    });
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
        status: updatedFields.status || "Verified",
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
    try {
      localStorage.setItem('dowlet1_consent_settings', JSON.stringify(settings));
    } catch (error) { void error; }
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
  const q = (query || '').toLowerCase().trim();
  
  // -1. Saved Services Intent Detection (English & Hindi)
  if (
    q.includes("open my saved") ||
    q.includes("open saved") ||
    q.includes("go to saved services") ||
    q.includes("saved services page") ||
    q.includes("saved services kholo")
  ) {
    return {
      intent: "OPEN_SAVED_SERVICE",
      message: "Opening your Saved Services page..."
    };
  }

  if (
    (q.includes("remove") && (q.includes("saved") || q.includes("bookmark"))) ||
    q.includes("unsave") ||
    (q.includes("hatao") && q.includes("saved"))
  ) {
    const saved = getSavedServices();
    const matchedService = saved.find(s => 
      q.includes(s.name.toLowerCase()) || 
      (s.category && q.includes(s.category.toLowerCase())) ||
      (q.includes("scholarship") && (s.name.toLowerCase().includes("scholarship") || s.id.includes("scholarship"))) ||
      (q.includes("income") && (s.name.toLowerCase().includes("income") || s.id.includes("income"))) ||
      (q.includes("pension") && (s.name.toLowerCase().includes("pension") || s.id.includes("pension")))
    ) || saved[0];

    if (matchedService) {
      removeSavedService(matchedService.id);
      return {
        intent: "REMOVE_SAVED_SERVICE",
        service: matchedService,
        message: `Removed ${matchedService.name} from your Saved Services.`
      };
    } else {
      return {
        intent: "REMOVE_SAVED_SERVICE",
        service: null,
        message: "No matching saved service found to remove."
      };
    }
  }

  if (
    q.includes("apply for my saved") ||
    q.includes("apply saved service") ||
    q.includes("apply for saved") ||
    (q.includes("apply") && q.includes("saved"))
  ) {
    const saved = getSavedServices();
    const matchedService = saved.find(s => 
      q.includes(s.name.toLowerCase()) || 
      (q.includes("scholarship") && s.name.toLowerCase().includes("scholarship")) ||
      (q.includes("income") && s.name.toLowerCase().includes("income")) ||
      (q.includes("pension") && s.name.toLowerCase().includes("pension"))
    ) || saved[0];

    return {
      intent: "APPLY_SAVED_SERVICE",
      service: matchedService,
      savedServices: saved,
      message: matchedService 
        ? `You can apply directly for ${matchedService.name}.`
        : "Here are your saved services you can apply for."
    };
  }

  if (
    q.includes("show my saved") ||
    q.includes("which services did i save") ||
    q.includes("services did i save") ||
    q.includes("saved services") ||
    q.includes("my saved") ||
    q.includes("what services did i save") ||
    q.includes("saved services dikhao") ||
    q.includes("mere saved") ||
    q === "saved"
  ) {
    const saved = getSavedServices();
    return {
      intent: "SAVED_SERVICES",
      savedServices: saved,
      message: "Here are the services you saved for later."
    };
  }

  // 0. Notification & Update inquiries (English & Hindi)
  // Check for specific application update first (e.g., "Mere income certificate ka update kya hai?")
  if (
    (q.includes("update") || q.includes("kya update") || q.includes("updates") || q.includes("notification") || q.includes("notifications")) &&
    (q.includes("income") || q.includes("scholarship") || q.includes("residence") || q.includes("certificate"))
  ) {
    const state = demoAPI.getState();
    const apps = state.applications || [];
    const notifs = getNotifications();
    const matchedApp = apps.find(a => 
      (q.includes("income") && a.serviceName.toLowerCase().includes("income")) ||
      (q.includes("scholarship") && a.serviceName.toLowerCase().includes("scholarship")) ||
      (q.includes("residence") && a.serviceName.toLowerCase().includes("residence"))
    ) || apps[0];

    const relatedNotif = notifs.find(n => n.applicationId === matchedApp?.id) || notifs[0];

    return {
      intent: "APPLICATION_UPDATE_QUERY",
      application: matchedApp,
      notification: relatedNotif,
      message: `Your ${matchedApp.serviceName} application is currently under ${matchedApp.currentStatus || matchedApp.status}.`
    };
  }

  // General notification queries
  if (
    q.includes("mere notifications") ||
    q.includes("notification") || 
    q.includes("notifications") || 
    q.includes("kya update") || 
    q.includes("latest update") || 
    q.includes("koi update") || 
    q.includes("recent updates")
  ) {
    const unread = getUnreadNotifications();
    const all = getNotifications();
    return {
      intent: "NOTIFICATION_QUERY",
      notifications: all,
      unreadCount: unread.length,
      unreadNotifications: unread
    };
  }

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

  // 3. Profile & Verified Information inquiries (English & Hindi)
  if (
    q.includes("profile") || 
    q.includes("mera profile") ||
    q.includes("meri profile") ||
    q.includes("meri jankari") ||
    q.includes("mera naam") ||
    q.includes("verified info")
  ) {
    return { 
      intent: "PROFILE_INFORMATION",
      profile: getProfile(),
      user: demoAPI.getUser(),
      verifiedInfo: demoAPI.getVerifiedInformation()
    };
  }

  // 4. Consent & Data Sharing inquiries (English & Hindi)
  if (q.includes("consent") || q.includes("data sharing") || q.includes("sharing settings")) {
    return {
      intent: "CONSENT_QUERY",
      consentSettings: getConsentSettings()
    };
  }

  // 5. Privacy & Security inquiries
  if (q.includes("privacy") || q.includes("security") || q.includes("password") || q.includes("suraksha")) {
    return {
      intent: "PRIVACY_QUERY",
      securitySettings: getSecuritySettings()
    };
  }

  // 6. Settings inquiries
  if (q.includes("settings") || q.includes("setting") || q.includes("settings kholo")) {
    return {
      intent: "SETTINGS_QUERY"
    };
  }

  // 7. Language inquiries
  if (q.includes("language") || q.includes("bhasha") || q.includes("change language")) {
    return {
      intent: "LANGUAGE_QUERY",
      language: getLanguage()
    };
  }

  // 8. Logout inquiries
  if (q.includes("logout") || q.includes("log out") || q.includes("sign out") || q.includes("bahar nikalna")) {
    return {
      intent: "LOGOUT_QUERY"
    };
  }

  // 9. Document inquiries (English & Hindi)
  if (
    q.includes("document") || 
    q.includes("documents") || 
    q.includes("wallet") ||
    q.includes("mere documents") ||
    q.includes("document dikhao") ||
    q.includes("documents dikhao") ||
    q.includes("income proof") ||
    q.includes("address proof") ||
    q.includes("identity proof") ||
    q.includes("kaunse verified") ||
    q.includes("available hai")
  ) {
    const docs = getDocuments();
    let querySpecificDoc = null;
    if (q.includes("income")) querySpecificDoc = docs.find(d => d.type === 'income');
    else if (q.includes("address")) querySpecificDoc = docs.find(d => d.type === 'address');
    else if (q.includes("identity") || q.includes("aadhaar")) querySpecificDoc = docs.find(d => d.type === 'identity');

    return { 
      intent: "DOCUMENT_QUERY",
      documents: docs,
      specificDoc: querySpecificDoc
    };
  }

  // 10. Help / General
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
      prototypeDisclaimer: "Recommendation based on verified profile information."
    };
  });

  // Sort by highest relevance score
  return scoredServices.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * SAVED SERVICES SYSTEM FUNCTIONS (DOWLET1 PROTOTYPE)
 */
export function normalizeServiceId(id) {
  if (!id) return '';
  const s = String(id).trim().toLowerCase();
  if (s === 'scholarship-001' || s === 'scholarship') return 'scholarship';
  if (s === 'income-001' || s === 'income_certificate' || s === 'income') return 'income_certificate';
  if (s === 'pension-001' || s === 'pension') return 'pension';
  if (s === 'employment_registration' || s === 'employment') return 'employment';
  return s;
}

export function areServiceIdsEqual(id1, id2) {
  if (!id1 || !id2) return false;
  if (id1 === id2) return true;
  return normalizeServiceId(id1) === normalizeServiceId(id2);
}

export function getSavedServices() {
  try {
    const raw = localStorage.getItem('dowlet1_saved_services');
    if (!raw) {
      localStorage.setItem('dowlet1_saved_services', JSON.stringify(INITIAL_SAVED_SERVICES));
      return INITIAL_SAVED_SERVICES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      localStorage.setItem('dowlet1_saved_services', JSON.stringify(INITIAL_SAVED_SERVICES));
      return INITIAL_SAVED_SERVICES;
    }
    return parsed;
  } catch (e) {
    console.error("Error reading dowlet1_saved_services:", e);
    return INITIAL_SAVED_SERVICES;
  }
}

export function saveService(serviceId) {
  if (!serviceId) return;
  const targetId = typeof serviceId === 'object' ? serviceId.id : serviceId;
  const currentSaved = getSavedServices();
  
  // Check if already saved
  const exists = currentSaved.find(s => areServiceIdsEqual(s.id, targetId) || areServiceIdsEqual(s.canonicalId, targetId));
  if (exists) {
    return exists;
  }

  // Look up full service definition
  let serviceObj = null;
  if (typeof serviceId === 'object' && serviceId.name) {
    serviceObj = serviceId;
  } else {
    serviceObj = demoAPI.getService(targetId) || INITIAL_SAVED_SERVICES.find(s => areServiceIdsEqual(s.id, targetId));
  }

  const newItem = {
    id: serviceObj?.id || targetId,
    canonicalId: normalizeServiceId(serviceObj?.id || targetId),
    name: serviceObj?.name || (String(targetId).includes('scholarship') ? "Scholarship Application" : targetId),
    category: serviceObj?.category || "Services",
    department: serviceObj?.department || "Government Department",
    description: serviceObj?.description || serviceObj?.shortDescription || "Apply for eligible government services and assistance.",
    shortDescription: serviceObj?.shortDescription || serviceObj?.description || "Explore government services.",
    icon: serviceObj?.icon || "📄",
    status: "Saved",
    profileAvailable: true,
    documentsAvailable: true,
    recommendationNote: "Based on your available profile information."
  };

  const updated = [newItem, ...currentSaved];
  localStorage.setItem('dowlet1_saved_services', JSON.stringify(updated));

  // Sync with dowlet1_demo_state.savedServices
  try {
    const rawDemo = localStorage.getItem('dowlet1_demo_state');
    if (rawDemo) {
      const demoState = JSON.parse(rawDemo);
      const list = demoState.savedServices || [];
      const canonical = normalizeServiceId(targetId);
      const toAdd = [targetId, canonical].filter(Boolean);
      demoState.savedServices = Array.from(new Set([...list, ...toAdd]));
      localStorage.setItem('dowlet1_demo_state', JSON.stringify(demoState));
    }
  } catch (err) {
    console.error("Error syncing demoState.savedServices:", err);
  }

  return newItem;
}

export function removeSavedService(serviceId) {
  if (!serviceId) return;
  const targetId = typeof serviceId === 'object' ? serviceId.id : serviceId;
  const currentSaved = getSavedServices();
  const updated = currentSaved.filter(s => !areServiceIdsEqual(s.id, targetId) && !areServiceIdsEqual(s.canonicalId, targetId));
  localStorage.setItem('dowlet1_saved_services', JSON.stringify(updated));

  // Sync with dowlet1_demo_state.savedServices
  try {
    const rawDemo = localStorage.getItem('dowlet1_demo_state');
    if (rawDemo) {
      const demoState = JSON.parse(rawDemo);
      if (demoState.savedServices) {
        demoState.savedServices = demoState.savedServices.filter(id => !areServiceIdsEqual(id, targetId));
        localStorage.setItem('dowlet1_demo_state', JSON.stringify(demoState));
      }
    }
  } catch (err) {
    console.error("Error updating demoState on removeSavedService:", err);
  }
  return updated;
}

export function isServiceSaved(serviceId) {
  if (!serviceId) return false;
  const targetId = typeof serviceId === 'object' ? serviceId.id : serviceId;
  const saved = getSavedServices();
  return saved.some(s => areServiceIdsEqual(s.id, targetId) || areServiceIdsEqual(s.canonicalId, targetId));
}

export function toggleSavedService(serviceId) {
  if (isServiceSaved(serviceId)) {
    removeSavedService(serviceId);
    return false;
  } else {
    saveService(serviceId);
    return true;
  }
}

export function searchSavedServices(query) {
  const all = getSavedServices();
  if (!query || !query.trim()) return all;
  const q = query.trim().toLowerCase();
  return all.filter(s => 
    (s.name && s.name.toLowerCase().includes(q)) ||
    (s.department && s.department.toLowerCase().includes(q)) ||
    (s.category && s.category.toLowerCase().includes(q)) ||
    (s.description && s.description.toLowerCase().includes(q)) ||
    (s.shortDescription && s.shortDescription.toLowerCase().includes(q))
  );
}

export function filterSavedServices(category) {
  const all = getSavedServices();
  if (!category || category.toLowerCase() === 'all') return all;
  return all.filter(s => s.category && s.category.toLowerCase() === category.toLowerCase());
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

// ═══════════════ ROLE-BASED ACCESS HELPERS ═══════════════

/**
 * Gets the current active user role: 'citizen' | 'officer' | 'admin'
 */
export function getCurrentRole() {
  const role = localStorage.getItem('dowlet1_active_role');
  return role || 'citizen';
}

/**
 * Sets the active user role
 */
export function setCurrentRole(role) {
  localStorage.setItem('dowlet1_active_role', role);
}

/**
 * Gets pending applications for government officer review
 */
export function getOfficerPendingApplications() {
  demoAPI.init();
  const apps = demoAPI.getApplications();
  return apps;
}

/**
 * Officer approves an application and advances it or completes it
 */
export function approveOfficerApplication(appId, officerNotes = 'Approved after verification') {
  demoAPI.init();
  const state = JSON.parse(localStorage.getItem('dowlet1_demo_state'));
  if (state && state.applications) {
    state.applications = state.applications.map(app => {
      if (app.id === appId) {
        const nextStep = Math.min(4, (app.statusStep || 0) + 1);
        const isComplete = nextStep >= 4;
        return {
          ...app,
          statusStep: nextStep,
          status: isComplete ? 'Certificate Issued' : 'Officer Verified',
          statusType: isComplete ? 'completed' : 'in-progress',
          officerNotes: officerNotes,
          lastUpdated: 'Just now'
        };
      }
      return app;
    });
    localStorage.setItem('dowlet1_demo_state', JSON.stringify(state));
    return true;
  }
  return false;
}

/**
 * Officer flags application for applicant action
 */
export function requestOfficerAction(appId, message = 'Please re-upload latest income proof') {
  demoAPI.init();
  const state = JSON.parse(localStorage.getItem('dowlet1_demo_state'));
  if (state && state.applications) {
    state.applications = state.applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: 'Action Required',
          statusType: 'action-required',
          actionRequiredMessage: message,
          lastUpdated: 'Just now'
        };
      }
      return app;
    });
    localStorage.setItem('dowlet1_demo_state', JSON.stringify(state));
    return true;
  }
  return false;
}

// ══════════════════════════════════════════════════════════════════
// DOWLET1 CENTRAL DOCUMENT WALLET MANAGEMENT FUNCTIONS
// ══════════════════════════════════════════════════════════════════

/**
 * Returns all documents from the central prototype state
 */
export function getDocuments() {
  demoAPI.init();
  const state = demoAPI.getState();
  return state.documents || INITIAL_DOCUMENTS;
}

/**
 * Returns a specific document by its unique ID
 */
export function getDocumentById(id) {
  const docs = getDocuments();
  return docs.find(d => d.id === id) || null;
}

/**
 * Filters documents by category
 */
export function filterDocuments(category) {
  const docs = getDocuments();
  if (!category || category.toLowerCase() === 'all') return docs;
  const cat = category.toLowerCase();
  return docs.filter(d => 
    (d.category && d.category.toLowerCase() === cat) ||
    (d.type && d.type.toLowerCase() === cat)
  );
}

/**
 * Searches documents by query across name, type, category, issuer, and fileName
 */
export function searchDocuments(query) {
  const docs = getDocuments();
  if (!query || !query.trim()) return docs;
  const q = query.toLowerCase().trim();
  return docs.filter(d => 
    (d.name && d.name.toLowerCase().includes(q)) ||
    (d.type && d.type.toLowerCase().includes(q)) ||
    (d.category && d.category.toLowerCase().includes(q)) ||
    (d.issuer && d.issuer.toLowerCase().includes(q)) ||
    (d.fileName && d.fileName.toLowerCase().includes(q))
  );
}

/**
 * Uploads a new document to the prototype Document Wallet
 */
export function uploadDocument(data) {
  demoAPI.init();
  const state = demoAPI.getState();
  const docs = state.documents || [...INITIAL_DOCUMENTS];
  const newId = `DOC-00${docs.length + 1}`;
  
  const categoryMap = {
    'identity': 'Identity',
    'address': 'Address',
    'income': 'Income',
    'education': 'Education',
    'caste': 'Certificates',
    'residence': 'Address',
    'other': 'Other'
  };

  const newDoc = {
    id: newId,
    name: data.name || "Uploaded Document",
    type: data.type || "other",
    category: categoryMap[data.type] || data.category || "Other",
    fileName: data.fileName || `${(data.name || 'document').toLowerCase().replace(/\s+/g, '_')}.pdf`,
    fileSize: data.fileSize || "1.2 MB",
    status: "pending", // initial status Verification Pending
    addedDate: data.addedDate || "Today",
    issuer: data.issuer || "Self-Uploaded",
    docNumberMasked: data.docNumberMasked || "XXXX-XXXX-9921",
    expiryDate: data.expiryDate || "Valid for 1 year",
    usedIn: [],
    available: true,
    verified: false
  };

  const updatedDocs = [newDoc, ...docs];
  state.documents = updatedDocs;
  
  // Add activity log
  const activityList = state.documentActivity || [...INITIAL_DOCUMENT_ACTIVITY];
  const newActivity = {
    id: `ACT-${Date.now()}`,
    title: `${newDoc.name} uploaded`,
    time: "Today",
    date: "Today",
    type: "upload",
    docId: newDoc.id,
    status: "pending"
  };
  state.documentActivity = [newActivity, ...activityList];

  demoAPI.updateState({ documents: updatedDocs, documentActivity: state.documentActivity });
  saveDocuments(updatedDocs);

  // Trigger Notification
  createNotification({
    type: "document",
    title: "Document Available",
    message: `Your ${newDoc.name} is uploaded and available for reuse in eligible services.`,
    documentId: newDoc.id,
    targetUrl: `/documents/${newDoc.id}`
  });

  return newDoc;
}

/**
 * Replaces an existing document with a new simulated file
 */
export function replaceDocument(id, data) {
  demoAPI.init();
  const state = demoAPI.getState();
  const docs = state.documents || [...INITIAL_DOCUMENTS];
  
  let targetDoc = null;
  const updatedDocs = docs.map(doc => {
    if (doc.id === id) {
      targetDoc = {
        ...doc,
        fileName: data.fileName || doc.fileName,
        fileSize: data.fileSize || doc.fileSize,
        status: "pending", // returns to Verification Pending
        verified: false,
        addedDate: "Today (Updated)"
      };
      return targetDoc;
    }
    return doc;
  });

  state.documents = updatedDocs;
  if (targetDoc) {
    const activityList = state.documentActivity || [...INITIAL_DOCUMENT_ACTIVITY];
    state.documentActivity = [
      {
        id: `ACT-${Date.now()}`,
        title: `${targetDoc.name} replaced with new file`,
        time: "Today",
        date: "Today",
        type: "replace",
        docId: targetDoc.id,
        status: "pending"
      },
      ...activityList
    ];
  }

  demoAPI.updateState({ documents: updatedDocs, documentActivity: state.documentActivity });
  saveDocuments(updatedDocs);
  return targetDoc;
}

/**
 * Deletes a document from the prototype wallet
 */
export function deleteDocument(id) {
  demoAPI.init();
  const state = demoAPI.getState();
  const docs = state.documents || [...INITIAL_DOCUMENTS];
  const toDelete = docs.find(d => d.id === id);
  const updatedDocs = docs.filter(d => d.id !== id);
  
  state.documents = updatedDocs;
  if (toDelete) {
    const activityList = state.documentActivity || [...INITIAL_DOCUMENT_ACTIVITY];
    state.documentActivity = [
      {
        id: `ACT-${Date.now()}`,
        title: `${toDelete.name} removed from wallet`,
        time: "Today",
        date: "Today",
        type: "delete",
        docId: id,
        status: "deleted"
      },
      ...activityList
    ];
  }

  demoAPI.updateState({ documents: updatedDocs, documentActivity: state.documentActivity });
  saveDocuments(updatedDocs);
  return true;
}

/**
 * Simulates government verification of a pending document
 */
export function verifyDocument(id) {
  demoAPI.init();
  const state = demoAPI.getState();
  const docs = state.documents || [...INITIAL_DOCUMENTS];
  
  let targetDoc = null;
  const updatedDocs = docs.map(doc => {
    if (doc.id === id) {
      targetDoc = {
        ...doc,
        status: "verified",
        verified: true,
        available: true
      };
      return targetDoc;
    }
    return doc;
  });

  state.documents = updatedDocs;
  if (targetDoc) {
    const activityList = state.documentActivity || [...INITIAL_DOCUMENT_ACTIVITY];
    state.documentActivity = [
      {
        id: `ACT-${Date.now()}`,
        title: `${targetDoc.name} verified via Demo Mesh`,
        time: "Today",
        date: "Today",
        type: "verified",
        docId: targetDoc.id,
        status: "verified"
      },
      ...activityList
    ];
  }

  demoAPI.updateState({ documents: updatedDocs, documentActivity: state.documentActivity });
  saveDocuments(updatedDocs);

  // Trigger Notification (matches SIH presentation demo flow 2)
  if (targetDoc) {
    createNotification({
      type: "document",
      title: "Document Verification",
      message: `Your ${targetDoc.name} has completed demo verification.`,
      documentId: targetDoc.id,
      targetUrl: `/documents/${targetDoc.id}`
    });
  }

  return targetDoc;
}

/**
 * Checks if user has a verified/available document matching the given type
 */
export function hasDocument(type) {
  if (!type) return false;
  const docs = getDocuments();
  const t = type.toLowerCase().trim();
  return docs.some(d => {
    const dType = (d.type || '').toLowerCase();
    const dName = (d.name || '').toLowerCase();
    const dCat = (d.category || '').toLowerCase();
    const matches = dType.includes(t) || dName.includes(t) || dCat.includes(t) || t.includes(dType) || t.includes(dName);
    return matches && (d.available || d.status === 'verified');
  });
}

/**
 * Marks a document as reused in an eligible service application
 */
export function reuseDocument(id, serviceId) {
  demoAPI.init();
  const state = demoAPI.getState();
  const docs = state.documents || [...INITIAL_DOCUMENTS];
  
  let targetDoc = null;
  const updatedDocs = docs.map(doc => {
    if (doc.id === id) {
      const usedInList = doc.usedIn || [];
      const updatedUsedIn = usedInList.includes(serviceId) ? usedInList : [...usedInList, serviceId];
      targetDoc = { ...doc, usedIn: updatedUsedIn };
      return targetDoc;
    }
    return doc;
  });

  state.documents = updatedDocs;
  if (targetDoc) {
    const activityList = state.documentActivity || [...INITIAL_DOCUMENT_ACTIVITY];
    state.documentActivity = [
      {
        id: `ACT-${Date.now()}`,
        title: `${targetDoc.name} reused for ${serviceId}`,
        time: "Today",
        date: "Today",
        type: "reuse",
        docId: targetDoc.id,
        status: "reused"
      },
      ...activityList
    ];
  }

  demoAPI.updateState({ documents: updatedDocs, documentActivity: state.documentActivity });
  saveDocuments(updatedDocs);
  return targetDoc;
}

/**
 * Retrieves the application history where a document was reused
 */
export function getDocumentUsage(id) {
  const doc = getDocumentById(id);
  if (!doc || !doc.usedIn) return [];
  const state = demoAPI.getState();
  const apps = state.applications || [];
  
  return doc.usedIn.map(ref => {
    const foundApp = apps.find(a => a.id === ref || a.serviceId === ref);
    if (foundApp) {
      return {
        id: foundApp.id,
        serviceName: foundApp.serviceName,
        status: foundApp.status,
        date: foundApp.submittedDate || "Recent"
      };
    }
    return {
      id: ref,
      serviceName: ref.replace(/[-_]/g, ' ').toUpperCase(),
      status: "In Progress",
      date: "Recent"
    };
  });
}

/**
 * Returns recent document activity log
 */
export function getDocumentActivity() {
  demoAPI.init();
  const state = demoAPI.getState();
  return state.documentActivity || INITIAL_DOCUMENT_ACTIVITY;
}

/**
 * Adds an item to the document activity log
 */
export function addDocumentActivity(activity) {
  demoAPI.init();
  const state = demoAPI.getState();
  const list = state.documentActivity || [...INITIAL_DOCUMENT_ACTIVITY];
  const newActivity = {
    id: `ACT-${Date.now()}`,
    time: "Today",
    date: "Today",
    ...activity
  };
  state.documentActivity = [newActivity, ...list];
  demoAPI.updateState({ documentActivity: state.documentActivity });
  return newActivity;
}

/**
 * Persists documents array directly to localStorage
 */
export function saveDocuments(docs) {
  try {
    localStorage.setItem('dowlet1_documents', JSON.stringify(docs));
  } catch (e) {
    // Ignore storage quota
  }
}

/**
 * Loads documents from storage
 */
export function loadDocuments() {
  return getDocuments();
}

/**
 * Resets document demo to pristine mock data
 */
export function resetDocumentDemo() {
  demoAPI.init();
  demoAPI.updateState({
    documents: INITIAL_DOCUMENTS,
    documentActivity: INITIAL_DOCUMENT_ACTIVITY
  });
  try {
    localStorage.removeItem('dowlet1_documents');
  } catch (e) {
    // Ignore
  }
  return INITIAL_DOCUMENTS;
}

// ══════════════════════════════════════════════════════════════════
// DOWLET1 CENTRAL NOTIFICATION CENTRE FUNCTIONS
// ══════════════════════════════════════════════════════════════════

/**
 * Returns all notifications from the central prototype state
 */
export function getNotifications() {
  demoAPI.init();
  const state = demoAPI.getState();
  return state.notifications || INITIAL_NOTIFICATIONS;
}

/**
 * Returns a specific notification by its unique ID
 */
export function getNotificationById(id) {
  const notifs = getNotifications();
  return notifs.find(n => n.id === id) || null;
}

/**
 * Returns unread notifications
 */
export function getUnreadNotifications() {
  const notifs = getNotifications();
  return notifs.filter(n => !n.read);
}

/**
 * Returns total count of unread notifications
 */
export function getUnreadCount() {
  return getUnreadNotifications().length;
}

/**
 * Filters notifications by category: 'all' | 'application' | 'document' | 'service' | 'system'
 */
export function filterNotifications(type, notifsList = null) {
  const notifs = notifsList || getNotifications();
  if (!type || type.toLowerCase() === 'all') return notifs;
  const t = type.toLowerCase().trim();
  // Support both singular and plural forms (applications -> application, documents -> document, etc.)
  const normType = t.replace(/s$/, '');
  return notifs.filter(n => {
    const itemType = (n.type || '').toLowerCase().replace(/s$/, '');
    return itemType === normType;
  });
}

/**
 * Searches notifications by query across title, message, applicationId, serviceId, and documentId
 */
export function searchNotifications(query, notifsList = null) {
  const notifs = notifsList || getNotifications();
  if (!query || !query.trim()) return notifs;
  const q = query.toLowerCase().trim();
  return notifs.filter(n => 
    (n.title && n.title.toLowerCase().includes(q)) ||
    (n.message && n.message.toLowerCase().includes(q)) ||
    (n.applicationId && n.applicationId.toLowerCase().includes(q)) ||
    (n.serviceId && n.serviceId.toLowerCase().includes(q)) ||
    (n.documentId && n.documentId.toLowerCase().includes(q)) ||
    (n.type && n.type.toLowerCase().includes(q))
  );
}

/**
 * Marks a specific notification as read
 */
export function markAsRead(id) {
  demoAPI.init();
  const state = demoAPI.getState();
  const notifs = state.notifications || [...INITIAL_NOTIFICATIONS];
  let target = null;
  const updated = notifs.map(n => {
    if (n.id === id) {
      target = { ...n, read: true };
      return target;
    }
    return n;
  });
  state.notifications = updated;
  demoAPI.updateState({ notifications: updated });
  saveNotifications(updated);
  return target;
}

/**
 * Marks all notifications as read
 */
export function markAllAsRead() {
  demoAPI.init();
  const state = demoAPI.getState();
  const notifs = state.notifications || [...INITIAL_NOTIFICATIONS];
  const updated = notifs.map(n => ({ ...n, read: true }));
  state.notifications = updated;
  demoAPI.updateState({ notifications: updated });
  saveNotifications(updated);
  return updated;
}

/**
 * Alias for backward compatibility
 */
export function markNotificationsAsRead() {
  return markAllAsRead();
}

/**
 * Deletes a notification from prototype list
 */
export function deleteNotification(id) {
  demoAPI.init();
  const state = demoAPI.getState();
  const notifs = state.notifications || [...INITIAL_NOTIFICATIONS];
  const updated = notifs.filter(n => n.id !== id);
  state.notifications = updated;
  demoAPI.updateState({ notifications: updated });
  saveNotifications(updated);
  return true;
}

/**
 * Creates and prepends a new notification to the prototype state
 */
export function createNotification(dataOrApp, message) {
  demoAPI.init();
  const state = demoAPI.getState();
  const notifs = state.notifications || [...INITIAL_NOTIFICATIONS];
  
  // Format ID like NOT-007
  const newId = `NOT-${String(notifs.length + 1).padStart(3, '0')}`;
  
  let data = dataOrApp || {};
  if (dataOrApp && dataOrApp.id && !dataOrApp.title && message) {
    // Called as createNotification(application, message)
    data = {
      type: "application",
      title: "Application Status Updated",
      message: message,
      applicationId: dataOrApp.id,
      targetUrl: `/applications/${dataOrApp.id}`
    };
  }
  
  // Determine target URL if not provided
  let url = data.targetUrl;
  if (!url) {
    if (data.applicationId) url = `/applications/${data.applicationId}`;
    else if (data.documentId) url = `/documents/${data.documentId}`;
    else if (data.serviceId) url = `/service-details/${data.serviceId}`;
    else url = '/notifications';
  }

  const newNotif = {
    id: newId,
    type: data.type || "system", // "application" | "document" | "service" | "system"
    title: data.title || "Notification",
    message: data.message || "",
    time: data.time || "Just now",
    timestamp: data.timestamp || new Date().toISOString(),
    read: false,
    applicationId: data.applicationId || null,
    documentId: data.documentId || null,
    serviceId: data.serviceId || null,
    targetUrl: url
  };

  const updated = [newNotif, ...notifs];
  state.notifications = updated;
  demoAPI.updateState({ notifications: updated });
  saveNotifications(updated);
  return newNotif;
}

/**
 * Opens a notification: marks it as read and returns notification
 */
export function openNotification(id) {
  return markAsRead(id);
}

/**
 * Persists notifications directly to localStorage
 */
export function saveNotifications(notifs) {
  try {
    localStorage.setItem('dowlet1_notifications', JSON.stringify(notifs));
  } catch (e) {
    // Ignore storage quota
  }
}

/**
 * Loads notifications from storage
 */
export function loadNotifications() {
  return getNotifications();
}

/**
 * Resets notification demo to pristine mock data
 */
export function resetNotificationDemo() {
  demoAPI.init();
  demoAPI.updateState({
    notifications: INITIAL_NOTIFICATIONS
  });
  try {
    localStorage.removeItem('dowlet1_notifications');
  } catch (e) {
    // Ignore
  }
  return INITIAL_NOTIFICATIONS;
}

// ══════════════════════════════════════════════════════════════════
// DOWLET1 CENTRAL PROFILE & SETTINGS FUNCTIONS
// ══════════════════════════════════════════════════════════════════

/**
 * Returns current citizen profile
 */
export function getProfile() {
  demoAPI.init();
  const state = demoAPI.getState();
  return state.profile || { ...INITIAL_PROFILE };
}

/**
 * Updates profile fields and syncs user demographic state
 */
export function updateProfile(data) {
  demoAPI.init();
  const state = demoAPI.getState();
  const current = state.profile || { ...INITIAL_PROFILE, ...(state.user || {}) };
  const updated = { ...current, ...data };
  state.profile = updated;
  
  // Sync state.user
  if (!state.user) state.user = { ...INITIAL_STATE.user };
  if (updated.fullName) {
    state.user.name = updated.fullName;
    state.user.fullName = updated.fullName;
  }
  if (updated.email) state.user.email = updated.email;
  if (updated.mobile) state.user.mobile = updated.mobile;
  if (updated.dob) state.user.dob = updated.dob;
  if (updated.state) state.user.state = updated.state;
  if (updated.district) state.user.district = updated.district;
  if (updated.address) state.user.address = updated.address;
  if (updated.annualIncome) state.user.income = updated.annualIncome;

  demoAPI.updateState({ profile: updated, user: state.user });
  saveProfile(updated);
  return updated;
}

/**
 * Persists profile to localStorage
 */
export function saveProfile(data) {
  try {
    localStorage.setItem('dowlet1_profile', JSON.stringify(data));
  } catch (error) { void error; }
}

/**
 * Loads profile
 */
export function loadProfile() {
  return getProfile();
}

/**
 * Returns consent history logs
 */
export function getConsentHistory() {
  demoAPI.init();
  const state = demoAPI.getState();
  return state.consentHistory || INITIAL_CONSENT_HISTORY;
}

/**
 * Returns notification preferences
 */
export function getNotificationSettings() {
  demoAPI.init();
  const state = demoAPI.getState();
  return state.notificationSettings || INITIAL_NOTIFICATION_SETTINGS;
}

/**
 * Updates a specific notification preference
 */
export function updateNotificationSetting(key, value) {
  demoAPI.init();
  const state = demoAPI.getState();
  const current = state.notificationSettings || { ...INITIAL_NOTIFICATION_SETTINGS };
  current[key] = value;
  state.notificationSettings = current;
  demoAPI.updateState({ notificationSettings: current });
  try {
    localStorage.setItem('dowlet1_notif_settings', JSON.stringify(current));
  } catch (error) { void error; }
  return current;
}

/**
 * Returns current language preference
 */
export function getLanguage() {
  demoAPI.init();
  const state = demoAPI.getState();
  return state.language || "English";
}

/**
 * Updates citizen language preference
 */
export function updateLanguage(lang) {
  demoAPI.init();
  const state = demoAPI.getState();
  state.language = lang;
  demoAPI.updateState({ language: lang });
  try {
    localStorage.setItem('dowlet1_language', lang);
  } catch (error) { void error; }
  return lang;
}

/**
 * Returns security settings
 */
export function getSecuritySettings() {
  demoAPI.init();
  const state = demoAPI.getState();
  return state.securitySettings || INITIAL_SECURITY_SETTINGS;
}

/**
 * Updates a security setting
 */
export function updateSecuritySetting(key, value) {
  demoAPI.init();
  const state = demoAPI.getState();
  const current = state.securitySettings || { ...INITIAL_SECURITY_SETTINGS };
  current[key] = value;
  state.securitySettings = current;
  demoAPI.updateState({ securitySettings: current });
  try {
    localStorage.setItem('dowlet1_security_settings', JSON.stringify(current));
  } catch (error) { void error; }
  return current;
}

/**
 * Submits citizen feedback
 */
export function submitFeedback(data) {
  demoAPI.init();
  const state = demoAPI.getState();
  const list = state.feedback || [];
  const item = {
    id: `FB-${Date.now()}`,
    rating: data.rating || 5,
    comment: data.comment || "",
    timestamp: new Date().toISOString()
  };
  state.feedback = [item, ...list];
  demoAPI.updateState({ feedback: state.feedback });
  try {
    localStorage.setItem('dowlet1_feedback', JSON.stringify(state.feedback));
  } catch (error) { void error; }
  return item;
}

/**
 * Submits a citizen support ticket / problem report
 */
export function submitSupportRequest(data) {
  demoAPI.init();
  const state = demoAPI.getState();
  const list = state.supportRequests || [];
  const item = {
    id: `TKT-${Math.floor(100000 + Math.random() * 900000)}`,
    category: data.category || "General",
    description: data.description || "",
    status: "Submitted",
    timestamp: new Date().toISOString()
  };
  state.supportRequests = [item, ...list];
  demoAPI.updateState({ supportRequests: state.supportRequests });
  try {
    localStorage.setItem('dowlet1_support_requests', JSON.stringify(state.supportRequests));
  } catch (error) { void error; }
  return item;
}

/**
 * Navigates to Profile
 */
export function openProfile(navigate) {
  if (navigate) navigate('/profile');
}

/**
 * Navigates to Consent Settings
 */
export function openConsentSettings(navigate) {
  if (navigate) navigate('/profile?tab=consent');
}

/**
 * Navigates to Privacy & Security
 */
export function openPrivacySettings(navigate) {
  if (navigate) navigate('/privacy');
}

/**
 * Citizen Logout simulation
 */
export function logout(navigate) {
  try {
    localStorage.removeItem('dowlet1_auth_token');
    localStorage.removeItem('dowlet1_session');
    localStorage.removeItem('dowlet1_active_role');
  } catch (error) { void error; }
  if (navigate) navigate('/login');
}

/**
 * Resets profile and settings demo to initial mock values
 */
export function resetProfileDemo() {
  demoAPI.init();
  demoAPI.updateState({
    profile: INITIAL_PROFILE,
    user: {
      ...INITIAL_STATE.user,
      name: INITIAL_PROFILE.fullName,
      fullName: INITIAL_PROFILE.fullName,
      dob: INITIAL_PROFILE.dob,
      mobile: INITIAL_PROFILE.rawMobile,
      income: "₹1,50,000"
    },
    consentSettings: INITIAL_CONSENT_SETTINGS,
    notificationSettings: INITIAL_NOTIFICATION_SETTINGS,
    securitySettings: INITIAL_SECURITY_SETTINGS,
    language: "English"
  });
  try {
    localStorage.removeItem('dowlet1_profile');
    localStorage.removeItem('dowlet1_consent_settings');
    localStorage.removeItem('dowlet1_notif_settings');
    localStorage.removeItem('dowlet1_language');
    localStorage.removeItem('dowlet1_security_settings');
  } catch (error) { void error; }
  return INITIAL_PROFILE;
}


