export const HTMLIfGuessed = ({ project }) => {
  return (
    <>
      <img src={project.image} height="200rem" alt="project" />
      <h3>{project.title}</h3>
      <h4>{project.year}</h4>
    </>
  );
};
