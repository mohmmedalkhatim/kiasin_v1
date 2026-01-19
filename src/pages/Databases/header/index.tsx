import { IconDatabasePlus, IconDatabaseSearch } from "@tabler/icons-react"
import Button from "../../components/Button"
import Input from "../../components/Input"

function Dbs_Header() {
    return (
        <header>
            <Input placeholder="search databases" icon={<IconDatabaseSearch size={"1.1rem"} stroke={"2px"} />} />
            <Button size="sm" className="text-[13px] py-1" onClick={()=>{}}>create<IconDatabasePlus size={"1.1rem"} /></Button>
        </header>
    )
}
export default Dbs_Header