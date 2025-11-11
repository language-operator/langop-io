// ============================================
// TYPING ANIMATION
// ============================================

// Task examples
const tasks = [
    {
        instruction: "send me a daily summary of customer signups and revenue...",
        agentName: "daily-metrics",
        linesGenerated: 87,
        schedule: "Daily at 8:00 AM (0 8 * * *)",
        nextRun: "Tomorrow at 8:00 AM",
        tools: "postgres, slack",
        persona: "product-manager"
    },
    {
        instruction: "alert me when server response time exceeds 2 seconds...",
        agentName: "perf-monitor",
        linesGenerated: 64,
        schedule: "Every 5 minutes (*/5 * * * *)",
        nextRun: "In 5 minutes",
        tools: "prometheus, pagerduty",
        persona: "engineer"
    },
    {
        instruction: "generate weekly user engagement report for the team...",
        agentName: "engagement-report",
        linesGenerated: 103,
        schedule: "Weekly on Monday at 9:00 AM (0 9 * * 1)",
        nextRun: "Monday at 9:00 AM",
        tools: "mixpanel, sendgrid",
        persona: "product-manager"
    },
    {
        instruction: "backup production database and upload to S3...",
        agentName: "db-backup",
        linesGenerated: 72,
        schedule: "Daily at 2:00 AM (0 2 * * *)",
        nextRun: "Tomorrow at 2:00 AM",
        tools: "postgres, s3",
        persona: "engineer"
    },
    {
        instruction: "notify team when error rate spikes above 1%...",
        agentName: "error-alerter",
        linesGenerated: 58,
        schedule: "Every 10 minutes (*/10 * * * *)",
        nextRun: "In 10 minutes",
        tools: "sentry, slack",
        persona: "engineer"
    },
    {
        instruction: "track feature adoption and send weekly updates...",
        agentName: "adoption-tracker",
        linesGenerated: 95,
        schedule: "Weekly on Friday at 3:00 PM (0 15 * * 5)",
        nextRun: "Friday at 3:00 PM",
        tools: "analytics, email",
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
