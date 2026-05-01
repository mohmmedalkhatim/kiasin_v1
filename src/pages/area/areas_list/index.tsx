import AreaLink from "./area_link"
import "./index.css"

function AreasList({ list }: { list: number[] }) {

  return (
    <>
      <div className="p-4 pt-22">
        <div className="area_list">
          {list.map(area_id => <AreaLink id={area_id} />)}
        </div>
      </div>
    </>
  )
}
export default AreasList