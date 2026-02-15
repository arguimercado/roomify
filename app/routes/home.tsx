import type { Route } from "./+types/home";
import Navbar from "~/layouts/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}


const Home = () => {

  return(

    <div className="home">
      <Navbar />
      <h1 className="text-xl">Hello World</h1>
    </div>
  )
}

export default  Home;