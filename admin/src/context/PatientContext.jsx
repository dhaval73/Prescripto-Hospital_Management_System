import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const PatientContext = createContext();

const PatientContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [pToken, setPToken] = useState(localStorage.getItem("pToken") || "");
  const [appointments, setAppointments] = useState([]);
  const [profileData, setProfileData] = useState(null);

  // Get patient's appointments
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/patient/appointments",
        { headers: { pToken } }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Cancel an appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/patient/cancel-appointment",
        { appointmentId },
        { headers: { pToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Get profile data
  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/patient/profile", {
        headers: { pToken },
      });

      if (data.success) {
        setProfileData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Update profile data (optional, based on your backend route)
  const updateProfile = async (formData) => {
    try {
      const { data } = await axios.put(
        backendUrl + "/api/patient/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    pToken,
    setPToken,
    backendUrl,
    appointments,
    getAppointments,
    cancelAppointment,
    profileData,
    getProfileData,
    updateProfile,
  };

  return (
    <PatientContext.Provider value={value}>
      {props.children}
    </PatientContext.Provider>
  );
};

export default PatientContextProvider;
