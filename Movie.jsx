//import wala code dekh lena
const Movie = () => {

    document.title = "SCSDB | Movies ";
    const navigate = useNavigate();
    const [category, setcategory] = useState("now_playing");
    const [movie, setmovie] = useState([]);
    const [page,setpage] = useState(1);
    const [hasMore,sethasMore] = useState(true);

    const GetMovie = async() => {
        try {
            const {data} = await axios.get(
                `/movie/${category}?page=${page}`
            );           
            
            if(data.results.length > 0) {
                setmovie((prevState) => [...prevState,...data.results] );
                setpage(page + 1);               
            } else {
                sethasMore(false);
            }
        } catch (error) {
            console.log("Error: ",error)
        }
    };
    console.log(movie);

    const refreshHandler = () => {
        if(movie.length === 0) {
            GetMovie();

        } else {
            setpage(1);
            setmovie([]);
            GetMovie();
        }
    };
    useEffect(() => {
        refreshHandler();
    }, [category]);
  return movie.length > 0 ? (
    <div className=" w-screen h-screen ">
        <div className="px-[5%]w-full flex items-center justify-between">
            <h1 className="text-2xl font-semifold text-zinc-400">
                <i
                    onClick={()=>navigate(-1)}
                    className="hover:text-[#6556CD] ri-arrow-left-line"
                ></i>{""}
               Movie <small className="ml-2 text-smtext-zinc-600">({category})</small>
            </h1>
            <div className="flex items-center w-[80%]">
                <Topnav/>
                <Dropdown
                    title="Category"
                    options={["popular","top_rated","upcoming","now_playing"]}
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

export default Movie