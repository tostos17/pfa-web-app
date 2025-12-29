import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { registerPlayer } from "../redux/playerSlice";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/UserContext";
import DOBInput from "./DOBInput";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const {user} = useAuth();

  const initialFormState = {
    firstname: "",
    middlename: "",
    lastname: "",
    dob: "",
    originState: "",
    nationality: "",
    playerPhone: "",
    playerAddress: "",
    playerEmail: "",
    parentTitle: "",
    parentFirstname: "",
    parentMiddlename: "",
    parentLastname: "",
    parentAddress: "",
    parentPhone: "",
    parentEmail: "",
    regDate: "",
    hasHealthConcern: "false",
    healthConcernDescription: ""

  }

  const [form, setForm] = useState(initialFormState);
  const [birthDate, setBirthDate] = useState<string>('');
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitted")
    const fd = new FormData();
    fd.append("firstname", form.firstname);
    fd.append("middlename", form.middlename);
    fd.append("lastname", form.lastname);
    fd.append("dob", birthDate);
    fd.append("originState", form.originState);
    fd.append("nationality", form.nationality);
    fd.append("playerPhone", form.playerPhone);
    fd.append("playerAddress", form.playerAddress);
    fd.append("playerEmail", form.playerEmail);
    fd.append("parentTitle", form.parentTitle);
    fd.append("parentFirstname", form.parentFirstname);
    fd.append("parentMiddlename", form.parentMiddlename);
    fd.append("parentLastname", form.parentLastname);
    fd.append("parentAddress", form.parentAddress);
    fd.append("parentPhone", form.parentPhone);
    fd.append("parentEmail", form.parentEmail);
    fd.append("regDate", form.regDate);
    fd.append("hasHealthConcern", form.hasHealthConcern);
    fd.append("healthConcernDescription", form.healthConcernDescription);

    if (photo) fd.append("photo", photo);

    console.log("about to dispatch")
    dispatch(registerPlayer({
      data: fd,
      token: user?.accessToken !== undefined ? user.accessToken : ""
    }))
  };
  
  const { registerResponse, loading } = useAppSelector(
  (state) => state.players
);

useEffect(() => {
    if (!registerResponse) return;

    if (registerResponse.success) {
      toast.success(registerResponse.body);
      setForm(initialFormState);
      setPhoto(null);
    } else {
      toast.error(registerResponse.body || registerResponse.message);
    }
  }, [registerResponse]);

  return (
    <main className="box">
      <h2>player registration</h2>

      {loading && <p>Submitting...</p>}

      <form id="player-reg-form" onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input placeholder="Firstname" value={form.firstname} onChange={e => setForm({ ...form, firstname: e.target.value })} />
      <input placeholder="middlename" value={form.middlename} onChange={e => setForm({ ...form, middlename: e.target.value })} />
      <input placeholder="lastname" value={form.lastname} onChange={e => setForm({ ...form, lastname: e.target.value })} />
      <input type="file" onChange={e => setPhoto(e.target.files?.[0] || null)} />
      <DOBInput onChangeAction={setBirthDate} />
      {/* <label htmlFor="dob">Date of Birth:   </label>
      <input placeholder="Date of birth" name="dob" value={form.dob} type="date" onChange={e => setForm({ ...form, dob: e.target.value })} /> */}
      <input placeholder="State of origin" value={form.originState} onChange={e => setForm({ ...form, originState: e.target.value })} />
      <input placeholder="Nationality" onChange={e => setForm({ ...form, nationality: e.target.value })} />
      <input placeholder="Player Phone number" value={form.playerPhone} onChange={e => setForm({ ...form, playerPhone: e.target.value })} />
      <input placeholder="Player Address" value={form.playerAddress} onChange={e => setForm({ ...form, playerAddress: e.target.value })} />
      <input placeholder="Player Email" value={form.playerEmail} onChange={e => setForm({ ...form, playerEmail: e.target.value })} />
      <br /> <br/>
      <hr />
      <label htmlFor="parentTitle">Parent Title:   </label>
      <select name="parentTitle" onChange={e => setForm({ ...form, parentTitle: e.target.value })}>
        <option value={""}>Choose Title</option>
        <option value={"Mr"}>Mr</option>
        <option value={"Mrs"}>Mrs</option>
      </select>
      <input name="parentFirstname" value={form.parentFirstname} placeholder="Parent Firstname" onChange={e => setForm({ ...form, parentFirstname: e.target.value })} />
      <input placeholder="Parent Middlename" value={form.parentMiddlename} onChange={e => setForm({ ...form, parentMiddlename: e.target.value })} />
      <input placeholder="Parent Lastname" value={form.parentLastname} onChange={e => setForm({ ...form, parentLastname: e.target.value })} />
      <input placeholder="Parent Address" value={form.parentAddress} onChange={e => setForm({ ...form, parentAddress: e.target.value })} />
      <input placeholder="Parent Phone" value={form.parentPhone} onChange={e => setForm({ ...form, parentPhone: e.target.value })} />
      <input placeholder="Parent Email" value={form.parentEmail} onChange={e => setForm({ ...form, parentEmail: e.target.value })} />
      <label htmlFor="regDate">Registration Date: </label>
      <input type="date" name="regDate" placeholder="Registration Date" value={form.regDate} onChange={e => setForm({ ...form, regDate: e.target.value })} />
      <label htmlFor="hasHealthConcern">Does the applicant have any health concern?   </label>
      <select name="hasHealthConcern" onChange={e => setForm({ ...form, hasHealthConcern: e.target.value })}>
        <option value={"false"}>False</option>
        <option value={"true"}>True</option>
      </select>
      <input placeholder="Health Concern Description" value={form.healthConcernDescription} onChange={e => setForm({ ...form, healthConcernDescription: e.target.value })} />
      

      <button type="submit">Register</button>
    </form>
    <ToastContainer position="top-right" autoClose={3000} />
    </main>
  );
}
