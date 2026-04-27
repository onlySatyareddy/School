const analyzePerformance = (student) => {
  const insights = [];
  
  // Attendance Insight
  if (student.studentDetails?.attendance) {
    const presentCount = student.studentDetails.attendance.filter(a => a.status === 'present').length;
    const totalDays = student.studentDetails.attendance.length;
    const attendancePercentage = (presentCount / totalDays) * 100;
    
    if (attendancePercentage < 75) {
      insights.push({
        type: 'attendance',
        message: `Attendance is critically low (${attendancePercentage.toFixed(1)}%). Recommended action: Parent-Teacher meeting.`,
        severity: 'high'
      });
    }
  }

  // Performance Insight
  if (student.studentDetails?.marks) {
    student.studentDetails.marks.forEach(mark => {
      const percentage = (mark.score / mark.total) * 100;
      if (percentage < 40) {
        insights.push({
          type: 'academic',
          message: `Weak performance in ${mark.subject} (${percentage}%). Consider additional tutoring.`,
          severity: 'medium'
        });
      }
    });
  }

  return insights;
};

module.exports = { analyzePerformance };
