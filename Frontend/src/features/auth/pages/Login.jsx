import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

  const [formData, setFormData] = useState({
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
          Login
        </h2>

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
          Login
        </button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-sky-400 hover:underline"
          >
            Register
          </Link>
        </p>

      </form>

    </div>
  );
};

export default Login;