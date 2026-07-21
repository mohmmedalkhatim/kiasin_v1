import SheetsList from "./sheets_list"
import { useState } from "react"
import "./style.css"
import Header from "../../components/header"
import Button from "../../components/Button"
import  Input  from "../../components/input"
import { useAsync } from "react-use"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../contexts/store"
import { Dialog } from "../../components/Dialog"


function Sheets() {
    let [active, setActive] = useState("")
    let dispatch = useDispatch<AppDispatch>()
    let [open,setOpen] = useState(false)
    useAsync(async () => {
    }, [active])
    return (
        <>
            <Header >
                <div className="flex justify-between w-full py-4">
                    <Input className="w-[18rem] border-0 outline-0" value={active} />
                    <Button onClick={()=>setOpen(true)} size="sm">new sheet</Button>
                </div>
            </Header>
            <main className=" mt-0 p-0  relative flex w-screen">
                <SheetsList setActive={setActive} />
                <div className="flex w-full relative pr-15 pl-64">
                    hello
                </div>
            </main>
            <Dialog open={open} widthClass="w-[30rem]" bodyClassName=""  onClose={function (): void {
                setOpen(false)
            }}>
                <div className="flex">
                 <input type="text"  />
                <input type="text"  />
                <input type="text"  />

                </div>

            </Dialog>


        </>
    )
}
export default Sheets