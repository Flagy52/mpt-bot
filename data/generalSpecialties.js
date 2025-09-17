const generalSpecialties = {
    program: { 
        name: "👨‍💻 Программные специальности",
        specialties: {
            WB: {
                name: "Разработчик WEB-приложений — 09.02.09",
                description: "Специалист по веб-разработке создает и оптимизирует веб-приложения и сайты. Он может специализироваться на Front-end или Back-end разработке, а также работать как Full Stack Developer. Выпускники занимаются проектированием, технической поддержкой и оптимизацией веб-продуктов с использованием современных технологий и инструментов",
                fileId: 'AgACAgIAAxkBAAIID2jJNyIu_lcf2BT70E3upb5XpCPDAAIN_TEbn2dJSm8B1gXnJ6zwAQADAgADeQADNgQ', 
                url: 'https://mpt.ru/courses/razrabotchik-web-prilozhenij-09-02-09-veb-razrabotka/'
            },
            Programmer: {
                name: "Программист — 09.02.07",
                description: "Программист - это творец, превращающий идеи в алгоритмы. Он работает с различными языками программирования и технологиями, создавая решения для различных задач. Программист также разрабатывает системы, обеспечивающие безопасность и масштабируемость, и взаимодействует с другими специалистами для достижения общих целей.",
                fileId: 'AgACAgIAAxkBAAIIFmjJOEP6DPmo6kh8fAfXlqRi1YzAAAI1_TEbn2dJSno6H4hRHZIbAQADAgADeQADNgQ',
                url: 'https://mpt.ru/courses/programmist/'
            },
            Tester: {
                name: "Специалист по тестированию в области информационных технологий — 09.02.07",
                description: "Этот профессионал отвечает за качество программного обеспечения, выявляя ошибки до его релиза. Он анализирует требования, создает тестовые сценарии, выполняет тестирование и взаимодействует с командой для устранения недостатков. Роль тестировщика становится все более важной в условиях стремительного развития технологий.",
                fileId: 'AgACAgIAAxkBAAIIGmjJOMYRNpMopy1DGpc7PC4PtkTQAAJE_TEbn2dJSoTUQDLPqo6HAQADAgADdwADNgQ',
                url: 'https://mpt.ru/courses/speczialist-po-testirovaniyu-v-oblasti/'
            },
            IS: {
                name: "Специалист по информационным системам — 09.02.07",
                description: "Эта специальность объединяет знания в области информационных технологий и управления данными. Студенты изучают проектирование и внедрение компьютерных систем, работа с базами данных, кибербезопасность и искусственный интеллект. Выпускники становятся востребованными специалистами в IТ-индустрии.",
                fileId: 'AgACAgIAAxkBAAIIHGjJOOiC9lFBpHJYWioa4GFMTFbFAAJG_TEbn2dJSiZ1FOVo3aTcAQADAgADeAADNgQ',
                url: 'https://mpt.ru/courses/speczialist-po-informaczionnym-sistem/'
            },
            Multi: {
                name: "Разработчик WEB и мультимедийных приложений — 09.02.07",
                description: "Этот специалист создает веб-сайты и интерактивные приложения, объединяя функциональность и эстетику. Он разрабатывает мультимедийный контент, оптимизирует производительность и обеспечивает кросс-браузерную совместимость. Это востребованная профессия с возможностями для карьерного роста.",
                fileId: 'AgACAgIAAxkBAAIIHmjJOTTjH-DjszmwTsL5EkG3GjOMAAJL_TEbn2dJSkzFcRV7rWcWAQADAgADdwADNgQ',
                url: 'https://mpt.ru/courses/razrabotchik-web-i-multimedijnyh-prilozh/'
            },
            BD: {
                name: "Администратор баз данных — 09.02.07",
                description: "Администратор баз данных отвечает за создание, настройку и оптимизацию баз данных, обеспечивая их безопасность и производительность. Он разрабатывает структуры баз данных, защищает данные от угроз и следит за эффективностью работы систем. Эта роль критически важна для успешного функционирования современных приложений и систем.",
                fileId: 'AgACAgIAAxkBAAIIIGjJOVGToUae8fEZz9umZT6HnJX5AAJM_TEbn2dJSmtW2DTUtwsLAQADAgADeQADNgQ',
                url: 'https://mpt.ru/courses/administrator-baz-dannyh/'
            },
        }
    },
    hardware: {
        name: "🛠 Аппаратные специальности",
        specialties: {
            th: {
                name: "Техник по защите информации — 10.02.05",
                description: "Специалисты в этой области обеспечивают информационную безопасность автоматизированных систем, защищая данные от киберугроз. Они изучают основы безопасности, автоматизированные системы, криптографию, сетевые технологии, программирование и юридические аспекты. Выпускники работают в IT-компаниях, банках, государственных структурах и крупных корпорациях.",
                fileId: 'AgACAgIAAxkBAAIIEmjJN437oyrVzT9dLq3-B_dKZNOYAAIQ_TEbn2dJShcrxY4mZQjRAQADAgADeQADNgQ',
                url: 'https://mpt.ru/courses/tehnik-po-zashhite-informaczii/'
            },
            BPL: {
                name: "Оператор беспилотных летательных аппаратов — 25.02.08",
                description: "Эта специальность объединяет передовые технологии и навыки управления БПЛА. Студенты изучают принципы работы беспилотников, их конструкции и безопасность. Выпускники востребованы в геодезии, сельском хозяйстве, энергетике и кибербезопасности.",
                fileId: 'AgACAgIAAxkBAAIIFGjJN711kjunpwW5CCyUuKEOGGSoAAIU_TEbn2dJStW01zBS1i9DAQADAgADeQADNgQ', 
                url: 'https://mpt.ru/courses/operator-bespilotnyh-letatelnyh-ap/' 
            },
            TI: {
                name: "Техник по интеллектуальным интегрированным системам — 09.02.08",
                description: "Специалисты создают умные системы, которые решают сложные задачи в реальном времени. Они изучают искусственный интеллект, интеграцию систем, анализ данных и киберфизические системы. Выпускники работают в промышленности, транспорте, медицине и экологии, формируя новый образ жизни с гармонией человека и машины.",
                fileId: 'AgACAgIAAxkBAAIIGGjJOGDJ59gzpRzqEuilRU17ifwmAAI4_TEbn2dJSsbdEY4xH8reAQADAgADeQADNgQ', 
                url: 'https://mpt.ru/courses/tehnik-po-intellektualnym-integri/' 
            },
            SysAdmin: {
                name: "Системный администратор — 09.02.06",
                description: "Эти специалисты поддерживают работоспособность сетей и серверов, обеспечивая безопасность данных и решение проблем. Они настраивают оборудование, управляют серверами и автоматизируют процессы. С увеличением цифровизации спрос на таких специалистов растет, открывая перспективы карьерного роста.",
                fileId: 'AgACAgIAAxkBAAIIJGjJOkwfb9E3Uw9GCtTd8CdY26igAAJY_TEbn2dJSvCl5gkRUS-gAQADAgADeQADNgQ', 
                url: 'https://mpt.ru/courses/sistemnyj-administrator/' 
            },
            KS: {
                name: "Специалист по компьютерным системам — 09.02.01",
                description: "Эта специальность готовит специалистов по разработке и обслуживанию компьютерного оборудования и программного обеспечения. Студенты учатся проектировать компьютеры, настраивать операционные системы и диагностировать неисправности. Выпускники становятся «докторами» для компьютерной техники, улучшая ее эффективность и надежность.",
                fileId: 'AgACAgIAAxkBAAIIImjJOdbK2dDb491ldbLty7bHkWffAAJQ_TEbn2dJStLt5QWxragNAQADAgADeQADNgQ', 
                url: 'https://mpt.ru/courses/speczialist-po-kompyuternym-sistemam/' 
            },
        }
    },
    gum: { 
        name: "⚖ Гуманитарные специальности",
        specialties: {
            Designer: {
                name: "Юрист — 40.02.04",
                description: "Юриспруденция - это искусство понимания и применения законов для сохранения справедливости. Юристы анализируют и интерпретируют правовые нормы, решая споры и конфликты. Они изучают различные области права и должны уметь предвидеть последствия своих решений, защищая права людей и общества. Эта специальность требует как ума, так и сострадания, ведь за каждым делом стоят человеческие судьбы.",
                fileId: 'AgACAgIAAxkBAAIIlGjJPhLrGLaY4-fU7xeoNoVGfwfyAAJ1_TEbn2dJSqMU2JZx8LUBAQADAgADeQADNgQ', 
                url: 'https://mpt.ru/courses/yurist/' 
            },
        }
    }

};

module.exports = generalSpecialties;