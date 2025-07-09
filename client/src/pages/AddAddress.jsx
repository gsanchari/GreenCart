import React from 'react'

//Input Field component
const inputField =({type, placeholder, name, handleChange, address})=>(
    <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-#4fbf8b transition'
    type={type}
    placeholder={placeholder}
    name={name}
    value={address[name]}
    require
    
    />

)

const AddAddress = () => {

    const onSubmitHandler = async (e)=>{
        e.preventDefalut();
    }

  return (
    <div className='mt-16 pb-16'>
        <p className='text-2xl md:text-3xl text-gray-500'>Add Shpping <span className='font-semibold text-#4fbf8b'>Address</span></p>

        <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>

            <div className='flex-1 max-w-md'>
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <inputField handleChange={handleChange} address/>
                    </div>
                </form>

            </div>
            
            <img className='md:mr-16 md-16 md;mt-0' src="../public/add_address_image.svg" alt="add-address" />
        </div>
      
    </div>
  )
}

export default AddAddress
