import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Fragment } from 'react'
import {publicRouters} from './routes'
import { DefaultLayout } from './component/Layout'
function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
             {publicRouters.map((route, index)=>{
              let Layout= DefaultLayout
              if(route.layout)
              {
                Layout=route.layout
              }
              else if(route.layout===null)
              {
                Layout=Fragment
              }
              const Page=route.component
              return <Route key={index} path={route.path} element={
                <Layout>
                  <Page/>
                </Layout>
                
              } />
             })}
        </Routes>

      </div>
    </Router>
  )
}

export default App
