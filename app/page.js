import Login from '@/components/login';
import { auth } from "../auth"
import UserProfile from '@/components/profile';
export default async function Home() {
    const session = await auth()
    console.log("Console from homepage: ",session)
    return (
        <main>
            {!session && (<Login target={"Student"}/>)}
            {session && (<UserProfile user={session.user}/>)}
        </main>
    );
}
