import react from 'react'
import {Link} from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import PeopleIcon from '@material-ui/icons/People';
import './Topbar.css'

function Topbar(){
    return(
        <div className="container">
            <h2 className="title">
                <span>Student Mentor Management System</span>
            </h2>

            <div className="side-nav">
                <Link to='/home' className="TLink">
                    <spam><HomeIcon />Home</spam>
                </Link>

                <Link to='/all-mentors' className="TLink">
                    <spam><EmojiPeopleIcon />All-Mentors</spam>
                </Link>

                <Link to='/all-students' className="TLink">
                    <spam><PeopleIcon />All-Students</spam>
                </Link>
            </div>

        </div>
    )
}

export default Topbar;