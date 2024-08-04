import{Route,Routes} from "react-router-dom";
import Home from "./components/Home";
import Loading from "./components/Trending";

const App = () => {
    return( 
        <div classname=" bg-[#1F1E24] w-screen h-screen flex">

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/trending" element={<Trending/>}/>
                <Route path="/Popular" element={<Popular/>}/>
                <Route path="/movie" element={<Movie/>}/>
                <Route path="/tv" element={<Tvshows/>}/>
                <Route path="/person" element={<People/>}/>
            </Routes>
        
        
        </div>
    );
};

export default App;