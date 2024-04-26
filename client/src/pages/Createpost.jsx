import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React from 'react'

const Createpost = () => {
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
           <FileInput type='file' accept='image/*'/>

          <Button>
           <button className="relative border flex items-center justify-center border-purple-500 text-purple-500 font-bold py-2 px-4 rounded-md transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500">
           <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-0 transition-opacity duration-300"></span>
           <span className="relative z-5 mr-5 ">Upload Image</span>
           </button>
          </Button>  
        </div>
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
