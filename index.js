require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const fs = require('fs');

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const defaultPhotoUrl = "https://i.imgur.com/Q4zN9jG.png";


const testQuestions = require('./data/testQuestions');
const specialties = require('./data/testSpecialties');
const generalSpecialties = require('./data/generalSpecialties')
const commands = require('./data/commands')

// Хранилище для состояния пользователей (текущий вопрос, очки)
const userStates = {}; 



function getMainMenuKeyboard() {
    return {
        keyboard: [
            [{ text: 'Пройти тест на специальность' }],
            [{ text: 'Список специальностей' }]
        ],
        one_time_keyboard: true,
        resize_keyboard: true
    };
}

function getBackToMenuKeyboard() {
    return {
        keyboard: [
            [{ text: 'Назад в главное меню' }]
        ],
        one_time_keyboard: true,
        resize_keyboard: true
    };
}

function getBackToSpecialtiesKeyboard() {
    return {
        keyboard: [
            [{ text: 'Назад к списку специальностей' }],
            [{ text: 'Назад в главное меню' }]
        ],
        one_time_keyboard: true,
        resize_keyboard: true
    };
}

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    delete userStates[chatId];
    sendFirstMainMenu(chatId);
});
bot.onText(/\/test/, (msg) => {
    const chatId = msg.chat.id;
    delete userStates[chatId]; 
    startTest(chatId); 
});
bot.onText(/\/specialty/, (msg) => {
    const chatId = msg.chat.id;
    delete userStates[chatId]; 
    showSpecialtyCategories(chatId); 
});

function sendFirstMainMenu(chatId) {
    bot.sendMessage(chatId, `👋 Добро пожаловать! Я помогу вам выбрать направление в IT.
    \n\nДля начала тестирования, нажмите /test.
    \nДля просмотра описания специальностей, нажмите /specialty.`, { reply_markup: getMainMenuKeyboard() });
    userStates[chatId] = { state: 'idle' };
}

function sendMainMenu(chatId) {
    bot.sendMessage(chatId, `Хотите узнать, какая специальность подходит именно вам?\n
🚀 Выберите один из вариантов:`, { reply_markup: getMainMenuKeyboard() });
    userStates[chatId] = { state: 'idle' };
}
bot.setMyCommands(commands)

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (!userStates[chatId]) {
        userStates[chatId] = { state: 'idle' };
    }

    const currentState = userStates[chatId].state;

    if (currentState === 'idle') {
        if (messageText === 'Пройти тест на специальность') {
            startTest(chatId);
        } else if (messageText === 'Список специальностей') {
            showSpecialtyCategories(chatId);
        } else if (messageText === '/start' || messageText === "/test" || messageText === "/specialty") {
    
        }
         else {
            bot.sendMessage(chatId, 'Пожалуйста, выберите одно из действий ниже:', { reply_markup: getMainMenuKeyboard() });
        }
    } else if (currentState === 'testing') {
        if (userStates[chatId].currentQuestionIndex >= testQuestions.length) {
            // Если вопросов больше нет, но состояние все еще 'testing', принудительно завершаем тест
            console.warn(`User ${chatId} in testing state, but no more questions. Forcing finishTest.`);
            finishTest(chatId);
        } else {

            handleTestAnswer(chatId, messageText);
        }
    }else if (currentState === 'choosing_category') {
        if (messageText === '/test') {
            startTest(chatId); 
        } else {
            handleCategorySelection(chatId, messageText); 
        } 
    }else if (currentState === 'choosing_specialty') {
        handleSpecialtySelection(chatId, messageText);
    } else if (currentState === 'viewing_specialty_info') {
        handleNavigationFromSpecialtyInfo(chatId, messageText);
    }
});


function startTest(chatId) {
    userStates[chatId] = {
        state: 'testing',
        currentQuestionIndex: 0,
        scores: {}
    };
    askQuestion(chatId, 0);
}

function askQuestion(chatId, questionIndex) {
    const currentState = userStates[chatId];
    const totalQuestions = testQuestions.length;
    const questionData = testQuestions[questionIndex];


    let questionTextWithList = `--- Вопрос ${questionIndex + 1}/${totalQuestions} ---\n\n`; 
    questionTextWithList += `${questionData.question}\n\n`;

    const keyboardButtonsPerRow = []; 

    questionData.options.forEach((option, index) => {
        questionTextWithList += `${index + 1}. ${option.text}\n`;
        keyboardButtonsPerRow.push({ text: `${index + 1}` });
    });

    const replyMarkupKeyboard = keyboardButtonsPerRow.map(button => [button]);

    const options = {
        reply_markup: {
            keyboard: replyMarkupKeyboard, 
            one_time_keyboard: true,
            resize_keyboard: true
        }
    };

    const photoToSend = questionData.photoUrl || defaultPhotoUrl;

    bot.sendPhoto(chatId, photoToSend, { caption: questionTextWithList, ...options })
        .then(() => {
            
        })
        .catch((error) => {
            console.error(`На удалось отправить ${questionIndex + 1} to chatId ${chatId}:`, error);
            bot.sendMessage(chatId, questionTextWithList, options);
        });
}

function handleTestAnswer(chatId, answerText) {
    const currentState = userStates[chatId];
    const currentQuestionIndex = currentState.currentQuestionIndex;
    const questionData = testQuestions[currentQuestionIndex];

    const selectedOptionIndex = parseInt(answerText) - 1;
    
    if (selectedOptionIndex >= 0 && selectedOptionIndex < questionData.options.length) {
        const selectedOption = questionData.options[selectedOptionIndex];

        if (!currentState.scores) {
            currentState.scores = {};
        }

        for (const specialty in selectedOption.score) {
            currentState.scores[specialty] = (currentState.scores[specialty] || 0) + selectedOption.score[specialty];
        }

        currentState.currentQuestionIndex++;

        if (currentState.currentQuestionIndex >= testQuestions.length) {
            finishTest(chatId);
        } else {
            askQuestion(chatId, currentState.currentQuestionIndex);
        }
    } else {
        const retryKeyboard = questionData.options.map((_, index) => [{ text: `${index + 1}` }]);
        bot.sendMessage(chatId, 'Пожалуйста, выберите один из предложенных вариантов, введя его номер.', { 
            reply_markup: { 
                keyboard: retryKeyboard, 
                one_time_keyboard: true, 
                resize_keyboard: true 
            } 
        });
    }
}

function finishTest(chatId) {
    const currentState = userStates[chatId];

    if (!currentState || !currentState.scores) {
        console.error(`[${chatId}] Error: User state or scores missing in finishTest. Resetting.`);
        if (userStates[chatId]) {
            delete userStates[chatId];
        }
        sendMainMenu(chatId); 
        return;
    }

    const userScore = currentState.scores;
    let bestSpecialtyKey = null;
    let maxScore = -1;

    for (const specialtyKey in userScore) {
        if (userScore[specialtyKey] > maxScore) {
            maxScore = userScore[specialtyKey];
            bestSpecialtyKey = specialtyKey;
        }
    }

    let resultMessageHtml = "";

    if (bestSpecialtyKey && specialties[bestSpecialtyKey]) {
        const specialty = specialties[bestSpecialtyKey];
        const formattedSpecialtyName = `<b>${specialty.name}</b>`;
        
        resultMessageHtml = `По результатам теста, ваша наиболее подходящая специальность: ${formattedSpecialtyName}.\n\n${specialty.description}`;

        if (specialty.url) {
            resultMessageHtml += `\n\n<a href="${specialty.url}">🔗 Подробнее</a>`;
        }
        
        const photoIdentifier = specialty.photoUrl || defaultPhotoUrl;

        bot.sendPhoto(chatId, photoIdentifier, { caption: resultMessageHtml, parse_mode: 'HTML' })
            .then(() => {

                setTimeout(() => {
                    sendMainMenu(chatId);
                }, 3000); 
                delete userStates[chatId]; 
            })
            .catch(() => {
                bot.sendMessage(chatId, resultMessageHtml, { parse_mode: 'HTML' })
                    .then(() => {
                        setTimeout(() => {
                            sendMainMenu(chatId);
                        }, 3000);
                        delete userStates[chatId];
                    })
                    .catch((textError) => {
                        console.error(`Error sending fallback text message:`, textError);
                        delete userStates[chatId]; 
                    });
            });
    } else {
        resultMessageHtml = "Спасибо за прохождение теста! Не удалось определить специальность. Попробуйте пройти тест еще раз.";
        
        bot.sendMessage(chatId, resultMessageHtml) 
            .then(() => {
                setTimeout(() => {
                    sendMainMenu(chatId);
                }, 3000);
                delete userStates[chatId];
            })
            .catch((textError) => {
                console.error(`Error sending message when no specialty found:`, textError);
                delete userStates[chatId];
            });
    }
}

function handleCategorySelection(chatId, selectedCategoryName) {
    if (selectedCategoryName === 'Назад в главное меню') {
        sendMainMenu(chatId);
        delete userStates[chatId];
        return;
    }

    const selectedCategoryKey = Object.keys(generalSpecialties).find(key => generalSpecialties[key].name === selectedCategoryName);

    if (selectedCategoryKey) {
        const categoryData = generalSpecialties[selectedCategoryKey];
        
        // Формируем кнопки для направлений внутри категории
        const specialtyButtons = Object.keys(categoryData.specialties).map(key => {
            return [{ text: categoryData.specialties[key].name }];
        });

        specialtyButtons.push([{ text: 'Назад к выбору категории' }], [{ text: 'Назад в главное меню' }]); // Кнопки навигации

        const options = {
            reply_markup: {
                keyboard: specialtyButtons,
                one_time_keyboard: true,
                resize_keyboard: true
            }
        };
        bot.sendMessage(chatId, `Выберите направление в категории "${categoryData.name}":`, options);
        userStates[chatId] = { state: 'choosing_specialty', currentCategoryKey: selectedCategoryKey };
    } else {
         const errorMessage = 'Вы ввели некорректное название специальности. Пожалуйста, выберите одно из предложенных направлений:';
        
        // Формируем клавиатуру снова, чтобы пользователь мог выбрать правильно
        const specialtyButtons = Object.keys(categoryData.specialties).map(key => {
            return [{ text: categoryData.specialties[key].name }];
        });
        specialtyButtons.push([{ text: 'Назад к выбору категории' }], [{ text: 'Назад в главное меню' }]);

        const options = {
            reply_markup: {
                keyboard: specialtyButtons,
                one_time_keyboard: true,
                resize_keyboard: true
            }
        };
        bot.sendMessage(chatId, errorMessage, options);
    }
}
function showSpecialtyCategories(chatId) {
    const categoryButtons = Object.keys(generalSpecialties).map(key => {
        return [{ text: generalSpecialties[key].name }];
    });

    categoryButtons.push([{ text: 'Назад в главное меню' }]);

    const options = {
        reply_markup: {
            keyboard: categoryButtons,
            one_time_keyboard: true,
            resize_keyboard: true
        }
    };
    bot.sendMessage(chatId, 'Выберите категорию специальностей:', options);
    userStates[chatId] = { state: 'choosing_category' };
}


function handleSpecialtySelection(chatId, selectedSpecialtyName) {
    if (selectedSpecialtyName === 'Назад в главное меню') {
        sendMainMenu(chatId);
        delete userStates[chatId];
        return;
    } else if (selectedSpecialtyName === 'Назад к выбору категории') {
        showSpecialtyCategories(chatId);
        return;
    }

    const currentCategoryKey = userStates[chatId].currentCategoryKey;
    if (!currentCategoryKey || !generalSpecialties[currentCategoryKey]) {
        showSpecialtyCategories(chatId);
        return;
    }

    const categoryData = generalSpecialties[currentCategoryKey];
    const specialtyKey = Object.keys(categoryData.specialties).find(key => categoryData.specialties[key].name === selectedSpecialtyName);

    if (specialtyKey) {
        const specialty = categoryData.specialties[specialtyKey]; 

        const formattedSpecialtyName = `<b>${specialty.name}</b>`;
        let messageHtml = `${formattedSpecialtyName}\n\n${specialty.description}`;

        if (specialty.url) {
            messageHtml += `\n\n<a href="${specialty.url}">🔗 Подробнее</a>`;
        }

        const photoIdentifier = specialty.fileId || defaultPhotoUrl;
        bot.sendPhoto(chatId, photoIdentifier, { caption: messageHtml, parse_mode: 'HTML' })
            .then(() => {
                
            })
            .catch((error) => {
                console.error(`не удалось отрпвить фото ${chatId}:`, error);
                bot.sendMessage(chatId, messageHtml, { parse_mode: 'HTML' });
            });

        setTimeout(() => {
            bot.sendMessage(chatId, 'Что хотите сделать дальше?', { reply_markup: getBackToSpecialtiesKeyboard() }); // Здесь нужно, чтобы кнопка "Назад к списку специальностей" вела к showSpecialtiesList(chatId, categoryData, currentCategoryKey);
        }, 1000);

        userStates[chatId] = { state: 'viewing_specialty_info', currentCategoryKey: currentCategoryKey, currentSpecialtyKey: specialtyKey };
    } else {
        showSpecialtiesList(chatId, categoryData, currentCategoryKey);
    }
}

function handleNavigationFromSpecialtyInfo(chatId, buttonText) {
    if (buttonText === 'Назад к списку специальностей') {
        showSpecialtyCategories(chatId);
    } else if (buttonText === 'Назад в главное меню') {
        sendMainMenu(chatId);
        delete userStates[chatId];
    }
}

console.log('Бот запущен...');