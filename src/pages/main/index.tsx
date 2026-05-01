import { useDispatch, useSelector } from "react-redux"
import AreasList from "../area/areas_list"
import { useEffect } from "react"
import { list } from "../../contexts/area/functions/list"
import { AppDispatch, RootState } from "../../contexts/store"
import { Button } from "@headlessui/react"
import { create_area_async_function } from "../../contexts/area/functions/create"
import Header from "../../components/header"

function MainPage() {
    let dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(list())
    }, [])

    let areas_list = useSelector((state: RootState) => state.area.list).map(item=>item.id)
    return (
        <div>
            <Header  >
                <div>Areas</div>
                <Button onClick={() => dispatch(create_area_async_function())}>create</Button>
            </Header>
            <AreasList list={areas_list}/>
        </div>
    )
}
export default MainPage