// --- DATA STORE ---
// In a real application, this data would come from a database.
const subjectData = {
    'Mathematics': {
        description: 'Covers fundamental concepts of numbers, shapes, and patterns.',
        courses: ['1. Algebra Basics', '2. Geometry Fundamentals', '3. Introduction to Statistics', '4. Basic Trigonometry']
    },
    'Web Development': {
        description: 'Learn to build modern websites and web applications from scratch.',
        courses: ['1. HTML: Structuring the Web', '2. CSS: Styling Websites', '3. JavaScript: Making Pages Interactive', '4. Introduction to React Framework']
    },
    'Science': {
        description: 'Explore the natural world through observation and experimentation.',
        courses: ['1. Fundamentals of Biology', '2. Introduction to Chemistry', '3. Basics of Physics', '4. Earth Science Overview']
    },
    'Nepali': {
        description: 'Learn about Nepali language, literature, and culture.',
        courses: ['1. Nepali Grammar', '2. Nepali Literature', '3. Essay Writing', '4. Oral Communication']
    },
    'History': {
        description: 'Explore the events and people that shaped our world.',
        courses: ['1. Ancient Civilizations', '2. Medieval History', '3. Modern History', '4. History of Nepal']
    },
    'Advanced Mathematics': {
        description: 'Dive deeper into mathematical concepts and problem solving.',
        courses: ['1. Calculus', '2. Linear Algebra', '3. Probability & Statistics', '4. Discrete Mathematics']
    },
    'Physics': {
        description: 'Study the laws of nature, motion, energy, and matter.',
        courses: ['1. Mechanics', '2. Thermodynamics', '3. Electricity & Magnetism', '4. Modern Physics']
    },
    'Chemistry': {
        description: 'Understand the composition, structure, and properties of substances.',
        courses: ['1. Atomic Structure', '2. Chemical Reactions', '3. Organic Chemistry', '4. Inorganic Chemistry']
    },
    'Introduction to Programming': {
        description: 'Start your journey into the world of coding and software.',
        courses: ['1. Programming Basics', '2. Algorithms', '3. Data Types', '4. Simple Projects']
    },
    'English Grammar': {
        description: 'Primary level English grammar: basic sentence structure, nouns, verbs, and punctuation.',
        courses: [
            '1. Simple Sentences',
            '2. Nouns and Pronouns',
            '3. Verbs and Tenses',
            '4. Punctuation Basics'
        ]
    },
    'Primary Nepali': {
        description: 'Primary level Nepali: alphabet, simple words, and basic grammar.',
        courses: [
            '1. Nepali Alphabet',
            '2. Simple Words',
            '3. Basic Nepali Grammar',
            '4. Reading Simple Stories'
        ]
    },
    'Primary Computer Science': {
        description: 'Primary level computer science: introduction to computers, typing, and basic operations.',
        courses: [
            '1. What is a Computer?',
            '2. Using a Mouse and Keyboard',
            '3. Introduction to Typing',
            '4. Basic Computer Operations'
        ]
    },
    'Primary Science': {
        description: 'Primary level science: living and non-living things, plants, and animals.',
        courses: [
            '1. Living and Non-living Things',
            '2. Parts of a Plant',
            '3. Animals Around Us',
            '4. Our Environment'
        ]
    }
    // Add more subjects and courses here
};

// Global variable to store the current subject context for the chat
let currentSubject = '';

// --- FUNCTIONS ---

/**
 * Shows the selected educational level and hides the others.
 * @param {string} levelId - The ID of the level to show ('primary', 'secondary', or 'higher').
 */
function showLevel(levelId) {
    document.querySelectorAll('.level-content').forEach(level => {
        level.style.display = 'none';
    });
    document.getElementById(levelId).style.display = 'block';
}

/**
 * Triggered when a user clicks on a subject.
 * Displays courses and shows the chat interface.
 * @param {string} subjectName - The name of the subject that was clicked.
 */
function selectSubject(subjectName) {
    currentSubject = subjectName;
    displayCourses(subjectName);
}

/**
 * Displays the course list for a given subject.
 * @param {string} subjectName - The name of the subject to display courses for.
 */
function displayCourses(subjectName) {
    // Hide all course details containers first
    document.getElementById('primary-course-details').innerHTML = '';
    document.getElementById('secondary-course-details').innerHTML = '';
    document.getElementById('higher-course-details').innerHTML = '';
    // Find the visible level-content section
    let container = null;
    if (document.getElementById('primary').style.display !== 'none') {
        container = document.getElementById('primary-course-details');
    } else if (document.getElementById('secondary').style.display !== 'none') {
        container = document.getElementById('secondary-course-details');
    } else if (document.getElementById('higher').style.display !== 'none') {
        container = document.getElementById('higher-course-details');
    }
    const data = subjectData[subjectName];

    if (container && data) {
        let content = `
            <h3>Courses in ${subjectName}</h3>
            <p>${data.description}</p>
            <ul>
                ${data.courses.map(course => `<li class='clickable-course' onclick='searchCourse("${course.replace(/'/g, "\'")}")'>${course}</li>`).join('')}
            </ul>
        `;
        container.innerHTML = content;
    } else if (container) {
        container.innerHTML = `<p>Course details for ${subjectName} are not available yet.</p>`;
    }
}

function searchCourse(courseName) {
    // Open a new page with course details, passing the course name in the URL
    window.open('course.html?course=' + encodeURIComponent(courseName), '_blank');
}

/**
 * Handles sending a message in the chat.
 */
function sendMessage() {
    const userInput = document.getElementById('user-input');
    const messageText = userInput.value.trim();

    if (messageText === '') return;

    // Display the user's message
    addMessageToChat(messageText, 'user-message');
    userInput.value = '';

    // Get a response from our simulated Gemini AI
    getGeminiResponse(currentSubject, messageText);
}

/**
 * Adds a new message to the chat interface.
 * @param {string} text - The message content.
 * @param {string} className - The CSS class for styling ('user-message' or 'gemini-message').
 */
function addMessageToChat(text, className) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', className);
    messageElement.innerText = text;
    chatBox.appendChild(messageElement);
    // Scroll to the bottom to see the new message
    chatBox.scrollTop = chatBox.scrollHeight;
}

/**
 * SIMULATED GEMINI API
 * In a real-world application, you would use the `fetch()` API to send a request
 * to your backend server, which would then securely call the actual Gemini API.
 * We use setTimeout to mimic the delay of a real network request.
 * @param {string} subject - The subject context.
 * @param {string} prompt - The user's question.
 */
function getGeminiResponse(subject, prompt) {
    // Show a typing indicator (optional but good UX)
    addMessageToChat('Typing...', 'gemini-message typing');
    
    setTimeout(() => {
        // Remove typing indicator
        const typingIndicator = document.querySelector('.typing');
        if (typingIndicator) {
            typingIndicator.remove();
        }

        let response = '';
        // Create canned responses based on the prompt for demonstration
        if (prompt.toLowerCase().includes('lesson plan')) {
            response = `Of course! Here is a basic lesson plan for ${subject}: 
            1. Start with the fundamentals (e.g., '${subjectData[subject]?.courses[0] || 'the first course'}').
            2. Move to practical applications. 
            3. Finish with an advanced topic. What would you like to start with?`;
        } else if (subject === 'Web Development' && prompt.toLowerCase().includes('html')) {
            response = 'HTML stands for HyperText Markup Language. It is the standard markup language for creating web pages. It describes the structure of a web page using elements, which are represented by tags like `<h1>`, `<p>`, `<img>`, etc.';
        } else if (subject === 'Mathematics' && prompt.toLowerCase().includes('algebra')) {
            response = 'Algebra is a branch of mathematics that substitutes letters for numbers. An algebraic equation represents a scale where what is done on one side of the scale is also done to the other side. For example, in x + 3 = 7, x would be 4.';
        } else {
            response = `That's a great question about ${subject}. While I'm still a demo AI, a full version could explain that in detail. Try asking me for a "lesson plan".`;
        }
        
        addMessageToChat(response, 'gemini-message');

    }, 1500); // Simulate a 1.5-second delay
}

// --- AI CHAT DEMO (offline, simple) ---
function sendAIMessage(event) {
    event.preventDefault();
    const input = document.getElementById('ai-user-input');
    const chatBox = document.getElementById('ai-chat-box');
    const userMsg = input.value.trim();
    if (!userMsg) return false;
    chatBox.innerHTML += `<div style='margin-bottom:8px;text-align:right;'><span style='background:#dfe6e9;padding:7px 12px;border-radius:8px;display:inline-block;'>${userMsg}</span></div>`;
    input.value = '';
    fetch('/api/gemini-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
    })
    .then(res => res.json())
    .then(data => {
        const aiResponse = data.response || 'Sorry, I could not understand that.';
        chatBox.innerHTML += `<div style='margin-bottom:8px;text-align:left;'><span style='background:#0984e3;color:#fff;padding:7px 12px;border-radius:8px;display:inline-block;'>${aiResponse}</span></div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(() => {
        chatBox.innerHTML += `<div style='margin-bottom:8px;text-align:left;'><span style='background:#0984e3;color:#fff;padding:7px 12px;border-radius:8px;display:inline-block;'>Sorry, Gemini AI is not available right now.</span></div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    });
    return false;
}

function getAIDemoResponse(msg) {
    msg = msg.toLowerCase();
    if (msg.includes('math')) return 'Mathematics is the study of numbers, shapes, and patterns. Would you like a lesson plan or a fun fact?';
    if (msg.includes('science')) return 'Science helps us understand the world around us. Ask me about biology, chemistry, or physics!';
    if (msg.includes('history')) return 'History is the study of past events. Want to know about ancient civilizations or modern history?';
    if (msg.includes('course') || msg.includes('suggest')) return 'Click on any subject above to see suggested courses for that level!';
    if (msg.includes('hello') || msg.includes('hi')) return 'Hello! I am your AI Tutor. Ask me anything about your subjects.';
    return 'I am your offline AI Tutor. Ask me about any subject or course!';
}

// --- INITIALIZATION ---

// Set the primary level to be visible by default and handle keyboard input for the chat
document.addEventListener('DOMContentLoaded', () => {
    showLevel('primary');
    // Allow pressing 'Enter' to send a message
    document.getElementById('user-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});