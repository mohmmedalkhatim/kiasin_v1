import TableScreen from "./table_screen"
import DatabasesList from "./DatabasesList"
import { useState } from "react"
import "./style.css"
import Header from "../../components/header"
import Button from "../../components/Button"
import  Input  from "../../components/input"
import { useAsync } from "react-use"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../contexts/store"
import { database_info } from "../../contexts/Databases/functions/retiveve"


function Databases() {
    let [active, setActive] = useState("")
    let dispatch = useDispatch<AppDispatch>()
    useAsync(async () => {
        dispatch(database_info(active))
    }, [active])
    return (
        <>
            <Header >
                <div className="flex justify-between w-full py-4">
                    <Input className="w-[18rem] border-0 outline-0" value={active} />
                    <Button className="text-xs" size="sm">new record</Button>
                </div>
            </Header>
            <main className=" mt-0 p-0  relative flex w-screen">
                <DatabasesList setActive={setActive} />
                <div className="flex w-full relative pr-15 pl-64">
                    <TableScreen />
                </div>
            </main>

        </>
    )
}
export default Databases