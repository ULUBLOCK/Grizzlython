import React, { useState } from 'react'
import { CustomButton, FormField, Loader } from '../components';

const CreateEvent = () => {
 
  const [isLoading, setIsLoading] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '', 
    deadline: '',
    image: ''
  });


  const handleFormFieldChange = (field: string, e: { target: { value: any; }; }) => {
    setForm({
      ...form,
      [field]: e.target.value
    })
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  }


  return (
    <div className="mx-10 flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
        <h1 className="">Start a Community  Event</h1>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e: any) => handleFormFieldChange('name', e)} 
            isTextArea={undefined}
          />

          <FormField 
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e: any) => handleFormFieldChange('title', e)}
            isTextArea={undefined}
          />
        </div>

        <FormField 
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e: any) => handleFormFieldChange('description', e)}
          inputType={undefined}          
          />

        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e: any) => handleFormFieldChange('target', e)}
            isTextArea={undefined}
          />
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e: any) => handleFormFieldChange('deadline', e)}
            isTextArea={undefined}
          />
        </div>

        <FormField 
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e: any) => handleFormFieldChange('image', e)}
            isTextArea={undefined}
          />

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
            btnType="submit"
            title="Submit new event"
            handleClick={undefined}            
          />

          </div>
      </form>
    </div>
  )
}

export default CreateEvent