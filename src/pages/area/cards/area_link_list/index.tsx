import { useSelector } from "react-redux"
import { RootState } from "../../../../contexts/store"

function AreasLinkList({ id }: { id: number }) {
    let card = useSelector((root: RootState) => root.area.active.area.structure.cards)[id]

    if (card.type) {
        return (
            <div>
                {card.type}
            </div>
        )
    }
}
export default AreasLinkList