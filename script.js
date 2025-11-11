// ============================================
// TYPING ANIMATION
// ============================================

// Task examples
const tasks = [
    {
        instruction: "retrain product recommendation model when new data arrives...",
        agentName: "model-retrainer",
        linesGenerated: 234,
        schedule: "Daily at 3:00 AM (0 3 * * *)",
        nextRun: "Tomorrow at 3:00 AM",
        tools: "mlflow, s3, kubernetes",
        persona: "ml-engineer"
    },
    {
        instruction: "monitor model drift and alert if accuracy drops below 85%...",
        agentName: "drift-detector",
        linesGenerated: 189,
        schedule: "Every hour (0 * * * *)",
        nextRun: "In 1 hour",
        tools: "prometheus, grafana, slack",
        persona: "mlops-engineer"
    },
    {
        instruction: "run hyperparameter tuning sweep for fraud detection model...",
        agentName: "hyperparam-optimizer",
        linesGenerated: 312,
        schedule: "Weekly on Sunday at 1:00 AM (0 1 * * 0)",
        nextRun: "Sunday at 1:00 AM",
        tools: "optuna, wandb, ray",
        persona: "ml-researcher"
    },
    {
        instruction: "validate feature pipeline and check for data quality issues...",
        agentName: "feature-validator",
        linesGenerated: 156,
        schedule: "Every 6 hours (0 */6 * * *)",
        nextRun: "Today at 6:00 PM",
        tools: "great-expectations, airflow",
        persona: "data-engineer"
    },
    {
        instruction: "auto-scale inference endpoints based on request volume...",
        agentName: "inference-scaler",
        linesGenerated: 203,
        schedule: "Every 5 minutes (*/5 * * * *)",
        nextRun: "In 5 minutes",
        tools: "kubernetes, prometheus, hpa",
        persona: "mlops-engineer"
    },
    {
        instruction: "generate weekly model performance reports and email to team...",
        agentName: "performance-reporter",
        linesGenerated: 178,
        schedule: "Weekly on Monday at 9:00 AM (0 9 * * 1)",
        nextRun: "Monday at 9:00 AM",
        tools: "mlflow, pandas, sendgrid",
        persona: "ml-engineer"
    },
    {
        instruction: "archive old model artifacts and update model registry...",
        agentName: "artifact-manager",
        linesGenerated: 142,
        schedule: "Weekly on Saturday at 2:00 AM (0 2 * * 6)",
        nextRun: "Saturday at 2:00 AM",
        tools: "mlflow, s3, model-registry",
        persona: "mlops-engineer"
    },
    {
        instruction: "run A/B tests on new model versions and analyze results...",
        agentName: "ab-test-analyzer",
        linesGenerated: 267,
        schedule: "Daily at 11:00 PM (0 23 * * *)",
        nextRun: "Today at 11:00 PM",
        tools: "statsmodels, pandas, slack",
        persona: "ml-engineer"
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
