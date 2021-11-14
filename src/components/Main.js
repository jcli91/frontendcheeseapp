import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from '../pages/Index'
import Show from '../pages/Show'

const Main = (props) => {

    // state to hold our list of people
    const [cheeses, setCheeses] = useState(null);

    // your deployed heroku url
    const URL = "https://jl-cheese-app-backend.herokuapp.com/cheese/"

    // function to get updated list of people
    const getCheeses = async () => {
        // make the api call
        const response = await fetch(URL)
        // turn the response into an object
        const data = await response.json()
        // set the state to the api data
        setCheeses(data)
    }

    // function that will later be passed data from our new/create form and make the post
    // request to make a new person

    const createCheeses = async (cheese) => {
        // make the post request to our API
        await fetch(URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cheese)
        })
        // get the updated list of people
        getCheeses()
    }

    // function to update a person
    const updateCheeses = async (cheese, id) => {
        // make the put request
        await fetch(URL + id, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cheese)
        })
        // update the list of people
        getCheeses()
    }
    // function to delete person
    const deleteCheeses = async (id) => {
        // make the delete request
        await fetch(URL + id, {
            method: "delete"
        })
        // update the list of people
        getCheeses()

    }
    // a useEffect to make a call to getPeople when page loads
    useEffect(() => {
        getCheeses()
    }, [])

    return (
        <main>
          <Routes>
            <Route path="/" element={
            <Index cheeses={cheeses} createCheeses={createCheeses}/>
            } />
            <Route path="/cheese/:id" element={
            <Show cheeses={cheeses} updateCheeses={updateCheeses} deleteCheeses={deleteCheeses}/>} 
            />
          </Routes>
        </main>
      );
    }
export default Main