import { useSelector } from "react-redux"
import { RootState } from "../../../../contexts/store"
import { IconLayersIntersect } from "@tabler/icons-react"
import AreasList from "../../areas_list"


function AreasLinkList({ id }: { id: number }) {
    let card = useSelector((root: RootState) => root.area.active.area.structure.cards)[id]


    if (card.type) {
        return (
            <div className="relative">
                <header className="flex w-full border-b border-b-gray-300/20 pb-2 ">
                    <div className="flex w-full px-4 pb-1   justify-between">
                        <div>areas</div>
                        <div><IconLayersIntersect /></div>
                    </div>
                </header>
                <div className="">
                    <AreasList list={card.store.list || []} />
                </div>
            </div>
        )
    }
}
export default AreasLinkList