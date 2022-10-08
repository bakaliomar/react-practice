import PropTypes from "prop-types";
import { Project } from "./Project";

export interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const handleEditClick = (proejectBeingEdited: Project) => {
    console.log(proejectBeingEdited);
  }
  return (
    <div className="card">
      <img src={project.imageUrl} alt={project.name} />
      <section className="section dark">
        <h5 className="strong">
          <strong>{ project.name }</strong>
        </h5>
        <p>{ project.description }</p>
        <p>Budget: { project.budget.toLocaleString() }</p>
        <button className="bordered" onClick={() => handleEditClick(project)}>
          <span className="icon-edit"></span>
          Edit
        </button>
      </section>
    </div>
  );
}

ProjectCard.prototype = {
  project: PropTypes.instanceOf(Project).isRequired
}

export default ProjectCard;