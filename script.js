

const carouselSlide = document.getElementById('carouselSlide');
const imageFilenames = ['cisco-1.png', 'cisco-2.png', 'comptia-1.png', 'comptia-2.png', 'ms-1.png', 'ms-2.png', 'ms-3.png', 'ms-4.png', 'ms-5.png', 'ms-6.png', 'misc-1.png', 'misc-2.png', 'misc-3.png'];
// Add more image filenames to the array

let currentSlide = 0;
let interval;

// Function to generate the HTML for carousel images
function generateCarouselImages() {
  let carouselHTML = '';
  imageFilenames.forEach(filename => {
    carouselHTML += `<div class='badge_card'> <img src="img/certs/${filename}" alt="${filename.replace('.png', '')}"></div>`;
  });
  carouselSlide.innerHTML = carouselHTML;
}

// Function to move the carousel slide to the previous image
function prevSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = imageFilenames.length - 1;
  }
  carouselSlide.style.transform = `translateX(-${currentSlide * 100}%)`;
  clearInterval(interval);
  interval = setInterval(slide, 3000);
}

// Function to move the carousel slide to the next image
function nextSlide() {
  currentSlide++;
  if (currentSlide >= imageFilenames.length - 1) {
    currentSlide = 0;
  }
  carouselSlide.style.transform = `translateX(-${currentSlide * 100}%)`;
  clearInterval(interval);
  interval = setInterval(slide, 3000);
}

// Function to move the carousel slide automatically
function slide() {
  nextSlide();
}

// Call the function to generate carousel images and start sliding automatically
generateCarouselImages();
interval = setInterval(slide, 3000);

// Sample data for skills cards
const skillsData = [
  {
    icon: 'lan',
    domain: 'Networking',
    description: 'Proficient in Cisco networking technologies with hands-on experience configuring and troubleshooting routers, switches, and firewalls with understanding of network protocols and ability to design and implement scalable and secure Cisco-based network infrastructures.',
    list: [
      'CCNA',
      'Enterprise Networking',
      'Network Troubleshooting',
      'IP Addressing',
      'Switching',
      'Static & Dynamic Routing',
      'Redundancy Protocols',
      'IP Services',
      'VLAN',
      'STP'

    ]
  },
  {
    icon: 'desktop_windows',
    domain: 'OS and IT Operations',
    description: 'I am proficient in various operating systems, including Windows, macOS, and Linux, and have expertise in IT operations and infrastructure management.',
    list: ['A+',
      'Linux Essentials',
      'Windows Server 2019',
      'Windows OS',
      'Hardware',
      'Software',
      'Virtualization',
      'Cloud Computing',
      'IT Operations',
      'IT Infrastructure Management']
  },
  {
    icon: 'security',
    domain: 'Cybersecurity',
    description: 'I specialize in cybersecurity practices, such as vulnerability assessments, penetration testing, and implementing security measures to protect against cyber threats.',
    list: ['CyberOps',
      'Network Security',
      'Endpoint Protection',
      'VPN', 'Encryption', 'CISCO ASA', 'ACLs', 'IDS/IPS', 'Ethical Hacking', 'Digital Forensics']
  },
  {
    icon: 'code',
    domain: 'App and Web Development',
    description: 'I have a strong background in app and web development, utilizing programming languages like HTML, CSS, JavaScript, and frameworks like React and Node.js.',
    list: ['Python', 'Git', 'HTML', 'CSS', 'JS', 'OOP', 'Flask', 'Scripting', 'Power Automate', 'GitHub', 'Open Source']
  }
  // Add more objects for additional domains (total 4x4)
];

// Function to create a skills card dynamically
function createSkillsCard(skill) {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('field');
  cardDiv.classList.add('animated-section');

  const iconDiv = document.createElement('div');
  iconDiv.classList.add('icon');
  const iconSpan = document.createElement('span');
  iconSpan.classList.add('material-icons');
  iconSpan.textContent = skill.icon;
  iconDiv.appendChild(iconSpan);

  const domainHeader = document.createElement('h4');
  domainHeader.classList.add('text-gradient');
  domainHeader.textContent = skill.domain;

  const descriptionPara = document.createElement('p');
  descriptionPara.classList.add('lead');
  descriptionPara.textContent = skill.description;

  const capsulesDiv = document.createElement('div');
  capsulesDiv.classList.add('capsules');
  skill.list.forEach(item => {
    const capsuleSpan = document.createElement('span');
    capsuleSpan.classList.add('capsule');
    capsuleSpan.textContent = item;
    capsulesDiv.appendChild(capsuleSpan);
  });
  cardDiv.appendChild(domainHeader);
  cardDiv.appendChild(descriptionPara);
  cardDiv.appendChild(iconDiv);
  cardDiv.appendChild(capsulesDiv);



  return cardDiv;
}

// Function to initialize skills cards and add them to the container
function initializeSkillsCards() {
  const container = document.getElementById('skills-container');
  skillsData.forEach(skill => {
    const card = createSkillsCard(skill);
    container.appendChild(card);
  });
}

initializeSkillsCards();

// JavaScript to fetch badge images and add them to the marquee
document.addEventListener("DOMContentLoaded", async function () {
  const marqueeWrapper = document.querySelector(".marquee-wrapper");
  const badgeFiles = await getBadgeFiles("/img/badge");

  badgeFiles.forEach((badgeFile) => {
    const img = document.createElement("img");
    img.classList.add("badge-img");
    img.src = badgeFile;
    marqueeWrapper.appendChild(img);
  });
});

// Function to fetch badge image files from the /img/badge folder
async function getBadgeFiles(folderPath) {
  const response = await fetch(folderPath);
  const text = await response.text();
  const parser = new DOMParser();
  const html = parser.parseFromString(text, "text/html");
  const linkElements = html.querySelectorAll("a");
  const badgeFiles = Array.from(linkElements)
    .map((link) => link.getAttribute("href"))
    .filter((href) => href.endsWith(".png")); // Filter only .png files
  return badgeFiles;
}


// SECTION ANIMATIONS
// JavaScript to handle the animations
const animatedSections = document.querySelectorAll(".animated-section");

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
      observer.unobserve(entry.target);
    }
  });
}, options);

animatedSections.forEach((section) => {
  observer.observe(section);
});


const highlightMoreLink = document.getElementById("highlight1-more");
const highlightParagraph = document.querySelector(".highlight__paragraph");

// Function to toggle visibility and change link text
function toggleHighlight() {
    if (highlightParagraph.classList.contains("hidden")) {
        highlightParagraph.classList.remove("hidden");
        highlightMoreLink.textContent = "Hide";
    } else {
        highlightParagraph.classList.add("hidden");
        highlightMoreLink.textContent = "Learn More";
    }
}

// Add event listener to the "Learn More" link
highlightMoreLink.addEventListener("click", toggleHighlight);