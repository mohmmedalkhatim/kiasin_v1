import { IconDatabasePlus, IconEdit, IconForms, IconGrid3x3 } from "@tabler/icons-react"
import { useSelector, useDispatch } from "react-redux"
import { areas } from "../../../contexts/area"
import { update } from "../../../contexts/area/functions/update"
import { RootState, AppDispatch } from "../../../contexts/store"
import Header from "../../../components/header"
import HeaderAction from "./action"

interface headerProps {
    setDense: (nextValue?: any) => void
}

function AreaHeader({ setDense }: headerProps) {
    let { area } = useSelector((state: RootState) => state.area.active)
    let dispatch = useDispatch<AppDispatch>()
    let name = useSelector((state: RootState) => state.area.active.area.name)
    return (<>
        <Header className="bg">
            <div>{name}</div>
            <div className="flex items-center gap-2">
                <HeaderAction className="flex flex-col items-center" onClick={() => dispatch(areas.actions.toggle_editing())}>
                    <IconEdit size={"1.5rem"} stroke={"1x"} />
                    <div className="text-xs">
                        edit
                    </div>
                </HeaderAction>
                <HeaderAction className="flex flex-col items-center" onClick={async () => {
                    setDense(!area.structure.dense)
                    await dispatch(update({ ...area, structure: { cards: area.structure.cards, dense: !area.structure.dense } }))
                    dispatch(areas.actions.update_active({ ...area, structure: { cards: area.structure.cards, dense: !area.structure.dense } }))
                }}>
                    <IconGrid3x3 size={"1.5rem"} stroke={"1x"} />
                    <div className=" text-xs font-normal">
                        auto fill
                    </div>
                </HeaderAction>
                <HeaderAction className="flex flex-col items-center" description="add a from" onClick={() => {

                }}>
                    <IconForms size={"1.5rem"} stroke={"1x"} />
                    <div className=" text-xs font-normal">
                        forms
                    </div>
                </HeaderAction>
                <HeaderAction className="flex flex-col items-center" description="link a database" onClick={() => { }}>
                    <IconDatabasePlus size={"1.5rem"} stroke={"1x"} />
                    <div className=" text-xs font-normal">
                        database
                    </div>
                </HeaderAction>
            </div>
        </Header>
        
    </>
    )
}
export default AreaHeader