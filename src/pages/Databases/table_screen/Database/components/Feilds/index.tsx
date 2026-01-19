import ColumnHead from "../ColumnHead"

function Fields({ list }: { list: string[] }) {
  return (
    <div className="flex items-center border border-[#e2e2e220] rounded-t-md">
      {list.map(name => (<ColumnHead name={name}/>))}
    </div>
  )
}
export default Fields