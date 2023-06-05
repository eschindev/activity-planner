import React, { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
// import SchedulePage from "./pages/MyProfilePage";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpPage from "./pages/SignUpPage";
import CreateActivityPage from "./pages/CreateActivityPage";
import ActivityPage from "./pages/ActivityPage";
import Header from "./components/Header";
import SearchResultPage from "./pages/SearchResultPage";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          {/* <Header /> */}
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="container">
            <Routes>
              {/* <Route path="/" element={<MyProfilePage />} /> */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              {/* <Route path="/schedule" element={<MyProfilePage />} /> */}
              <Route path="/create-activity" element={<CreateActivityPage />} />
              <Route path="/activity/:id" element={<ActivityPage />} />
              <Route
                path="/search/:searchType/:searchTerm"
                element={<SearchResultPage />}
              />
            </Routes>
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
