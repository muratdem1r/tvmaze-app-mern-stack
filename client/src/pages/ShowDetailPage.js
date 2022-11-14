import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Components
import ShowDetail from "../components/Shows/ShowDetail";

const ShowDetailPage = () => {
  const params = useParams();
  const [show, setShow] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getShow = async () => {
      const query = "https://api.tvmaze.com/shows/" + params.id;
      try {
        const response = await axios.get(query);
        setShow(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getShow();
  }, []);

  return <ShowDetail show={show} key={show.id} />;
};

export default ShowDetailPage;
