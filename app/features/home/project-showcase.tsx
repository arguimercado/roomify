import { ArrowUpRightIcon, ClockIcon } from "lucide-react";
import { useProjectContext } from "./project-provider";

const ProjectShowcase = () => {
	const { projects } = useProjectContext();
  return (
    <section className="projects">
      <div className="section-inner">
        <div className="section-head">
          <div className="copy">
            <h2>Projects</h2>
            <p>
              Your latest work and shared community projects, all in one place
            </p>
          </div>
        </div>
        <div className="projects-grid">
					{projects.map(({id, name, sourceImage, renderedImage, timestamp}) => (
						<div className="project-card group" key={id}>
							<div className="preview">
								<img
									src={renderedImage || sourceImage}
									alt={name ?? "Untitled Project"}
								/>
								<div className="badge">
									<span>Community</span>
								</div>
							</div>
							<div className="card-body">
								<div>
									<h3>{name ?? "Untitled Project"}</h3>
									<div className="meta">
										<ClockIcon className="size-4" />
										<span>{new Date(timestamp).toLocaleDateString()}</span>
										<span className="separator">|</span>
										<span>by Architect AGM</span>
									</div>
								</div>
								<div className="arrow">
									<ArrowUpRightIcon size={18} />
								</div>
							</div>
						</div>
					))}
        </div>
      </div>
    </section>
  );
};
export default ProjectShowcase;
