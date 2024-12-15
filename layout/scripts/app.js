document.addEventListener("DOMContentLoaded", function () {
    const questions = [
      {
        title: "What is the highest roof level needing cleaning?",
        options: ["1 storey", "2 storeys", "3 storeys", "4 or more storeys"],
        key: "roofLevel",
      },
      {
        title: "What is the roof made of?",
        options: ["Asphalt", "Metal", "Slate", "Tiles", "I'm not sure"],
        key: "roofMaterial",
      },
      {
        title: "How big is the area to be cleaned?",
        options: ["Small e.g. conservatory/garage", "Medium e.g. house", "Large", "Very large e.g. Warehouse"],
        key: "areaSize",
      },
      {
        title: "Is there access onto the roof without scaffolding?",
        options: ["Yes", "No"],
        key: "roofAccess",
      },
      {
        title: "How soon are you looking to have your roof cleaned?",
        options: ["ASAP", "Within 2 weeks", "Within 1 month", "In the next 2-3 months"],
        key: "timeFrame",
      },
      {
        title: "Where do you need the Roof Cleaner?",
        options: [],
        key: "location",
        input: true,
      },
      {
        title: "Please enter your email ID",
        options: [],
        key: "email",
        input: true,
      },
    ];
  
    // Create a modal or container for the questionnaire
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "50%";
    container.style.left = "50%";
    container.style.transform = "translate(-50%, -50%)";
    container.style.width = "90%";
    container.style.maxWidth = "600px";
    container.style.height = "auto";
    container.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    container.style.color = "#fff";
    container.style.padding = "20px";
    container.style.zIndex = "1000";
    container.style.overflowY = "auto";
    container.style.borderRadius = "10px";
    container.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.5)";
    container.style.fontSize = "1.2em";
    container.innerHTML = `
      <h1 style="text-align: center;">Questionnaire</h1>
      <div id="question-content" style="margin-top: 20px;"></div>
      <div id="button-container" style="display: flex; justify-content: center; gap: 20px; margin-top: 20px; flex-wrap: wrap;">
        <button id="cancel-button" style="padding: 10px 20px; background-color: #dc3545; color: #fff; border: none; border-radius: 5px; cursor: pointer; width: auto;">Cancel</button>
        <button id="submit-button" style="padding: 10px 20px; background-color: #28A745; color: #fff; border: none; border-radius: 5px; cursor: pointer; width: auto;">Submit</button>
      </div>
    `;
    document.body.appendChild(container);
  
    const questionContent = document.getElementById("question-content");
    const cancelButton = document.getElementById("cancel-button");
    const submitButton = document.getElementById("submit-button");
  
    // Cancel button functionality (Close the modal)
    cancelButton.addEventListener("click", function () {
      if (confirm("Are you sure you want to cancel?")) {
        container.remove(); // Close the modal
      }
    });
  
    function askQuestion(index) {
      if (index >= questions.length) {
        alert("Thank you for answering the questions!");
        container.remove();
        return;
      }
  
      const question = questions[index];
      questionContent.innerHTML = "";
  
      const questionTitle = document.createElement("h2");
      questionTitle.textContent = question.title;
      questionTitle.style.textAlign = "center";
      questionContent.appendChild(questionTitle);
  
      let inputElement;
  
      if (question.input && question.key === "email") {
        inputElement = document.createElement("input");
        inputElement.type = "email"; // Use type=email for email validation
        inputElement.placeholder = "Enter your email ID";
        inputElement.style.width = "100%";
        inputElement.style.padding = "10px";
        inputElement.style.marginTop = "10px";
        inputElement.style.border = "1px solid #ccc";
        inputElement.style.borderRadius = "5px";
        inputElement.style.boxSizing = "border-box";
        inputElement.style.backgroundColor = "black"; // Set background to black
        inputElement.style.color = "white"; // Set text color to white
  
        submitButton.addEventListener("click", () => {
          if (inputElement.value.trim()) {
            // Check if the email is valid
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (emailPattern.test(inputElement.value.trim())) {
              localStorage.setItem(question.key, inputElement.value.trim());
              askQuestion(index + 1);
            } else {
              alert("Please enter a valid email address.");
            }
          } else {
            alert("This question is required. Please enter your email.");
          }
        });
  
        questionContent.appendChild(inputElement);
      } else if (question.input) {
        inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.placeholder = "Enter your answer here...";
        inputElement.style.width = "100%";
        inputElement.style.padding = "10px";
        inputElement.style.marginTop = "10px";
        inputElement.style.border = "1px solid #ccc";
        inputElement.style.borderRadius = "5px";
        inputElement.style.boxSizing = "border-box";
        inputElement.style.backgroundColor = "black"; // Set background to black
        inputElement.style.color = "white"; // Set text color to white
  
        submitButton.addEventListener("click", () => {
          if (inputElement.value.trim()) {
            localStorage.setItem(question.key, inputElement.value.trim());
            askQuestion(index + 1);
          } else {
            alert("This question is required. Please answer.");
          }
        });
  
        questionContent.appendChild(inputElement);
      } else {
        inputElement = document.createElement("div");
        question.options.forEach((option, i) => {
          const optionElement = document.createElement("button");
          optionElement.textContent = option;
          optionElement.style.display = "block";
          optionElement.style.margin = "10px auto";
          optionElement.style.padding = "10px 20px";
          optionElement.style.backgroundColor = "#007BFF";
          optionElement.style.color = "#fff";
          optionElement.style.border = "none";
          optionElement.style.borderRadius = "5px";
          optionElement.style.cursor = "pointer";
          optionElement.style.textAlign = "center";
          optionElement.style.fontSize = "1em";
          optionElement.style.maxWidth = "200px";
          optionElement.addEventListener("click", () => {
            localStorage.setItem(question.key, option);
            askQuestion(index + 1);
          });
          inputElement.appendChild(optionElement);
        });
      }
  
      questionContent.appendChild(inputElement);
    }
  
    askQuestion(0);
  });
  