import { useEffect } from "react"
import DbCard from "../DbCard"
import Input from "../../../components/input"
import Button from "../../../components/Button"

let list = [{name:"areas"}]

function DatabasesList() {
    return (
        <div className="flex flex-1 flex-col border-r max-h-screen pt-[4rem] min-h-screen border-[#e2e2e220]">
            <div className="border-b border-[#e2e2e220] p-3">
                <Input placeholder="search for data"></Input>
            </div>
            <div className="bg-[#e2e2e206] overflow-auto">
                <div className="flex flex-col gap-2 p-2   m-3">
                    {list.map(item => {
                        return (<DbCard name={item.name} />)
                    })}
                </div>
            </div>
            <div className="p-4 w-full flex border-t border-[#e2e2e220]">
                <Button className="w-full">create Tables</Button>
            </div>
        </div>
    )
}
export default DatabasesList