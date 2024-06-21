import { useState } from "react"
import { useForm } from "react-hook-form"
import clsx from "clsx"

export default function App(){

  const [dataInfo, setDataInfo] = useState([])

  const {
    register, 
    handleSubmit,
    reset,
    formState: {isValid, isSubmitted, errors}
  } = useForm(); 

  function onSubmit(data){
    setDataInfo([... dataInfo, data]);
    reset()
  }

  function removeReg(idxRemove){
    const newDataInfo = dataInfo.filter((reg, idx)=> idx != idxRemove);
    setDataInfo(newDataInfo)
  }
  


  return(
    <main className="w-full min-h-screen m-10" >

      <form 
      className="flex flex-row justify-center p5 gap-2 mb-5"
      onSubmit={handleSubmit(onSubmit)}>
        <input 
        {...register("name", {
          required: { value: true, message: "Campo requerido"},
          minLength: { value: 3, message: "Minimo 3 caracteres"}, // mensaje para moestara error 
          maxLength: { value: 180, message: "Minimo 180 caracteres"},
        })}
        type="text"
        name="name"
        placeholder="Ingrese nombre..."
        className={clsx("p-2 rounded text-black w-1/5", {
          'text-red-500':errors.name})}
        required/>
        
        <input 
        {...register("lastname", {
          required: { value: true, message: "Campo requerido"},
          minLength: { value: 3, message: "Minimo 3 caracteres"}, // mensaje para moestara error 
          maxLength: { value: 180, message: "Minimo 180 caracteres"},
        })}
        type="text"
        name="lastname"
        placeholder="Ingrese apellido..."
        className={clsx("p-2 rounded text-black w-1/5", {
          'text-red-500':errors.name})}
        required/>

        <input 
        {...register("email", {
          required: { value: true, message: "Campo requerido"},
          pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
        })}
        type="text"
        name="email"
        placeholder="Ingrese email..."
        className={clsx("p-2 rounded text-black w-1/5", {
          'text-red-500':errors.name})}
        required/>

        <button 
        className="bg-white text-black px-3 rounded cursor-pointer disabled:bg-gray-400 disabled:cursor-default"
        disabled={isSubmitted ? !isValid : false}>
          Agregar
        </button>
      </form>

      {errors.name && (
        <p 
            className="text-red-500 text-center text-sm font-semibold">
            {errors.name ?.message}</p> 
      )}
      {errors.lastname && (
        <p 
            className="text-red-500 text-center text-sm font-semibold">
            {errors.email ?.message}</p> 
      )}
      {errors.email && (
        <p 
            className="text-red-500 text-center text-sm font-semibold">
            {errors.lastnames ?.message}</p> 
      )}

      <div 
      className="mt-7 font-sans max-w-screen-sm w-full mx-auto flex flex-col justify-center gap-1">
        {dataInfo.length === 0 && (
          <p className="text-white/50"> No hay registros</p>
        )}
        {
          dataInfo.length > 0 &&
          dataInfo.map((elem, idx)=>{
            return(
              <div
              key={idx}
              className="bg-white/10 rounded p-4 flex flex-row justify-between ">
                <span className="select-none">
                  {elem.name}{elem.lastname} - {elem.email}
                </span>
                <span className="text-red-500 cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-0 size-5 text-center items-center text-sm" 
                  onClick={()=> removeReg(idx)}>X</span>
              </div>
            )
          })
        }

      </div>

    </main>
  )

}

