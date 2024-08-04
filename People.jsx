import React from 'react'
// you see how to write the import wala sectio at 01:17:56

const people = () => {
    document.title = "SCSDB | person Shows ";
    const navigate = useNavigate();
    const [category, setcategory] = useState("popular");
    const [person, setperson] = useState([]);
    const [page,setpage] = useState(1);
    const [hasMore,sethasMore] = useState(true);

    const GetPerson = async() => {
        try {
            const {data} = await axios.get(
                `/person/${category}?page=${page}`
            );           
            
            if(data.results.length > 0) {
                setperson((prevState) => [...prevState,...data.results] );
                setpage(page + 1);               
            } else {
                sethasMore(false);
            }
        } catch (error) {
            console.log("Error: ",error)
        }
    };
    console.log(person);

    const refreshHandler = () => {
        if(person.length === 0) {
            GetPerson();

        } else {
            setpage(1);
            setperson([]);
            GetPerson();
        }
    };
    useEffect(() => {
        refreshHandler();
    }, [category]);
  return person.length > 0 ? (
    <div className=" w-screen h-screen ">
        <div className="px-[5%]w-full flex items-center justify-between">
            <h1 className="text-2xl font-semifold text-zinc-400">
                <i
                    onClick={()=>navigate(-1)}
                    className="hover:text-[#6556CD] ri-arrow-left-line"
                ></i>{""}
               People
               <small className="ml-2 text-smtext-zinc-600">({category})</small>
            </h1>
            <div className="flex items-center w-[80%]">
                <Topnav/>
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

export default people

