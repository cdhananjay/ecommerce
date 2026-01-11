import {redirect} from "next/navigation";
import axios from "axios";
export default async function logout() {
    try{
        const {data} = await axios.post('http://localhost:3000/api/user/logout', {} ,{
            withCredentials: true,
        });
        // alert(data.message);
    }
    catch(err){
        // alert(err);
        console.log(err);
    }
    finally {
        redirect('/')
    }

    return (
        <>
        </>
    );
}