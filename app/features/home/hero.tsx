import { ArrowRightIcon, LayersIcon } from "lucide-react";
import { Button } from "components/ui/button";
import Upload from "components/upload";
import { useNavigate } from "react-router";
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

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const announceVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 12
      }
    }
  };

  const headlineLines = [
    "Build beautiful spaces at the speed",
    "of thought with Roomify"
  ];

  const letterAnimation = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15
      }
    }
  };

  const uploadCardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: 0.4
      }
    }
  };

  return (
    <motion.section 
      className="hero"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="announce"
        variants={announceVariants}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="dot">
          <div className="pulse" />
        </div>
        <p>Introducing Roomify 2.0</p>
      </motion.div>
      
      <motion.h1
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.03, delayChildren: 0.3 }}
      >
        {headlineLines.map((line, lineIndex) => (
          <motion.span key={`line-${lineIndex}`} className="block">
            {line.split("").map((char, charIndex) => (
              <motion.span
                key={`${lineIndex}-${char}-${charIndex}`}
                variants={letterAnimation}
                style={{ display: "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p 
        className="subtitle"
        variants={subtitleVariants}
      >
        Roomify is an AI-powered platform that helps you visualize, render, and
        ship your ideas effortlessly.
      </motion.p>

      <motion.div 
        className="actions"
        variants={containerVariants}
      >
        <motion.a 
          href="#upload" 
          className="cta"
          variants={buttonVariants}
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Building <ArrowRightIcon className="icon" />
        </motion.a>
        <motion.div variants={buttonVariants}>
          <Button 
            variant="outline" 
            size="lg" 
            className="demo"
          >
            Watch Demo{" "}
          </Button>
        </motion.div>
      </motion.div>

      <motion.div 
        id="upload" 
        className="upload-shell"
        variants={uploadCardVariants}
      >
        <motion.div 
          className="grid-overlay"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="upload-card"
          whileHover={{ 
            y: -8,
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="upload-head">
            <motion.div 
              className="upload-icon"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <LayersIcon className="icon" />
            </motion.div>
            <h3>Upload your floor plan</h3>
            <p>Support JPG, PNG formats up to 10MB</p>
          </div>
          <Upload onUploadComplete={handleUploadComplete} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
export default Hero;
