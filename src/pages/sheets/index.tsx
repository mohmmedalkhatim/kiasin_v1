import SheetsList from "./sheets_list"
import SheetEditor from "./sheet_editor"
import { useState } from "react"
import "./style.css"
import Header from "../../components/header"
import Button from "../../components/Button"
import Input from "../../components/input"
import { useAsync } from "react-use"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../contexts/store"
import { Dialog } from "../../components/Dialog"
import { sheet_data } from "../../contexts/sheets/functions/retiveve"


function Sheets() {
    let [active, setActive] = useState<number>()
    let dispatch = useDispatch<AppDispatch>()
    let [open, setOpen] = useState(false)
    useAsync(async () => {
        dispatch(sheet_data())
    }, [active])
    return (
        <>
            <Header >
                <div className="flex justify-between w-full py-4">
                    <Input className="w-[18rem] border-0 outline-0" value={active} />
                    <Button onClick={() => setOpen(true)} size="sm">new sheet</Button>
                </div>
            </Header>
            <main className=" mt-0 p-0  relative flex w-screen">
                <SheetsList setActive={setActive} />
                <div className="flex pt-18 w-full relative  pl-72">
                    <SheetEditor/>
                </div>
            </main>
            <Dialog open={open} widthClass="w-[30rem]" bodyClassName="" onClose={function (): void {
                setOpen(false)
            }}>
                <div className="p-4">
                    <div className="flex flex-col gap-4">
                        <Input label="name" type="text" />
                        <Input label="description" type="text" />
                        
                    </div>

                </div>
            </Dialog>


        </>
    )
}
export default Sheets