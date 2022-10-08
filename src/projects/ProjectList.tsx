import { Project } from "./Project";
import PropTypes from "prop-types";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

export interface Props {
  projects: Project[];
}

function ProjectList({ projects }: Props) {
  return (
    <div className="row">
      {projects.map((project: Project) =>(
        <div key={project.id} className="cols-sm">
          <ProjectCard project={project} />
          <ProjectForm />
        </div>
      ))}
    </div>
  );
}

ProjectList.prototype = {
  projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired,
}

export default ProjectList;