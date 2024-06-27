
export default function Navbar({user, count}) {
    return (
        <div className="flex justify-between border-b-2 h-16" >
            <div  >
                <h1 className="p-2" >Paytm</h1>
            </div>
            <div className="flex" >
                <div className="p-2" >
                    hello, {user},
                </div>
                <div className="bg-slate-400 rounded-full p-2 align-middle " >
                    {count}
                </div>
            </div>
        </div>
    )
}