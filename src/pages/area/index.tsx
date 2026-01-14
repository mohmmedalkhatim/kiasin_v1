import Header from "./components/header"
import CardContainer from "./containers/card_container"
import MainGrid from "./containers/main_gird"
import "./index.css"
function Area() {
  return (
    <div className="area_container">
      <Header/>
      <MainGrid>
        <CardContainer columns={2} rows={1}>hello</CardContainer>
        <CardContainer columns={2} rows={1}>dude</CardContainer>
        <CardContainer columns={2} rows={1}></CardContainer>
        <CardContainer columns={2} rows={1}></CardContainer>
        <CardContainer columns={2} rows={1}></CardContainer>
      </MainGrid>
    </div>
  )
}
export default Area