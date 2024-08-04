import{useEffect,useState} from "react";
import sidenav from"./partials/sidenav";
import Topnav from"./partials/Topnav";
import axios from "../utils/axios";

const Home = () => {
    document.title="WebApp | Homepage";
    const [wallpaper,setwallpaper] = usestate(null);
    const [trending, settrending] = useState(null);
    useState [category,setCategory] = useState("all")

    const GetHeaderwallpaper = async() => {
        try {
            const {data} = await axios.get(`/trending/all/day`);           
            let randomdata = data.results[(Math.random()*data.results.length).toFixed()];
            setwallpaper(randomdata);
        } catch (error) {
            console.log("Error: ",error)
        }
    };
    
    const GetTrending = async() => {
        try {
            const {data} = await axios.get(`/trending/${category}/day`);           
            
            settrending(data.results);
        } catch (error) {
            console.log("Error: ",error)
        }
    };
    
    useEffect(() => {
        GetTrending();
        !wallpaper && GetHeaderwallpaper();      
    },[category])


    return wallpaper && trending ?(
        <>
            <sidenav/>
            <div className="w-[80%] h-ful overflow-auto overflow-x-hidden">
                <Topnav/>
                <Header data={wallpaper}/>

                <div className="flex justify-between p-5">
                    <h1 className="text-3xl font-semibold text-zinc-400">
                        Trending
                    </h1>
                    <Dropdown title="filter" 
                        options={["tv","movie", "all"]}
                        func={(e) => setCategory(e.target.value)}

                    />

                </div>
                <HorizontalCards data={trending}/>
            </div>
        </> 
    ) : (
        <Loading/>
    );
};

export default Home;
