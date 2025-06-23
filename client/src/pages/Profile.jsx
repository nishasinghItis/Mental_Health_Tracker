import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, CalendarDays, Upload } from 'lucide-react';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (user?.profileImage) {
      setPreview(user.profileImage);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64Image = reader.result;

          await axios.put(
            '/api/users/profile-image',
            {
              userId: user._id,
              profileImage: base64Image,
            },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          alert('✅ Profile picture updated!');
          setPreview(base64Image);
        } catch (err) {
          console.error(err);
          alert('❌ Upload failed. Try again.');
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="px-6 py-10 space-y-8 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold border-b border-gray-300 pb-2">👤 Your Profile</h1>

      {/* Profile Picture Section */}
      <div className="flex items-center space-x-6">
        <img
          src={preview || '/default-avatar.png'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer text-blue-600 hover:underline">
            <Upload className="w-4 h-4" />
            <span>Change Profile Picture</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
          {selectedFile && (
            <button
              onClick={handleUpload}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Upload
            </button>
          )}
        </div>
      </div>

      {/* User Info Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <User className="w-5 h-5" />
          <span className="font-medium w-32">Name:</span>
          <span>{user?.name || 'N/A'}</span>
        </div>
        <div className="flex items-center space-x-4">
          <Mail className="w-5 h-5" />
          <span className="font-medium w-32">Email:</span>
          <span>{user?.email || 'N/A'}</span>
        </div>
        <div className="flex items-center space-x-4">
          <CalendarDays className="w-5 h-5" />
          <span className="font-medium w-32">Joined:</span>
          <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
