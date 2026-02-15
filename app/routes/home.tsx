import { ArrowRightIcon, ArrowUpRightIcon, ArrowUpRightSquare, ClockIcon, LayersIcon } from "lucide-react";
import type { Route } from "./+types/home";
import Navbar from "~/layouts/Navbar";
import { Button } from "components/ui/button";
import Hero from "~/features/home/hero";

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
      <Hero />
      <section className="projects">
        <div className="section-inner">
          <div className="section-head">
            <div className="copy">
              <h2>Projects</h2>
              <p>Your latest work and shared community projects, all in one place</p>
            </div>
          </div>
          <div className="projects-grid">
            <div className="project-card group">
              <div className="preview">
                <img src="https://roomify-mlhuk267-dfwu1i.puter.site/projects/1770803585402/rendered.png" alt="Project Render" />
                <div className="badge">
                  <span>Community</span>
                </div>
              </div>
              <div className="card-body">
                <div>
                  <h3>Project Makati</h3>
                  <div className="meta">
                    <ClockIcon className="size-4" />
                    <span>{new Date('01.01.2027').toLocaleDateString()}</span>
                    <span className="separator">|</span>
                    <span>by Architect AGM</span>
                  </div>
                </div>
                <div className="arrow">
                  <ArrowUpRightIcon size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default  Home;