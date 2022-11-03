import { CircularProgress, Grid, Typography, Button } from "@mui/material";
import "./App.css";

import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState([]);
  const [consumersArray, setConsumersArray] = useState([]);
  const [filter, setFilter] = useState("");

  const getData = () => {
    fetch("building-location.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setData(myJson);

        myJson.locations.forEach(function (element) {
          //console.log(element);
          element.consumers.forEach(function (con) {
            //console.log(consumer);
            setConsumersArray((consumersArray) => [...consumersArray, con]);
            setDisplay((display) => [...display, con]);
          });
        });
      });
  };

  const Filter = (e) => {
    e.preventDefault();

    switch (filter) {
      default:
        break;
      case "All":
        setDisplay(consumersArray);
        break;
      case "Mobile":
        let filteredConsumers = consumersArray.filter((element) => {
          return element.isPhoneMobile;
        });
        setDisplay(filteredConsumers);
        break;
    }
  };

  console.log(display);

  // console.log(display);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app">
      <Grid container className="appGrid" direction="column">
        <Grid item className="header">
          <Typography variant="h3" className="pageTitle">
            Consumers
          </Typography>
        </Grid>
        <Grid item className="mainSection">
          {!display && <CircularProgress className="loader" />}
          {display && (
            <div>
              <div className="filterButtonContainer">
                <Grid container direction="row" justifyContent="flex-end">
                  <Grid item>
                    <select
                      name="options"
                      id="options"
                      className="select"
                      onChange={(e) => setFilter(e.target.value)}
                      value={filter}
                    >
                      <option value="All">All</option>
                      <option value="Mobile">Mobile Phone</option>
                    </select>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      type="submit"
                      value="Filter"
                      className="filterSubmitButton"
                      onClick={Filter}
                    >
                      Filter
                    </Button>
                  </Grid>
                </Grid>
              </div>
              <div className="resultsContainer">
                <div className="totalCount">
                  <Typography variant="subtitle1">
                    Total Results: {display.length}
                  </Typography>
                </div>
                <div className="results">
                  <Grid container spacing={3} justifyContent="center">
                    {display.map((element) => {
                      let consumerDisplay = (
                        <Grid container className="cardContainer">
                          <Grid item xs={6}>
                            <Typography variant="h6" className="title">
                              Name:
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1" className="value">
                              {element.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="h6" className="title">
                              Email:
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1" className="value">
                              {element.email}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="h6" className="title">
                              Phone:
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1" className="value">
                              {element.phoneNumber}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="h6" className="title">
                              Occupation Date:
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1" className="value">
                              {new Date(element.occupationDate).toDateString()}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                      return (
                        <Grid
                          item
                          sm={6}
                          xs={12}
                          key={element.consumerId}
                          className="eventsGridItem"
                        >
                          {consumerDisplay}
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
              </div>
            </div>
          )}
        </Grid>
        <Grid item className="footer"></Grid>
      </Grid>
    </div>
  );
}

export default App;
