import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router'

// Countries Entity
import CountryFinder from '../pages/CountryFinder' // GET /finder
// GET /finder/continents /finder/countries /finder/languages /finder/continents-languages
import CountryHub from '../pages/CountryHub' // GET /country/:name

// Users Entity
import Dashboard from '../pages/Dashboard' // GET /..
import SignInForm from '../pages/SignInForm' // GET user/login
import UserPanel from '../pages/UserPanel' // GET user/id/:id

import SignUpForm from '../pages/SignUpForm' // POST user/register
import UserEditPanel from '../pages/UserEditPanel' // PUT user/edit
import Layout from '../layouts/Layout'


const RouterDom = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Countries */}
        <Route path='/finder' element={<CountryFinder />} />
        {/*
        <Route path='/finder/continents' element={<CountryFinder />} />
        <Route path='/finder/countries' element={<CountryFinder />} />
        <Route path='/finder/languages' element={<CountryFinder />} />
        <Route path='/finder/continents-languages' element={<CountryFinder />} />
        */}
        <Route path='/countries/:id' element={<CountryHub />} />

        {/* Users */}
        <Route path='/' element={<Dashboard />} />
        <Route path='/user/login' element={<SignInForm />} />
        <Route path='/user/register' element={<SignUpForm />} />
        <Route path='/user/id/:id' element={<UserPanel />} />
        <Route path='/user/edit/:id' element={<UserEditPanel />} />
      </Route>
    </Routes>
  )
}

export default RouterDom