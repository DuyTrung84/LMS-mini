// Mock data for LMS demo

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  category: string;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  progress?: number;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  duration: string;
  type: 'video' | 'document' | 'quiz';
  completed?: boolean;
  order: number;
}

export interface StudentProgress {
  courseId: string;
  courseName: string;
  progress: number;
  lastAccessed: string;
  completedLessons: number;
  totalLessons: number;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  status: 'active' | 'locked';
  createdAt: string;
  lastLogin: string;
  avatar: string;
}

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Lập trình Web với React',
    description: 'Học cách xây dựng ứng dụng web hiện đại với React, Hooks và các công nghệ mới nhất.',
    instructor: 'Trần Thị Bình',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    category: 'Lập trình',
    duration: '40 giờ',
    lessons: 32,
    students: 1250,
    rating: 4.8,
    progress: 75,
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Cơ sở dữ liệu MongoDB',
    description: 'Từ cơ bản đến nâng cao về NoSQL database với MongoDB và Mongoose.',
    instructor: 'Nguyễn Văn Đức',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop',
    category: 'Cơ sở dữ liệu',
    duration: '25 giờ',
    lessons: 20,
    students: 890,
    rating: 4.6,
    progress: 45,
    status: 'active',
    createdAt: '2024-02-01',
  },
  {
    id: '3',
    title: 'API với .NET 8',
    description: 'Xây dựng RESTful API chuyên nghiệp với ASP.NET Core và Entity Framework.',
    instructor: 'Trần Thị Bình',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
    category: 'Backend',
    duration: '35 giờ',
    lessons: 28,
    students: 650,
    rating: 4.9,
    progress: 20,
    status: 'active',
    createdAt: '2024-02-15',
  },
  {
    id: '4',
    title: 'UI/UX Design Fundamentals',
    description: 'Học nguyên tắc thiết kế giao diện người dùng và trải nghiệm người dùng.',
    instructor: 'Lê Thị Mai',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    category: 'Thiết kế',
    duration: '20 giờ',
    lessons: 15,
    students: 420,
    rating: 4.7,
    status: 'active',
    createdAt: '2024-03-01',
  },
  {
    id: '5',
    title: 'Machine Learning cơ bản',
    description: 'Nhập môn Machine Learning với Python, Scikit-learn và TensorFlow.',
    instructor: 'Phạm Văn Hùng',
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=250&fit=crop',
    category: 'AI/ML',
    duration: '45 giờ',
    lessons: 36,
    students: 780,
    rating: 4.5,
    status: 'draft',
    createdAt: '2024-03-10',
  },
];

export const mockLessons: Lesson[] = [
  { id: '1', courseId: '1', title: 'Giới thiệu về React', duration: '45 phút', type: 'video', completed: true, order: 1 },
  { id: '2', courseId: '1', title: 'JSX và Components', duration: '60 phút', type: 'video', completed: true, order: 2 },
  { id: '3', courseId: '1', title: 'Props và State', duration: '55 phút', type: 'video', completed: true, order: 3 },
  { id: '4', courseId: '1', title: 'React Hooks - useState', duration: '50 phút', type: 'video', completed: false, order: 4 },
  { id: '5', courseId: '1', title: 'React Hooks - useEffect', duration: '45 phút', type: 'video', completed: false, order: 5 },
  { id: '6', courseId: '1', title: 'Bài tập thực hành', duration: '30 phút', type: 'quiz', completed: false, order: 6 },
];

export const mockStudentProgress: StudentProgress[] = [
  { courseId: '1', courseName: 'Lập trình Web với React', progress: 75, lastAccessed: '2024-01-20', completedLessons: 24, totalLessons: 32 },
  { courseId: '2', courseName: 'Cơ sở dữ liệu MongoDB', progress: 45, lastAccessed: '2024-01-19', completedLessons: 9, totalLessons: 20 },
  { courseId: '3', courseName: 'API với .NET 8', progress: 20, lastAccessed: '2024-01-18', completedLessons: 6, totalLessons: 28 },
];

export const mockUsers: UserAccount[] = [
  { id: '1', name: 'Nguyễn Văn An', email: 'student1@lms.edu.vn', role: 'student', status: 'active', createdAt: '2024-01-01', lastLogin: '2024-01-20', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1' },
  { id: '2', name: 'Trần Thị Bình', email: 'teacher1@lms.edu.vn', role: 'teacher', status: 'active', createdAt: '2023-12-01', lastLogin: '2024-01-20', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2' },
  { id: '3', name: 'Lê Văn Cường', email: 'admin@lms.edu.vn', role: 'admin', status: 'active', createdAt: '2023-11-01', lastLogin: '2024-01-20', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3' },
  { id: '4', name: 'Phạm Thị Dung', email: 'student2@lms.edu.vn', role: 'student', status: 'active', createdAt: '2024-01-05', lastLogin: '2024-01-19', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4' },
  { id: '5', name: 'Hoàng Văn Em', email: 'student3@lms.edu.vn', role: 'student', status: 'locked', createdAt: '2024-01-10', lastLogin: '2024-01-15', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5' },
  { id: '6', name: 'Nguyễn Văn Đức', email: 'teacher2@lms.edu.vn', role: 'teacher', status: 'active', createdAt: '2023-12-15', lastLogin: '2024-01-18', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=6' },
];

export const dashboardStats = {
  student: {
    enrolledCourses: 3,
    completedCourses: 1,
    totalHours: 45,
    averageProgress: 47,
  },
  teacher: {
    totalCourses: 5,
    totalStudents: 2340,
    averageRating: 4.7,
    activeCourses: 4,
  },
  admin: {
    totalUsers: 1520,
    activeUsers: 1380,
    totalCourses: 48,
    newUsersThisMonth: 156,
  },
};
