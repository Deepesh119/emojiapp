import axios from "axios" ;

export const Getemoji= async(search)=>{
    const response = await axios.get('https://emoji-api.com/emojis?access_key=b0d24533775e2874956132908955b61b3763cf5f&search='+search);
    return response;
}