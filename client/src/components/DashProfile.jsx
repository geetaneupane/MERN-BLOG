import React from 'react';
import {useState, useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import { TextInput, Button } from 'flowbite-react';
import {getStorage, ref,  uploadBytesResumable, getDownloadURL,} from 'firebase/storage';      //Dont forget to import.
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashProfile = () => {

  const {currentUser}=useSelector(state=>state.user)
    console.log('Current User:', currentUser);
    console.log('ProfilePicture:', currentUser.profilePicture);

  const [imageFile, setImageFile]=useState(null);
  const[imageFileUrl, setImageFileUrl]=useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress]=useState(null);
  const[imageFileUploadError, setImageFileUploadError]=useState(null);
  console.log(imageFileUploadProgress, imageFileUploadError);
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
          })
      }
    )
    console.log('Loading..');               
    }


  
  return (
    <div className='max-w-lg max-auto p-3 w-full ml-40'>
      <h1 className='my-7 text-center font-semibold mr-4 text-3xl'>PROFILE</h1>
      <form className='flex flex-col gap-4 '>
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
        <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username}></TextInput>
        <TextInput type='text' id='email' placeholder='email' defaultValue={currentUser.email}></TextInput>
        <TextInput type='text' id='password' placeholder='password' ></TextInput>
        <button className="relative border border-purple-500 text-purple-500 font-bold py-2 px-4 rounded transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500">
  <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-0 transition-opacity duration-300"></span>
  <span className="relative z-10 mr-10 ">Update</span>
</button>
      </form> 
      <div className='text-red-500 flex justify-between mt-5'>
      <span className='cursor-pointer'>Delete Account</span>
      <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default DashProfile;


//For seeing the progress in image uploading from 1 to 100% we are using the react package named as react Circularprogressbar