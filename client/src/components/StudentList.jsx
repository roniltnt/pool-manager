import React from 'react';

const formatTeacherName = (teacherCode) => {
    switch (teacherCode) {
        case 'Yoni': return 'יוני';
        case 'Yotam': return 'יותם';
        case 'Johnny': return 'ג\'וני';
        case 'ANY':
        default: return 'גמיש';
    }
};

const StudentList = ({ t, students, onRemove, onGenerate, loading, error }) => {

    return (
        <div className="card">
            <h2>{t.waitlistTitle}</h2>
            {students.length === 0 ? (
                <p>{t.enterDataPrompt}</p>
            ) : (
                <>
                    <ul className="student-list">
                        {students.map((s) => (
                            <li key={s.id} className="student-item">
                                <span>
                                  <strong>{s.firstName} {s.lastName}</strong> - {t.styles[s.requestedStyle]}
                                    ({s.lessonPreference === 'ANY' ? t.flexible : s.lessonPreference === 'PRIVATE_ONLY' ? t.private : t.group}),
                                     מורה - {formatTeacherName(s.preferredTeacher)}
                                </span>
                                <button onClick={() => onRemove(s.id)}>{t.removeBtn}</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={onGenerate} disabled={loading} style={{marginTop: '20px', background: '#2a9d8f'}}>
                        {loading ? t.calculatingBtn : t.generateBtn}
                    </button>
                </>
            )}
            {error && <div style={{color: 'red', marginTop: '10px'}}>{error}</div>}
        </div>
    );
};

export default StudentList;