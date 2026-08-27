import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });


      console.log(response.data);


      toast.success("Registration successful!");


      navigate("/");


    } catch (error) {

      console.log(
        error.response?.data || error.message
      );


      toast.error(
        error.response?.data?.message || "Registration failed"
      );

    }

  };


  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >


      <div
        style={{
          width: "400px",
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        }}
      >


        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Register
        </h1>

      

        <form onSubmit={handleRegister}>


          <label>
            Name
          </label>


          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              marginBottom: "15px",
              boxSizing: "border-box",
            }}
          />



          <label>
            Email
          </label>


          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              marginBottom: "15px",
              boxSizing: "border-box",
            }}
          />



          <label>
            Password
          </label>


          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              marginBottom: "20px",
              boxSizing: "border-box",
            }}
          />



          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Register
          </button>


        </form>



        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >

          Already have an account?{" "}

          <Link to="/">
            Login
          </Link>

        </p>


      </div>


    </div>

  );

}


export default Register;