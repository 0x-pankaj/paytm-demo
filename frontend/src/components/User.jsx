export default function User({name, id}) {
    return (
        <div className="flex justify-between h-13" >
            <div className="flex" >
                <div className="p-4" > {id}   </div>
                <div className="p-4" > {name} </div>
            </div>

            <div>
                <button className="bg-black text-white rounded-md p-2 font-normal" >Send Money</button>
            </div>
        </div>
    )
}