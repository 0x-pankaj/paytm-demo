import Navbar from "./Navbar"
import Balance from "./Balance"
import Users from "./Users"

export default function Dashboard() {
    return (
        <div className="bg-white p-4 font-bold " >
      <Navbar user={"pankaj"} count={98} />
      <Balance />
      <Users />
    </div>
    )
}