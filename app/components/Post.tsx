'use client'

export default function Post({ id, name, avatar, postTitle, comments }) {
  return (
    <div className="bg-white my-8 p-8 rounded-lg ">
      <div className="flex items-center gap-2">
        {/* <h3 className="font-bold text-gray-700">Anonymous</h3> */}
        <h3 className="font-bold text-gray-700">Whisperer-{name.substr(0, 5)}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{postTitle}</p>
      </div>
      
    </div>
  )
  }