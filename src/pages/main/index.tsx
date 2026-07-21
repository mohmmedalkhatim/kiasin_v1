import { useDispatch } from "react-redux"
import AreasList from "../area/areas_list"
import { useEffect, useState } from "react"
import { Button } from "@headlessui/react"
import { create_area_async_function } from "../../contexts/area/functions/create"
import Header from "../../components/header"
import { AppDispatch } from "../../contexts/store"

function MainPage() {

    let dispatch = useDispatch<AppDispatch>()

    return (
        <div>
            <Header  >
                <div>Areas</div>
                <Button onClick={() => dispatch(create_area_async_function())}>create</Button>
            </Header>
            <AreasList />
        </div>
    )
}
export default MainPage