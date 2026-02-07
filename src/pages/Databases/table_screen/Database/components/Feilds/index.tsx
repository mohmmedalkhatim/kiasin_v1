import ColumnHead from "../ColumnHead"

function Fields({ list }: { list: string[] }) {
  return (
    <div className="grid items-center rounded-t-md border-b-2 border-border-main" style={{gridTemplateColumns:`repeat(${list.length},minmax(0,1fr))`}}>
      {list.map(name => (<ColumnHead key={name} name={name}/>))}
    </div>
  )
}
export default Fields