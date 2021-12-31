import React from 'react'
import { useState } from 'react';
import { Getemoji } from '../api/api';
import "../App.css";
import Emoji from './emoji';


let timeout = null;
const Middle = () => {
    const [post,setPost] = useState("")
    const [list,setList] = useState([])
    const [bar,setBar] = useState(true)
    const [open,setOpen] = useState([])
    
    const ListOpen=()=>{
        setOpen((olditems)=>{
           return [post,...olditems]
        })
    }
    const Setbar=()=>{
        setBar(!bar)
    }

   const getEmoji = async (search)=>{
       console.log("GetEmoji", search,  (search && search.length<2),  );
       if((search && search.length<2) || typeof search !== "string")return;
       clearTimeout(timeout);
       timeout = setTimeout(async ()=>{
        const result = await Getemoji(search);
        console.log("result",  result.data);
        setList(result.data);
       }, 200);
   }

   const appendEmoji = (val)=>{
    setPost((prev)=>`${prev} ${val.character} `);
   }
    
    return (
    <>
        <div className='Monty'>
           <input value={post} placeholder="Write Here" id='Montytwo' onChange={(event)=>setPost(event.target.value)} />
           <button type="button" className="btn btn-primary" id="button" onClick={ListOpen}>Post</button> 
           <div className='montypost'>
               {open.map((val)=>{
                   return(
                       <>
                        <div>{val}</div>       
                       </>
                   )

               })}
           </div>
        </div>
       
        <div className='buttonone'>
            <button onClick={Setbar}> Emoji</button>
        </div>

        <div id='Emoji' style={{position:"relative"}}>
        <Emoji  number={bar ? <input placeholder='Search Emoji' onChange={(event)=>{getEmoji(event.target.value)}}/>:null} />
       <div>
        <ul style={{position:"absolute"}}>{list && list.map((val,id)=>{
          return(
              <>
             <li onClick={()=>appendEmoji(val)}  className="card-title" >{val.slug} {val.character}</li>
            </>
          )})}
        </ul>
        </div> 
             
        </div>
    </>
    )
}

export default Middle ;

