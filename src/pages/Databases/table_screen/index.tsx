import Database from "./Database"

function TableScreen({active}:{active:string}) {
  return (
    <div className="w-8/10 px-4 mt-[4rem]">
         <Database name={active}/>
    </div>
  )
}
export default TableScreen