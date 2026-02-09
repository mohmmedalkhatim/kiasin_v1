import {  IconTable } from "@tabler/icons-react"

function DbCard({ name,onClick }: { name: String,onClick:()=>void }) {
    return (
        <div onClick={onClick} className="gap-2 rounded-sm w-fill hover:bg-[#e2e2e220] bg-transparent flex items-center primary_button p-3">
            <IconTable size={"1.2rem"}/>
            <div className="text-sm">{name}</div>
        </div>
    )
}
export default DbCard