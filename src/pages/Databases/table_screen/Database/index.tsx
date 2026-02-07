import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Fields from "./components/Feilds";
import Header from "./components/Header";
import Record from "./components/Record";
import "./style.css"
import { IconPlus } from "@tabler/icons-react";
import { AppDispatch, RootState } from "../../../../contexts/store";
import { useDispatch, useSelector } from "react-redux";
import { database_info } from "../../../../contexts/Databases/functions/retiveve";
import { useAsync } from "react-use";


function Database({ name }: { name: string }) {
    let active = useSelector((state: RootState) => state.database.active)
    let dispatch = useDispatch<AppDispatch>()
    useAsync(async () => {
        dispatch(database_info(name))
    }, [name])
    if (active.tableInfo && name) {
        return (
            <>
                <main className="flex flex-col items-center">
                    <div className="w-full flex flex-col max-w-full overflow-x-auto mt-4 border-y border-l border-border-main" >
                        <Fields list={active.tableInfo.map(item => item.name)} />
                        <Record name={active.tableName} info={active.tableInfo.map(item => item.name)} />
                        <div className=" flex py-2 hover:bg-[#e2e2e210] w-full items-center border-r border-border-main justify-center ">
                            <div className="flex items-center gap-2 text-[#e2e2e240]">
                                <IconPlus size={"1rem"} />
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )
    }
}
export default Database