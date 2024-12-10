document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById("quiz");
    const submitButton = document.getElementById("submit");
    const scoreContainer = document.getElementById("score");

    fetch('questions.json')
        .then(response => response.json())
        .then(questions => loadQuiz(questions));

    function loadQuiz(questions) {
        quizContainer.innerHTML = questions.map((q, index) => `
            <div class="question">
                <p>${q.question}</p>
                <div class="answers">
                    ${q.answers.map((a, i) => `
                        <label>
                            <input type="radio" name="question${index}" value="${i}">
                            ${a}
                        </label>
                    `).join('')}
                </div>
            </div>
        `).join('');

        submitButton.addEventListener("click", () => {
            let score = 0;
            const answers = document.querySelectorAll(".answers");

            questions.forEach((q, index) => {
                const userAnswer = document.querySelector(`input[name="question${index}"]:checked`);
                const userAnswerIndex = userAnswer ? parseInt(userAnswer.value) : -1;

                const feedback = document.createElement("div");
                feedback.innerHTML = userAnswerIndex === q.correct 
                    ? `<p class="correct">Correct!</p>`
                    : `<p class="wrong">Wrong! The correct answer is: ${q.answers[q.correct]}</p>`;

                answers[index].appendChild(feedback);

                if (userAnswerIndex === q.correct) {
                    score++;
                }
            });

            scoreContainer.textContent = `Your score: ${score} / ${questions.length}`;
            submitButton.disabled = true;
        });
    }
});
