import {useRecoilState } from "recoil"
import { amountAtom } from "../store/atoms"

export default function Balance() {

    const balance_count = useRecoilState(amountAtom);

    return (
        <div className="border-b-2 h-16" >
            <div className="pt-3" >
                Your Balance: {balance_count}
            </div>
        </div>
    )
}