import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../contexts/store"
import { useEffect } from "react"
import { list as List } from "../../../contexts/area/functions/list"
import AreaLink from "./area_link"
import "./index.css"
import Header from "../../../components/header"
import Button from "../../../components/Button"
import { create_area_async_function } from "../../../contexts/area/functions/create"

function AreasList() {
  let dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(List())
  }, [])

  let list = useSelector((state: RootState) => state.area.list)

  return (
    <>
      <Header>
        <div>Areas</div>
        <Button onClick={()=>dispatch(create_area_async_function())}>create</Button>
      </Header>
      <main className="p-4 pt-22">
        <div className="area_list">
          {list.map(area => <AreaLink id={area.id} name={area.name} />)}
        </div>
      </main>
    </>
  )
}
export default AreasList