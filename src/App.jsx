import { useState, useEffect } from "react";
import "./App.css";
import LoadedImages from "./components/LoadedImages";

const App = () => {
  const [links, setLinks] = useState([]);
  const [photoNames, setPhotoNames] = useState([]);
  const [photoAuthors, setPhotoAuthors] = useState([]);
  const [photoIDs, setPhotoIDs] = useState([]);
  //tracks which page to get from pexels
  const [newPage, setNewPage] = useState(1);
  // tracks if data has been requested from pexels
  const [isLoading, setIsLoading] = useState(false);
  // calls the pexel api to get photos

  const getInfo = async () => {
    const response = await fetch(
      `https://api.pexels.com/v1/search/?page=${newPage}&per_page=9&query=puppies`,
      {
        mode: "cors",
        headers: {
          Authorization:
            "URfscwSjuldrfBd7VXe3CHR0HxE9k9N3c7NX9TRAcBQsmu5E3QgMkMdX",
        },
      }
    );
    const pictureData = await response.json();
    setNewPage(newPage + 1);
    setIsLoading(false);
    console.log("test");
    return new Promise((resolve) => {
      resolve(pictureData);
    });
  };

  //checks if user has scrolled to the bottom and if data was already requested from pexels
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 5 <
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    setIsLoading(true);
  };

  //update photos when isLoading is set to true
  useEffect(() => {
    if (isLoading) {
      updatePhotos();
    }
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // remove event listener when unmounting
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //adds photo data to arrays
  const updatePhotoArray = (data) => {
    let tempArrayLinks = [];
    let tempArrayName = [];
    let tempArrayAuthor = [];
    let tempArrayID = [];
    for (let i = 0; i < data.photos.length; i++) {
      tempArrayLinks.push(data.photos[i].src.medium);
      tempArrayName.push(data.photos[i].alt);
      tempArrayAuthor.push(data.photos[i].photographer);
      tempArrayID.push(data.photos[i].id);
    }
    setLinks(links.concat(tempArrayLinks));
    setPhotoNames(photoNames.concat(tempArrayName));
    setPhotoAuthors(photoAuthors.concat(tempArrayAuthor));
    setPhotoIDs(photoIDs.concat(tempArrayID));
    //  console.log(data);
  };
  const updatePhotos = async () => {
    updatePhotoArray(await getInfo());
    //console.log("done");
  };
  return (
    <div className="App">
      <LoadedImages
        pictureData={links}
        pictureNames={photoNames}
        pictureAuthors={photoAuthors}
        pictureIDs={photoIDs}
      ></LoadedImages>
    </div>
  );
};

export default App;
