import { useAsync } from "react-use"
import { DatabaseType } from "../../../../../../contexts/Databases/objects"
import { DB } from "../../../../../../main"
import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../../../contexts/store"


async function getData(table: string) {
    let tables = await DB.select<any[]>(`select * from ${table}`)
    console.log(tables)
    return tables
}


function Record({ name,info }:DatabaseType) {
    let [data, setData] = useState<any[]>([])
    let active = useSelector((state: RootState) => state.database.active)
    useAsync(async () => {
        setData(await getData(name))
    }, [active])
    return (
        <div className="flex flex-col w-full">
            {data.map((item) => (
                <div className="border-b border-border-main grid" style={{gridTemplateColumns:`repeat(${info.length},minmax(0,1fr))`}}>
                    {info.map(name => (<div className="pl-4 cell">{String(item[name]).length >= 14 ? `${String(item[name]).substring(0,10)}...` : item[name]}</div>))}
                </div>
            ))}
        </div>
    )
}
export default Record