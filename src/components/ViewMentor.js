import "../index.css"
import axios from "axios";
import { useState,useEffect } from "react";


function ViewMentor(){
    let [allMentors, setAllMentors]=useState([]);
    let [mName,setmName]=useState("");
   // let [res,setRes]= useState("");
    let [students,setStudents] =useState([]);
    let count = 0;

    useEffect(()=>{
        getAllMentors();
    },[])

    const getAllMentors = async()=>{ // to get all mentors
        await axios.get("https://student-mentor-manage.herokuapp.com/all-mentors")
        .then((response)=>{
            setAllMentors(response.data);
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleEvent = async()=>{ // student deatail of particular mentor
        await axios.post("https://student-mentor-manage.herokuapp.com/students",{
            mentorName:mName
        }).then((response)=>{
            setStudents(response.data.mentorStudents);

        }).catch((error)=>{
            console.log(error)
        })
    }

    return(
        <div className="add-wrapper">
            <h3>View Mentor Students</h3>
            <div className="inputfields">
                <label>Mentor Name :</label>
                <select className="input" onChange={(e) =>{setmName(e.target.value);setStudents([]);}}>
                    <option selected disabled hidden>
                       Select an Option
                    </option>
                    {
                        allMentors.map((e)=>{ // display each student 1 by 1
                            return(
                            <option key ={e._id}>{e.mentorName}</option>
                            )
                        })
                    }
                </select>
                
            </div>

            <br></br>
            <button className="btn btn-primary" id="but" onClick={handleEvent}>View</button>
            <h3>Student Mapped to Mentor {mName} are:</h3>
            {
                students.map((e)=>{
                    count=count+1; // to give serial number for each students
                    return <h4>{count}.{e}</h4>
                })
            }

        </div>
    )

}

export default ViewMentor;