const skillBank = [
    "python",
    "javascript",
    "html",
    "css",
    "web development",
    "responsive design",
    "api",
    "rest api",
    "ai",
    "artificial intelligence",
    "prompt engineering",
    "automation",
    "workflow automation",
    "data processing",
    "document processing",
    "graphic design",
    "ui design",
    "ux design",
    "figma",
    "canva",
    "github"
  ];

  function analyzeResume() {
    const resumeText = document.getElementById("resumeText").value.toLowerCase();
    const jobText = document.getElementById("jobText").value.toLowerCase();

    if (!resumeText.trim() || !jobText.trim()) {
      alert("Please paste both resume text and job description.");
      return;
    }

    const requiredSkills = skillBank.filter(skill => jobText.includes(skill));
    const matchedSkills = requiredSkills.filter(skill => resumeText.includes(skill));
    const missingSkills = requiredSkills.filter(skill => !resumeText.includes(skill));

    const score = requiredSkills.length
      ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
      : 0;

    document.getElementById("score").innerText = score + "%";
    document.getElementById("matchedCount").innerText = matchedSkills.length;
    document.getElementById("missingCount").innerText = missingSkills.length;
    document.getElementById("totalCount").innerText = requiredSkills.length;

    renderBadges("matchedSkills", matchedSkills, "matched");
    renderBadges("missingSkills", missingSkills, "missing");
    renderRecommendations(missingSkills);

    document.getElementById("results").style.display = "block";
    document.getElementById("results").scrollIntoView({ behavior: "smooth" });
  }

  function renderBadges(containerId, items, type) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (items.length === 0) {
      container.innerHTML = "<p>No skills found.</p>";
      return;
    }

    items.forEach(skill => {
      const badge = document.createElement("span");
      badge.className = "badge " + type;
      badge.textContent = formatText(skill);
      container.appendChild(badge);
    });
  }

  function renderRecommendations(missingSkills) {
    const list = document.getElementById("recommendations");
    list.innerHTML = "";

    if (missingSkills.length === 0) {
      list.innerHTML = "<li>The resume aligns well with this job description.</li>";
      return;
    }

    missingSkills.forEach(skill => {
      const item = document.createElement("li");
      item.textContent = "Add relevant project details or experience related to " + formatText(skill) + " if applicable.";
      list.appendChild(item);
    });

    const finalNote = document.createElement("li");
    finalNote.textContent = "Use clear project descriptions with problem, solution, tools used, and result.";
    list.appendChild(finalNote);
  }

  function formatText(text) {
    return text
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function loadSampleData() {
    document.getElementById("resumeText").value =
      "Experienced in web development, JavaScript, HTML, CSS, responsive design, REST API integration, UI design, data processing, Figma, Canva, and GitHub.";

    document.getElementById("jobText").value =
      "We are looking for someone with Python, Web Development, Graphic Design, AI systems, JavaScript, HTML, CSS, responsive design, prompt engineering, automation, and UI design.";
  }

  function clearData() {
    document.getElementById("resumeText").value = "";
    document.getElementById("jobText").value = "";
    document.getElementById("results").style.display = "none";
  }

  function toggleTheme() {
    document.body.classList.toggle("light");
  }