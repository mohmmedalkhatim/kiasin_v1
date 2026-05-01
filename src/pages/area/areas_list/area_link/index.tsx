import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { AppDispatch, RootState } from "../../../../contexts/store"
import { list as List } from "../../../../contexts/area/functions/list"

type Props = {
    id: number
}

function AreaLink({ id }: Props) {
  let dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(List())
  }, [])

  let area = useSelector((state: RootState) => state.area.list).find(item=>item.id == id)
    return (
        <Link to={`/area/${id}`} viewTransition className="area_link  border-border-main ">
            <div>
            </div>
            <div className="w-full border-t border-border-main p-3">
                {area?.name}
            </div>
        </Link>
    )
}
export default AreaLink