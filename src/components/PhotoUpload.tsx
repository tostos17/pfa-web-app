import { useState } from "react";
import { useAuth } from "../context/UserContext";
import { useSearchParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import type { ApiResponse } from "../redux/playerSlice";


const PhotoUpload = () => {

      const {user} = useAuth();
      const [searchParams] = useSearchParams();
      const id = searchParams.get("id");
    
      const initialFormState = {
        playerId: "",
      }
    
      const [form, setForm] = useState(initialFormState);

   const [photo, setPhoto] = useState<File | null>(null);

   const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
       console.log("submitted")
       const fd = new FormData();
       fd.append("playerId", id ? id : "");

       if (photo) fd.append("photo", photo);
   
       try {
            const res = await axios.post<ApiResponse<string>>(`${import.meta.env.VITE_BASE_API_URL}/player/uploadphoto`,
            fd,
            {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`
                }
            }
       );

            if(res.data.code === 200) {
                setForm(initialFormState);
                setPhoto(null);
                toast.success(res.data.body);
            }

       } catch (error) {
        const err = error as AxiosError;
        toast.error(err.message)
       }
     };
     

  return (
    <main className="box">
        <b>{id && id}</b>
      <form onSubmit={handleSubmit}>
        <label htmlFor="photo">Photo</label>
        <input type="file" onChange={e => setPhoto(e.target.files?.[0] || null)} />

        <button type="submit">Submit</button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </main>
  )
}

export default PhotoUpload
