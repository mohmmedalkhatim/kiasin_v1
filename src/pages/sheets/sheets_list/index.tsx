import { Dispatch, SetStateAction, useEffect, useState } from "react"
import SheetCard from "../sheet_card"
import Button from "../../../components/Button"
import Input  from "../../../components/input"
import CreateTableDialog from "./create_table_dialog"
import excel, { Workbook } from "exceljs"
import { Channel, invoke } from "@tauri-apps/api/core"
import { useAsync } from "react-use"
import { Sheet } from "../../../contexts/sheets/objects"

type DatabasesListProps = {
    setActive: Dispatch<SetStateAction<string>>
}

function SheetList({ setActive }: DatabasesListProps) {
    const [open, setOpen] = useState(false)
    const [Sheets, setSheets] = useState<string[]>([])
    useAsync( async () => {
        let channel = new Channel((res:Sheet[])=>{
            let names = res.map(item=>item.name)
            setSheets(names)
        })
        await invoke("sheet_control",{payload:{command:"list"},channel})
    }, [])
        return (
            <>
                <div className="flex flex-1 flex-col border-r w-[18rem] z-10 max-h-[calc(100vh-2.5rem)] bg fixed min-h-[calc(100vh-2.5rem)]  pt-18  border-[#e2e2e220]">
                    <div className="border-b border-[#e2e2e220] p-3 w-full">
                        <Input placeholder="search for data" ></Input>
                    </div>
                    <div className="bg-[#e2e2e206] overflow-auto h-full grow">
                        <div className="flex flex-col gap-2 p-2 m-3">
                            {Sheets.map(item => {
                                return (<SheetCard key={item} onClick={() => setActive(item)} name={item} />)
                            })}
                        </div>
                    </div>
                    <div className="p-4 w-full flex border-t self-end border-[#e2e2e220]">
                        <Button className="w-full" onClick={() => setOpen(true)}>create Tables</Button>
                    </div>
                </div>
                <CreateTableDialog open={open} setOpen={setOpen} />
            </>
        )
}
export default SheetList