import React from 'react'
// 01:14:05 see the how he did copy and paste  import

const TVShows = () => {
    document.title = "SCSDB | TV Shows ";
    const navigate = useNavigate();
    const [category, setcategory] = useState("airing _today");
    const [tv, settv] = useState([]);
    const [page,setpage] = useState(1);
    const [hasMore,sethasMore] = useState(true);

    const GetTv = async() => {
        try {
            const {data} = await axios.get(
                `/tv/${category}?page=${page}`
            );           
            
            if(data.results.length > 0) {
                settv((prevState) => [...prevState,...data.results] );
                setpage(page + 1);               
            } else {
                sethasMore(false);
            }
        } catch (error) {
            console.log("Error: ",error)
        }
    };
    console.log(tv);

    const refreshHandler = () => {
        if(tv.length === 0) {
            GetTv();

        } else {
            setpage(1);
            settv([]);
            GetTv();
        }
    };
    useEffect(() => {
        refreshHandler();
    }, [category]);
  return tv.length > 0 ? (
    <div className=" w-screen h-screen ">
        <div className="px-[5%]w-full flex items-center justify-between">
            <h1 className="text-2xl font-semifold text-zinc-400">
                <i
                    onClick={()=>navigate(-1)}
                    className="hover:text-[#6556CD] ri-arrow-left-line"
                ></i>{""}
               Tv Shows
               
            </h1>
            <div className="flex items-center w-[80%]">
                <Topnav/>
                <Dropdown
                    title="Category"
                    options={["on_the_air","popular","top_rated","airing_today"]}
                    func={(e) => setcategory(e.target.value)}
                />
                <div className="w-[2%]"></div>
            </div>
        </div>

        <InfiniteScroll
            dataLength={popular.length}
            next={GetPopular}
            hasMore={hasMore}
            loader={<h1>Loading...</h1>}
        >
                <Cards data={popular} title={category}/>
        </InfiniteScroll>
        
    </div>
) : (
    <Loading/>
);
}

export default TVShows