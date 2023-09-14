import React, {useEffect, useState} from 'react';
import axios from 'axios';
import * as Yup from 'yup'; 
import {useHistory} from 'react-router-dom';
import '../App.css';

function Form() {
    const [form, setForm] = useState({ isim: "", email: "", sifre: "", sartlar: false });
    const [errors, setErrors] = useState({ isim: "", email: "", sifre: "", sartlar: false });
    const [kullanicilar, setKullanicilar] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
 

    const formSchema = Yup.object().shape({
        isim: Yup
            .string()
            .required("This field is required")
            .min(7)
            .max(50),
        email: Yup
            .string()
            .required("This field is required")
            .min(8)
            .max(30)
            .email(),
        sifre: Yup
            .string()
            .required("This field is required")
            .min(8)
            .max(30),
        sartlar: Yup
            .boolean()
            .oneOf([true], "This field is required")
      });

    const handleChange = (event) => {
        let {name, type, value, checked} = event.target; 

        value = (type == "checkbox") ? checked : value;
        setForm( {...form, [name]: value}); 

        Yup.reach(formSchema, name).validate(value)
            .then((valid) => {
                setErrors({...errors, [name]: ""});
            })
            .catch((err) => {
                setErrors({...errors, [name]: err.errors[0]});
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post("https://reqres.in/api/users", form)
            .then((res) => {
                console.log(res.data); 
                setKullanicilar([...kullanicilar, form]);
                setForm({ isim: "", email: "", sifre: "", sartlar: false });
            })
            .catch(err => {
                console.log(err.response); 
            });
    }

    useEffect(() => {
        formSchema.isValid(form)
            .then((valid) => {
                setIsDisabled(!valid);
            })
    }, [form]);

    return (
        <div className="App">
            {JSON.stringify(kullanicilar)}
            <form onSubmit={(event) => handleSubmit(event)}>
                <input
                    type="text"
                    name="isim"
                    placeholder="İsim Soyisim"
                    value={form.isim}
                    onChange={handleChange} /><br />
                {errors.isim.length > 0 && <p>{errors.isim}</p>}
                <input
                    type="mail"
                    name="email"
                    placeholder="E-Mail" 
                    value={form.email}
                    onChange={handleChange} /><br />
                {errors.email.length > 0 && <p>{errors.email}</p>}
                <input
                    type="password"
                    name="sifre"
                    placeholder="Şifre" 
                    value={form.sifre}
                    onChange={handleChange} /><br />
                {errors.sifre.length > 0 && <p>{errors.sifre}</p>}
                <label>Kullanım Şartları
                    <input
                        type="checkbox"
                        name="sartlar"
                        checked={form.sartlar}
                        onChange={handleChange} />
                </label>{errors.sartlar.length > 0 && <p>{errors.sartlar}</p>}<br />
                {
                    isDisabled === true ?
                        <button disabled>Submit</button>
                        :
                        <button enabled>Submit</button>
                }
                <br />
            </form>
        </div>
    );
}

export default Form;
