
import './App.css'
import UserForm from './components/UserForm'
import DashboardWrapper from "./components/dashboardwrapper/DashboardWrapper"
import Pages from './Pages'

function App() {

  return (
    <>
      <DashboardWrapper>
        <Pages/>
      </DashboardWrapper>
    </>
  )
}

export default App
