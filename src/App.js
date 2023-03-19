import "./App.css";
import image1 from "./assets/image-1.jpg";
import image2 from "./assets/image-2.jpg";
import image3 from "./assets/image-3.jpg";
import image4 from "./assets/image-4.jpg";
import image5 from "./assets/image-5.jpg";

import ImageSlider from "./componants/ImageSlider";

const slides = [
  { image: image1, title: "Beach" },
  { image: image2, title: "Boat" },
  { image: image3, title: "Forest" },
  { image: image4, title: "City" },
  { image: image5, title: "Italy" },
];
function App() {
  const containerStyles = {
    width: "500px",
    height: "300px",
    margin: "8rem auto",
  };
  return (
    <div className="App">
      <div style={containerStyles}>
        <ImageSlider slides={slides} parentWidth={500} />
      </div>
    </div>
  );
}

export default App;
