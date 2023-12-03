import { useState, useEffect } from 'react';
import { db } from './clientApp';
import { format } from 'date-fns';
import {TimelineData, PatientData} from '../services/data';


export const useTimelineData = () => {
    const [timelineData, setTimelineData] = useState<TimelineData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const snapshot = await db.collection('timelines').get();
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as TimelineData));
            setTimelineData(data);
          } catch (error) {
            console.error('Error fetching timeline data from Firestore: ', error);
          }
        };
    
        fetchData();
      }, []);
      return timelineData;
    };    

    export const usePatientData = () => {
        const [patientData, setPatientData] = useState<PatientData[]>([]);
      
        useEffect(() => {
          const fetchPatientData = async () => {
            try {
              const patientSnapshot = await db.collection('patients').doc('uniqueID').get();
              const patientData = patientSnapshot.exists ? [patientSnapshot.data() as PatientData] : [];
      
              console.log('Fetched Patient Data:', patientData);
      
              setPatientData(patientData);
            } catch (error) {
              console.error('Error fetching patient data from Firestore: ', error);
            }
          };
      
          fetchPatientData();
        }, []);
      
        return patientData;
      };


export const useTimelineFunctions = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); 
  const [message, setMessage] = useState({ text: '', maxlength: 500 });
  const [timelineData, setTimelineData] = useState([]);


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
  const handleDelete = async (id) => {
    try {
      await db.collection("timelines").doc(id).delete();
  
      setTimelineData((prevData) => prevData.filter((item) => item.id !== id));
  
      window.location.reload();
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return {
    selectedDate,
    handleDateChange,
    handleAddTimeline,
    handleDelete
  };
};

export const useFormattingFunctions = () => {
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
      

  return {
    formatDate,
    formatTime,
  };
};
