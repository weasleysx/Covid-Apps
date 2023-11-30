import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { signOut } from "../../utils/genericUtils";
import Svg from "../svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { db } from "../../firebase/clientApp"; 
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faTimes);



const AnimatedForm = ({ children }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  return <animated.div style={props}>{children}</animated.div>;
};
  

const Dashboard = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [career, setCareer] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [message, setMessage] = useState({ text: "", maxlength: 500 });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleAddTimeline = async () => {
    try {
      const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd HH:mm:ss') : null;
      const existingPatient = await db.collection('patients').doc('uniqueID').get();
      const existingPatientData = existingPatient.exists ? existingPatient.data() : {};
  
      const timelineData = {
        datetime: formattedDate,
        details: message.text,
      };
  
      await db.collection("timelines").add(timelineData);
  
      if (
        existingPatientData &&
        existingPatientData.gender !== undefined &&
        existingPatientData.age !== undefined &&
        existingPatientData.career !== undefined &&
        (
          existingPatientData.gender !== gender ||
          existingPatientData.age !== age ||
          existingPatientData.career !== career
        )
      ) {
        // If patient exists and data has changed, update the document
        console.log('Updating patient data:', gender, age, career);
        await db.collection('patients').doc('uniqueID').update({
          gender,
          age,
          career,
        });

      } else {
        console.log('Patient data has not changed. No update needed.');
      }
  
      setMessage({ text: "", maxlength: 500 });
      setSelectedDate(null); 
      console.log("Timeline added to Firestore!");
      window.location.reload();
    } catch (error) {
      console.error("Error adding timeline to Firestore: ", error);
    }
  };
  

  const [timelineData, setTimelineData] = useState([]);
  useEffect(() => {
    // Function to fetch data from Firestore
    const fetchData = async () => {
      try {
        const snapshot = await db.collection("timelines").get();
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTimelineData(data);
      } catch (error) {
        console.error("Error fetching timeline data from Firestore: ", error);
      }
    };

    fetchData();
  }, []); 
  const [patientData, setPatientData] = useState([]);
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patientSnapshot = await db.collection('patients').doc('uniqueID').get();
        const patientData = patientSnapshot.exists ? [patientSnapshot.data()] : [];
        
        console.log("Fetched Patient Data:", patientData);
  
        setPatientData(patientData);
      } catch (error) {
        console.error("Error fetching patient data from Firestore: ", error);
      }
    };
  
    fetchPatientData();
  }, []);
  
  const handleDelete = async (id) => {
    try {
      await db.collection("timelines").doc(id).delete();
  
      setTimelineData((prevData) => prevData.filter((item) => item.id !== id));
  
      window.location.reload();
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  const formatDate = (datetimeString) => {
    const dateObject = new Date(datetimeString);
    const formattedDate = dateObject.toLocaleDateString('en-US'); // Adjust the locale as needed
    return formattedDate;
  };
  const formatTime = (datetimeString) => {
    const dateObject = new Date(datetimeString);
    const formattedTime = dateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return formattedTime;
  };
  



  return (
    <>
      <div className="flex items-center justify-between text-5xl font-bold text-[#ffc107] text-start pt-6 pb-2 px-6">
        <span>COVID Timeline Generator</span>
        <a
          href=""
          className="flex ml-1 items-center mt-3 px-1 pb-5 mr-5 no-underline text-blue-50 opacity-70 hover:opacity-100"
          onClick={signOut}
        >
          <Svg.SignOutSvg />
          <div className="pl-2">Sign Out</div>
        </a>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 m-10">
        <AnimatedForm>
          <div className=" col-span-1">
            <form className="vue-form bg-[#234973] m-2 p-5 flex flex-col">
              <fieldset>
                <legend className="pt-3">ข้อมูลผู้ป่วย</legend>
                <div className="pt-2 flex">
                  {/* Gender */}
                  <div className="flex-1 pr-2">
                    <label className="label pb-2" htmlFor="gender">
                      เพศ
                    </label>
                    <input
                      type="text"
                      name="gender"
                      id="gender"
                      required
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full border p-1"
                    />
                  </div>
                  {/* Age */}
                  <div className="flex-1 pl-2">
                    <label className="label pb-2" htmlFor="age">
                      อายุ
                    </label>
                    <input
                      type="number"
                      name="age"
                      id="age"
                      required
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full border p-1"
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <label className="label pb-2" htmlFor="email">
                    อาชีพ
                  </label>
                  <input
                    type="text"
                    name="career"
                    id="career"
                    required
                    className="w-full border p-1"
                    value={career}
                    onChange={(e) => setCareer(e.target.value)}
                  />
                </div>
              </fieldset>
            </form>
          </div>
        </AnimatedForm>
        <div className=" col-span-2 row-span-2 ml-2">
          <AnimatedForm>
            <form className="vue-form border-2 border-[#ffc107] m-2 p-5 flex flex-col">
              <fieldset>
                <div className="text-3xl font-bold text-[#ffc107] text-center pt-2 pb-2 px-6">
                  Timeline
                </div>

                <div className="pt-2">
                  {patientData.map((item) => (
                    <div
                      className="bg-[#ffc107] rounded-full text-black	w-1/3  mx-auto	p-5"
                      key={item.id}
                    >
                      <div className="text-xl text-center">
                        ผู้ป่วย{item.gender} อายุ {item.age} ปี
                      </div>
                      <div className="font-extrabold text-center text-sm pt-2">
                        อาชีพ{item.career}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  {timelineData.map((item) => (
                    <div
                      className="relative pl-8 sm:pl-32 py-6 group"
                      key={item.id}
                    >
                      <div className="timeline">
                        <div className="container right">
                          <div className="content">
                            <p className="text-[#ffc107] text-sm">
                              {formatTime(item.datetime)}{" "}
                              <span className="text-white">{item.details}</span>{" "}
                              <FontAwesomeIcon
                                icon={faTimes}
                                className="cursor-pointer text-white"
                                onClick={() => handleDelete(item.id)}
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>
            </form>
          </AnimatedForm>
        </div>
        <AnimatedForm>
          <div className=" col-span-1">
            <form className="vue-form bg-[#234973] m-2 p-5 flex flex-col">
              <fieldset>
                <legend className="pt-3">ข้อมูลไทม์ไลน์</legend>
                <div className="pt-2">
                  <label className="label pb-2" htmlFor="datetime">
                    วันเวลา
                  </label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="border p-2 equal-width-input"
                  />
                </div>
                <div>
                  <label className="label py-2" htmlFor="textarea">
                    รายละเอียด
                  </label>
                  <textarea
                    className="message border p-2 equal-width-input"
                    name="textarea"
                    id="textarea"
                    required
                    value={message.text}
                    maxLength={message.maxlength}
                    onChange={(e) =>
                      setMessage({
                        text: e.target.value,
                        maxlength: message.maxlength,
                      })
                    }
                  />
                  <span className="counter text-white">
                    {message.text.length} / {message.maxlength}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAddTimeline}
                  className="bg-[#ffc107] text-white p-2 mt-4 rounded cursor-pointer"
                >
                  Add Timeline
                </button>
              </fieldset>
            </form>
          </div>
        </AnimatedForm>
      </div>
    </>
  );
};

export default Dashboard;