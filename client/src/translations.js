export const translations = {
    he: {
        // App.jsx
        mainTitle: "מערכת שיבוץ - הבריכה של יותם",
        loadMockBtn: "טען 30 תלמידים לבדיקת עומס",
        mockLoadSuccess: '30 תלמידים הוטענו בהצלחה! לחץ עכשיו על "צור לו"ז אופטימלי"',
        fillNameError: "נא למלא שם ושם משפחה",
        serverError: "שגיאה בתקשורת עם השרת",
        fetchError: "לא הצלחנו לייצר את הלו\"ז. וודא שהשרת רץ! ",
        loadingTitle: "מחשב את השיבוץ האופטימלי...",
        switchLangBtn: "English",

        // StudentForm.jsx
        addStudentTitle: "הוספת תלמיד",
        totalStudents: "סה\"כ תלמידים:",
        firstNameLabel: "שם פרטי:",
        firstNamePlaceholder: "למשל: דני",
        lastNameLabel: "שם משפחה:",
        lastNamePlaceholder: "למשל: כהן",
        styleLabel: "סגנון שחייה מועדף:",
        lessonTypeLabel: "סוג שיעור:",
        typeAny: "גמיש (פרטי או קבוצתי)",
        typePrivate: "רק פרטי (45 דק')",
        typeGroup: "רק קבוצתי (60 דק')",
        quotaFullBtn: "המכסה מלאה",
        addToListBtn: "הוסף לרשימה",

        // StudentList.jsx
        waitlistTitle: "רשימת תלמידים לשיבוץ",
        enterDataPrompt: "הכנס נתונים כדי להתחיל...",
        flexible: "גמיש",
        private: "פרטי",
        group: "קבוצתי",
        removeBtn: "הסר",
        calculatingBtn: "מחשב מסלול...",
        generateBtn: "צור לו\"ז אופטימלי",

        // ScheduleDisplay.jsx
        ganttTitle: "גאנט שיעורים שבועי",
        printBtn: "שמור כ-PDF / הדפס",
        noLessons: "אין שיעורים מתוכננים",
        studentsLabelPlural: "תלמידים:",
        studentsLabelSingular: "תלמיד:",
        unassignedWarning: "⚠️ שים לב! לא נמצא שיבוץ לתלמידים הבאים:",
        unassignedRecommendation: "המלצה: נסה לשנות את סוג השיעור ל'גמיש' או להוסיף שעות למורים.",

        // Mappings
        styles: {
            'FREESTYLE': 'חתירה',
            'BREASTSTROKE': 'חזה',
            'BUTTERFLY': 'פרפר',
            'BACKSTROKE': 'גב'
        },
        teachers: {
            'Yoni': 'יוני',
            'Yotam': 'יותם',
            'Johnny': "ג'וני"
        },
        days: {
            'SUNDAY': 'ראשון', 'MONDAY': 'שני', 'TUESDAY': 'שלישי', 'WEDNESDAY': 'רביעי', 'THURSDAY': 'חמישי'
        }
    },
    en: {
        // App.jsx
        mainTitle: "Yotam's Pool Scheduling System",
        loadMockBtn: "Load 30 Mock Students",
        mockLoadSuccess: '30 students loaded successfully! Now click "Generate Optimal Schedule"',
        fillNameError: "Please enter first and last name",
        serverError: "Server communication error",
        fetchError: "Failed to generate schedule. Make sure the server is running! ",
        loadingTitle: "Calculating optimal schedule...",
        switchLangBtn: "עברית",

        // StudentForm.jsx
        addStudentTitle: "Add Student",
        totalStudents: "Total Students:",
        firstNameLabel: "First Name:",
        firstNamePlaceholder: "e.g., Danny",
        lastNameLabel: "Last Name:",
        lastNamePlaceholder: "e.g., Cohen",
        styleLabel: "Preferred Swimming Style:",
        lessonTypeLabel: "Lesson Type:",
        typeAny: "Flexible (Private or Group)",
        typePrivate: "Private Only (45 mins)",
        typeGroup: "Group Only (60 mins)",
        quotaFullBtn: "Quota Full",
        addToListBtn: "Add to List",

        // StudentList.jsx
        waitlistTitle: "Students Waitlist",
        enterDataPrompt: "Enter data to start...",
        flexible: "Flexible",
        private: "Private",
        group: "Group",
        removeBtn: "Remove",
        calculatingBtn: "Calculating...",
        generateBtn: "Generate Optimal Schedule",

        // ScheduleDisplay.jsx
        ganttTitle: "Weekly Schedule Gantt",
        printBtn: "Save as PDF / Print",
        noLessons: "No lessons scheduled",
        studentsLabelPlural: "Students:",
        studentsLabelSingular: "Student:",
        unassignedWarning: "⚠️ Attention! No slot found for the following students:",
        unassignedRecommendation: "Recommendation: Try changing the lesson type to 'Flexible' or add more teacher availability.",

        // Mappings
        styles: {
            'FREESTYLE': 'Freestyle',
            'BREASTSTROKE': 'Breaststroke',
            'BUTTERFLY': 'Butterfly',
            'BACKSTROKE': 'Backstroke'
        },
        teachers: {
            'Yoni': 'Yoni',
            'Yotam': 'Yotam',
            'Johnny': 'Johnny'
        },
        days: {
            'SUNDAY': 'Sunday', 'MONDAY': 'Monday', 'TUESDAY': 'Tuesday', 'WEDNESDAY': 'Wednesday', 'THURSDAY': 'Thursday'
        }
    }
};