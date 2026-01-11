import axios from "axios";
import {redirect} from "next/navigation";
export default async function ProfilePage() {
    const {data} = await axios.get("http://localhost:3000/api/user/profile", {}, {
        withCredentials: true,
    })
    console.log(data)
    if (!data.success) redirect('/login')

    return (
        <>
            <h1>{data.name}</h1>
        </>
    );
}