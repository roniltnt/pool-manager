import React from 'react';

const StudentForm = ({ t, form, onChange, onAdd, studentCount, maxStudents }) => {
    return (
        <div className="card">
            <h2>{t.addStudentTitle}</h2>
            <div className="student-count">
                <p>{t.totalStudents} {maxStudents} / {studentCount} </p>
            </div>
            <div className="form-group">
                <label>{t.firstNameLabel}</label>
                <input name="firstName" value={form.firstName} onChange={onChange}
                       placeholder={t.firstNamePlaceholder}/>
            </div>
            <div className="form-group">
                <label>{t.lastNameLabel}</label>
                <input name="lastName" value={form.lastName} onChange={onChange} placeholder={t.lastNamePlaceholder}/>
            </div>
            <div className="form-group">
                <label>{t.styleLabel}</label>
                <select name="requestedStyle" value={form.requestedStyle} onChange={onChange}>
                    <option value="FREESTYLE">{t.styles['FREESTYLE']}</option>
                    <option value="BREASTSTROKE">{t.styles['BREASTSTROKE']}</option>
                    <option value="BUTTERFLY">{t.styles['BUTTERFLY']}</option>
                    <option value="BACKSTROKE">{t.styles['BACKSTROKE']}</option>
                </select>
            </div>
            <div className="form-group">
                <label>{t.lessonTypeLabel}</label>
                <select name="lessonPreference" value={form.lessonPreference} onChange={onChange}>
                    <option value="ANY">{t.typeAny}</option>
                    <option value="PRIVATE_ONLY">{t.typePrivate}</option>
                    <option value="GROUP_ONLY">{t.typeGroup}</option>
                </select>
            </div>
            <div className="form-group">
                <label>מורה מועדף:</label>
                <select name="preferredTeacher" value={form.preferredTeacher} onChange={onChange}>
                    <option value="ANY">גמיש (כל מורה)</option>
                    <option value="Yoni">יוני</option>
                    <option value="Yotam">יותם</option>
                    <option value="Johnny">ג'וני</option>
                </select>
            </div>

            <button onClick={onAdd} disabled={studentCount >= maxStudents}>
                {studentCount >= maxStudents ? t.quotaFullBtn : t.addToListBtn}
            </button>
        </div>
    );
};

export default StudentForm;