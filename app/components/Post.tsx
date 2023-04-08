'use client'

export default function Post() {
    return (
        <div className="bg-white my8 p-8 rounded-lg">
            <div className="flex item-center gap-2">
                < h3 className="font-bold text-gray-700">{name}</h3>
            </div>

            <div>
                <p className="font-bold text-gray-700">{postTitle}</p>
            </div>

        </div>
    )
}