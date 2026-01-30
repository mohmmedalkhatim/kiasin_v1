import AreasLinkList from "../../cards/area_link_list"


function CardContent({ id,type }: { id:number,type: string }) {
    let cards = new Map()
    cards.set("form", <div>form</div>)
    cards.set("areas_links", <AreasLinkList id={id}/>)
    cards.set("value", <div>value</div>)
    cards.set("chart", <div>chart</div>)
    cards.set("db", <div>database</div>)
    return (
        <div>{cards.get(type)}</div>
    )
}
export default CardContent