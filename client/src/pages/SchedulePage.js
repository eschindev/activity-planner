import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';


const SchedulePage = () => {
   //declare username to be, if they are logged in, get it from their profile, if they
   //are not logged in, then it's empty string

    const username = Auth.loggedIn() ? Auth.getProfile().data.username: '';
    console.log(Auth.getProfile());
    console.log(username);
    const {loading, data} = useQuery(QUERY_ME, {
        // variables: {username: username}
    });
    console.log(data);
    if (!Auth.loggedIn()){
        return `Please log in`
    }

    if (loading) {
        return <div>Loading...</div>;
      }
      const user = data?.getMyUser || {};
    console.log(user);
    return (
        <div>
           <p>Welcome {user.username} !</p>
            <p>Profile of : {user.fullName}</p>
            <p> Your latest invite: {user.invites}</p>
            <p>Your Activity List: {user.activity}</p>
            <p>Your friends: {user.friends}</p>
            <p>Your latest friend requests: {user.requests}</p>
            
            <Link to="/create-activity"><button>Create New Activity</button></Link>
        </div>
    )
}
export default SchedulePage;