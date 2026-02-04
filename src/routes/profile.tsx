import { createFileRoute } from '@tanstack/react-router'
import profilePic from '../profile.jpg'


export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <div className="p-8 flex justify-center">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 max-w-sm w-full text-center">
        
        {/* Profile Picture */}
      <img
  src={profilePic}
  alt="Profile"
  className="w-40 h-40 object-cover rounded-full mx-auto mb-4 border-4 border-blue-500"
/>


        {/* Name */}
        <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
          Shahd Hassan
        </h1>

        {/* About */}
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Frontend developer in the making.
           Passionate about learning React,
          building real-world projects, and turning coffee into clean code.
        </p>

      </div>
    </div>
  )
}
