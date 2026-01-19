function ColumnHead({name}:{name:string}) {
  return (
    <input className="pl-4 cell rounded-none focus:outline-none" value={name}></input>
  )
}
export default ColumnHead