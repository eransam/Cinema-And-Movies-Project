import { SyntheticEvent } from "react";
import MovieModel from "../../../Models/MovieModel";
import moviesService from "../../../Services/MoviesService";
import "./MovieCard.css";

//פה אנו יוצרים קומפוננת פרופס שזאת אומרת שהיא יכולה לקבל ערכים מבחוץ עם זימון הקומפוננטה
//MovieModel מסוג  movie עם פרופרטי  MovieCardProps פה אנו מייצרים את האינטרפייס בשם 
//void מסוג פונ' חץ המקבלת פרמטר מסוג מספר ומחזירה  deleteMovie ופרופרטי 
interface MovieCardProps {
    movie: MovieModel;
    deleteMovie: (movieId: number) => void; // (movieId: number) => void  --> is a function type getting a number, returning void
}

//MovieCardProps פה אנו יוצרים פונ' אשר מקבל כפרמטר משתנה מסוג אינטרפייס
function MovieCard(props: MovieCardProps): JSX.Element {

    //פה אנו יוצרים פונ' אשר מקבלת כפרמטר משתנה מסוג סטרינג
    function formatDateTime(dateTime: string): string {
        //new Date מכניסה אותו לתבנית
        const d = new Date(dateTime);
        //ולאחר מכן מחזירה אותו מסטרינג
        return d.toLocaleString();
    }

    // // First way (for table display) 
    // async function deleteMovie(movieId: number) {
    //     alert(movieId);
    // }

    // // Second way (for cards):
    // async function deleteMovie() {
    //     try {
    //         await moviesService.deleteMovie(props.movie.movieId);
    //         alert("Movie has been deleted");
    //     }
    //     catch (err: any) {
    //         alert(err.message);
    //     }
    // }

    return (
        <div className="MovieCard">

            {/* First way (for table display) */}
            {/* לא יכול לקבל לתוכו פונ' ישירות עם פרמטר אז לשם כך אנו יוצרים פונ' חץ onClick */}
            {/* שבתוכה אנו שמים את הפונ' עם הפרמטר שאנו רוצים לזמן */}
            {/* <button className="delete" onClick={() => { deleteMovie(props.movie.movieId) }}>❌</button> */}

            {/* Second way (for cards) */}
            {/*אנו מזמנים את הפונ' לתוכו onClick פה אנו יוצרים כפתור וב */}
            {/* <button className="delete" onClick={deleteMovie}>❌</button> */}

            {/* Third way (delete logic is in our parent component) */}
            {/*אנו קוראים לפונ' חץ שיצרנו אשר בתוכה אנו מזמנים את  onClick אנו יוצרים כפתור שבאיוונט   */}
            {/* בפונ' הראשית שלנו וכפרמטר אליה אנו מכניסים את  props.deleteMovie הפונ' אשר הוכנסה כערך לפרופרטי  */}
            {/*props: MovieCardProps ערך האיידי שהוכנס מהלקוח אל פרמטר ה  */}
            <button className="delete" onClick={() => props.deleteMovie(props.movie.movieId)}>❌</button>

            <span>Name: {props.movie.movieName}</span>
            <br />
            <span>Time: {formatDateTime(props.movie.movieTime)}</span>
            <br />
            <span>Duration: {props.movie.duration} minutes</span>
            <br />
            <span>Cinema: {props.movie.cinemaName}</span>

        </div>
    );
}

export default MovieCard;
