import { useSelector } from "react-redux"
import Database from "./Database"
import { RootState } from "../../../contexts/store"

function TableScreen() {
  let {tableName} = useSelector((state:RootState)=>state.database.active)
  return (
    <div className="pl-4 pr-11.75 my-18">
         <Database name={tableName}/>
    </div>
  )
}
export default TableScreen