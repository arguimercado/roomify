import type { Route } from "./+types/home";


import Hero from "~/features/home/hero";

import Navbar from "~/features/home/navbar";
import ProjectProvider from "~/features/home/project-provider";
import ProjectShowcase from "~/features/home/project-showcase";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}


const Home = () => {
  return(
    <ProjectProvider>
      <div className="home">
        <Navbar />
        <Hero />
        <ProjectShowcase />
      </div>
    </ProjectProvider>
  )
}

export default  Home;