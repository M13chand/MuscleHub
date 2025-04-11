import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCourseByIdQuery, useDeleteCourseMutation } from '../../features/courses/courseApiSlice';
import { useGetTrainerByIdQuery } from '../../features/trainers/trainerApiSlice';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/LoadingSpinner';

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: course, isLoading, isError, error } = useGetCourseByIdQuery(id);
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();
  const [trainerId, setTrainerId] = useState(null);
  
  // Fetch trainer details once we have the course data
  const { 
    data: trainer, 
    isLoading: isLoadingTrainer 
  } = useGetTrainerByIdQuery(trainerId || '', { 
    skip: !trainerId 
  });

  useEffect(() => {
    if (course) {
      // Extract trainer ID from course data
      let extractedTrainerId = null;
      
      if (typeof course.trainer === 'string') {
        extractedTrainerId = course.trainer;
      } else if (course.trainer && course.trainer._id) {
        extractedTrainerId = course.trainer._id;
      } else if (course.trainer && course.trainer.id) {
        extractedTrainerId = course.trainer.id;
      } else if (course.trainerId) {
        extractedTrainerId = course.trainerId;
      }
      
      if (extractedTrainerId) {
        setTrainerId(extractedTrainerId);
      }
    }
  }, [course]);

  const handleEdit = () => {
    navigate(`/admin/dashboard/courses/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(id).unwrap();
        toast.success('Course deleted successfully');
        navigate('/admin/dashboard/courses');
      } catch (err) {
        console.error('Failed to delete course:', err);
        toast.error('Failed to delete course: ' + (err.data?.message || err.error || 'Unknown error'));
      }
    }
  };

  const handleBack = () => {
    navigate('/admin/dashboard/courses');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
        <p className="text-gray-300 mb-4">
          {error?.data?.message || error?.error || 'Failed to load course details'}
        </p>
        <button
          onClick={handleBack}
          className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-400 font-bold"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-bold text-yellow-500 mb-4">Course Not Found</h2>
        <p className="text-gray-300 mb-4">The requested course could not be found.</p>
        <button
          onClick={handleBack}
          className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-400 font-bold"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-yellow-500">Course Details</h2>
        <button
          onClick={handleBack}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Courses
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-bold text-yellow-500 mb-4">{course.name}</h3>
          
          <div className="mb-4">
            <h4 className="text-yellow-500 font-semibold mb-2">Description</h4>
            <p className="text-gray-300">{course.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">Level</h4>
              <p className="text-gray-300">{course.level}</p>
            </div>
            
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">Type</h4>
              <p className="text-gray-300">{course.type}</p>
            </div>
            
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">Duration</h4>
              <p className="text-gray-300">{course.duration}</p>
            </div>
            
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">Capacity</h4>
              <p className="text-gray-300">{course.capacity}</p>
            </div>
          </div>
          
          {course.schedule && course.schedule.length > 0 && (
            <div className="mb-4">
              <h4 className="text-yellow-500 font-semibold mb-2">Schedule</h4>
              <ul className="list-disc list-inside text-gray-300">
                {Array.isArray(course.schedule) ? (
                  course.schedule.map((day, index) => (
                    <li key={index}>{day}</li>
                  ))
                ) : (
                  <li>{course.schedule}</li>
                )}
              </ul>
            </div>
          )}
        </div>
        
        <div>
          <h4 className="text-yellow-500 font-semibold mb-2">Trainer</h4>
          {isLoadingTrainer ? (
            <p className="text-gray-300">Loading trainer details...</p>
          ) : trainer ? (
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                {trainer.image ? (
                  <img 
                    src={trainer.image} 
                    alt={trainer.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center mr-4">
                    <span className="text-2xl text-gray-400">👤</span>
                  </div>
                )}
                <div>
                  <h5 className="text-yellow-500 font-semibold">{trainer.name}</h5>
                  <p className="text-gray-300">{trainer.expertise}</p>
                </div>
              </div>
              
              {trainer.bio && (
                <div className="mb-2">
                  <h6 className="text-yellow-500 font-semibold text-sm mb-1">Bio</h6>
                  <p className="text-gray-300 text-sm">{trainer.bio}</p>
                </div>
              )}
              
              {trainer.experience && (
                <div className="mb-2">
                  <h6 className="text-yellow-500 font-semibold text-sm mb-1">Experience</h6>
                  <p className="text-gray-300 text-sm">{trainer.experience} years</p>
                </div>
              )}
              
              {trainer.contact && (
                <div className="mb-2">
                  <h6 className="text-yellow-500 font-semibold text-sm mb-1">Contact</h6>
                  <p className="text-gray-300 text-sm">{trainer.contact}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-300">No trainer information available</p>
          )}
          
          <div className="mt-8">
            <h4 className="text-yellow-500 font-semibold mb-2">Course ID</h4>
            <p className="text-gray-400 text-sm mb-4">{course._id || course.id}</p>
            
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-400 font-bold"
              >
                Edit Course
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 disabled:bg-red-800 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Deleting...' : 'Delete Course'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
