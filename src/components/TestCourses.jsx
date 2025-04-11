import React, { useEffect, useState } from 'react';

const TestCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("Token for fetch:", token);
        
        const response = await fetch('http://localhost:5000/api/courses', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Direct fetch courses:", data);
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error("Direct fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  if (loading) {
    return <div className="text-yellow-500 text-center py-4">Loading courses directly...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl text-yellow-500 mb-4">Test Courses Component</h2>
      {courses.length === 0 ? (
        <p className="text-gray-400">No courses found in direct fetch.</p>
      ) : (
        <ul className="space-y-2">
          {courses.map((course) => (
            <li key={course._id || course.id} className="bg-gray-700 p-2 rounded">
              <p className="text-white">{course.name}</p>
              <p className="text-gray-400 text-sm">ID: {course._id || course.id}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TestCourses;
