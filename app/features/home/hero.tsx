import { ArrowRightIcon, LayersIcon } from "lucide-react";
import { Button } from "components/ui/button";
import Upload from "components/upload";
import { useNavigate } from "react-router";
import { useState } from "react";
import { createProject } from "libs/puter.action";
import { useProjectContext } from "./project-provider";
import { motion } from "framer-motion";

const Hero = () => {

  const navigate = useNavigate();
  const { updateProjects } = useProjectContext();  

  const handleUploadComplete = async (base64data: string) =>  {
    const newId = Date.now().toString();
    const newName = `Residence ${newId}`;

    const newItem = {
      id: newId,
      name: newName,
      sourceImage: base64data,
      renderedImage: undefined,
      timestamp: Date.now(),
    }

    const saved = await createProject({item: newItem, visibility: 'private'});
    if(!saved) {
      console.warn('Failed to create project');
      return false;
    }

    updateProjects(saved);

    navigate(`visualizer/${newId}`, {
      state: {
        initialImage: saved.sourceImage,
        initialRendered: saved.renderedImage || null,
        name: saved.name,
      }
    });
  }


  const headlineLines = [
    "Build beautiful spaces at the speed",
    "of thought with Roomify",
  ];
  const letterAnimation = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="hero">
      <div className="announce">
        <div className="dot">
          <div className="pulse" />
        </div>
        <p>Introducing Roomify 2.0</p>
      </div>
      <motion.h2
        className="text-7xl"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.02, delayChildren: 0.1 }}
      >
        {headlineLines.map((line, lineIndex) => (
          <motion.span key={`line-${lineIndex}`} className="block">
            {line.split("").map((char, charIndex) => (
              <motion.span
                key={`${lineIndex}-${char}-${charIndex}`}
                variants={letterAnimation}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </motion.h2>
      <motion.p
        className="subtitle"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      >
        Roomify is an AI-powered platform that helps you visualize, render, and
        ship your ideas effortlessly.
      </motion.p>
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
