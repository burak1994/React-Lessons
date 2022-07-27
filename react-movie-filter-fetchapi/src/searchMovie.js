import {useState,useEffect} from 'react';


export default function SearchMovie(){
const [typing,setTyping] =useState('');
const [movieData,setMovieData] = useState([]);

useEffect(() => {
    getMovies();
    console.log(movieData);

},[typing])


async function getMovies(){
    
    const response = await fetch('http://localhost/crm/deneme.php/');
    const data =  await response.json();
    const getData = data.results.filter(item => item.title.toLowerCase().includes(typing.toLowerCase())).map(i => {
        return {
            id:i.episode_id,
            title:i.title,
            img: i.img
        }
    })
    setMovieData(getData);
}


function typingStart(e)
{
    const typingTimeout = setTimeout(() => {
        setTyping(e.target.value);
    },500);

  return () => {
      clearTimeout(typingTimeout);
  }
}

return (

    <div> 
<div className='searchBar'>
    <div className='mainSearchBar'>
        <h2>Search Movie</h2>
        <input onChange={typingStart}   type="text" placeholder="Search..." />

    </div>
</div>


<div className='mainMovie'>
    <div className='mainBoxs'>
{movieData.length === 0 && <p>No Found Result!</p>}
      {
          movieData.map(item => {
              return (
                <div key={item.id} className='boxs'>
                <img src={item.img} />
                <div className='movieInfo'>{item.title}</div>
            </div>
              )
          })
      } 
      
 
    </div>

</div>

    </div>
)
}