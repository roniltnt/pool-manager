import { useState } from 'react';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import ScheduleDisplay from './components/ScheduleDisplay';
import { translations } from './translations';

const mockStudents = [
    { id: 101, firstName: 'רוני', lastName: 'לאופר', requestedStyle: 'FREESTYLE', lessonPreference: 'ANY' },
    { id: 102, firstName: 'ניר', lastName: 'אוחנה', requestedStyle: 'FREESTYLE', lessonPreference: 'GROUP_ONLY' },
    { id: 103, firstName: 'איציק', lastName: 'גנוט', requestedStyle: 'BUTTERFLY', lessonPreference: 'PRIVATE_ONLY' },
    { id: 104, firstName: 'משה', lastName: 'לוי', requestedStyle: 'BACKSTROKE', lessonPreference: 'ANY' },
    { id: 105, firstName: 'אור', lastName: 'בוטבול', requestedStyle: 'BUTTERFLY', lessonPreference: 'PRIVATE_ONLY' },
    { id: 106, firstName: 'עמרי', lastName: 'הכהן', requestedStyle: 'FREESTYLE', lessonPreference: 'GROUP_ONLY' },
    { id: 107, firstName: 'אהרן', lastName: 'אהרן', requestedStyle: 'BUTTERFLY', lessonPreference: 'PRIVATE_ONLY' },
    { id: 108, firstName: 'שמעון', lastName: 'הצדיק', requestedStyle: 'FREESTYLE', lessonPreference: 'PRIVATE_ONLY' },
    { id: 109, firstName: 'גלי', lastName: 'עטרי', requestedStyle: 'BACKSTROKE', lessonPreference: 'PRIVATE_ONLY' },
    { id: 110, firstName: 'עין', lastName: 'גדי', requestedStyle: 'BACKSTROKE', lessonPreference: 'PRIVATE_ONLY' },
    { id: 111, firstName: 'דני', lastName: 'שובבני', requestedStyle: 'FREESTYLE', lessonPreference: 'GROUP_ONLY' },
    { id: 112, firstName: 'דנה', lastName: 'אינטרנשיונל', requestedStyle: 'FREESTYLE', lessonPreference: 'GROUP_ONLY' },
    { id: 113, firstName: 'אבי', lastName: 'טולדנו', requestedStyle: 'FREESTYLE', lessonPreference: 'GROUP_ONLY' },
    { id: 114, firstName: 'יגאל', lastName: 'בשן', requestedStyle: 'FREESTYLE', lessonPreference: 'GROUP_ONLY' },
    { id: 115, firstName: 'עוזי', lastName: 'חיטמן', requestedStyle: 'FREESTYLE', lessonPreference: 'GROUP_ONLY' },
    { id: 116, firstName: 'אריק', lastName: 'איינשטיין', requestedStyle: 'FREESTYLE', lessonPreference: 'GROUP_ONLY' },
    { id: 117, firstName: 'קורין', lastName: 'אלאל', requestedStyle: 'BREASTSTROKE', lessonPreference: 'GROUP_ONLY' },
    { id: 118, firstName: 'יהודית', lastName: 'רביץ', requestedStyle: 'BREASTSTROKE', lessonPreference: 'GROUP_ONLY' },
    { id: 119, firstName: 'ריטה', lastName: 'יהאן', requestedStyle: 'BREASTSTROKE', lessonPreference: 'GROUP_ONLY' },
    { id: 120, firstName: 'שרית', lastName: 'חדד', requestedStyle: 'BREASTSTROKE', lessonPreference: 'GROUP_ONLY' },
    { id: 121, firstName: 'שלמה', lastName: 'ארצי', requestedStyle: 'BUTTERFLY', lessonPreference: 'ANY' },
    { id: 122, firstName: 'גידי', lastName: 'גוב', requestedStyle: 'BACKSTROKE', lessonPreference: 'ANY' },
    { id: 123, firstName: 'מאיר', lastName: 'אריאל', requestedStyle: 'FREESTYLE', lessonPreference: 'PRIVATE_ONLY' },
    { id: 124, firstName: 'שלום', lastName: 'חנוך', requestedStyle: 'BUTTERFLY', lessonPreference: 'GROUP_ONLY' },
    { id: 125, firstName: 'צביקה', lastName: 'פיק', requestedStyle: 'BREASTSTROKE', lessonPreference: 'ANY' },
    { id: 126, firstName: 'שושנה', lastName: 'דמארי', requestedStyle: 'BACKSTROKE', lessonPreference: 'PRIVATE_ONLY' },
    { id: 127, firstName: 'יפה', lastName: 'ירקוני', requestedStyle: 'FREESTYLE', lessonPreference: 'GROUP_ONLY' },
    { id: 128, firstName: 'אילנית', lastName: 'אילנית', requestedStyle: 'BUTTERFLY', lessonPreference: 'ANY' },
    { id: 129, firstName: 'מרגלית', lastName: 'צנעני', requestedStyle: 'BREASTSTROKE', lessonPreference: 'PRIVATE_ONLY' },
    { id: 130, firstName: 'זהבה', lastName: 'בן', requestedStyle: 'BREASTSTROKE', lessonPreference: 'PRIVATE_ONLY' }
];

function App() {
    const [language, setLanguage] = useState('he');
    const t = translations[language];

    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({
        firstName: '', lastName: '', requestedStyle: 'FREESTYLE', lessonPreference: 'ANY', preferredTeacher: 'ANY'
    });4
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const MAX_STUDENTS = 30;

    const toggleLanguage = () => {
        setLanguage(language === 'he' ? 'en' : 'he');
    };

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddStudent = () => {
        if (!form.firstName || !form.lastName) {
            alert(t.fillNameError);
            return;
        }
        if (students.length >= MAX_STUDENTS) return;

        setStudents([...students, { ...form, id: Date.now() }]);
        setForm({ ...form, firstName: '', lastName: '' });
    };

    const removeStudent = (id) => {
        setStudents(students.filter(s => s.id !== id));
    };

    const handleGenerateSchedule = async () => {
        if (students.length === 0) return;
        setLoading(true);
        setError(null);
        setSchedule(null);

        try {
            const response = await fetch('http://localhost:8080/api/pool/schedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(students.map(({  ...rest }) => rest)),
            });

            if (!response.ok) throw new Error(t.serverError);
            const data = await response.json();
            setSchedule(data);
        } catch (err) {
            setError(t.fetchError + err.message);
        } finally {
            setLoading(false);
        }
    };

    const direction = language === 'he' ? 'rtl' : 'ltr';

    return (
        <div className="container" style={{ direction: direction }}>
            <header>
                <button
                    onClick={toggleLanguage}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: language === 'he' ? '20px' : 'auto',
                        right: language === 'en' ? '20px' : 'auto',
                        background: '#333',
                        padding: '5px 15px',
                        width: 'auto'
                    }}>
                    {t.switchLangBtn}
                </button>

                <h1>{t.mainTitle}</h1>
                <button
                    onClick={() => {
                        setStudents(mockStudents);
                        alert(t.mockLoadSuccess);
                    }}
                    style={{
                        background: '#ff9800',
                        width: 'auto',
                        marginTop: '15px',
                        borderRadius: '20px',
                        padding: '8px 20px'
                    }}
                >
                    {t.loadMockBtn}
                </button>

            </header>

            <div className="main-layout">
                <StudentForm
                    t={t}
                    form={form}
                    onChange={handleInputChange}
                    onAdd={handleAddStudent}
                    studentCount={students.length}
                    maxStudents={MAX_STUDENTS}
                />

                <StudentList
                    t={t}
                    students={students}
                    onRemove={removeStudent}
                    onGenerate={handleGenerateSchedule}
                    loading={loading}
                    error={error}
                />
            </div>

            {loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                    <h2>{t.loadingTitle}</h2>
                </div>
            ) : (
                <ScheduleDisplay t={t} schedule={schedule} />
            )}
        </div>
    );
}

export default App;