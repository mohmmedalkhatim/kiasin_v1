import { Dispatch, SetStateAction, useEffect, useState } from "react"
import DbCard from "../DbCard"
import Button from "../../../components/Button"
import { Input } from "../../../components/input"
import CreateTableDialog from "./create_table_dialog"
import { DB } from "../../../main"
import { useAsync } from "react-use"

type DatabasesListProps = {
    setActive: Dispatch<SetStateAction<string>>
}

function DatabasesList({ setActive }: DatabasesListProps) {
    const [open, setOpen] = useState(false)
    const [tables, setTables] = useState<string[]>([])
    useEffect(() => {
        DB.select<{ name: string }[]>("select name from sqlite_master where type='table'").then((tables) => {
            setTables(tables.map((item) => item.name))
        })
    }, [])
    if (tables.length != 0) {
        return (
            <>
                <div className="flex flex-1 flex-col border-r w-[16rem] z-10 max-h-[calc(100vh-2.5rem)] bg fixed min-h-[calc(100vh-2.5rem)]  pt-18  border-[#e2e2e220]">
                    <div className="border-b border-[#e2e2e220] p-3 w-full">
                        <Input placeholder="search for data" ></Input>
                    </div>
                    <div className="bg-[#e2e2e206] overflow-auto h-full grow">
                        <div className="flex flex-col gap-2 p-2 m-3">
                            {tables.map(item => {
                                return (<DbCard key={item} onClick={() => setActive(item)} name={item} />)
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
}
export default DatabasesList