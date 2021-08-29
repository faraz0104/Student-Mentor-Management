import {useState,useEffect} from "react";
import axios from"axios";
import Select from "react-select";

import "../index.css";

function AssignStudents(){
    let [sNames, setsName]=useState("");
    let [mName, setmName]=useState("");
    let [data,setData] = useState([]);
    let [res,setRes]= useState("")
    let [options,setOptions] = useState([]);
    useEffect(()=>{
        getAllMentors();
        getAllStudents();
    },[])

    const getAllMentors = async()=>{ // get all mentors

        await axios.get("https://student-mentor-manage.herokuapp.com/all-mentors")
        .then((response)=>{
            setData(response.data)
        })
        .catch((error)=>{
            console.log(error);
        })

    }

    const getAllStudents =  async()=>{
        await axios.get("https://student-mentor-manage.herokuapp.com/all-students")
        .then((response)=>{
            response.data.map((e)=>{
                if(!e.studentMentor){
                    options.push({  //option for multi student select from dropdown
                        value:options.length+1,
                        label:e.studentName

                    })
                }
            })
            console.log(options)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const handleEvent = async () =>{
        await axios.post("https://student-mentor-manage.herokuapp.com/assign-students",{
            mentorName:mName,
            mentorStudents:sNames
        })
        .then((response)=>{
            setRes(response.data.message);
            setTimeout(()=>{
                window.location.reload();
            },1000);
        })
    }
    let UpdateSelected = (e) =>{
        setsName(Array.isArray(e)?e.map(x=>x.label):[]);  // to handle multi select option
    }

    return(
        <div className="add-wrapper">
            <h3>Assign students</h3>
            <div className="inputfileds">
                <label>Mentor Name :</label>
                <select className="input" onChange={(e)=>setmName(e.target.value)}>
                    <option selected disabled hidden>
                        Select an Option
                    </option>
                    {
                        data.map((e) =>{
                            return <option key = {e._id}>{e.mentorName}</option>
                        })
                    }
                </select>
                <label>Students :</label>
                <Select isMulti options={options} className="input" displayValue="Student" onChange={UpdateSelected} />
            </div>
            <br></br>
            <button className="btn btn-primary" id="but" onClick={handleEvent}>Add</button>
        </div>
    )
}

export default AssignStudents;