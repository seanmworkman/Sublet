import React, { Component } from 'react';
import { useQuery } from "@apollo/react-hooks";
import './App.css';
import { GET_USERS } from './graphql/queries.js';
import ApolloClient from "apollo-boost";
import Landing from './views/Landing';


class App extends Component {

  render() {
    return (
      <div > 
        <Landing />
      </div>
    );
  }
}


// const User = ({ user: { login, avatar_url } }) => (
//   <div className="Card">
//     <div>
//       <img alt="avatar" className="Card--avatar" src={avatar_url} />
//       <h1 className="Card--name">{login}</h1>
//     </div>
//     <a href={`https://github.com/${login}`} className="Card--link">
//       See profile
//     </a>
//   </div>
// )

// function App() {
//   // const { loading, error, data } = useQuery(GET_USERS)
//   let data = getUsers()
//   console.log(data)

//   // if (error) return <h1>Something went wrong!</h1>
//   // if (loading) return <h1>Loading...</h1>

//   return (
//     <main className="App">
//       <h1>Github | Users</h1>
      // {data.users.map(user => (
      //   <User key={user.id} user={user} />
      // ))}
//     </main>
//   )
// }

export default App
