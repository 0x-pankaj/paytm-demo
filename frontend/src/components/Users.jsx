import User from "./User";
import { users } from "../../user";
export default function Users() {
    return (
        <div>
            <h1 className="p-4" >Users</h1>
            {
                users.map(user => <User name={user.name} id={user.id}  />)
            }
            <User />
        </div>
    )
}