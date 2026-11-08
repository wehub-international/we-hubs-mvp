'use client';

import { useEffect, useMemo, useState } from 'react';

type CompanyStatus = 'ACTIVE' | 'PREVIEW' | 'PENDING';
type Company = {
  id: string;
  name: string;
  location: string;
  branch: string;
  status: CompanyStatus;
  students: number;
  staff: number;
  revenue: number;
  health: string;
};

type StudentStatus = 'Active' | 'On Track' | 'Needs Review';
type AttendanceStatus = 'Present' | 'Late' | 'Absent';
type CaseStatus = 'Lead' | 'Consulting' | 'Document Review' | 'Visa Applied' | 'Accepted';

type Student = {
  id: string;
  name: string;
  level: string;
  course: string;
  teacher: string;
  status: StudentStatus;
  attendance: number;
  score: number;
  nextGoal: string;
};

type StudyCase = {
  id: string;
  studentName: string;
  destination: string;
  stage: string;
  status: CaseStatus;
  owner: string;
  progress: number;
  documents: number;
  nextStep: string;
};

type TourItem = {
  id: string;
  title: string;
  destination: string;
  date: string;
  seats: number;
  booked: number;
  status: 'Open' | 'Booked' | 'Full';
  revenue: number;
};

type Traveler = {
  id: string;
  name: string;
  country: string;
  room: string;
  flight: string;
  status: 'Confirmed' | 'Pending' | 'Checked-in';
};

type Invoice = {
  id: string;
  invoiceNo: string;
  customer: string;
  amount: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
  dueDate: string;
  note: string;
};

type PortalTask = {
  id: string;
  title: string;
  audience: string;
  due: string;
  status: 'New' | 'Seen' | 'Action required';
  detail: string;
};

type AiAssistantTask = {
  id: string;
  title: string;
  type: string;
  status: 'Ready' | 'Running' | 'Needs review';
  summary: string;
  score: number;
};

type ClassItem = {
  id: string;
  code: string;
  name: string;
  room: string;
  schedule: string;
  teacher: string;
  students: number;
  progress: number;
};

type Assignment = {
  id: string;
  title: string;
  due: string;
  type: string;
  status: 'Open' | 'Reviewing' | 'Submitted';
};

type ModuleKey = 'dashboard' | 'academy' | 'study' | 'travel' | 'finance' | 'portal' | 'ai';

type PersistedDemoState = {
  companies: Company[];
  students: Student[];
  classes: ClassItem[];
  assignments: Assignment[];
  studyCases: StudyCase[];
  tours: TourItem[];
  travelers: Traveler[];
  invoices: Invoice[];
  portalTasks: PortalTask[];
  aiTasks: AiAssistantTask[];
  attendanceForm: Record<string, AttendanceStatus>;
};

const demoStorageKey = 'we_hubs_demo_state';

const roles = ['Admin', 'Academy Director', 'Admissions Lead', 'Finance Controller'];

const moduleLabels: Record<ModuleKey, { title: string; description: string }> = {
  dashboard: { title: 'Dashboard', description: 'Tổng quan toàn hệ thống' },
  academy: { title: 'WE STUDY ACADEMY', description: 'Học viên, lớp học, điểm danh' },
  study: { title: 'WE STUDY', description: 'CRM du học, hồ sơ, visa' },
  travel: { title: 'WE TRAVEL', description: 'EduTour và tour theo yêu cầu' },
  finance: { title: 'WE FINANCE', description: 'Báo phí, thanh toán, nhắc nợ' },
  portal: { title: 'WE PORTAL', description: 'Giao diện học viên & phụ huynh' },
  ai: { title: 'WE AI', description: 'Trợ lý AI demo nội bộ' }
};

const defaultCompanies: Company[] = [
  { id: 'c1', name: 'WE STUDY ACADEMY', location: 'TP. Hồ Chí Minh', branch: 'Quận 1', status: 'ACTIVE', students: 640, staff: 36, revenue: 920000000, health: 'Ổn định' },
  { id: 'c2', name: 'WE STUDY', location: 'Hà Nội', branch: 'Cầu Giấy', status: 'ACTIVE', students: 420, staff: 19, revenue: 780000000, health: 'Tăng trưởng' },
  { id: 'c3', name: 'WE TRAVEL', location: 'Đà Nẵng', branch: 'Hải Châu', status: 'PENDING', students: 150, staff: 11, revenue: 560000000, health: 'Cần hỗ trợ' }
];

const defaultStudents: Student[] = [
  { id: 's1', name: 'Nguyễn Minh Anh', level: 'IELTS 6.5', course: 'General English', teacher: 'Ms. Lan', status: 'On Track', attendance: 92, score: 88, nextGoal: 'Làm bài mock speaking' },
  { id: 's2', name: 'Trần Hoàng Nam', level: 'B2 Upper', course: 'Business English', teacher: 'Mr. Khoa', status: 'Active', attendance: 95, score: 91, nextGoal: 'Nâng band writing task 2' },
  { id: 's3', name: 'Phạm Hồng Nhung', level: 'A2 Starter', course: 'Foundation Program', teacher: 'Ms. Hương', status: 'Needs Review', attendance: 76, score: 72, nextGoal: 'Cải thiện phần nghe và từ vựng' },
  { id: 's4', name: 'Lê Quang Duy', level: 'C1 Advanced', course: 'Communication Lab', teacher: 'Mr. Long', status: 'On Track', attendance: 90, score: 94, nextGoal: 'Hoàn thiện presentation' }
];

const defaultClasses: ClassItem[] = [
  { id: 'cl1', code: 'GE-101', name: 'General English 101', room: 'A1.02', schedule: 'T2 - T5 · 18:00', teacher: 'Ms. Lan', students: 18, progress: 76 },
  { id: 'cl2', code: 'IELTS-05', name: 'IELTS Speaking Mastery', room: 'B2.01', schedule: 'T3 - T6 · 19:00', teacher: 'Mr. Khoa', students: 14, progress: 68 },
  { id: 'cl3', code: 'BUS-21', name: 'Business Communication', room: 'C4.04', schedule: 'T2 - T6 · 17:30', teacher: 'Ms. Hương', students: 12, progress: 82 }
];

const defaultAssignments: Assignment[] = [
  { id: 'a1', title: 'Writing Task 2 Review', due: 'Hôm nay', type: 'Writing', status: 'Open' },
  { id: 'a2', title: 'Speaking Mock Interview', due: 'Ngày mai', type: 'Speaking', status: 'Reviewing' },
  { id: 'a3', title: 'Vocabulary Quiz', due: 'Tuần này', type: 'Grammar', status: 'Submitted' }
];

const defaultStudyCases: StudyCase[] = [
  { id: 'sc1', studentName: 'Nguyễn Lan Anh', destination: 'Canada', stage: 'University shortlist', status: 'Consulting', owner: 'Ms. Trúc', progress: 72, documents: 6, nextStep: 'Review SOP và financial proof' },
  { id: 'sc2', studentName: 'Phạm Quốc Bình', destination: 'Australia', stage: 'Visa preparation', status: 'Visa Applied', owner: 'Mr. An', progress: 86, documents: 8, nextStep: 'Submit visa appointment' },
  { id: 'sc3', studentName: 'Vũ Thảo My', destination: 'UK', stage: 'Document collection', status: 'Document Review', owner: 'Ms. Hân', progress: 58, documents: 4, nextStep: 'Hoàn thiện transcript và reference' },
  { id: 'sc4', studentName: 'Đỗ Minh Khang', destination: 'New Zealand', stage: 'Lead qualification', status: 'Lead', owner: 'Ms. Yến', progress: 25, documents: 2, nextStep: 'Call intake và đánh giá mục tiêu học tập' }
];

const defaultTours: TourItem[] = [
  { id: 't1', title: 'Korea Study + Cultural Tour', destination: 'Seoul, Korea', date: '10/12/2026', seats: 28, booked: 17, status: 'Open', revenue: 420000000 },
  { id: 't2', title: 'UK Campus Preview Tour', destination: 'London, UK', date: '20/12/2026', seats: 20, booked: 20, status: 'Full', revenue: 360000000 },
  { id: 't3', title: 'Australia City & Campus Route', destination: 'Sydney, Australia', date: '05/01/2027', seats: 24, booked: 12, status: 'Booked', revenue: 510000000 }
];

const defaultTravelers: Traveler[] = [
  { id: 'tr1', name: 'Lê Hồng Nga', country: 'Vietnam', room: 'A201', flight: 'VN 270', status: 'Confirmed' },
  { id: 'tr2', name: 'Marta Santos', country: 'Brazil', room: 'A202', flight: 'BR 991', status: 'Pending' },
  { id: 'tr3', name: 'Daniel Kim', country: 'South Korea', room: 'B110', flight: 'KR 442', status: 'Checked-in' }
];

const defaultInvoices: Invoice[] = [
  { id: 'inv1', invoiceNo: 'INV-2026-001', customer: 'Nguyễn Lan Anh', amount: 42000000, status: 'Paid', dueDate: '10/11/2026', note: 'Tuition deposit' },
  { id: 'inv2', invoiceNo: 'INV-2026-015', customer: 'Phạm Quốc Bình', amount: 65000000, status: 'Sent', dueDate: '12/11/2026', note: 'Visa and consultation fee' },
  { id: 'inv3', invoiceNo: 'INV-2026-028', customer: 'Vũ Thảo My', amount: 28000000, status: 'Overdue', dueDate: '08/11/2026', note: 'Course extension' },
  { id: 'inv4', invoiceNo: 'INV-2026-033', customer: 'Đỗ Minh Khang', amount: 19000000, status: 'Draft', dueDate: '15/11/2026', note: 'Tour installment' }
];

const defaultPortalTasks: PortalTask[] = [
  { id: 'pt1', title: 'Lịch học mới', audience: 'Nguyễn Minh Anh', due: 'Hôm nay', status: 'New', detail: 'Buổi speaking lab được cập nhật giờ học mới.' },
  { id: 'pt2', title: 'Kết quả bài kiểm tra', audience: 'Phạm Hồng Nhung', due: 'Ngày mai', status: 'Action required', detail: 'Cần xác nhận mức độ cải thiện sau kỳ thi.' },
  { id: 'pt3', title: 'Thông báo phụ huynh', audience: 'Gia đình học viên', due: 'Tuần này', status: 'Seen', detail: 'Báo cáo tiến độ học tập đã được gửi.' }
];

const defaultAiTasks: AiAssistantTask[] = [
  { id: 'ai1', title: 'Rút gọn báo cáo học viên', type: 'Summary', status: 'Ready', summary: 'Tổng hợp tiến độ học tập và điểm mạnh của học viên.', score: 96 },
  { id: 'ai2', title: 'Gợi ý nhắc nhở tự động', type: 'Reminder', status: 'Running', summary: 'Tạo nhắc nhở gửi cho phụ huynh dựa trên lịch học.', score: 89 },
  { id: 'ai3', title: 'Phân loại lead du học', type: 'CRM', status: 'Needs review', summary: 'Cần xác nhận mức ưu tiên học viên theo điểm đến.', score: 74 }
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value);

export default function Home() {
  const [selectedRole, setSelectedRole] = useState('Admin');
  const [selectedModule, setSelectedModule] = useState<ModuleKey>('dashboard');
  const [search, setSearch] = useState('');
  const [companies, setCompanies] = useState<Company[]>(defaultCompanies);
  const [demoStateReady, setDemoStateReady] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(defaultCompanies[0].id);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [companyForm, setCompanyForm] = useState({
    name: '',
    location: '',
    branch: '',
    status: 'ACTIVE' as CompanyStatus,
    students: '0',
    staff: '0',
    revenue: '0',
    health: 'Ổn định'
  });
  const [students, setStudents] = useState<Student[]>(defaultStudents);
  const [classes, setClasses] = useState<ClassItem[]>(defaultClasses);
  const [assignments, setAssignments] = useState<Assignment[]>(defaultAssignments);
  const [studyCases, setStudyCases] = useState<StudyCase[]>(defaultStudyCases);
  const [tours, setTours] = useState<TourItem[]>(defaultTours);
  const [travelers, setTravelers] = useState<Traveler[]>(defaultTravelers);
  const [invoices, setInvoices] = useState<Invoice[]>(defaultInvoices);
  const [portalTasks, setPortalTasks] = useState<PortalTask[]>(defaultPortalTasks);
  const [aiTasks, setAiTasks] = useState<AiAssistantTask[]>(defaultAiTasks);
  const [studentSearch, setStudentSearch] = useState('');
  const [caseSearch, setCaseSearch] = useState('');
  const [tourSearch, setTourSearch] = useState('');
  const [invoiceSearch, setInvoiceSearch] = useState('');
  const [attendanceForm, setAttendanceForm] = useState<Record<string, AttendanceStatus>>({
    s1: 'Present',
    s2: 'Present',
    s3: 'Late',
    s4: 'Present'
  });
  const [caseForm, setCaseForm] = useState({
    studentName: '',
    destination: '',
    stage: 'Lead qualification',
    status: 'Lead' as CaseStatus,
    owner: '',
    progress: '30',
    documents: '2',
    nextStep: ''
  });
  const [tourForm, setTourForm] = useState({
    title: '',
    destination: '',
    date: '',
    seats: '20',
    booked: '0',
    status: 'Open' as 'Open' | 'Booked' | 'Full',
    revenue: '0'
  });

  useEffect(() => {
    let savedState: Partial<PersistedDemoState> = {};

    try {
      const raw = window.localStorage.getItem(demoStorageKey);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          savedState = parsed as Partial<PersistedDemoState>;
        }
      } else {
        const legacyCompanies = window.localStorage.getItem('we_hubs_demo_companies');
        if (legacyCompanies) {
          const parsed: unknown = JSON.parse(legacyCompanies);
          if (Array.isArray(parsed)) {
            savedState.companies = parsed as Company[];
          }
        }
      }
    } catch (error) {
      console.warn('Unable to read demo state', error);
    }

    if (Array.isArray(savedState.companies) && savedState.companies.length) {
      setCompanies(savedState.companies);
      setSelectedCompanyId(savedState.companies[0].id);
    }
    if (Array.isArray(savedState.students)) setStudents(savedState.students);
    if (Array.isArray(savedState.classes)) setClasses(savedState.classes);
    if (Array.isArray(savedState.assignments)) setAssignments(savedState.assignments);
    if (Array.isArray(savedState.studyCases)) setStudyCases(savedState.studyCases);
    if (Array.isArray(savedState.tours)) setTours(savedState.tours);
    if (Array.isArray(savedState.travelers)) setTravelers(savedState.travelers);
    if (Array.isArray(savedState.invoices)) setInvoices(savedState.invoices);
    if (Array.isArray(savedState.portalTasks)) setPortalTasks(savedState.portalTasks);
    if (Array.isArray(savedState.aiTasks)) setAiTasks(savedState.aiTasks);
    if (savedState.attendanceForm && typeof savedState.attendanceForm === 'object') {
      setAttendanceForm(savedState.attendanceForm);
    }
    setDemoStateReady(true);
  }, []);

  useEffect(() => {
    if (!demoStateReady) return;

    const savedState: PersistedDemoState = {
      companies,
      students,
      classes,
      assignments,
      studyCases,
      tours,
      travelers,
      invoices,
      portalTasks,
      aiTasks,
      attendanceForm
    };

    try {
      window.localStorage.setItem(demoStorageKey, JSON.stringify(savedState));
      window.localStorage.removeItem('we_hubs_demo_companies');
    } catch (error) {
      console.warn('Unable to save demo state', error);
    }
  }, [demoStateReady, companies, students, classes, assignments, studyCases, tours, travelers, invoices, portalTasks, aiTasks, attendanceForm]);

  const filteredCompanies = useMemo(() => {
    const term = search.trim().toLowerCase();
    return companies.filter((company) => {
      if (!term) return true;
      return [company.name, company.location, company.branch].some((value) => value.toLowerCase().includes(term));
    });
  }, [companies, search]);

  const selectedCompany = companies.find((company) => company.id === selectedCompanyId) ?? companies[0];

  const totalStudents = companies.reduce((sum, company) => sum + company.students, 0);
  const totalStaff = companies.reduce((sum, company) => sum + company.staff, 0);
  const totalRevenue = companies.reduce((sum, company) => sum + company.revenue, 0);

  const handleReset = () => {
    setCompanies(defaultCompanies);
    setSelectedCompanyId(defaultCompanies[0].id);
    setSelectedModule('dashboard');
    setSearch('');
    setStudents(defaultStudents);
    setClasses(defaultClasses);
    setAssignments(defaultAssignments);
    setStudyCases(defaultStudyCases);
    setTours(defaultTours);
    setTravelers(defaultTravelers);
    setInvoices(defaultInvoices);
    setPortalTasks(defaultPortalTasks);
    setAiTasks(defaultAiTasks);
    setAttendanceForm({ s1: 'Present', s2: 'Present', s3: 'Late', s4: 'Present' });
    setStudentSearch('');
    setCaseSearch('');
    setTourSearch('');
    setInvoiceSearch('');
    window.localStorage.removeItem(demoStorageKey);
    window.localStorage.removeItem('we_hubs_demo_companies');
  };

  const handleAddStudent = () => {
    const newId = `s${Date.now()}`;
    const newStudent: Student = {
      id: newId,
      name: `Học viên ${students.length + 1}`,
      level: 'Pre-Intermediate',
      course: 'General English',
      teacher: 'Ms. Lan',
      status: 'Active',
      attendance: 88,
      score: 85,
      nextGoal: 'Thực hành speaking 5 phút mỗi ngày'
    };
    setStudents((current) => [newStudent, ...current]);
    setAttendanceForm((current) => ({ ...current, [newId]: 'Present' }));
  };

  const handleMarkAttendance = (studentId: string, status: AttendanceStatus) => {
    setAttendanceForm((current) => ({ ...current, [studentId]: status }));
    setStudents((current) => current.map((student) =>
      student.id === studentId
        ? { ...student, attendance: Math.min(100, student.attendance + (status === 'Present' ? 2 : status === 'Late' ? 1 : -4)) }
        : student
    ));
  };

  const handleUpdateAssignment = (assignmentId: string) => {
    setAssignments((current) => current.map((assignment) =>
      assignment.id === assignmentId
        ? { ...assignment, status: assignment.status === 'Open' ? 'Reviewing' : 'Submitted' }
        : assignment
    ));
  };

  const handleSaveCase = (event: React.FormEvent) => {
    event.preventDefault();
    const newCase: StudyCase = {
      id: `sc${Date.now()}`,
      studentName: caseForm.studentName || 'Học viên mới',
      destination: caseForm.destination || 'Chưa xác định',
      stage: caseForm.stage,
      status: caseForm.status,
      owner: caseForm.owner || 'Chưa phân công',
      progress: Number(caseForm.progress) || 30,
      documents: Number(caseForm.documents) || 0,
      nextStep: caseForm.nextStep || 'Cần xác nhận lịch hẹn đầu tiên'
    };

    setStudyCases((current) => [newCase, ...current]);
    setCaseForm({
      studentName: '',
      destination: '',
      stage: 'Lead qualification',
      status: 'Lead',
      owner: '',
      progress: '30',
      documents: '2',
      nextStep: ''
    });
  };

  const handleDeleteCase = (caseId: string) => {
    setStudyCases((current) => current.filter((studyCase) => studyCase.id !== caseId));
  };

  const handleUpdateCaseStatus = (caseId: string, nextStatus: CaseStatus) => {
    setStudyCases((current) => current.map((studyCase) =>
      studyCase.id === caseId
        ? { ...studyCase, status: nextStatus, progress: nextStatus === 'Accepted' ? 100 : Math.min(100, studyCase.progress + 12) }
        : studyCase
    ));
  };

  const handleSaveTour = (event: React.FormEvent) => {
    event.preventDefault();
    const newTour: TourItem = {
      id: `t${Date.now()}`,
      title: tourForm.title || 'Tour mới',
      destination: tourForm.destination || 'Chưa xác định',
      date: tourForm.date || 'Chưa lên lịch',
      seats: Number(tourForm.seats) || 0,
      booked: Number(tourForm.booked) || 0,
      status: tourForm.status,
      revenue: Number(tourForm.revenue) || 0
    };

    setTours((current) => [newTour, ...current]);
    setTourForm({
      title: '',
      destination: '',
      date: '',
      seats: '20',
      booked: '0',
      status: 'Open',
      revenue: '0'
    });
  };

  const handleDeleteTour = (tourId: string) => {
    setTours((current) => current.filter((tour) => tour.id !== tourId));
  };

  const handleTravelerStatus = (travelerId: string, nextStatus: 'Confirmed' | 'Pending' | 'Checked-in') => {
    setTravelers((current) => current.map((traveler) =>
      traveler.id === travelerId ? { ...traveler, status: nextStatus } : traveler
    ));
  };

  const handleSaveInvoice = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    const newInvoice: Invoice = {
      id: `inv${Date.now()}`,
      invoiceNo: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`,
      customer: 'Khách hàng mới',
      amount: 25000000,
      status: 'Draft',
      dueDate: '20/11/2026',
      note: 'Demo invoice'
    };

    setInvoices((current) => [newInvoice, ...current]);
  };

  const handleInvoiceStatus = (invoiceId: string, nextStatus: Invoice['status']) => {
    setInvoices((current) => current.map((invoice) =>
      invoice.id === invoiceId ? { ...invoice, status: nextStatus } : invoice
    ));
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    setInvoices((current) => current.filter((invoice) => invoice.id !== invoiceId));
  };

  const handlePortalTaskStatus = (taskId: string) => {
    setPortalTasks((current) => current.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: task.status === 'New' ? 'Seen' : task.status === 'Seen' ? 'Action required' : 'Seen'
          }
        : task
    ));
  };

  const handleAiTaskStatus = (taskId: string) => {
    setAiTasks((current) => current.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: task.status === 'Ready' ? 'Running' : task.status === 'Running' ? 'Needs review' : 'Ready',
            score: task.status === 'Running' ? 91 : task.status === 'Needs review' ? 94 : 96
          }
        : task
    ));
  };

  const handleSaveCompany = (event: React.FormEvent) => {
    event.preventDefault();

    const nextCompany: Company = {
      id: editingId ?? `c${Date.now()}`,
      name: companyForm.name || 'Công ty mới',
      location: companyForm.location || 'Chưa cập nhật',
      branch: companyForm.branch || 'Chi nhánh chính',
      status: companyForm.status,
      students: Number(companyForm.students) || 0,
      staff: Number(companyForm.staff) || 0,
      revenue: Number(companyForm.revenue) || 0,
      health: companyForm.health || 'Ổn định'
    };

    if (editingId) {
      setCompanies((previous) => previous.map((company) => (company.id === editingId ? nextCompany : company)));
    } else {
      setCompanies((previous) => [nextCompany, ...previous]);
      setSelectedCompanyId(nextCompany.id);
    }

    setEditingId(null);
    setCompanyForm({
      name: '',
      location: '',
      branch: '',
      status: 'ACTIVE',
      students: '0',
      staff: '0',
      revenue: '0',
      health: 'Ổn định'
    });
  };

  const handleEdit = (company: Company) => {
    setEditingId(company.id);
    setCompanyForm({
      name: company.name,
      location: company.location,
      branch: company.branch,
      status: company.status,
      students: String(company.students),
      staff: String(company.staff),
      revenue: String(company.revenue),
      health: company.health
    });
  };

  const handleDelete = (companyId: string) => {
    setCompanies((previous) => previous.filter((company) => company.id !== companyId));
    if (selectedCompanyId === companyId) {
      const nextCompany = companies.find((company) => company.id !== companyId) ?? defaultCompanies[0];
      setSelectedCompanyId(nextCompany.id);
    }
  };

  return (
    <main className="hub-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">W</div>
          <div>
            <h2>WE HUBS</h2>
            <small>Demo Workspace</small>
          </div>
        </div>

        <div className="nav-group">
          <div className="nav-label">Tổng quan</div>
          {Object.entries(moduleLabels).map(([key, value]) => (
            <button
              key={key}
              className={`nav-button ${selectedModule === key ? 'active' : ''}`}
              onClick={() => setSelectedModule(key as ModuleKey)}
              type="button"
            >
              <strong>{value.title}</strong>
              <small>{value.description}</small>
            </button>
          ))}
        </div>

        <div className="sidebar-note">
          <strong>DEMO MODE</strong>
          <div>Môi trường thử nghiệm local, không lưu dữ liệu nhạy cảm.</div>
        </div>
      </aside>

      <div className="content">
        <header className="topbar">
          <div>
            <div className="demo-badge">DEMO MODE</div>
            <h1>WE HUBS DEMO</h1>
          </div>

          <div className="role-switcher" aria-label="Role selector">
            {roles.map((role) => (
              <button
                key={role}
                type="button"
                className={`role-button ${selectedRole === role ? 'active' : ''}`}
                onClick={() => setSelectedRole(role)}
              >
                {role}
              </button>
            ))}
          </div>

          <button type="button" className="reset-button" onClick={handleReset}>
            Reset Demo Data
          </button>
        </header>

        <section className="metrics">
          <div className="metric-card">
            <span>Học viên</span>
            <strong>{totalStudents}</strong>
            <small>+8.4% so với tháng trước</small>
          </div>
          <div className="metric-card">
            <span>Nhân sự</span>
            <strong>{totalStaff}</strong>
            <small>3 công ty đang vận hành</small>
          </div>
          <div className="metric-card">
            <span>Doanh thu</span>
            <strong>{formatCurrency(totalRevenue)}</strong>
            <small>+12.2% trong 30 ngày</small>
          </div>
          <div className="metric-card">
            <span>Vai trò xem</span>
            <strong>{selectedRole}</strong>
            <small>Giao diện theo nhóm nhân sự</small>
          </div>
        </section>

        {selectedModule === 'dashboard' && (
          <>
            <section className="company-grid">
              {filteredCompanies.map((company) => (
                <button
                  key={company.id}
                  type="button"
                  className={`company-card ${selectedCompany?.id === company.id ? 'active' : ''}`}
                  onClick={() => setSelectedCompanyId(company.id)}
                >
                  <div className="company-card-header">
                    <h3>{company.name}</h3>
                    <span className={`company-status ${company.status.toLowerCase()}`}>{company.status}</span>
                  </div>
                  <div className="company-meta">{company.location} · {company.branch}</div>
                  <div className="company-breakdown">
                    <div>
                      <strong>Học viên</strong>
                      {company.students}
                    </div>
                    <div>
                      <strong>Nhân sự</strong>
                      {company.staff}
                    </div>
                    <div>
                      <strong>Doanh thu</strong>
                      {formatCurrency(company.revenue)}
                    </div>
                  </div>
                </button>
              ))}
            </section>

            <section className="management-board">
              <div className="panel">
                <div className="panel-header">
                  <h3>Quản lý ba công ty</h3>
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Tìm kiếm công ty..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>

                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Công ty</th>
                        <th>Chi nhánh</th>
                        <th>Học viên</th>
                        <th>Nhân sự</th>
                        <th>Doanh thu</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCompanies.map((company) => (
                        <tr key={company.id}>
                          <td>{company.name}</td>
                          <td>{company.branch}</td>
                          <td>{company.students}</td>
                          <td>{company.staff}</td>
                          <td>{formatCurrency(company.revenue)}</td>
                          <td>{company.health}</td>
                          <td>
                            <div className="action-row">
                              <button type="button" className="small-button" onClick={() => handleEdit(company)}>Sửa</button>
                              <button type="button" className="danger-button" onClick={() => handleDelete(company.id)}>Xoá</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="panel">
                <h3>{editingId ? 'Chỉnh sửa công ty' : 'Thêm công ty'}</h3>

                <form onSubmit={handleSaveCompany} className="form-grid">
                  <div className="field">
                    <label htmlFor="company-name">Tên công ty</label>
                    <input id="company-name" value={companyForm.name} onChange={(event) => setCompanyForm({ ...companyForm, name: event.target.value })} />
                  </div>

                  <div className="field">
                    <label htmlFor="company-location">Địa điểm</label>
                    <input id="company-location" value={companyForm.location} onChange={(event) => setCompanyForm({ ...companyForm, location: event.target.value })} />
                  </div>

                  <div className="field">
                    <label htmlFor="company-branch">Chi nhánh</label>
                    <input id="company-branch" value={companyForm.branch} onChange={(event) => setCompanyForm({ ...companyForm, branch: event.target.value })} />
                  </div>

                  <div className="field">
                    <label htmlFor="company-status">Trạng thái</label>
                    <select id="company-status" value={companyForm.status} onChange={(event) => setCompanyForm({ ...companyForm, status: event.target.value as CompanyStatus })}>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="PREVIEW">PREVIEW</option>
                      <option value="PENDING">PENDING</option>
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="company-students">Số học viên</label>
                    <input id="company-students" type="number" value={companyForm.students} onChange={(event) => setCompanyForm({ ...companyForm, students: event.target.value })} />
                  </div>

                  <div className="field">
                    <label htmlFor="company-staff">Số nhân sự</label>
                    <input id="company-staff" type="number" value={companyForm.staff} onChange={(event) => setCompanyForm({ ...companyForm, staff: event.target.value })} />
                  </div>

                  <div className="field">
                    <label htmlFor="company-revenue">Doanh thu</label>
                    <input id="company-revenue" type="number" value={companyForm.revenue} onChange={(event) => setCompanyForm({ ...companyForm, revenue: event.target.value })} />
                  </div>

                  <div className="field">
                    <label htmlFor="company-health">Tình trạng</label>
                    <input id="company-health" value={companyForm.health} onChange={(event) => setCompanyForm({ ...companyForm, health: event.target.value })} />
                  </div>

                  <div className="form-actions">
                    <button type="button" className="small-button" onClick={() => setEditingId(null)}>
                      Huỷ
                    </button>
                    <button type="submit" className="primary-button">
                      {editingId ? 'Lưu thay đổi' : 'Thêm công ty'}
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </>
        )}

        {selectedModule === 'academy' && (
          <section className="module-panel academy-panel">
            <div className="panel-header">
              <div>
                <div className="demo-badge">DEMO MODE</div>
                <h3>WE STUDY ACADEMY</h3>
              </div>
              <button type="button" className="primary-button" onClick={handleAddStudent}>+ Thêm học viên</button>
            </div>

            <div className="academy-summary">
              <div className="academy-card">
                <span>Học viên đang theo dõi</span>
                <strong>{students.length}</strong>
                <small>+6 mới trong 2 tuần</small>
              </div>
              <div className="academy-card">
                <span>Lớp học đang mở</span>
                <strong>{classes.length}</strong>
                <small>3 phòng vận hành</small>
              </div>
              <div className="academy-card">
                <span>Điểm danh hôm nay</span>
                <strong>{Object.values(attendanceForm).filter((status) => status === 'Present').length}/{students.length}</strong>
                <small>Tỷ lệ 89%</small>
              </div>
              <div className="academy-card">
                <span>Bài tập cần xử lý</span>
                <strong>{assignments.filter((item) => item.status !== 'Submitted').length}</strong>
                <small>2 nhiệm vụ chờ review</small>
              </div>
            </div>

            <div className="academy-grid">
              <div className="panel inner-panel">
                <div className="panel-header">
                  <h3>Học viên</h3>
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Tìm học viên..."
                    value={studentSearch}
                    onChange={(event) => setStudentSearch(event.target.value)}
                  />
                </div>

                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Học viên</th>
                        <th>Trình độ</th>
                        <th>Điểm danh</th>
                        <th>Điểm</th>
                        <th>Tiến độ</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students
                        .filter((student) => student.name.toLowerCase().includes(studentSearch.toLowerCase()))
                        .map((student) => (
                          <tr key={student.id}>
                            <td>
                              <strong>{student.name}</strong>
                              <div className="muted">{student.course}</div>
                            </td>
                            <td>{student.level}</td>
                            <td>
                              <select
                                value={attendanceForm[student.id] ?? 'Present'}
                                onChange={(event) => handleMarkAttendance(student.id, event.target.value as AttendanceStatus)}
                              >
                                <option value="Present">Present</option>
                                <option value="Late">Late</option>
                                <option value="Absent">Absent</option>
                              </select>
                            </td>
                            <td>{student.score}</td>
                            <td>
                              <div className="progress-wrap">
                                <div className="progress-bar">
                                  <span style={{ width: `${student.attendance}%` }} />
                                </div>
                                <small>{student.attendance}%</small>
                              </div>
                            </td>
                            <td>
                              <button type="button" className="small-button">Xem hồ sơ</button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="panel inner-panel">
                <div className="panel-header">
                  <h3>Lớp học</h3>
                </div>
                <div className="stack-list">
                  {classes.map((classItem) => (
                    <div key={classItem.id} className="class-card">
                      <div className="class-head">
                        <strong>{classItem.code}</strong>
                        <span>{classItem.room}</span>
                      </div>
                      <h4>{classItem.name}</h4>
                      <div className="muted">{classItem.schedule}</div>
                      <div className="muted">Giảng viên: {classItem.teacher}</div>
                      <div className="progress-wrap compact">
                        <div className="progress-bar">
                          <span style={{ width: `${classItem.progress}%` }} />
                        </div>
                        <small>{classItem.progress}%</small>
                      </div>
                      <div className="class-meta">
                        <span>{classItem.students} học viên</span>
                        <button type="button" className="small-button">Chi tiết</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="academy-grid lower-grid">
              <div className="panel inner-panel">
                <div className="panel-header">
                  <h3>Bài tập & nhận xét</h3>
                </div>
                <div className="stack-list">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="assignment-card">
                      <div className="assignment-head">
                        <strong>{assignment.title}</strong>
                        <span className={`status-pill ${assignment.status.toLowerCase().replace(/\s+/g, '-')}`}>{assignment.status}</span>
                      </div>
                      <div className="muted">{assignment.type} · Hạn: {assignment.due}</div>
                      <button type="button" className="small-button" onClick={() => handleUpdateAssignment(assignment.id)}>
                        {assignment.status === 'Open' ? 'Chuyển sang Reviewing' : 'Đánh dấu Submitted'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel inner-panel">
                <div className="panel-header">
                  <h3>Lộ trình học</h3>
                </div>
                <div className="path-list">
                  <div className="path-step active">
                    <span>1</span>
                    <div>
                      <strong>Khởi động</strong>
                      <small>Hoàn tất baseline test</small>
                    </div>
                  </div>
                  <div className="path-step active">
                    <span>2</span>
                    <div>
                      <strong>Phát triển kỹ năng</strong>
                      <small>Speaking & Writing intensive</small>
                    </div>
                  </div>
                  <div className="path-step">
                    <span>3</span>
                    <div>
                      <strong>Thi thử</strong>
                      <small>Mock exam theo chuẩn</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {selectedModule === 'study' && (
          <section className="module-panel study-panel">
            <div className="panel-header">
              <div>
                <div className="demo-badge">DEMO MODE</div>
                <h3>WE STUDY</h3>
              </div>
              <button type="button" className="primary-button" onClick={() => setSelectedModule('dashboard')}>Quay về dashboard</button>
            </div>

            <div className="academy-summary">
              <div className="academy-card">
                <span>Lead đang theo dõi</span>
                <strong>{studyCases.length}</strong>
                <small>+3 trong tuần này</small>
              </div>
              <div className="academy-card">
                <span>Hồ sơ cần xử lý</span>
                <strong>{studyCases.filter((item) => item.status !== 'Accepted').length}</strong>
                <small>4 vụ việc đang chờ</small>
              </div>
              <div className="academy-card">
                <span>Visa / giấy tờ</span>
                <strong>{studyCases.reduce((sum, item) => sum + item.documents, 0)}</strong>
                <small>Documents ready</small>
              </div>
              <div className="academy-card">
                <span>Ưu tiên cao</span>
                <strong>{studyCases.filter((item) => item.progress >= 70).length}</strong>
                <small>Tỷ lệ conversion tốt</small>
              </div>
            </div>

            <div className="academy-grid">
              <div className="panel inner-panel">
                <div className="panel-header">
                  <h3>Pipeline tuyển sinh</h3>
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Tìm hồ sơ..."
                    value={caseSearch}
                    onChange={(event) => setCaseSearch(event.target.value)}
                  />
                </div>

                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Học viên</th>
                        <th>Điểm đến</th>
                        <th>Stage</th>
                        <th>Owner</th>
                        <th>Tiến độ</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studyCases
                        .filter((studyCase) => studyCase.studentName.toLowerCase().includes(caseSearch.toLowerCase()))
                        .map((studyCase) => (
                          <tr key={studyCase.id}>
                            <td>
                              <strong>{studyCase.studentName}</strong>
                              <div className="muted">{studyCase.nextStep}</div>
                            </td>
                            <td>{studyCase.destination}</td>
                            <td>
                              <span className={`status-pill ${studyCase.status.toLowerCase().replace(/\s+/g, '-')}`}>{studyCase.status}</span>
                            </td>
                            <td>{studyCase.owner}</td>
                            <td>
                              <div className="progress-wrap">
                                <div className="progress-bar">
                                  <span style={{ width: `${studyCase.progress}%` }} />
                                </div>
                                <small>{studyCase.progress}%</small>
                              </div>
                            </td>
                            <td>
                              <div className="action-row">
                                <button type="button" className="small-button" onClick={() => handleUpdateCaseStatus(studyCase.id, 'Accepted')}>Accept</button>
                                <button type="button" className="danger-button" onClick={() => handleDeleteCase(studyCase.id)}>Xoá</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="panel inner-panel">
                <div className="panel-header">
                  <h3>Thêm hồ sơ mới</h3>
                </div>

                <form onSubmit={handleSaveCase} className="form-grid">
                  <div className="field">
                    <label htmlFor="student-name">Tên học viên</label>
                    <input id="student-name" value={caseForm.studentName} onChange={(event) => setCaseForm({ ...caseForm, studentName: event.target.value })} />
                  </div>

                  <div className="field">
                    <label htmlFor="destination">Điểm đến</label>
                    <input id="destination" value={caseForm.destination} onChange={(event) => setCaseForm({ ...caseForm, destination: event.target.value })} />
                  </div>

                  <div className="field">
                    <label htmlFor="case-stage">Stage</label>
                    <select id="case-stage" value={caseForm.stage} onChange={(event) => setCaseForm({ ...caseForm, stage: event.target.value })}>
                      <option value="Lead qualification">Lead qualification</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Document collection">Document collection</option>
                      <option value="Visa preparation">Visa preparation</option>
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="case-status">Status</label>
                    <select id="case-status" value={caseForm.status} onChange={(event) => setCaseForm({ ...caseForm, status: event.target.value as CaseStatus })}>
                      <option value="Lead">Lead</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Document Review">Document Review</option>
                      <option value="Visa Applied">Visa Applied</option>
                      <option value="Accepted">Accepted</option>
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="case-owner">Owner</label>
                    <input id="case-owner" value={caseForm.owner} onChange={(event) => setCaseForm({ ...caseForm, owner: event.target.value })} />
                  </div>

                  <div className="field">
                    <label htmlFor="case-progress">Tiến độ</label>
                    <input id="case-progress" type="number" min="0" max="100" value={caseForm.progress} onChange={(event) => setCaseForm({ ...caseForm, progress: event.target.value })} />
                  </div>

                  <div className="field">
                    <label htmlFor="case-documents">Số tài liệu</label>
                    <input id="case-documents" type="number" value={caseForm.documents} onChange={(event) => setCaseForm({ ...caseForm, documents: event.target.value })} />
                  </div>

                  <div className="field">
                    <label htmlFor="case-next-step">Next step</label>
                    <input id="case-next-step" value={caseForm.nextStep} onChange={(event) => setCaseForm({ ...caseForm, nextStep: event.target.value })} />
                  </div>

                  <div className="form-actions">
                    <button type="button" className="small-button" onClick={() => setCaseForm({ studentName: '', destination: '', stage: 'Lead qualification', status: 'Lead', owner: '', progress: '30', documents: '2', nextStep: '' })}>Huỷ</button>
                    <button type="submit" className="primary-button">Lưu hồ sơ</button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        )}

        {selectedModule === 'travel' && (
          <section className="module-panel travel-panel">
            <div className="panel-header">
              <div>
                <div className="demo-badge">DEMO MODE</div>
                <h3>WE TRAVEL</h3>
              </div>
              <button type="button" className="primary-button" onClick={() => setSelectedModule('dashboard')}>Quay về dashboard</button>
            </div>

            <div className="academy-summary">
              <div className="academy-card">
                <span>Tour đang mở</span>
                <strong>{tours.length}</strong>
                <small>3 tuyến đang chạy</small>
              </div>
              <div className="academy-card">
                <span>Khách đã đặt</span>
                <strong>{tours.reduce((sum, tour) => sum + tour.booked, 0)}</strong>
                <small>Đầy đủ chuẩn bị</small>
              </div>
              <div className="academy-card">
                <span>Doanh thu ước tính</span>
                <strong>{formatCurrency(tours.reduce((sum, tour) => sum + tour.revenue, 0))}</strong>
                <small>Giả lập theo từng chuyến</small>
              </div>
              <div className="academy-card">
                <span>Khách đang đi</span>
                <strong>{travelers.length}</strong>
                <small>Trên lộ trình</small>
              </div>
            </div>

            <div className="academy-grid">
              <div className="panel inner-panel">
                <div className="panel-header">
                  <h3>Danh sách tour</h3>
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Tìm tour..."
                    value={tourSearch}
                    onChange={(event) => setTourSearch(event.target.value)}
                  />
                </div>

                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Tour</th>
                        <th>Điểm đến</th>
                        <th>Ngày</th>
                        <th>Đặt chỗ</th>
                        <th>Doanh thu</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tours
                        .filter((tour) => tour.title.toLowerCase().includes(tourSearch.toLowerCase()))
                        .map((tour) => (
                          <tr key={tour.id}>
                            <td>{tour.title}</td>
                            <td>{tour.destination}</td>
                            <td>{tour.date}</td>
                            <td>{tour.booked}/{tour.seats}</td>
                            <td>{formatCurrency(tour.revenue)}</td>
                            <td><span className={`status-pill ${tour.status.toLowerCase()}`}>{tour.status}</span></td>
                            <td>
                              <button type="button" className="danger-button" onClick={() => handleDeleteTour(tour.id)}>Xoá</button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="panel inner-panel">
                <div className="panel-header">
                  <h3>Thêm tour mới</h3>
                </div>

                <form onSubmit={handleSaveTour} className="form-grid">
                  <div className="field">
                    <label htmlFor="tour-title">Tên tour</label>
                    <input id="tour-title" value={tourForm.title} onChange={(event) => setTourForm({ ...tourForm, title: event.target.value })} />
                  </div>

                  <div className="field">
                    <label htmlFor="tour-destination">Điểm đến</label>
                    <input id="tour-destination" value={tourForm.destination} onChange={(event) => setTourForm({ ...tourForm, destination: event.target.value })} />
                  </div>

                  <div className="field">
                    <label htmlFor="tour-date">Ngày khởi hành</label>
                    <input id="tour-date" value={tourForm.date} onChange={(event) => setTourForm({ ...tourForm, date: event.target.value })} />
                  </div>

                  <div className="field">
                    <label htmlFor="tour-seats">Số chỗ</label>
                    <input id="tour-seats" type="number" value={tourForm.seats} onChange={(event) => setTourForm({ ...tourForm, seats: event.target.value })} />
                  </div>

                  <div className="field">
                    <label htmlFor="tour-booked">Đã đặt</label>
                    <input id="tour-booked" type="number" value={tourForm.booked} onChange={(event) => setTourForm({ ...tourForm, booked: event.target.value })} />
                  </div>

                  <div className="field">
                    <label htmlFor="tour-status">Trạng thái</label>
                    <select id="tour-status" value={tourForm.status} onChange={(event) => setTourForm({ ...tourForm, status: event.target.value as 'Open' | 'Booked' | 'Full' })}>
                      <option value="Open">Open</option>
                      <option value="Booked">Booked</option>
                      <option value="Full">Full</option>
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="tour-revenue">Doanh thu</label>
                    <input id="tour-revenue" type="number" value={tourForm.revenue} onChange={(event) => setTourForm({ ...tourForm, revenue: event.target.value })} />
                  </div>

                  <div className="form-actions">
                    <button type="button" className="small-button" onClick={() => setTourForm({ title: '', destination: '', date: '', seats: '20', booked: '0', status: 'Open', revenue: '0' })}>Huỷ</button>
                    <button type="submit" className="primary-button">Lưu tour</button>
                  </div>
                </form>
              </div>
            </div>

            <div className="academy-grid lower-grid">
              <div className="panel inner-panel">
                <div className="panel-header">
                  <h3>Danh sách khách</h3>
                </div>
                <div className="stack-list">
                  {travelers.map((traveler) => (
                    <div key={traveler.id} className="assignment-card">
                      <div className="assignment-head">
                        <strong>{traveler.name}</strong>
                        <span className={`status-pill ${traveler.status.toLowerCase().replace(/\s+/g, '-')}`}>{traveler.status}</span>
                      </div>
                      <div className="muted">{traveler.country} · Phòng {traveler.room}</div>
                      <div className="muted">Flight: {traveler.flight}</div>
                      <div className="action-row">
                        <button type="button" className="small-button" onClick={() => handleTravelerStatus(traveler.id, 'Confirmed')}>Confirmed</button>
                        <button type="button" className="small-button" onClick={() => handleTravelerStatus(traveler.id, 'Checked-in')}>Checked-in</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel inner-panel">
                <div className="panel-header">
                  <h3>Lịch trình mẫu</h3>
                </div>
                <div className="path-list">
                  <div className="path-step active">
                    <span>1</span>
                    <div>
                      <strong>Đón khách</strong>
                      <small>Airport transfer & welcome briefing</small>
                    </div>
                  </div>
                  <div className="path-step active">
                    <span>2</span>
                    <div>
                      <strong>Thăm trường</strong>
                      <small>Campus tour + meeting advisor</small>
                    </div>
                  </div>
                  <div className="path-step">
                    <span>3</span>
                    <div>
                      <strong>Check-out</strong>
                      <small>Hướng dẫn kết thúc tour</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {selectedModule === 'finance' && (
          <section className="module-panel finance-panel">
            <div className="panel-header">
              <div>
                <div className="demo-badge">DEMO MODE</div>
                <h3>WE FINANCE</h3>
              </div>
              <button type="button" className="primary-button" onClick={handleSaveInvoice}>+ Tạo hóa đơn mẫu</button>
            </div>

            <div className="academy-summary">
              <div className="academy-card">
                <span>Doanh thu tổng</span>
                <strong>{formatCurrency(invoices.reduce((sum, invoice) => sum + invoice.amount, 0))}</strong>
                <small>ĐST theo mock data</small>
              </div>
              <div className="academy-card">
                <span>Đã thu</span>
                <strong>{formatCurrency(invoices.filter((invoice) => invoice.status === 'Paid').reduce((sum, invoice) => sum + invoice.amount, 0))}</strong>
                <small>Paid invoices</small>
              </div>
              <div className="academy-card">
                <span>Chưa thanh toán</span>
                <strong>{invoices.filter((invoice) => invoice.status !== 'Paid').length}</strong>
                <small>Cần nhắc nhở</small>
              </div>
              <div className="academy-card">
                <span>Overdue</span>
                <strong>{invoices.filter((invoice) => invoice.status === 'Overdue').length}</strong>
                <small>Đang cần xử lý</small>
              </div>
            </div>

            <div className="academy-grid">
              <div className="panel inner-panel">
                <div className="panel-header">
                  <h3>Hóa đơn & thanh toán</h3>
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Tìm hóa đơn..."
                    value={invoiceSearch}
                    onChange={(event) => setInvoiceSearch(event.target.value)}
                  />
                </div>

                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Invoice</th>
                        <th>Khách</th>
                        <th>Amount</th>
                        <th>Due</th>
                        <th>Status</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices
                        .filter((invoice) => invoice.customer.toLowerCase().includes(invoiceSearch.toLowerCase()) || invoice.invoiceNo.toLowerCase().includes(invoiceSearch.toLowerCase()))
                        .map((invoice) => (
                          <tr key={invoice.id}>
                            <td>
                              <strong>{invoice.invoiceNo}</strong>
                              <div className="muted">{invoice.note}</div>
                            </td>
                            <td>{invoice.customer}</td>
                            <td>{formatCurrency(invoice.amount)}</td>
                            <td>{invoice.dueDate}</td>
                            <td>
                              <span className={`status-pill ${invoice.status.toLowerCase()}`}>{invoice.status}</span>
                            </td>
                            <td>
                              <div className="action-row">
                                <button type="button" className="small-button" onClick={() => handleInvoiceStatus(invoice.id, 'Paid')}>Mark Paid</button>
                                <button type="button" className="danger-button" onClick={() => handleDeleteInvoice(invoice.id)}>Xoá</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="panel inner-panel">
                <div className="panel-header">
                  <h3>Nhắc phí mẫu</h3>
                </div>

                <div className="stack-list">
                  <div className="assignment-card">
                    <div className="assignment-head">
                      <strong>Reminder #01</strong>
                      <span className="status-pill sent">Sent</span>
                    </div>
                    <div className="muted">Vũ Thảo My · Overdue 3 ngày</div>
                    <button type="button" className="small-button">Gửi nhắc</button>
                  </div>

                  <div className="assignment-card">
                    <div className="assignment-head">
                      <strong>Reminder #02</strong>
                      <span className="status-pill pending">Pending</span>
                    </div>
                    <div className="muted">Phạm Quốc Bình · Hạn chót trong 2 ngày</div>
                    <button type="button" className="small-button">Lên lịch</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {selectedModule === 'portal' && (
          <section className="module-panel portal-panel">
            <div className="panel-header">
              <div>
                <div className="demo-badge">DEMO MODE</div>
                <h3>WE PORTAL</h3>
              </div>
              <button type="button" className="primary-button" onClick={() => setPortalTasks((current) => [{
                id: `pt${Date.now()}`,
                title: 'Thông báo mới',
                audience: 'Học viên & phụ huynh',
                due: 'Ngay lập tức',
                status: 'New',
                detail: 'Thông báo demo đã được tạo trong portal.'
              }, ...current])}>+ Thêm thông báo</button>
            </div>

            <div className="academy-summary">
              <div className="academy-card">
                <span>Học viên trực tuyến</span>
                <strong>{students.length}</strong>
                <small>Đang hoạt động trong hệ thống</small>
              </div>
              <div className="academy-card">
                <span>Thông báo mới</span>
                <strong>{portalTasks.filter((task) => task.status !== 'Seen').length}</strong>
                <small>Chưa xem hoàn toàn</small>
              </div>
              <div className="academy-card">
                <span>Hẹn lịch</span>
                <strong>{portalTasks.filter((task) => task.status === 'Action required').length}</strong>
                <small>Cần phản hồi</small>
              </div>
              <div className="academy-card">
                <span>Phụ huynh</span>
                <strong>89%</strong>
                <small>Đánh giá hài lòng</small>
              </div>
            </div>

            <div className="academy-grid">
              <div className="panel inner-panel">
                <div className="panel-header">
                  <h3>Cổng thông tin học viên</h3>
                </div>

                <div className="stack-list">
                  {portalTasks.map((task) => (
                    <div key={task.id} className="assignment-card">
                      <div className="assignment-head">
                        <strong>{task.title}</strong>
                        <span className={`status-pill ${task.status.toLowerCase().replace(/\s+/g, '-')}`}>{task.status}</span>
                      </div>
                      <div className="muted">{task.audience} · {task.due}</div>
                      <div className="muted">{task.detail}</div>
                      <button type="button" className="small-button" onClick={() => handlePortalTaskStatus(task.id)}>
                        {task.status === 'New' ? 'Đánh dấu đã xem' : task.status === 'Seen' ? 'Chuyển action needed' : 'Đánh dấu đã đọc'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel inner-panel">
                <div className="panel-header">
                  <h3>Thời khóa biểu & thông tin</h3>
                </div>
                <div className="path-list">
                  <div className="path-step active">
                    <span>1</span>
                    <div>
                      <strong>Buổi học IELTS</strong>
                      <small>Thứ 3 · 18:30 · Room A1.02</small>
                    </div>
                  </div>
                  <div className="path-step active">
                    <span>2</span>
                    <div>
                      <strong>Meeting phụ huynh</strong>
                      <small>Thứ 5 · 20:00 · Zoom room</small>
                    </div>
                  </div>
                  <div className="path-step">
                    <span>3</span>
                    <div>
                      <strong>Mock test</strong>
                      <small>Thứ 6 · 09:00 · Test center</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {selectedModule === 'ai' && (
          <section className="module-panel ai-panel">
            <div className="panel-header">
              <div>
                <div className="demo-badge">DEMO MODE</div>
                <h3>WE AI</h3>
              </div>
              <button type="button" className="primary-button" onClick={() => setAiTasks((current) => [{
                id: `ai${Date.now()}`,
                title: 'Prompt mới',
                type: 'Custom',
                status: 'Ready',
                summary: 'AI đang tạo phản hồi dựa trên dữ liệu demo hiện tại.',
                score: 92
              }, ...current])}>+ Tạo prompt mới</button>
            </div>

            <div className="academy-summary">
              <div className="academy-card">
                <span>Công việc AI</span>
                <strong>{aiTasks.length}</strong>
                <small>Đang chạy trên demo</small>
              </div>
              <div className="academy-card">
                <span>Độ tin cậy</span>
                <strong>{Math.round(aiTasks.reduce((sum, task) => sum + task.score, 0) / aiTasks.length)}%</strong>
                <small>Giả lập bởi AI model</small>
              </div>
              <div className="academy-card">
                <span>Đang xử lý</span>
                <strong>{aiTasks.filter((task) => task.status === 'Running').length}</strong>
                <small>Queued workflow</small>
              </div>
              <div className="academy-card">
                <span>Yêu cầu review</span>
                <strong>{aiTasks.filter((task) => task.status === 'Needs review').length}</strong>
                <small>Cần kiểm tra sơ bộ</small>
              </div>
            </div>

            <div className="academy-grid">
              <div className="panel inner-panel">
                <div className="panel-header">
                  <h3>Agent workflow</h3>
                </div>
                <div className="stack-list">
                  {aiTasks.map((task) => (
                    <div key={task.id} className="assignment-card">
                      <div className="assignment-head">
                        <strong>{task.title}</strong>
                        <span className={`status-pill ${task.status.toLowerCase().replace(/\s+/g, '-')}`}>{task.status}</span>
                      </div>
                      <div className="muted">{task.type} · Score {task.score}%</div>
                      <div className="muted">{task.summary}</div>
                      <button type="button" className="small-button" onClick={() => handleAiTaskStatus(task.id)}>
                        {task.status === 'Ready' ? 'Chạy AI' : task.status === 'Running' ? 'Gửi review' : 'Reset workflow'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel inner-panel">
                <div className="panel-header">
                  <h3>Prompt mẫu</h3>
                </div>
                <div className="path-list">
                  <div className="path-step active">
                    <span>1</span>
                    <div>
                      <strong>Summarize class performance</strong>
                      <small>Rút gọn tiến độ học viên và báo cáo doanh thu</small>
                    </div>
                  </div>
                  <div className="path-step active">
                    <span>2</span>
                    <div>
                      <strong>Draft parent reminder</strong>
                      <small>Viết email ngắn gọn, dễ hiểu, nhấn mạnh deadline</small>
                    </div>
                  </div>
                  <div className="path-step">
                    <span>3</span>
                    <div>
                      <strong>Recommend next action</strong>
                      <small>Gợi ý bước theo dõi tiếp theo cho học viên</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
