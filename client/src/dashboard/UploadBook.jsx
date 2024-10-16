import React from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
const UploadBook = () => {
  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A book</h2>
      <form className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/** first row Book Name   */}
    <div className='flex gap-8'>
    <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="booktitle" value="Book Title" />
        </div>
        <TextInput id="booktitle" type="booktitle" 
        name='bookTitle'
        placeholder="Book name" required />
      </div>
        {/** Author av boken  */}

      <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="authorName" value="Author Name" />
        </div>
        <TextInput id="authorName" type="authorName" 
        name='bookTitle'
        placeholder="Author Name" required />
      </div>

      
       <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="booktitle" value="Book Title" />
        </div>
        <TextInput id="booktitle" type="booktitle" 
        name='bookTitle'
        placeholder="Book name" required />
      </div>
    
    
    </div>

    {/** 2nd**/}

    <div className='flex gap-8'>

    <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="imageUrl" value="Book image URL" />
        </div>
        <TextInput id="imageUrl" type="text" 
        name='imageUrl'
        placeholder="Book image URL" required />
      </div>

      

      

    </div>
    
   
     
       
    </form>
     
    </div>
  )
}

export default UploadBook


