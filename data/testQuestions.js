const defaultPhotoUrl = "https://i.imgur.com/Q4zN9jG.png";
const testQuestions = [
    {
        question: "1. Что вас больше всего привлекает в работе?",
        photoUrl: "AgACAgIAAxkBAAIEbWjBbkOg00WQ7LG_vlSJRNcLWDUsAAIw9zEbYNUQSsW0bDhSQn_kAQADAgADeAADNgQ",
        options: [
            { text: "Создание чего-то нового и креативного", score: { Programmer: 1, WebDev: 1} },
            { text: "Решать сложные технические задачи", score: { Programmer: 1, Tester: 1} },
            { text: "Организовывать и управлять процессами", score: { SysAdmin: 1,} },
            { text: "Делать сложные вещи простыми для пользователя", score: { WebDev: 1} },
            { text: "Работать с данными и анализировать их", score: { DBA: 1 } }
        ]
    },
    {
        question: "2. Какой тип задач вам кажется наиболее интересным?",
        photoUrl: "AgACAgIAAxkBAAIEcGjBbnv03vg012DCUsJDEBhB7zOkAAIx9zEbYNUQSgABmwoKpLVK1gEAAwIAA3gAAzYE", 
        options: [
            { text: "Написание кода и алгоритмов", score: { Programmer: 1} },
            { text: "Поиск и исправление ошибок", score: { Tester: 1 } },
            { text: "Системное администрирование и поддержка", score: { SysAdmin: 1 } },
            { text: "Дизайн интерфейсов и пользовательский опыт", score: { WebDev: 1 } },
            { text: "Анализ данных и построение отчетов", score: { DBA: 1 } }
        ]
    },
    {
        question: "3. Как бы вы описали свой идеальный рабочий день?",
        photoUrl: "AgACAgIAAxkBAAIEc2jBbpz8F-qVysp2DcaG35Wy800HAAIy9zEbYNUQSk15prPxlfUoAQADAgADeQADNgQ", 
        options: [
            { text: "Полностью погружен в написание кода, решаю сложную проблему.", score: { Programmer: 1 } },
            { text: "Нахожу и устраняю ошибки, улучшая качество продукта.", score: { Tester: 1 } },
            { text: "Управляю инфраструктурой, обеспечивая стабильную работу систем.", score: { SysAdmin: 1 } },
            { text: "Создаю удобный и привлекательный интерфейс для пользователей.", score: { WebDev: 1 } },
            { text: "Исследую большие объемы данных, ищу скрытые закономерности.", score: { DBA: 1 } }
        ]
    },
    {
        question: "4. С какой рабочей атмосферой вы себя чувствуете наиболее комфортно?",
        photoUrl: "AgACAgIAAxkBAAIEdmjBbrETTbg4r__V6PIHcHoBdaSJAAIz9zEbYNUQSi0NjVBqajfxAQADAgADeQADNgQ",
        options: [
            { text: "Динамичная, требующая постоянного обучения и адаптации.", score: { Programmer: 1 } },
            { text: "Тщательная, с фокусом на деталях и точности.", score: { Tester: 1 } },
            { text: "Структурированная, с четкими правилами и процессами.", score: { SysAdmin: 1 } },
            { text: "Креативная, с возможностью экспериментировать и предлагать новые идеи.", score: { WebDev: 1 } },
            { text: "Аналитическая, с возможностью глубоко погружаться в информацию.", score: { DBA: 1 } }
        ]
    },
    {
        question: "5. Какое из этих направлений вам кажется наиболее перспективным?",
        photoUrl: "AgACAgIAAxkBAAIEeWjBbsZp1sP28odr1jAXkFnd2oAtAAI09zEbYNUQShFL7miFbZClAQADAgADeQADNgQ", 
        options: [
            { text: "Разработка новых программных продуктов.", score: { Programmer: 1 } },
            { text: "Обеспечение качества программного обеспечения.", score: { Tester: 1 } },
            { text: "Управление и оптимизация IT-инфраструктуры.", score: { SysAdmin: 1 } },
            { text: "Создание привлекательных и функциональных веб-сайтов и приложений.", score: { WebDev: 1 } },
            { text: "Работа с большими данными и машинным обучением.", score: { DBA: 1 } }
        ]
    },
    {
        question: "6. Что для вас важнее в команде?",
        photoUrl: "AgACAgIAAxkBAAIEfGjBbtvjGlWVk7bBKITbPK8PENeuAAI19zEbYNUQSl4MnzpDJjBVAQADAgADeQADNgQ", 
        options: [
            { text: "Совместное решение сложных технических вызовов.", score: { Programmer: 1 } },
            { text: "Коллеги, которые замечают и сообщают о проблемах.", score: { Tester: 1 } },
            { text: "Надежность и предсказуемость в работе команды.", score: { SysAdmin: 1 } },
            { text: "Свобода самовыражения и генерации новых идей.", score: { WebDev: 1 } },
            { text: "Точность и обоснованность принимаемых решений.", score: { DBA: 1 } }
        ]
    },
    {
        question: "7. Какой инструмент или технология вас бы больше всего заинтересовал?",
        photoUrl: "AgACAgIAAxkBAAIEf2jBbu4ybx5_hBi1Mg00ZFA8zwieAAI29zEbYNUQSm-LTZvnuitZAQADAgADeQADNgQ", 
        options: [
            { text: "Новые языки программирования и фреймворки.", score: { Programmer: 1 } },
            { text: "Инструменты автоматизации тестирования.", score: { Tester: 1 } },
            { text: "Облачные технологии и DevOps.", score: { SysAdmin: 1 } },
            { text: "Фронтенд-фреймворки и UI/UX дизайн.", score: { WebDev: 1 } },
            { text: "Базы данных и инструменты для анализа данных.", score: { DBA: 1 } }
        ]
    },
    {
        question: "8. С каким типом проблем вы готовы бороться?",
        photoUrl: "AgACAgIAAxkBAAIEgmjBbwZxGh9eXU-gtf8w4zcPwdn9AAI39zEbYNUQSiMesBq-Z6tlAQADAgADeAADNgQ",
        options: [
            { text: "Сложные алгоритмические задачи.", score: { Programmer: 1 } },
            { text: "Скрытые ошибки и уязвимости.", score: { Tester: 1 } },
            { text: "Неэффективность систем и процессов.", score: { SysAdmin: 1 } },
            { text: "Неудобные пользовательские интерфейсы.", score: { WebDev: 1 } },
            { text: "Проблемы с доступом и целостностью данных.", score: { DBA: 1 } }
        ]
    },
    {
        question: "9. Какое из этих утверждений вам наиболее близко?",
        photoUrl: "AgACAgIAAxkBAAIEhWjBbx53Gu3sLh5-n3IvvaKmFdwhAAI49zEbYNUQSnCUjL7dXoRrAQADAgADeAADNgQ",
        options: [
            { text: "Я могу создать работающий продукт с нуля.", score: { Programmer: 1 } },
            { text: "Я могу гарантировать, что продукт работает без ошибок.", score: { Tester: 1 } },
            { text: "Я могу обеспечить стабильную работу любой системы.", score: { SysAdmin: 1 } },
            { text: "Я могу сделать так, чтобы пользователям нравилось пользоваться продуктом.", score: { WebDev: 1 } },
            { text: "Я могу извлечь ценную информацию из любых данных.", score: { DBA: 1 } }
        ]
    },
    {
        question: "10. Какую роль вы видите для себя в будущем IT-проекте?",
        photoUrl: "AgACAgIAAxkBAAIEiGjBby_reNfA4gaTBZM6PcXgkxWJAAI59zEbYNUQSmZtSdr2AAH_eAEAAwIAA3gAAzYE", 
        options: [
            { text: "Разработчик, создающий основную функциональность.", score: { Programmer: 1 } },
            { text: "Тестировщик, обеспечивающий надежность.", score: { Tester: 1 } },
            { text: "Системный администратор, поддерживающий инфраструктуру.", score: { SysAdmin: 1 } },
            { text: "UI/UX дизайнер, работающий над пользовательским опытом.", score: { WebDev: 1 } },
            { text: "Аналитик данных, принимающий решения на основе информации.", score: {DBA: 1 } }
        ]
    }
];

module.exports = testQuestions;