import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      <form
        onSubmit={handleSubmit}
        className="bg-neutral-900 border border-sky-500/30 p-8 rounded-xl w-[350px]"
      >

        <h2 className="text-2xl font-bold text-center text-sky-400 mb-6">
          Register
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded bg-black border border-neutral-700 text-white focus:border-sky-400 outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded bg-black border border-neutral-700 text-white focus:border-sky-400 outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded bg-black border border-neutral-700 text-white focus:border-sky-400 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-400 text-black font-semibold py-2 rounded"
        >
          Register
        </button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-sky-400 hover:underline"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
};

export default Register;