import React from 'react'
import Header from '../components/Header'
import Specialitymenu from '../components/Specialitymenu'
import Topdoctor from '../components/Topdoctor'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
              <Header></Header>
              <Specialitymenu></Specialitymenu>
              <Topdoctor></Topdoctor>
              <Banner></Banner>
    </div>
  )
}

export default Home
