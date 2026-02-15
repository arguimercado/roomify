import { ArrowRightIcon, LayersIcon } from "lucide-react";
import { Button } from "components/ui/button";
import Upload from "components/upload";
import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();

  const handleUploadComplete = (base64data: string) =>  {
    const newId = Date.now().toString();
    navigate(`visualizer/${newId}`);
  }


  return (
    <section className="hero">
      <div className="announce">
        <div className="dot">
          <div className="pulse" />
        </div>
        <p>Introducing Roomify 2.0</p>
      </div>
      <h1>Build beautiful spaces at the speed of thought with Roomify</h1>
      <p className="subtitle">
        Roomify is an AI-powered platform that helps you visualize, render, and
        ship your ideas effortlessly.
      </p>
      <div className="actions">
        <a href="#upload" className="cta">
          Start Building <ArrowRightIcon className="icon" />
        </a>
        <Button variant="outline" size="lg" className="demo">
          Watch Demo{" "}
        </Button>
      </div>
      <div id="upload" className="upload-shell">
        <div className="grid-overlay" />
        <div className="upload-card">
          <div className="upload-head">
            <div className="upload-icon">
              <LayersIcon className="icon" />
            </div>
            <h3>Upload your floor plan</h3>
            <p>Support JPG, PNG formats up to 10MB</p>
          </div>
          <Upload onUploadComplete={handleUploadComplete} />
        </div>
      </div>
    </section>
  );
};
export default Hero;
