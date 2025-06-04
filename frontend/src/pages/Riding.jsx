import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { ride } = location.state || {}
  const { socket } = useContext(SocketContext)

  const [showNearby, setShowNearby] = useState(false)

  useEffect(() => {
    if (!ride) return
    socket.on('ride-ended', () => navigate('/home'))
    return () => socket.off('ride-ended')
  }, [ride, socket, navigate])

  return (
    <div className="h-screen w-full bg-white flex flex-col md:flex-row">
      {/* Left Section: Booking Info */}
      <div className="w-full md:w-[40%] px-8 py-10 space-y-6">
        {/* Title */}
        <h1 className="text-4xl font-bold text-black leading-tight">
          Go anywhere with <br />
          <span className="text-black">Uber</span>
        </h1>

        {/* Tabs */}
        <div className="flex space-x-4">
          <button className="bg-gray-200 px-4 py-2 rounded-xl text-black font-semibold flex items-center space-x-2">
            <i className="ri-car-line text-xl"></i>
            <span>Ride</span>
          </button>
          <button className="text-gray-500 px-4 py-2 rounded-xl hover:bg-gray-100 flex items-center space-x-2">
            <i className="ri-box-3-line text-xl"></i>
            <span>Courier</span>
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Pickup location"
              className="w-full px-5 py-3 pl-10 bg-gray-100 rounded-xl outline-none"
            />
            <i className="ri-record-circle-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"></i>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Dropoff location"
              className="w-full px-5 py-3 pl-10 bg-gray-100 rounded-xl outline-none"
            />
            <i className="ri-stop-circle-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"></i>
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex space-x-4">
          <button className="bg-gray-100 w-full py-3 rounded-xl flex items-center justify-between px-4 text-gray-700">
            <i className="ri-calendar-line text-xl mr-2"></i> Today
          </button>
          <button className="bg-gray-100 w-full py-3 rounded-xl flex items-center justify-between px-4 text-gray-700">
            <i className="ri-time-line text-xl mr-2"></i> Now
            <i className="ri-arrow-down-s-line ml-2"></i>
          </button>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 items-center">
          <button className="bg-black text-white py-3 px-6 rounded-xl font-semibold">
            See prices
          </button>
          <p className="text-gray-500 underline cursor-pointer">
            Log in to see your recent activity
          </p>
        </div>

        {/* Optional Ride Info Dropdown */}
        {ride?.captain && (
          <div className="mt-6 bg-gray-100 p-4 rounded-xl text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Nearby Captain:</span>
              <span>{ride.captain.fullname.firstname}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Vehicle Plate:</span>
              <span>{ride.captain.vehicle.plate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Estimated Fare:</span>
              <span>₹{ride.fare}</span>
            </div>
          </div>
        )}
      </div>

      {/* Right Section: Live Map */}
      <div className="w-full md:w-[60%] h-[50vh] md:h-full p-4 md:p-6">
        <div className="h-full rounded-2xl shadow-lg overflow-hidden relative">
          <LiveTracking />

          {/* Floating Home Button */}
          <Link
            to="/home"
            className="absolute top-4 right-4 z-10 h-12 w-12 bg-white shadow-md flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            <i className="ri-home-5-line text-xl"></i>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Riding
