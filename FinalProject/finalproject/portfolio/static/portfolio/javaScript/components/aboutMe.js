// Choose the version to render the first text.
const aboutMeTextOne = (language) => {
    if (language === "en") {
        return `My name is Jonathan Rosildo Silva Vieira, borned in Brasil in 03/06/1994. I Moved to Portugal in 2010 to dedicate myself to my studies. I started with fine art and design, where I learned different techniques, from painting, drawing, and photographing to product design and marketing. 
        I'm constantly participating in art exhibitions, with my own art and collective arts, some of them with Escola Superior de Educação de Lisboa. `;
    } else {
        return `Meu nome é Jonathan Rosildo Silva Vieira, nasci no Brasil
        em 03|06|1994, imigrei para Portugal em 2010 para
        dedicar-me aos estudos. Estudei Artes Plásticas e Design,
        onde desenvolvi tecnicas deste escultura, pintura, desenho e
        fotografia até Design de Produtos e Comunicações. Tenho
        participado em exposições, com obras próprias e coletivas,
        algumas com a Escola Superior de Educação de Lisboa.`;
    }
};

// Estuding path render in english or portugues
const educationPath = (language) => {
    return `
        <ul>
            <li class="educationList">
                <div class="yearContainer">
                    <p class="year">2019</p>
                </div>    
                <div class="educationPlaces">
                    <p>Aristotle University of Thessaloniki</p>
                    <p>ERASMUS +</p>
                </div>
            </li>
            <li class="educationList">
                <div class="yearContainer">
                    <p class="year">2016 - 2019</p>
                </div>    
                <div class="educationPlaces">
                    <p>
                        ${
                            language === "en"
                                ? "Visual Arts and Technologies Degree"
                                : "Licenciatura em Artes Visuais e Tecnologias"
                        }
                    </p>
                    <p>Escola Superior de Educação de Lisboa</p>
                </div>
            </li>
            <li class="educationList">
                <div class="yearContainer">
                    <p class="year">2015 - 2016</p>
                </div>    
                <div class="educationPlaces">
                    <p>
                        ${
                            language === "en"
                                ? "1st Year of a Degree in Equipment Design"
                                : "1° Ano de Licenciatura em Design de Equipamento"
                        }
                    </p>
                    <p>Faculdade de Belas-Artes de Lisboa</p>
                </div>
            </li>
            <li class="educationList">
                <div class="yearContainer">
                    <p class="year">2012 - 2015</p>
                </div>    
                <div class="educationPlaces">
                    <p>
                        ${
                            language === "en"
                                ? "Highschool grade in Science and Technology"
                                : "12° ano em Ciências e Tecnologias"
                        }
                    </p>
                    <p>Escola Secundária António Damásio</p>
                </div>
            </li>
        </ul>
        `;
};

// This function will render the second part of the homepage the "about me", where we'll tell a brief history of the author
// We have "language" as a parameter to know wich language the user wants to read that page.
function aboutMe(language) {
    // With the aboutMeTextOne we'll render the first part, the brief of how the author got here
    return `
        <div class="aboutMe">
            <div class="authorBrief">
                <h2 class="abouteMeSubtitle">
                    ${language === "en" ? "About me" : "Sobre mim"}
                </h2>
                <p>${aboutMeTextOne(language)}</p>
                <h2 class="abouteMeSubtitle">
                    ${language === "en" ? "Education" : "Estudos"}
                </h2>
                ${educationPath(language)}
            </div>
        </div>
        `;
}

export default aboutMe;
