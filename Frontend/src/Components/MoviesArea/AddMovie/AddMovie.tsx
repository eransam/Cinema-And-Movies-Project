import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CinemaModel from "../../../Models/CinemaModel";
import MovieModel from "../../../Models/MovieModel";
import moviesService from "../../../Services/MoviesService";
import "./AddMovie.css";

function AddMovie(): JSX.Element {

    const [cinemas, setCinemas] = useState<CinemaModel[]>([]);

    const { register, handleSubmit, formState } = useForm<MovieModel>()

    const navigate = useNavigate();
    //useEffect מתרנדר פעם אחת
    useEffect(() => {
        
        // ואז את הערך שפונ' זו מחזירה אנו getAllCinemasפה אנו מזמנים את פונ' ה 
        //Cinemas שמים בתוך המשתנה
        moviesService.getAllCinemas()
            .then(cinemas => setCinemas(cinemas))
            .catch(err => alert(err.message));
    }, []);

    //של הפורם הנכתב מטה onSubmit פונקציה אשר תיקרא בפעולת ה
    async function submit(movie: MovieModel): Promise<void> {
        try {
            const addedMovie = await moviesService.addMovie(movie);
            alert("Movie added! ID: " + addedMovie.movieId);
            navigate("/movies");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="AddMovie">
            {/**שבתוך הפורם אנו מפעילים את הפונ' שבתוך  ADD כאשר אנו לוחצים על כפתור ה */}
            {/** פונ' ישירות אנו משתמשים בפונ' המובנת onSubmitומכיוון שאיאפשר לשים בתוך ה onSubmit ה  */}
            {/**onSubmit ובתוכה אנו שמים את הפונ' שאנו רוצים שתופעל בעת  useform של סיפריית ה*/}
            {/**submit 'מקבלת כפרמטר את האובייקט הנוצר מהפורם ומבצעת על אובייקט זה את הפעולות שנכתבו בתוך הפונ submit פונ */}
            <form onSubmit={handleSubmit(submit)}>
                {/**יוצרים כותרת לאלמנט */}
                <label>Cinema: </label>
                {/** יוצרים תיבת סלקט שהערך ההתחלתי שלה לא שווה כלום*/}
                {/**אומרת בעצם שאת הערך הנבחר באלמנט הסלקט שלנו אנו ...register שורת ה  */}
                {/**באובייקט שיווצר בשליחת הפורם "cinemaId" נכניס בתור ערך לפרופרטי הנקרא   */}
                <select defaultValue="" {...register("cinemaId", { required: { value: true, message: "Missing cinema" } })}>
                   {/**אשר הערך שלה לא שווה כלום Select Cinema אופציה ראשונה בסלקט היא כותרת  */}
                    <option disabled value="">Select Cinema</option>
                    {/**לאחר מכן אנו עושים פונ' מאפ על מערך בתי הקולנוע שלנו ולכל אובייקט במערך אנו   */}
                    {/**שלה הוא האיידי של האובייקט והערך שלה הוא האיידי של האובייקט key  מייצרים שורה בסלקט אשר ה */}
                    {/** והכותרת שלה הוא השם של האובייקט */}   
                    {cinemas.map(c => <option key={c.cinemaId} value={c.cinemaId}>{c.cinemaName}</option>)}
                </select>
                {/** במידה ויש שגיאה אנו נציג אותה פה  */}
                <span>{formState.errors?.cinemaId?.message}</span>

                {/**כותרת תיבת הטקסט */}
                <label>Name: </label>

                {/**movieName לתוך פרופרטי בשם  ...register תיבת טקסט שאת ערכה אנו נכניס בעזרת שורת ה */}
                {/**באובייקט אשר יווצר בעת שליחת הפורם */}
                <input type="text" {...register("movieName", { required: { value: true, message: "Missing name" } })} />
                <span>{formState.errors?.movieName?.message}</span>

                {/**כנ''ל  */}
                <label>Time: </label>
                <input type="datetime-local" {...register("movieTime", { required: { value: true, message: "Missing time" } })} />
                <span>{formState.errors?.movieTime?.message}</span>

                {/**כנ''ל */}
                <label>Duration: </label>
                <input type="number" min="20" max="500" {...register("duration", { required: { value: true, message: "Missing duration" } })} />
                <span>{formState.errors?.duration?.message}</span>

                {/**submit ברירת המחדל של כפתור בתוך פורם הוא  */}
                <button>Add</button>

            </form>

        </div>
    );
}

export default AddMovie;
