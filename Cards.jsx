import React from 'react'
// last mein  dekh lena at 01:29:00 
const cards = ({data,title}) => {
  return (
        <div className="flex flex-wrap w-full h-full px-[5%] bg-[#1F1E24]">
            {data.map((c,i) => (
                <Link className="relative w-[25vh] mr-[5%] mb-[5%]" key={i}>
                    <img 
                        className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]h-[40vh] object-cover"
                        src={`https://image.tmdb.org/t/p/original/${
                        c.poster_path || c.backdrop_path ||c.profile_path
                        }`}
                        alt=""

                    />
                    <h1 className="text-2xl text-zinc-300 mt-3 font-semibold">
                        {c.name || c.title || c.original_name || c.original_title}
                    </h1>

                    
                    <div className="absolute right-[-10%] bottom-[25%] rounded-full font-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">
                        {(c.vote_average*10).toFixed()} <sup>%</sup>
                    </div>
                    

                    
                </Link>
            ))}
        </div>
  );
};

export default cards