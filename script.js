// ============================================
// TYPING ANIMATION
// ============================================

// Task examples
const tasks = [
    {
        instruction: "compare our page speed with stripe, shopify, and square daily...",
        agentName: "speed-benchmarks",
        linesGenerated: 94,
        schedule: "Daily at 9:00 AM (0 9 * * *)",
        nextRun: "Tomorrow at 9:00 AM",
        tools: "lighthouse, email",
        persona: "engineer"
    },
    {
        instruction: "research competitors and summarize their pricing models...",
        agentName: "competitor-intel",
        linesGenerated: 134,
        schedule: "Weekly on Monday at 10:00 AM (0 10 * * 1)",
        nextRun: "Monday at 10:00 AM",
        tools: "web-scraper, gpt-4",
        persona: "product-manager"
    },
    {
        instruction: "analyze user feedback and categorize common pain points...",
        agentName: "feedback-analyzer",
        linesGenerated: 156,
        schedule: "Daily at 6:00 PM (0 18 * * *)",
        nextRun: "Today at 6:00 PM",
        tools: "zendesk, gpt-4, slack",
        persona: "product-manager"
    },
    {
        instruction: "track competitors' feature launches and blog posts...",
        agentName: "competitor-tracker",
        linesGenerated: 118,
        schedule: "Daily at 11:00 AM (0 11 * * *)",
        nextRun: "Tomorrow at 11:00 AM",
        tools: "web-scraper, notion",
        persona: "product-manager"
    },
    {
        instruction: "compare our SEO rankings vs top 5 competitors for key terms...",
        agentName: "seo-monitor",
        linesGenerated: 103,
        schedule: "Weekly on Tuesday at 8:00 AM (0 8 * * 2)",
        nextRun: "Tuesday at 8:00 AM",
        tools: "semrush, sheets, email",
        persona: "marketing"
    },
    {
        instruction: "summarize top feature requests from customer interviews...",
        agentName: "feature-requests",
        linesGenerated: 112,
        schedule: "Weekly on Wednesday at 2:00 PM (0 14 * * 3)",
        nextRun: "Wednesday at 2:00 PM",
        tools: "notion, gpt-4, slack",
        persona: "product-manager"
    }
];

// Cycling through tasks
const usernames = ['john', 'jane', 'jo', 'alex', 'sam'];
let currentTaskIndex = 0;
let currentUsername = '';
let currentTask = null;
let commandText = '';

const typedCommandElement = document.getElementById('typed-command');
const terminalOutputElement = document.getElementById('terminal-output');
const cursor = document.getElementById('cursor');
let charIndex = 0;
let cursorBlinkInterval;

function selectNextTask() {
    currentTask = tasks[currentTaskIndex];
    currentUsername = usernames[Math.floor(Math.random() * usernames.length)];
    commandText = `aictl agent create "${currentTask.instruction}"`;
    currentTaskIndex = (currentTaskIndex + 1) % tasks.length;
}

function typeCommand() {
    if (charIndex < commandText.length) {
        typedCommandElement.textContent += commandText.charAt(charIndex);
        charIndex++;
        setTimeout(typeCommand, 50 + Math.random() * 50); // Variable speed for human feel
    } else {
        // Command finished typing, show output after a delay
        setTimeout(showOutput, 500);
    }
}

function showOutput() {
    // Stop cursor blinking and hide it when output starts
    clearInterval(cursorBlinkInterval);
    cursor.style.opacity = '0';

    const outputLines = [
        'Creating agent...',
        '',
        `✓ Agent '${currentTask.agentName}' created`,
        '✓ Synthesizing code from instructions...',
        `✓ Code generated (${currentTask.linesGenerated} lines)`,
        '✓ Agent deployed and ready',
        '',
        `Schedule: ${currentTask.schedule}`,
        `Next run: ${currentTask.nextRun}`,
        `Tools:    ${currentTask.tools}`,
        `Persona:  ${currentTask.persona}`,
        '',
        'LANGUAGE OPERATOR'
    ];

    let lineIndex = 0;

    function showNextLine() {
        if (lineIndex < outputLines.length) {
            const line = outputLines[lineIndex];
            const lineElement = document.createElement('div');

            // Handle empty lines properly
            if (line === '') {
                lineElement.innerHTML = '&nbsp;';
            } else {
                lineElement.textContent = line;
            }

            // Last line is the reveal with color cycling
            if (lineIndex === outputLines.length - 1) {
                lineElement.classList.add('color-cycle');
                lineElement.style.marginTop = '1rem';
                lineElement.style.fontSize = '3rem';
                lineElement.style.fontWeight = 'bold';
                lineElement.style.letterSpacing = '0.2rem';

                // After final line is shown, show cursor to the right
                setTimeout(() => {
                    const cursorSpan = document.createElement('span');
                    cursorSpan.innerHTML = '&nbsp;█';
                    cursorSpan.classList.add('color-cycle');
                    cursorSpan.style.animation = 'blink 1s infinite';
                    lineElement.appendChild(cursorSpan);

                    // Show GitHub icon after terminal effect completes (only first time)
                    showGitHubIcon();

                    // Wait, then restart with next task
                    setTimeout(() => {
                        restartAnimation();
                    }, 10000);
                }, 500);
            } else if (line.includes('✓')) {
                lineElement.style.color = 'var(--accent-green)';
            }

            terminalOutputElement.appendChild(lineElement);
            lineIndex++;
            setTimeout(showNextLine, 200 + Math.random() * 300);
        }
    }

    showNextLine();
}

// ============================================
// GITHUB ICON REVEAL
// ============================================

function showGitHubIcon() {
    const githubIcon = document.getElementById('github-icon');
    if (!githubIcon.classList.contains('show')) {
        setTimeout(() => {
            githubIcon.classList.add('show');
        }, 500);
    }
}

// ============================================
// RESTART ANIMATION
// ============================================

function restartAnimation() {
    // Clear the terminal output
    terminalOutputElement.innerHTML = '';
    typedCommandElement.textContent = '';

    // Reset cursor
    cursor.style.opacity = '1';
    charIndex = 0;

    // Select next task and update username
    selectNextTask();
    document.querySelector('.terminal-user').textContent = currentUsername + '@langop';

    // Restart cursor blinking
    let cursorVisible = true;
    cursorBlinkInterval = setInterval(() => {
        cursorVisible = !cursorVisible;
        cursor.style.opacity = cursorVisible ? '1' : '0';
    }, 500);

    // Start typing the new command
    setTimeout(typeCommand, 500);
}

// Start typing when page loads
window.addEventListener('load', () => {
    selectNextTask();
    document.querySelector('.terminal-user').textContent = currentUsername + '@langop';
    setTimeout(typeCommand, 1000);
});

// ============================================
// TERMINAL CURSOR BLINK
// ============================================

let cursorVisible = true;

cursorBlinkInterval = setInterval(() => {
    cursorVisible = !cursorVisible;
    cursor.style.opacity = cursorVisible ? '1' : '0';
}, 500);
