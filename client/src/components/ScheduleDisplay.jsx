import React from 'react';

const ScheduleDisplay = ({ t, schedule }) => {
    if (!schedule) return null;

    const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY'];

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="schedule-results card" style={{ maxWidth: '100%', marginTop: '40px' }}>
            <div className="gantt-header">
                <h2>{t.ganttTitle}</h2>
                <button className="print-btn" onClick={handlePrint}>
                    {t.printBtn}
                </button>
            </div>

            <div className="gantt-board">
                {daysOfWeek.map(day => {
                    const lessonsInDay = schedule.scheduledLessons.filter(l => l.day === day);
                    lessonsInDay.sort((a, b) => a.startTime.localeCompare(b.startTime));

                    return (
                        <div key={day} className="gantt-day-column">
                            <div className="gantt-day-title">{t.days[day]}</div>

                            <div className="gantt-lessons">
                                {lessonsInDay.length === 0 ? (
                                    <div style={{textAlign: 'center', color: '#888', marginTop: '20px'}}>
                                        {t.noLessons}
                                    </div>
                                ) : (
                                    lessonsInDay.map((lesson, idx) => {
                                        const styleKey = lesson.swimmingStyle || lesson.style;
                                        const isGroup = lesson.groupLesson !== undefined ? lesson.groupLesson : lesson.isGroup;

                                        return (
                                            <div key={idx} className={`gantt-card teacher-${lesson.teacherName.toLowerCase()}`}>
                                                <div className="gantt-time">
                                                    🕒 {lesson.endTime.slice(0,5)} - {lesson.startTime.slice(0,5)}
                                                </div>

                                                <div className="gantt-teacher">
                                                    🏊🏼 <strong>{t.teachers[lesson.teacherName] || lesson.teacherName}</strong>
                                                </div>

                                                <div className="gantt-badges">
                                                    <span className="badge">{t.styles[styleKey] || styleKey}</span>
                                                    <span className="badge">{isGroup ? t.group : t.private}</span>
                                                </div>

                                                <div className="gantt-students">
                                                    <strong>{isGroup ? t.studentsLabelPlural : t.studentsLabelSingular}</strong><br/>
                                                    {lesson.students.map(s => `${s.firstName} ${s.lastName}`).join(', ')}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {schedule.unassignedStudents && schedule.unassignedStudents.length > 0 && (
                <div className="unassigned-section" style={{marginTop: '20px', padding: '15px', background: '#ffebee', borderRadius: '8px', border: '1px solid #e63946'}}>
                    <h3 style={{color: '#e63946'}}>{t.unassignedWarning}</h3>
                    <ul>
                        {schedule.unassignedStudents.map((s, idx) => (
                            <li key={idx}>{s.firstName} {s.lastName} ({t.styles[s.requestedStyle || s.swimmingStyle]})</li>
                        ))}
                    </ul>
                    <p>{t.unassignedRecommendation}</p>
                </div>
            )}
        </div>
    );
};

export default ScheduleDisplay;