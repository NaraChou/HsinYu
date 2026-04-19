import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LAYOUT } from '../../styles/layout';
import { BookOpen, LogOut, Award, CheckCircle, XCircle, BarChart2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

/**
 * [A] 視覺資訊備註
 * 元件：學生儀表板，極簡黑白卡片風格，含簽到看板與成績折線圖。
 */

// [B] 樣式常數
const STYLES = {
  wrapper: 'flex flex-col min-h-screen w-full px-4 py-10 md:px-6 md:py-20 bg-neutral-50',
  container: LAYOUT.container,
  header: 'flex justify-between items-center mb-8 bg-white p-8 border border-black',
  title: 'text-3xl font-black tracking-widest',
  logoutBtn: 'border border-black px-6 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-all',
  
  grid: 'grid grid-cols-1 lg:grid-cols-2 gap-8',
  card: 'bg-white border border-black p-8',
  cardTitle: 'text-xs font-bold tracking-widest uppercase mb-8',
  
  statusWrapper: 'flex items-center gap-4 text-2xl font-black tracking-widest',
} as const;

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [attendance, setAttendance] = useState<any>(null);
  const [grades, setGrades] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/student/login');
        return;
      }
      setUser(session.user);

      // Fetch Attendance: Today
      const today = new Date().toISOString().split('T')[0];
      const { data: attendanceData } = await supabase
        .from('attendance_logs')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('created_at', today) // Simplified: assumes created_at is YYYY-MM-DD
        .single();
      setAttendance(attendanceData);

      // Fetch Grades
      const { data: gradesData } = await supabase
        .from('student_grades')
        .select('subject, score, exam_date')
        .eq('user_id', session.user.id)
        .order('exam_date', { ascending: true });
      
      if (gradesData) setGrades(gradesData);
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/student/login');
  };

  return (
    <div className={STYLES.wrapper}>
      <div className={STYLES.container}>
        <header className={STYLES.header}>
          <h1 className={STYLES.title}>STUDENT PORTAL</h1>
          <button onClick={handleLogout} className={STYLES.logoutBtn}>登出</button>
        </header>

        <div className={STYLES.grid}>
          {/* Today's Status */}
          <div className={STYLES.card}>
            <h2 className={STYLES.cardTitle}>今日簽到狀態</h2>
            <div className={STYLES.statusWrapper}>
              {attendance ? (
                <><CheckCircle className="text-black" /> 已完成簽到</>
              ) : (
                <><XCircle className="text-neutral-300" /> 今日尚未簽到</>
              )}
            </div>
          </div>

          {/* Grade Chart */}
          <div className={STYLES.card}>
            <h2 className={STYLES.cardTitle}>歷次成績統計</h2>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={grades}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="subject" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis fontSize={10} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#000" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
