'use client'
type ToggleProps = {
    deletePost: () => void
    setToggle: (toggle: boolean) => void
}
export default function Toggle({ deletePost, setToggle }:ToggleProps){
    return(
        <div className="fixed w-full h-full z-20 left-0 top-0  bg-black/20">
            <div className="absolute bg-white  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6 ">
                
                <h2 className="text-xl text-gray-700">
                    Are you want to delete this confession?
                </h2>
                <h3 className="text-sm text-red-600">
                    Pressing the delete button will permenantly delete this confession.
                </h3>
                <button
                    onClick={deletePost}
                    className="text-sm bg-sky-400 text-white py-2 px-6 rounded-xl disabled:opacity-25"
                >
                        Delete
                </button>
                <button
                    onClick={(e) => {
                        setToggle(false)
                    }}
                    className="text-sm border-2 border-color-gray text-gray-700 py-2 px-6 rounded-xl disabled:opacity-25">
                    Cancel
                </button>
            </div>
        </div>
    )
}