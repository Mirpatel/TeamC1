import MovieCard from "./MovieCard";
import "./style/layout.css";
const Layout = props  => {
    return (
      <>
      <ul className="movieList">
    
        {props.items?.map(place => (
          <>
            <MovieCard className = "movieObj"
              // key={place._id}
              title={place.title}
              imageUrl={place.Url}
              description={place.description}
              rating = {place.rating} 
              trailer = {place.trailer}
              genre = {place.genre}
              movierating = {place.movierating}
              
              />
              
      
          </>
        ))}
      </ul>
      </>
    );
  }
  
  export default Layout;