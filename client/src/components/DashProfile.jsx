import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput, Button, Alert } from 'flowbite-react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { updateFailure, updateStart, updateSuccess, deleteUserFailure, deleteUserSuccess, deleteUserStart } from '../redux/user/userSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DashProfile = () => {
  const { currentUser, error} = useSelector(state => state.user);

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateUserError, setUpdateUserError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  }

  const filePickerRef = useRef();

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError("Could not upload image (File must be less than 2 mb of size.)")
        setImageFileUploadProgress(null);
        setImageFileUrl(null);
        setImageFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    )
  }

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    }
    catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
        setShowModal(false); 
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div className='max-w-lg max-auto p-3 w-full ml-40'>
      <h1 className='my-7 text-center font-semibold mr-4 text-3xl'>PROFILE</h1>
      <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
        <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
        <div className=' relative w-32 h-32 self-center cursor-pointer shadow-md mr-6 overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img src={imageFileUrl || currentUser.profilePicture} alt='user' className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`}></img>
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
        <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username} onChange={changeHandler}></TextInput>
        <TextInput type='text' id='email' placeholder='email' defaultValue={currentUser.email} onChange={changeHandler}></TextInput>
        <TextInput type='text' id='password' placeholder='password' onChange={changeHandler}></TextInput>
        <button className="relative border border-purple-500 text-purple-500 font-bold py-2 px-4 rounded transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500">
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-0 transition-opacity duration-300"></span>
          <span className="relative z-5 mr-10 ">Update</span>
        </button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer' onClick={handleDeleteUser}>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
      {updateUserSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-5" role="alert">
          <strong className="font-bold">Success:</strong>
          <span className="block sm:inline">{updateUserSuccess}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path fillRule="evenodd" d="M14.293 5.293a1 1 0 011.414 0l1.414 1.414a1 1 0 010 1.414L11.414 13l3.707 3.707a1 1 0 01-1.414 1.414L10 14.414l-3.707 3.707a1 1 0 01-1.414-1.414L8.586 13 3.707 6.707a1 1 0 010-1.414l1.414-1.414a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 0Z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      )}

      {/* Modal for delete confirmation */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg">
            <button className="absolute top-2 right-2" onClick={handleCancelDelete}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L10 11.414l-5.47 5.47a.75.75 0 0 1-1.06-1.06L8.586 12 3.707 6.707a.75.75 0 0 1 1.06-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <p className="mb-4">Are you sure you want to delete the user?</p>
            <div className="flex justify-center">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-4" onClick={handleConfirmDelete}>Yes, I'm sure</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleCancelDelete}>No, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashProfile;
