import { useState } from "react";
//localStorage.clear();
const PictureCard = (props) => {
  // tracks is the cursor  in object
  const [isHovering, setIsHovering] = useState(false);
  // tracks is the photo favourited
  const [isFavorited, setIsFavorited] = useState(
    props.favPhotos.includes(props.photoID)
  );

  const [btnText, setBtnText] = useState(
    isFavorited ? "favourited" : "favourite"
  );

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  // changes favorite status
  const handleFavorite = () => {
    const tempValue = !isFavorited;
    setIsFavorited(tempValue);
    if (tempValue) {
      setBtnText("favorited");
      props.favPhotos.push(props.photoID);
      // save the photo as favorited and save it in local storage
      localStorage.setItem("favoritedPhotos", JSON.stringify(props.favPhotos));
    } else {
      const index = props.favPhotos.indexOf(props.photoID);
      // remove the photo from favorites
      if (index > -1) {
        props.favPhotos.splice(index, 1);
      }
      // save the new favorited photo array to lacal storage
      localStorage.setItem("favoritedPhotos", JSON.stringify(props.favPhotos));
      setBtnText("favorite");
    }
  };
  return (
    <div
      className="PictureCard"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <img src={props.imagesrc} />
      {
        /*displays overlay when hovering on a photo*/
        isHovering && (
          <div className="favorite" id={props.photoID}>
            <p>
              <b>{props.photoName}</b>
            </p>
            <hr></hr>
            <p>{props.photoAuthor}</p>
            <button
              className={isFavorited ? "favoritedBtn" : "notFavoritedBtn"}
              id={props.photoID}
              onClick={() => handleFavorite()}
            >
              {btnText}
            </button>
          </div>
        )
      }
    </div>
  );
};
export default PictureCard;
