import "./Home.css";
//אנו מייבאים את התמונה מהמיקום שלה 
import imageSource from "../../../Assets/Images/movies.jpg";

function Home(): JSX.Element {
    return (
        <div className="Home">
            {/*וכך אנו מציגים אותה בקומפוננטה*/}
			<img src={imageSource} />
        </div>
    );
    
}

export default Home;
