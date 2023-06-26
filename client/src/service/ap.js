import axios from 'axios'

const URL = 'https://blog-3b04.onrender.com'


export const deletePost = async (id) => {
//delete(`${API_URL}/todelete/${id}`);
    try {

        return await axios.delete(`${URL}/todelete/${id}`);
    } catch (error) {
        console.log("error while calling getUsers api", error);
    }
}

export const deleteCom = async (id) => {
    //delete(`${API_URL}/todelete/${id}`);
        try {
    
            return await axios.delete(`${URL}/dc/${id}`);
        } catch (error) {
            console.log("error while calling getUsers api", error);
        }
    }