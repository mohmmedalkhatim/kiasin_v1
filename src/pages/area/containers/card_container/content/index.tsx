import { JSX } from "react"


let cards = new Map<string, JSX.Element>(
    [
        ["areas", <div>Card 1</div>],
        ["value", <div>Card 2</div>],
        ["form", <div>Card 3</div>],
    ]
)

type contentProps = {
    card_type: "areas" | "value" | "form"
}

function Content({ card_type }: contentProps) {
    return (
        cards.get(card_type) || <div>No Content</div>
    )
}
export default Content