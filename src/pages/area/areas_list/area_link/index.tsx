import { Link } from "react-router-dom"

type Props = {
    name: string,
    id: number
}

function AreaLink({name,id }: Props) {
    return (
        <Link to={`/area/${id}`} className="area_link  border-border-main ">
            <div>
            </div>
            <div className="w-full border-t border-border-main p-3">
                {name}
            </div>
        </Link>
    )
}
export default AreaLink