import React from 'react'
import { useState} from 'react'
import "../App.css"
import Emoji from './emoji'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Getemoji } from '../api/api';

const Search = () => {
    const[search,setSearch]=  useState("");
    const [list,setList]= useState([])
    const[bar,setBar]= useState(false)
    
    const [open,setOpen] = useState([])
    
    const Bar=()=>{
        setBar(!bar)
    }
    const Post=()=>{
        setList((olditems)=>{
            return[search,...olditems]
        })   
    }
    const GetEmoji =async(_search)=>{
      const response = await Getemoji(_search)
      setOpen(response.data)
      }
    const Settle=(val)=>{
       setSearch((prev)=>{
         return `${prev} ${val.character} `;/*This is giving error of undefined*/
       })
    }  
    

    return (
        <>
            <div className='Searchstyle'>
            <input placeholder='search' onChange={(event)=>setSearch(event.target.value)} value={search} />
            <button onClick={Post} >Post</button>
            </div>
            <div className='Searchstyleone'>
            <button onClick={Bar}>Select Emoji </button>
           <Emoji  number={bar ? <input placeholder='search' id="Montyappself" onChange={(event)=>{GetEmoji(event.target.value)}}/>:null}/>
            </div>
            <div className='Emojisettle'>
                {open && open.map((val)=>{
                    return(
                        <>
                            <span onClick={()=>Settle(val)}>{val.character} </span>
                        </>
                    )
                })}
            </div>
            <div className='Searchstyletwo'>
                {list.map((val,id)=>{
                    return(
                <>
                    <div>
                    <Card sx={{ minWidth: 200}}>
                        <CardContent>
                           <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                           {id} Today's Date 
                           </Typography>
                           <Typography variant="body2"  >
                           {val}
                          <br/>
                           </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small">Like</Button>
                          <Button size="small">Comment</Button>
                          <Button size="small">Share</Button>
                        </CardActions>
                    </Card>
                    </div>
                </>
                    )
                })}
            </div>
           
        </>
        
    )
}

export default Search;
