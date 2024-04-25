import React from 'react';
import {useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { TextInput, Button, Alert } from 'flowbite-react';
import {getStorage, ref,  uploadBytesResumable, getDownloadURL,} from 'firebase/storage';      //Dont forget to import.
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice';


const DashProfile = () => {

  const {currentUser}=useSelector(state=>state.user)
    console.log('Current User:', currentUser);
    console.log('ProfilePicture:', currentUser.profilePicture);

  const [imageFile, setImageFile]=useState(null);
  const[imageFileUrl, setImageFileUrl]=useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress]=useState(null);
  const[imageFileUploadError, setImageFileUploadError]=useState(null);
  console.log(imageFileUploadProgress, imageFileUploadError);

  const[imageFileUploading, setImageFileUploading]=useState(false);
  const [formData, setFormData] = useState({});
  const [updateUserError, setUpdateUserError]=useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const dispatch=useDispatch();
  const handleImageChange=(e)=>{
    const file=e.target.files[0];
    if(file){
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file))  ;         //URL.createObjectURL(file): This method creates a DOMString containing a URL representing the specified File object or Blob object. VVI:It creates a temporary URL that points to the file's data. (Check by console logging)
    }
  }
  console.log(imageFile, imageFileUrl);
  const filePickerRef=useRef();

  useEffect(() => {
    if(imageFile){
      uploadImage();
    }
  }, [imageFile]);
  

  const uploadImage=async()=>{
   // service firebase.storage {           //Its time to go to Firebase and activate our storage. Go to your project and go to build->storage section->go on and change the rules and publish it the rules are same as in this comment.
     // match /b/{bucket}/o {
   //     match /{allPaths=**} {
      //    allow read;
       //   allow write: if
      //    request.resource.size<2*1024*1024  &&
      //    request.resource.contentType.matches('image/.*')                                                     //2Mb
    //    }
    //  } }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage=getStorage(app);     //we have created an app look at the firebase.js file. We have exported app. 
    const fileName=new Date().getTime()+ imageFile.name; //To give different namings to each file.
    const storageRef=ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));       //this (progress.toFixed(0)) is used to round off and make the progress digit an integer. 
      }, 
      (error)=>{
        setImageFileUploadError("Could not upload image (File must be less than 2 mb of size.)")
        setImageFileUploadProgress(null);
        setImageFileUrl(null);
        setImageFile(null);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({...formData, profilePicture: downloadURL});
          setImageFileUploading(false);
          });
      }
    )
    console.log('Loading..');               
    }

   const changeHandler=(e)=>{
   setFormData({...formData, [e.target.id]:e.target.value});
};
  console.log(formData);


  const handleSubmit=async(e)=>{
   e.preventDefault();
   if(Object.keys(formData).length===0){
    setUpdateUserError('No changes made');
    return;
   }
   if(imageFileUploading){
    setUpdateUserError('Please wait for image to upload');
    return;
   }
   try{
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
   catch(error){                                            //We have to create update reducers in userSlice.js file 
    dispatch(updateFailure(error.message));
    setUpdateUserError(error.message);
  }
   };







  return (
    <div className='max-w-lg max-auto p-3 w-full ml-40'>
      <h1 className='my-7 text-center font-semibold mr-4 text-3xl'>PROFILE</h1>
      <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
      <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>                      {/*This line will gets the access to out desktop and opens the upload image section.Here image/* refers to any type of image is accepted.  */}
        <div className=' relative w-32 h-32 self-center cursor-pointer shadow-md mr-6 overflow-hidden rounded-full'onClick={() => filePickerRef.current.click()}>            {/*by using useRef hook and using this line of code, we can directly click on the profile icon, to update the image. */}
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
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
        <img  src={imageFileUrl || currentUser.profilePicture} alt='user' className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}></img>
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
        <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username} onChange={changeHandler}></TextInput>
        <TextInput type='text' id='email' placeholder='email' defaultValue={currentUser.email} onChange={changeHandler}></TextInput>
        <TextInput type='text' id='password' placeholder='password'onChange={changeHandler} ></TextInput>
        <button className="relative border border-purple-500 text-purple-500 font-bold py-2 px-4 rounded transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500">
        <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-0 transition-opacity duration-300"></span>
        <span className="relative z-10 mr-10 ">Update</span>
        </button>
      </form> 
      <div className='text-red-500 flex justify-between mt-5'>
      <span className='cursor-pointer'>Delete Account</span>
      <span className='cursor-pointer'>Sign Out</span>
      </div>
      {updateUserSuccess && (
  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-5" role="alert">
    <strong className="font-bold">Success:</strong>
    <span className="block sm:inline">{updateUserSuccess}</span>
    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
      <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <title>Close</title>
        <path fillRule="evenodd" d="M14.293 5.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586l4.293-4.293z" clipRule="evenodd" />
      </svg>
    </span>
  </div>
)}

    </div>
  );
}

export default DashProfile;


//For seeing the progress in image uploading from 1 to 100% we are using the react package named as react Circularprogressbar