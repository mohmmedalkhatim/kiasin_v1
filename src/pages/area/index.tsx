import Header from "./components/header"
import CardContainer from "./containers/card_container"
import Content from "./containers/card_container/content"
import MainGrid from "./containers/main_gird"
import "./index.css"
function Area() {
  return (
    <div className="area_container">
      <Header />
      <MainGrid>
        <CardContainer columns={2} rows={1}>
          <Content card_type="areas" />
        </CardContainer>
      </MainGrid>
    </div>
  )
}
export default Area