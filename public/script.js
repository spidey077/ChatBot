window.addEventListener("scroll",function(){let e=document.querySelector(".navbar");console.log(e),e&&(window.scrollY>50?e.classList.add("scrolled"):e.classList.remove("scrolled"))}),document.addEventListener("DOMContentLoaded",function(){let e=document.getElementById("loading-screen"),t=document.getElementById("content");e.classList.add("hidden"),t.classList.add("show"),setTimeout(()=>{e.style.display="none"},3e3)}),document.addEventListener("DOMContentLoaded",function(){let e=document.querySelectorAll(".reveal");function t(){e.forEach(e=>{let t=e.getBoundingClientRect().top,n=window.innerHeight;t<n-80?e.classList.add("active"):e.classList.remove("active")})}window.addEventListener("scroll",t),t()});const cursor=document.querySelector(".cursor");document.addEventListener("mousemove",e=>{cursor.style.left=`${e.clientX}px`,cursor.style.top=`${e.clientY}px`});const hoverElements=document.querySelectorAll(".hover-target");hoverElements.forEach(e=>{e.addEventListener("mouseover",()=>{cursor.style.width="130px",cursor.style.height="130px",cursor.style.backgroundColor="rgba(47, 213, 255, 0.69)"}),e.addEventListener("mouseleave",()=>{cursor.style.width="10px",cursor.style.height="10px",cursor.style.backgroundColor="transparent"})});const letters=document.querySelectorAll(".animated-title span");let index=0;function animateLetters(){letters.forEach(e=>e.classList.remove("active")),letters[index].classList.add("active"),index=(index+1)%letters.length,setTimeout(animateLetters,1e3)}animateLetters(),document.getElementById("lottie-animation1").addEventListener("click",function(){let e=document.getElementById("about");window.scrollTo({top:e.offsetTop-90,behavior:"smooth"})}),document.getElementById("lottie-animation").addEventListener("click",function(){window.location.href="#home"});
document.addEventListener("DOMContentLoaded", function () {
  const chatbot = document.getElementById("chatbotContainer");
  const chatbotBtn = document.querySelector(".chatbot-button");

  function toggleChatbot() {
    chatbot.classList.toggle("open");
  }
  chatbotBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleChatbot();
  });
  document.addEventListener("click", function (event) {
    if (
      chatbot.classList.contains("open") &&
      !chatbot.contains(event.target) &&
      !chatbotBtn.contains(event.target)
    ) {
      chatbot.classList.remove("open");
    }
  });
});


  async function askQuestion() {
    const question = document.getElementById("question").value;
    const responseDiv = document.getElementById("response");
    responseDiv.innerHTML = "Thinking...";
    responseDiv.style.display = "block";
    const faqAnswers = {
      "what services do you offer": "I offer front-end web development, responsive website creation, portfolio design, and FAQ chatbot integration. I also provide UI design services using tools like Figma, Canva, and Photoshop.",
      "how can i contact you": "You can contact me through the Contact section on my website or email me directly at imdadullahchishti@gmail.com.",
      "do you create websites": "Yes, I specialize in creating responsive and modern websites using HTML, CSS, JavaScript, and frameworks like Bootstrap and Tailwind CSS.",
      "do you create mobile-friendly websites": "Yes, all websites I build are fully responsive and optimized for mobile, tablet, and desktop devices.",
      "what is your name": "I'm Muhammad Imdadullah, a passionate and skilled front-end developer.",
      "who are you": "I'm Muhammad Imdadullah, a CS student and a front-end developer specializing in creating responsive and modern websites.",
      "which technologies do you use": "I work with HTML, CSS, JavaScript, Bootstrap, Tailwind CSS, and GitHub for front-end development.",
      "which skills do you have": "I work with HTML, CSS, JavaScript, Bootstrap, Tailwind CSS, and GitHub for front-end development.",
      "can i see your portfolio": "Absolutely! You can check out my work at https://imdadullahbootstrap.vercel.app/",
      "can i hire you": "Yes, you can hire me for your next project. Please contact me via the contact form or email me at imdadullahchishti@gmail.com.",
      "do you design user interfaces": "Yes, I use tools like Figma, Photoshop, and Canva to design clean and modern UIs before development.",
      "do you offer website maintenance": "Yes, I provide website maintenance services to ensure your site remains up-to-date and secure.",
      "do you offer web design services": "Yes, I offer complete front-end web design services including layout, responsiveness, and aesthetics.",
      "can i hire you for my project": "Yes! Please reach out via the contact form or email me at imdadullahchishti@gmail.com, so we can discuss your project requirements.",
      "what is your experience": "I have 1 year of experience in front-end development, working on various personal projects including responsive websites, UI design, and web applications.",
      "hi": "Hello! How can I assist you today?",
      "hello": "Hi there! How can I help you?",
      "help": "Sure! What do you need help with?",
      "thanks": "You're welcome! Let me know if you have any other questions.",
      "thank you": "You're welcome! Feel free to ask anything else.",
      "bye": "Goodbye! If you have more questions later, feel free to ask.",
      "goodbye": "Goodbye! Have a great day!",
      "how are you": "I'm just a chatbot, but thank you for asking! How can I assist you?"
    };

    const match = Object.keys(faqAnswers).find(q => question.toLowerCase().includes(q));
    if (match) {
      responseDiv.innerHTML = "<strong>Answer:</strong><br>" + faqAnswers[match];
      return;
    }

    // Call backend server instead of OpenAI directly
    try {
     const res = await fetch("https://chatbot-zkg0.onrender.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question })
      });

      const data = await res.json();
      responseDiv.innerHTML = "<strong>Answer:</strong><br>" + (data.answer || "Sorry, I couldn’t find an answer.");
    } catch (err) {
      responseDiv.innerHTML = "Error: " + err.message;
    }

  }
