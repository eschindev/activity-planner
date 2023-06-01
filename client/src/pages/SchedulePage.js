import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';


const SchedulePage = () => {
   //declare username to be, if they are logged in, get it from their profile, if they
   //are not logged in, then it's empty string

    const username = Auth.loggedIn() ? Auth.getProfile().data.username: '';
    const {loading, data} = useQuery(QUERY_USER, {
        variables: {username: username}
    });
    if (!Auth.loggedIn()){
        return `Please log in`
    }

    if (loading) {
        return <div>Loading...</div>;
      }
      const user = data?.user || {};
    
    return (
        <div>
            {user.username}
            {user.firstName}
            {user.lastName}
            {user.activities}
            
        </div>
    )
}
export default SchedulePage;