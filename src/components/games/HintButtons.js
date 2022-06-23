export const HintButtons = ({projectDetails}) => {
    
    const availableButtons = () => {
        return 
    }
  
    return (
    <>
        {projectDetails?.plot ? <button
        onClick={() => {
          window.alert(projectDetails.plot);
        }}
      >
        plot
      </button> : ""}
      {projectDetails?.directors ? <button
        onClick={() => {
          window.alert(projectDetails.directors);
        }}
      >
        director
      </button> : ""}
      {projectDetails?.stars ? <button
        onClick={() => {
          window.alert(projectDetails.stars);
        }}
      >
        stars
      </button> : ""}
      {projectDetails?.genres ? <button
        onClick={() => {
          window.alert(projectDetails.genres);
        }}
      >
        genre
      </button> : ""}
      {projectDetails?.keywords ? <button
        onClick={() => {
          window.alert(projectDetails.keywords);
        }}
      >
        keywords
      </button>: ""}
      
    </>
  );
};
