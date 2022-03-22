import { SyntheticEvent, useEffect, useState } from "react";
import CinemaModel from "../../../Models/CinemaModel";
import MovieModel from "../../../Models/MovieModel";
import moviesService from "../../../Services/MoviesService";
import MovieCard from "../MovieCard/MovieCard";
import "./Movies.css";

function Movies(): JSX.Element {

    const [cinemas, setCinemas] = useState<CinemaModel[]>([]);
    const [movies, setMovies] = useState<MovieModel[]>([]);

    //מתרנדר רק פעם אחת useEffect
    useEffect(() => {
        //מקבלים את כל המערך של בתי הקולנוע
        moviesService.getAllCinemas()
            //Cinemas מכניסים את המערך שקיבלנו לתוך המשתנה 
            .then(cinemas => setCinemas(cinemas))
            //במידה ויש שגיאה אנו נחזיר אותה באלרט
            .catch(err => alert(err.message));
    //תלות ברינדור []       
    }, []);

    //args: SyntheticEvent פה אנו יוצרים פונ' מסוג 
    async function handleChange(args: SyntheticEvent) {
        try {
            //לתוך המשתנה שיצרנו args.target פה אנו מכניסים את הערך שנמצא ב
            //הסימון פלוס הופך את הערך למספר
            const cinemaId = +(args.target as HTMLSelectElement).value;
            //getMoviesByCinema לאחר מכן אנו לוקחים את המשתנה שלנו שמכיל את האיידי ושמים אותו בתור פרמטר לפונ' ה
            const movies = await moviesService.getMoviesByCinema(cinemaId);
            //לאחר מכן אנו לוקחים את השתנה שמכיל את מערך הסרטים לפי בית קולנוע שקיבלנו ומכניסים אותו לתוך 
            //Movies המשתנה 
            setMovies(movies);
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    //פונ' מחיקת סרט
    //מקבלת כפרמטר איידי של סרט
    async function deleteMovie(movieId: number) {
        try {
            //וכפרמטר מכניסים לה את האידי שהוכנס בפונ' הראשית deleteMovie מזמנים את פונ' ה
            await moviesService.deleteMovie(movieId);
            alert("Movie has been deleted");
            //יוצרים משתנה חדש ומשכפלים אליו את מערך הסרטים וזאת בשביל שיוכל להתרנדר ולהות עדכני עם השינויים
            //והמחיקות מכיוון שמערך אשר יש לו את אותו שם לא התרנדר לפעמים גם עם בוצעו בתוכו שינויים
            const newMovies = [...movies];
            //findIndex פה אנו יוצרים משתנה ובתוכו אנו שמים את מערך הסרטים ורצים על המערך עם פונ' ה
            //שהיא מחזירה לנו את האינדקס של האובייקט שהאיידי שלו שווה לאיידי שהוכנס בפונ' הראשית
            const indexToDelete = newMovies.findIndex(m => m.movieId === movieId);
            //כך לאחר שמצאנו את האינדקס אנו מוחקים את האובייקט מהמערך
            newMovies.splice(indexToDelete, 1);
            //Movies לאחר מכן אנו מכניסים את המערך העדכני לתוך המשתנה 
            setMovies(newMovies);
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="Movies">
            {/**handleChange בקומפוננטה זו אנו מחזירים תיבת סלקט אשר בכל שינוי בתוכה תפעיל את פונ' ה*/}
            {/**ומלקטת מישם את הערך args: SyntheticEvent מקבלת מידע מהפעולה הזו בעזרת  handleChange פונ' ה*/}
            {/**רק את movies הנבחר בתיבת הסלקט ולאחר מכן הוא מבצע פעולות כדי להכניס למשתנה  cinemaId של ה*/}
            {/**הסרטים מבית הקולנוע הניבחר מתיבת הסלקט*/}
            <select defaultValue="" onChange={handleChange}>
                <option disabled value="">Select Cinema</option>
                {cinemas.map(c => <option key={c.cinemaId} value={c.cinemaId}>{c.cinemaName}</option>)}
            </select>

            <br />
            {/*map ומכילים עליו את פונ' ה movies פה אנו יוצרים דיב אשר בתוכו אנו שמים את משתנה ה */}
            {/*כשהיא מקבלת את הערכים MovieCard אשר על כל אובייקט במערך אנו מכילים את קומפוננטת הפרופס */}
            {/*של האובייקט בערכי הפרופס */}
            <div className="container">
                {movies.map(m => <MovieCard key={m.movieId} movie={m} deleteMovie={deleteMovie} />)}
            </div>

        </div>
    );
}

export default Movies;
