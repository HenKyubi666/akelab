import React, { useEffect, useState } from "react";
import Loader from "./components/loader";
import Fibonacci from "./components/fibonacci";
import api from "./api";
import Movie from "./components/movie";
import NavBar from "./components/navBar";

const App = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const getListMovies = async () => {
    const response = await api.getMovies();
    if (response.ok) {
      setData(response.data);
    } else {
      alert(response.message);
    }
  };

  const searchGender = (gendersArray = [], genderToFound = []) => {
    let genderNames = [];
    for (let i = 0; i < genderToFound.length; i++) {
      const genderName = gendersArray.find(
        (gender) => gender?.id === genderToFound[i]
      );
      genderNames.push(genderName?.name);
    }
    return genderNames;
  };

  const formatText = (str) => {
    return str.length < 140
      ? str
      : `${str.substr(0, str.substr(0, 130).lastIndexOf(" "))}...`;
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2300);
    getListMovies();
  }, []);

  return (
    <div>
      {/* <Fibonacci /> */}
      {loading && data !== undefined ? (
        <Loader />
      ) : (
        <div id="movies">
          {!data || <NavBar data={data} />}
          <div className="px-3">
            <div className="dashboard-movies ps-1 pe-3">
              <div>
                <div className="row">
                  {data?.results?.length > 0 &&
                    data?.results?.map((dataMovie, key) => (
                      <Movie
                        title={dataMovie?.title}
                        imgURL={`${data.images_url}${dataMovie?.poster_path}`}
                        imgAlt={`${dataMovie?.title} poster`}
                        description={formatText(dataMovie?.overview)}
                        vote_average={dataMovie?.vote_average}
                        gender={searchGender(
                          data?.genres,
                          data?.results[key]?.genre_ids
                        )}
                        release_date={dataMovie?.release_date}
                        key={key}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
