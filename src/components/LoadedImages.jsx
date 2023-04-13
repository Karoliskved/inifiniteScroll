import PictureCard from "./PictureCard";

//sets favourited photos as an empty array if localstorage is empty
if (!localStorage.getItem("favoritedPhotos")) {
  localStorage.setItem("favoritedPhotos", JSON.stringify([]));
}
// gets favourited photos from local storage
let favoritedPhotos = JSON.parse(localStorage.getItem("favoritedPhotos"));

// component LoadedImages is grid which stores PictureCards
const LoadedImages = (props) => {
  //for each array element creates a PictureCard element
  return (
    <div className="imageGrid">
      {props.pictureData.map((pictureData, key) => (
        <PictureCard
          imagesrc={pictureData}
          photoName={props.pictureNames[key]}
          photoAuthor={props.pictureAuthors[key]}
          photoID={props.pictureIDs[key]}
          favPhotos={favoritedPhotos}
        ></PictureCard>
      ))}
    </div>
  );
};
export default LoadedImages;
