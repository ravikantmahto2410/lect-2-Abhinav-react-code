import React from "react";
import {useNavigate} from "react-router-dom";
//import wala dekhlena kaise hota hai samjh nhi aa rha tha meko
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";

import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
    document.title = "SCSDB | Trending ";
    const navigate = useNavigate();
    const [category, setcategory] = useState("all");
    const [duration, setduration] = useState("day");
    const [trending, settrending] = useState([]);
    const [page,setpage] = useState(1);
    const [hasMore,sethasMore] = useState(true);
    

    const GetTrending = async() => {
        try {
            const {data} = await axios.get(
                `/trending/${category}/${duration}?page=${page}`
            );           
            
            if(data.results.length > 0) {
                settrending((prevState) => [...prevState,...data.results] );
                setpage(page + 1);               
            } else {
                sethasMore(false);
            }
        } catch (error) {
            console.log("Error: ",error)
        }
    };
    console.log(trending);

    const refreshHandler = () => {
        if(trending.length === 0) {
            GetTrending();

        } else {
            setpage(1);
            settrending([]);
            GetTrending();
        }
    };
    useEffect(() => {
        refreshHandler();
    }, [category,duration]);

    return trending.length > 0 ? (
        <div className=" w-screen h-screen ">
            <div className="px-[5%]w-full flex items-center justify-between">
                <h1 className="text-2xl font-semifold text-zinc-400">
                    <i
                        onClick={()=>navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{""}
                    Trending
                </h1>
                <div className="flex items-center w-[80%]">
                    <Topnav/>
                    <Dropdown
                        title="Category"
                        options={["movie","tv","all"]}
                        func={(e) => setcategory(e.target.value)}
                    />
                    <div className="w-[2%]"></div>
                    <Dropdown
                        title="Duration"
                        options={["movie","tv","all"]}
                        func={(e) => setduration(e.target.value)}
                    />
                </div>
            </div>

            <InfiniteScroll
                dataLength={trending.length}
                next={GetTrending}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                    <Cards data={trending} title={category}/>
            </InfiniteScroll>
            
        </div>
    ) : (
        <Loading/>
    );
};

export default Trending
