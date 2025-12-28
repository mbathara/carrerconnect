const questions = [
    {
        question: "Saat waktu luang, apa yang paling suka kamu lakukan?",
        options: [
            { text: "Mengoprek gadget atau mencoba aplikasi baru", score: { tech: 10, analytical: 5 } },
            { text: "Menggambar, menulis, atau mendesain sesuatu", score: { creative: 10, artistic: 5 } },
            { text: "Membantu teman atau mengobrol dengan orang baru", score: { social: 10, communication: 5 } },
            { text: "Menyelesaikan puzzle, catur, atau soal logika", score: { analytical: 10, math: 5 } }
        ]
    },
    {
        question: "Bagaimana cara kamu memecahkan masalah?",
        options: [
            { text: "Mencari data dan fakta yang akurat", score: { analytical: 10, research: 5 } },
            { text: "Mencoba pendekatan baru yang unik", score: { creative: 10, innovation: 5 } },
            { text: "Berdiskusi dengan tim untuk cari solusi bersama", score: { social: 10, leadership: 5 } },
            { text: "Melihat pola dan sistem yang ada", score: { tech: 5, analytical: 10 } }
        ]
    },
    {
        question: "Lingkungan kerja mana yang paling membuatmu nyaman?",
        options: [
            { text: "Kantor modern dengan teknologi canggih", score: { tech: 10, corporate: 5 } },
            { text: "Studio seni atau tempat dengan kebebasan berekspresi", score: { creative: 10, artistic: 8 } },
            { text: "Bekerja langsung di lapangan bertemu banyak orang", score: { social: 10, adventure: 5 } },
            { text: "Meja kerja yang tenang untuk fokus mendalam", score: { analytical: 10, focus: 5 } }
        ]
    },
    {
        question: "Apa hal yang paling kamu banggakan?",
        options: [
            { text: "Berhasil memperbaiki sesuatu yang rusak", score: { tech: 10, engineering: 5 } },
            { text: "Menciptakan karya yang dilihat banyak orang", score: { creative: 10, marketing: 5 } },
            { text: "Mampu meyakinkan atau menginspirasi orang lain", score: { social: 10, communication: 10 } },
            { text: "Menemukan solusi efisien untuk masalah rumit", score: { analytical: 10, optimization: 5 } }
        ]
    },
    {
        question: "Jika kamu membuat aplikasi, fitur apa yang kamu buat?",
        options: [
            { text: "Mesin pengolah data yang sangat cepat", score: { tech: 10, analytical: 8 } },
            { text: "Interface yang cantik dan mudah digunakan", score: { creative: 10, tech: 5 } },
            { text: "Platform untuk komunitas saling berbagi", score: { social: 10, management: 5 } },
            { text: "Algoritma cerdas untuk otomasi tugas", score: { analytical: 10, tech: 7 } }
        ]
    }
];

const resultsData = [
    {
        id: "tech-wizard",
        title: "The Tech Wizard",
        description: "Kamu adalah seseorang yang sangat logis dan menyukai teknologi. Kamu senang memahami bagaimana sesuatu bekerja di bawah kap.",
        jobs: ["Full Stack Developer", "Data Scientist", "Cybersecurity Specialist"],
        traits: ["tech", "analytical"]
    },
    {
        id: "creative-visionary",
        title: "Creative Visionary",
        description: "Kamu melihat dunia dari sudut pandang yang berbeda. Kreativitasmu adalah aset terbesarmu dalam menciptakan sesuatu yang baru.",
        jobs: ["UI/UX Designer", "Creative Director", "Content Creator"],
        traits: ["creative", "artistic"]
    },
    {
        id: "social-leader",
        title: "Social Leader",
        description: "Kamu memiliki kecerdasan emosional yang tinggi dan mampu menggerakkan orang lain menuju tujuan bersama.",
        jobs: ["Public Relations", "Human Resources Manager", "Social Entrepreneur"],
        traits: ["social", "communication"]
    },
    {
        id: "analytical-strategist",
        title: "Analytical Strategist",
        description: "Data adalah sahabatmu. Kamu mampu melihat pola di mana orang lain hanya melihat kekacauan.",
        jobs: ["Business Analyst", "Financial Planner", "Research Scientist"],
        traits: ["analytical", "math"]
    }
];

let currentStep = 0;
let userScores = {
    tech: 0,
    creative: 0,
    social: 0,
    analytical: 0
};
let currentUserEmail = null;

// UI Elements
const heroSection = document.getElementById('hero');
const assessmentSection = document.getElementById('assessment');
const resultsSection = document.getElementById('results');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressFill = document.getElementById('progress-fill');
const stepInfo = document.getElementById('step-info');
const progressPercent = document.getElementById('progress-percent');
const loginSection = document.getElementById('login');
const registerSection = document.getElementById('register');
const verificationSection = document.getElementById('verification');
const loginLink = document.querySelector('.nav-login');
const navHome = document.querySelector('nav a[href="#hero"]');
const navStart = document.querySelector('nav a[href="#assessment"]');
const toRegisterLink = document.getElementById('to-register');
const toLoginLink = document.getElementById('to-login');
const resultTitle = document.getElementById('result-title');
const jobRecommendations = document.getElementById('job-recommendations');
const analysisText = document.getElementById('analysis-text');
const nav = document.querySelector('nav');
const loginLogoutLink = document.getElementById('login-logout-link');
const restartTestBtn = document.getElementById('restart-test-btn');
const saveResultsBtn = document.getElementById('save-results-btn');

// Handle Navigation
function showSection(sectionId) {
    [heroSection, assessmentSection, resultsSection, loginSection, registerSection, verificationSection].forEach(s => s.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');

    // Hide nav if on login/register/verify
    if (['login', 'register', 'verification'].includes(sectionId)) {
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
        loginLogoutLink.innerText = 'Log out';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

loginLogoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (loginLogoutLink.innerText === 'Log out') {
        // Logout Logic
        currentStep = 0;
        userScores = { tech: 0, creative: 0, social: 0, analytical: 0 };
        loginLogoutLink.innerText = 'Login';
        showSection('login');
    } else {
        showSection('login');
    }
});

toRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('register');
});

toLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('login');
});

navHome.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('hero');
});

navStart.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('assessment');
    if (currentStep === 0) renderQuestion();
});

// Start Quiz
startBtn.addEventListener('click', () => {
    showSection('assessment');
    renderQuestion();
});

function renderQuestion() {
    const q = questions[currentStep];
    questionText.innerText = q.question;
    optionsContainer.innerHTML = '';

    // Update Progress
    const progress = ((currentStep) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    stepInfo.innerText = `Pertanyaan ${currentStep + 1} dari ${questions.length}`;
    progressPercent.innerText = `${Math.round(progress)}%`;

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt.text;
        btn.style.animationDelay = `${index * 0.1}s`;
        btn.onclick = () => handleAnswer(opt.score);
        optionsContainer.appendChild(btn);
    });
}

function handleAnswer(score) {
    // Add weights to user scores
    for (const key in score) {
        if (userScores.hasOwnProperty(key)) {
            userScores[key] += score[key];
        }
    }

    currentStep++;

    if (currentStep < questions.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    assessmentSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');

    // Determine winner category
    let maxScore = -1;
    let winnerTrait = 'tech';

    for (const trait in userScores) {
        if (userScores[trait] > maxScore) {
            maxScore = userScores[trait];
            winnerTrait = trait;
        }
    }

    // Find result template
    const result = resultsData.find(r => r.traits.includes(winnerTrait)) || resultsData[0];

    // Update UI
    resultTitle.innerText = result.title;
    analysisText.innerText = result.description;

    jobRecommendations.innerHTML = '';
    result.jobs.forEach(job => {
        const div = document.createElement('div');
        div.className = 'job-item';
        div.innerHTML = `<i data-lucide="check-circle"></i> <span>${job}</span>`;
        jobRecommendations.appendChild(div);
    });

    lucide.createIcons();

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function restartQuiz() {
    currentStep = 0;
    userScores = {
        tech: 0,
        creative: 0,
        social: 0,
        analytical: 0
    };
    showSection('assessment');
    renderQuestion();
}

restartTestBtn.addEventListener('click', (e) => {
    e.preventDefault();
    restartQuiz();
});

saveResultsBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!currentUserEmail) {
        alert('Silakan login terlebih dahulu untuk menyimpan hasil.');
        showSection('login');
        return;
    }

    const winnerData = resultsData.find(r => r.title === resultTitle.innerText) || resultsData[0];

    saveResultsBtn.disabled = true;
    saveResultsBtn.innerText = 'Menyimpan...';

    const payload = {
        email: currentUserEmail,
        result: {
            title: resultTitle.innerText,
            description: analysisText.innerText,
            scores: userScores
        }
    };

    console.log('Sending results payload:', payload);

    try {
        const response = await fetch('api/save_results.php', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        console.log('Save results response:', data);
        if (data.status === 'success') {
            alert('Hasil berhasil disimpan ke database!');
            showSection('hero'); // Otomatis kembali ke beranda
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error(err);
        alert('Gagal menyimpan hasil.');
    } finally {
        saveResultsBtn.disabled = false;
        saveResultsBtn.innerText = 'Simpan Hasil';
    }
});

// Handle Login Submit
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.disabled = true;
    btn.innerText = 'Memuat...';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('api/login.php', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (data.status === 'success') {
            alert('Login Berhasil!');
            currentUserEmail = email; // Simpan email user yang sedang login
            nav.classList.remove('hidden');
            showSection('hero');
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error(err);
        alert('Gagal menghubungi server.');
    } finally {
        btn.disabled = false;
        btn.innerHTML = 'Masuk <i data-lucide="log-in"></i>';
        lucide.createIcons();
    }
});

// Handle Register Submit
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.disabled = true;
    btn.innerText = 'Mengirim...';

    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirmPass = document.getElementById('reg-confirm-password').value;

    if (password !== confirmPass) {
        alert('Password dan konfirmasi password tidak cocok!');
        btn.disabled = false;
        btn.innerHTML = 'Daftar Sekarang <i data-lucide="user-plus"></i>';
        lucide.createIcons();
        return;
    }

    try {
        const response = await fetch('api/register.php', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (data.status === 'success') {
            document.getElementById('user-email-display').innerText = email;
            currentUserEmail = email; // Simpan email calon user
            alert('Pendaftaran berhasil! Kode verifikasi telah dikirim.');
            showSection('verification');
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error(err);
        alert('Gagal mengirim data pendaftaran.');
    } finally {
        btn.disabled = false;
        btn.innerHTML = 'Daftar Sekarang <i data-lucide="user-plus"></i>';
        lucide.createIcons();
    }
});

// Handle Verification Submit
document.getElementById('verification-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.disabled = true;
    btn.innerText = 'Memverifikasi...';

    const email = document.getElementById('user-email-display').innerText.trim();
    const otp = document.getElementById('verify-code').value.trim();

    try {
        const response = await fetch('api/verify.php', {
            method: 'POST',
            body: JSON.stringify({ email, otp })
        });
        const data = await response.json();

        if (data.status === 'success') {
            alert('Akun berhasil diverifikasi! Selamat datang.');
            // currentUserEmail sudah diset saat register, tapi kita pastikan lagi
            const email = document.getElementById('user-email-display').innerText.trim();
            currentUserEmail = email;

            nav.classList.remove('hidden');
            showSection('hero');
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error(err);
        alert('Gagal memverifikasi kode.');
    } finally {
        btn.disabled = false;
        btn.innerHTML = 'Verifikasi Akun <i data-lucide="check"></i>';
        lucide.createIcons();
    }
});

// Visual Effects: Cursor Glow
document.addEventListener('mousemove', (e) => {
    const glow = document.querySelector('.cursor-glow');
    glow.style.left = e.clientX - 300 + 'px';
    glow.style.top = e.clientY - 300 + 'px';
});
