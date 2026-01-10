import axios from "axios";
import {redirect} from "next/navigation";
export default async function ProfilePage() {
    const e = await axios.get("http://localhost:3000/api/user/profile")
    console.log(e)
    if (!e.data.ok) redirect('/login')
    return (
        <>
            <h1>{user.name}</h1>
        </>
    );
}