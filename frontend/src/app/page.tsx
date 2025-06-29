'use client'; // This file is a client component
import{ useState, useEffect, use } from 'react';
import { apiRequest } from '@/lib/api';
import { LoginForm } from '@/components/LoginForm';
import { useAuthStore } from '@/store/authStore';


interface InstructorProfile{
    id: string;
    user:{
        firstName: string;
        lastName: string;
        email: string;
    };
    beachLocation: string | null;
    bio: string | null;
    verificationStatus: string;
    averageRating?: number;
    totalReviews?: number;
}
export default function Page() {
     const [instructors, setInstructors] = useState<InstructorProfile[]>([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);
     const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
     useEffect(() => {
          async function fetchInstructors() {
              try {
                  const data = await apiRequest<InstructorProfile[]>('/instructors');
                  setInstructors(data);
              } catch (err: any) {
                  setError(err.message || 'Failed to fetch instructors');
                  console.error('Error fetching instructors:', err);
              } finally {
                  setLoading(false);
              }
           }
           fetchInstructors();
      }, []);
  if (loading) return <div className="text-center p-4">Loading instructors...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error:{error}</div>;
  return(
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-12 w-full max-w-md"> {/* Container for login form */}
        <LoginForm />
      </div>
      <h1 className="text-4xl font-bold mb-8">Surf Instructors</h1>
      {instructors.length === 0 ? (
        <p>No instructors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.map((instructor) => (
            <div key={instructor.id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-2">
                {instructor.user.firstName} {instructor.user.lastName}
              </h2>
              <p className="text-gray-600 mb-1">Email: {instructor.user.email}</p>
              <p className="text-gray-600 mb-1">Location: {instructor.beachLocation || 'N/A'}</p>
              <p className="text-gray-600 mb-4">Bio: {instructor.bio || 'No bio available'}</p>
              <p className={`font-medium ${instructor.verificationStatus === 'VERIFIED' ? 'text-green-600' : 'text-yellow-600'}`}>
                Status: {instructor.verificationStatus}
              </p>
              {/* Display average rating and total reviews */}
              {(instructor.totalReviews ?? 0) > 0 ? (
                <p className="text-gray-700">
                  Rating: <span className="font-bold text-blue-600">{instructor.averageRating}</span> ({instructor.totalReviews} reviews)
                </p>
              ) : (
                <p className="text-gray-700">No reviews yet.</p>
              )}
            </div>
          ))}
        </div>
      )}
      {loading && <div className="text-center p-4">Loading instructors...</div>}
      {error && <div className="text-center p-4 text-red-500">Error: {error}</div>}
    </main>
  )
}
