import { Button, FileInput, Select, TextInput, Alert} from 'flowbite-react'
import {useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React from 'react'
import { app } from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const Createpost = () => {
  const[file, setFile]=useState(null);
  const[imageUploadProgress, setImageUploadProgress]=useState(null);
  const[imageUploadError, setImageUploadError]=useState(null);

  const [formData, setFormData]=useState({});

  const handleUploadImage=async()=>{
   try{
    if(!file){
      setImageUploadError("Please select an image.");
      return;
    }
    setImageUploadError(null);


  const storage=getStorage(app);
  const fileName = new Date().getTime()+ '-' + '-' + file.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImageUploadProgress(progress.toFixed(0));
    },
    (error)=>{
      setImageUploadError('Image upload failed!!');
      setImageUploadProgress(null);
    },
     
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageUploadProgress(null);
        setImageUploadError(null);
        setFormData({ ...formData, image: downloadURL });
      });
    });

   }
   catch(error){
    console.log(error);
    setImageUploadProgress(null);
    setImageUploadError("Image upload failed!!");
   }
  }



  return (
    <div className='p-3 mx-auto max-w-3xl min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
        <form className='flex flex-col gap-4'> 
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
         <TextInput
          type='text'
          placeholder='Title'
          required
          id='title'
          className='flex-1'
         />
         <Select>
         <option value='uncategorized'>Select a category</option>
         <option value='uncategorized'>Javascript</option>
         <option value='uncategorized'>React JS</option>
         <option value='uncategorized'>Next JS</option>
            </Select>  
        </div>

        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
           <FileInput type='file' accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/> 

           <Button>
           <button onClick={handleUploadImage}     disabled={imageUploadProgress} className="relative border flex items-center justify-center border-purple-500 text-purple-500 font-bold py-2 px-4 rounded-md transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500">
           <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-0 transition-opacity duration-300"></span>
           <span className="relative z-5 mr-5 "></span>

           {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
           </button>
          </Button>
        </div>

        {imageUploadError && <Alert color='failure' className='bg-red-200 items-center'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-full object-cover'
          />
        )}




        <ReactQuill theme='snow' placeholder='Write Something:' className='h-72 mb-12'/>
        <button className="relative border flex items-center justify-center border-purple-500 text-purple-500 font-bold py-2 px-4 rounded-md transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500">
           <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-0 transition-opacity duration-300"></span>
           <span className="relative z-5 mr-5 ">Publish</span>
           </button>

        </form>
    </div>
  )
}

export default Createpost
