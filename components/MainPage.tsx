import React, { LegacyRef, RefObject, useRef, useState } from 'react'
import { Circles } from 'react-loader-spinner'

const MainPage = () => {

  const [prompt, setPrompt] = useState<string | null | undefined>("")
  const [imgUrl, setImgUrl] = useState<string | undefined>("")
  const promptRef = useRef<HTMLTextAreaElement>(null)
  const [loading, setLoading] = useState<boolean>(false)

  async function getImage(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault()
    setLoading(true)
    const data = {
      prompt: prompt
    }
    const res = await fetch("http://localhost:3000/api/generateimage", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (res) {
      const responseObject = await res.json()
      console.log(responseObject)
      setLoading(false)
      setImgUrl(responseObject.url)
      if (promptRef.current) {
        promptRef.current.value = ""

      }

    }

  }
  return (
    <div className='h-screen bg-[#06202A]'>
      <header className='w-screen  flex justify-center py-5 text-2xl bg-[#06202A] shadow-md text-white'>AI Image Creator</header>

      <section className='w-screen px-10 py-10 flex justify-center items-center'>
        <form className='flex flex-col space-y-5 max-w-[600px] items-center' onSubmit={getImage}>
          <textarea rows={6} cols={45} ref={promptRef} className="p-3 border border-gray-600 text-gray-500 outline-none rounded-md bg-transparent resize-none" onChange={(e) => setPrompt(e.target.value)}></textarea>
          <button className='bg-red-600 rounded-md px-7 py-[5px] text-white' type='submit'>Submit</button>
        </form>
      </section>

      {/* Image section */}

      <section className='w-full flex justify-center p-5'>
        {

          !imgUrl ? (loading ? <Circles
            height="80"
            width="80"
            color="#d97575"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          /> : "") : (!loading ? <img src={imgUrl} className="h-[300px] w-[300px] rounded-md" /> : <Circles
            height="80"
            width="80"
            color="#d97575"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />)

        }

      </section>

    </div>
  )
}

export default MainPage