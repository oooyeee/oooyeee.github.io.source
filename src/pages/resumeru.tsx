
import ResumeTemplate from "./__resume.template"

import Header from "../components/layout/header"
import LanguageMenu from "../components/languageMenu"
import NavigationMenu from "../components/navigationMenu"
import Footer from "../components/layout/footer"
import FootCopyright from "../components/footCopyright"

import { uiState, appRoot, backgroundRoot } from "../constants"
import type { ReactNode, CSSProperties } from "react"

const style = {
    backgroundRoot: backgroundRoot,
    appRoot: appRoot
}

function ResumeHydratableApp({ hydration }: { hydration?: any }) {

    const PageSection = PageSectionFactory();
    const SubSkillsBlock = PageSubSkillsBlockFactory({oneColor: "gray"});

    return (<>
        <Header id="header-container">
            <LanguageMenu></LanguageMenu>
            <NavigationMenu>
                <a href="/index.html">home</a>
                <a href="#printButton">print</a>
            </NavigationMenu>
        </Header>
        <main>
            <div className="page">
                <div className="p-header">
                    <div className="margin-text-container">
                        <div className="margin-text"><span>VITAE</span></div>
                        <div className="margin-text">
                            <span>C</span>
                            <span>U</span>
                            <span>R</span>
                            <span>I</span>
                            <span>C</span>
                            <span>C</span>
                            <span>U</span>
                            <span>L</span>
                            <span>U</span>
                            <span>M</span>
                        </div>
                        <div className="margin-text"><span>VITAE</span></div>
                        <div className="margin-text">
                            <span>C</span>
                            <span>U</span>
                            <span>R</span>
                            <span>I</span>
                            <span>C</span>
                            <span>C</span>
                            <span>U</span>
                            <span>L</span>
                            <span>U</span>
                            <span>M</span>
                        </div>
                        <h1>Ярослав Минаков</h1>
                        <h2 id="professional_title">веб разработчик</h2>
                    </div>
                </div>
                <div className="p-content">
                    <div className="p-aside">
                        <div className="p-aside__imageBox">
                            <div className="p-aside__imageBox__img"></div>
                        </div>
                        <h3><b style={{ color: "#11dfec" }}>Кон</b>такты</h3>
                        <ul className="p-aside__contactsBox">
                            <li className="p-aside__contactsBox__location">
                                <label>
                                    <span>Famalicao, Portugal</span>
                                    <svg>
                                        <title>где я?</title>
                                        <use xlinkHref="/assets/icons.svg#location"></use>
                                    </svg>
                                </label>
                            </li>
                            <li className="p-aside__contactsBox__email">
                                <a href="mailto:yaro@yaro.pt" target="_blank" rel="noopener noreferrer">
                                    <span>yaro@yaro.pt</span>
                                    <svg>
                                        <title>отправьте емайл</title>
                                        <use xlinkHref="/assets/icons.svg#envelope"></use>
                                    </svg>
                                </a>
                            </li>
                            <li className="p-aside__contactsBox__linkedin">
                                <a href="https://in.yaro.pt" target="_blank" rel="noopener noreferrer">
                                    <span>https://in.yaro.pt</span>
                                    <svg>
                                        <title>мой Linkedin</title>
                                        <use xlinkHref="/assets/icons.svg#linkedin"></use>
                                    </svg>
                                </a>
                            </li>
                            <li className="p-aside__contactsBox__phone">
                                <a href="tel:+351914059971" target="_blank" rel="noopener noreferrer">
                                    <span>+351 914-059-971</span>
                                    <svg>
                                        <title>мой номер</title>
                                        <use xlinkHref="/assets/icons.svg#whatsApp_bubble"></use>
                                    </svg>
                                </a>
                            </li>
                            <li className="p-aside__contactsBox__telegram">
                                <a href="https://t.me/optimusfine" target="_blank" rel="noopener noreferrer">
                                    <span>t.me/optimusfine</span>
                                    <svg>
                                        <title>мой телеграм</title>
                                        <use xlinkHref="/assets/icons.svg#telegram"></use>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                        <h3><b style={{ color: "#fb4485" }}>Язы</b>ки</h3>
                        <ul className="p-aside__languageBox">
                            <li>English</li>
                            <li>Português</li>
                            <li>Русский</li>
                        </ul>
                        <h3>
                            <span><b style={{ color: "#fda333" }}>Нав</b>ыки</span>
                        </h3>
                        <SubSkillsBlock name="Языки программирования">
                            <li>
                                <svg style={{height: "12pt", width: "12pt", borderRadius: "20%"}}>
                                    <use xlinkHref="/assets/icons.svg#typescript"></use>
                                </svg>
                                <span>Typescript</span>
                            </li>
                            <li>Javascript</li>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>SASS</li>
                            <li>SQL</li>
                            <li>C</li>
                            <li>C#</li>
                            <li>java</li>
                        </SubSkillsBlock>
                        <SubSkillsBlock name="Фреймворки">
                            <li>Node.js</li>
                            <li>dotnet core</li>
                            <li>React.js</li>
                            <li>Nest.js</li>
                            <li>Express.js</li>
                        </SubSkillsBlock>
                        <SubSkillsBlock name="DevOps">
                            <li>IaC</li>
                            <li>Ansible</li>
                            <li>Terraform</li>
                            <li>Linux</li>
                            <li>containers</li>
                            <li>cloud</li>
                            <li>bash</li>
                            <li>pwsh</li>
                            <li>git</li>
                        </SubSkillsBlock>
                        <SubSkillsBlock name="Networking">
                            <li>Protocols</li>
                            <li>Routing</li>
                            <li>DNS</li>
                            <li>Firewalls</li>
                            <li>FTTx</li>
                        </SubSkillsBlock>
                    </div>
                    <ul className="p-main">
                        <PageSection name="опыт">
                            <PageSectionContent position="Самостоятельное обучение и развитие"
                                company=""
                                location="Португалия / Россия"
                                years={{ bgn: "2020 сен", end: "сейчас" }}
                            >
                                <span>Воспользовался возможностью дальнейшего развития навыков в области разработки ПО, обучаясь самостоятельно во время карьерного перерыва, связанного с уходом за близкими. Приобрел навыки в криптотрейдинге, увлекся стеком Node.js + TypeScript, инструментами IaC и автоматизации серверов (Terraform, Ansible), а также облачными решения (AWS, Azure) и инструментами AI</span>
                            </PageSectionContent>
                            <PageSectionContent position="Гериатрическая помощь"
                                company=""
                                location="Россия"
                                years={{ bgn: "2020 дек", end: "2022 авг" }}
                            >
                                <span>Взял добровольный перерыв в карьере, чтобы обеспечить уход за членом семьи в трудный период, связанный с коронавирусом и здоровьем, когда соответствующие учреждения не могли помочь в решении этих вопросов.</span>
                            </PageSectionContent>
                            <PageSectionContent position="Тех. специалист по телекоммуникациям"
                                company="MMF, Lda"
                                location="Португалия / Франция"
                                years={{ bgn: "2017 апр", end: "2020 авг" }}
                            >
                                <span>Оказывал услуги по установке и обслуживанию оптоволокна (FTTx)</span>
                                <ul>
                                    <li>Устанавливал оптоволоконный кабель и оконечное оборудование, гарантировал качество сигнала (QoS)</li>
                                    <li>Решал проблемы клиентов, связанные с оборудованием, QoS, локальной и внешней сетью.</li>
                                </ul>
                            </PageSectionContent>
                            <PageSectionContent position="Разработчик ПО"
                                company="Shortcut - Consultadoria e Serviços de TI, Lda"
                                location="Matosinhos, Португалия"
                                years={{ bgn: "2015 апр", end: "2016 янв" }}
                            >
                                <span>Участвовал в R&D и тестировании:</span>
                                <ul>
                                    <li>Изучал протоколы и APIs, ISO-7816 и SAML</li>
                                    <li>Реализовал ABI драйвер биометрической ID карты, через USB</li>
                                    <li>Реализовал 2FA (используя API - Chave Móvel Digital)</li>
                                    <li>Задокументировал решения</li>
                                    <li>Реализовывал тесты для веб-интерфейса используя JavaScript, Java и C#.Net с Selenium WebDriver.</li>
                                </ul>
                            </PageSectionContent>
                            <PageSectionContent position="IT специалист"
                                company="Shortcut - Consultadoria e Serviços de TI, Lda"
                                location="Matosinhos, Португалия"
                                years={{ bgn: "2014 сен", end: "2014 дек" }}
                            >
                                <span>Предоставлял IT поддержку, разрабатывал ПО</span>
                                <ul>
                                    <li>Тех. обслуживание ноутбуков и серверов</li>
                                    <li>Помог внедрить SDK для печати и штамповки в .Net</li>
                                    <li>Исследовал ABI для биометрической ID карты</li>
                                </ul>
                            </PageSectionContent>
                        </PageSection>
                        <PageSection name="образование">
                            <PageSectionContent position="Computer Networks and IT systems management"
                                company="Техничесий специалист IT систем и сетей (EQF 5 уровень)"
                                location="Porto, Португалия"
                                years={{ bgn: "2013", end: "2014" }}
                            ></PageSectionContent>
                            <PageSectionContent position="Communications Engineering"
                                company="Лиценциат (незавершенный)"
                                location="Guimarães, Португалия"
                                years={{ bgn: "2009", end: "2012" }}
                            ></PageSectionContent>
                        </PageSection>
                        <PageSection name="достижения">
                            <PageSectionContent position="EMEA CCNA Netriders"
                                company=""
                                location="Lisbon, Португалия"
                                years={{ end: "2014" }}
                            >
                                <span>Международный конкурс Cisco по компьютерным сетям, вошел в топ-25 региона EMEA</span>
                            </PageSectionContent>
                        </PageSection>
                        <PageSection name="сертификаты">
                            <PageSectionContent position="Telecommunications Tecnician certificate"
                                company="NOS, Comunicações, s.a."
                                location="Porto, Португалия"
                                years={{ end: "2017" }}
                            >
                                <span>Сертификат компетентности в телекоммуникационных сетях</span>
                            </PageSectionContent>
                            <PageSectionContent position="AHK Certificate"
                                company="ATEC"
                                location="Porto, Португалия"
                                years={{ end: "2014" }}
                            >
                                <span>Сертификат компетентности в управлении компьютерными сетями и ИТ-системами, выданный германской палатой внешней торговли (AuslandsHandelsKammern)</span>
                            </PageSectionContent>
                        </PageSection>
                    </ul>
                </div>
            </div>
        </main>
        <Footer id="footer-container" style={{
            boxShadow: "0px 1px 0px #3d526b inset",
            borderTop: "1px solid #112"
        }}>
            <FootCopyright />
        </Footer>
    </>)
}

function PageSubSkillsBlockFactory(args: { oneColor?: string } = undefined) {
    let index = 0
    return ({ name, children }: { name: string, children: ReactNode }) => {
        const color = (!!args && args.oneColor) ? [args.oneColor, args.oneColor] : (() => {
            const x = index % 4;
            index += 1;
            const colors = [
                ["#11dfec", "#80f4ff"],
                ["#fb4485", "#ffaac8"],
                ["#fda333", "#ffd199"],
                ["#77993f", "#c7e36b"]
            ]
            return colors[x]
        })();
        return _SubSkillsBlock({ name: name, outlineColor: color[1], children: children })
    }
}

function _SubSkillsBlock({ name, outlineColor, children }: { name: string, outlineColor?: string, children?: ReactNode }) {
    return (<>
        <h4>{name}</h4>
        <ul className="p-aside__skillsBox" style={{ "--skillBox-skill-color": outlineColor } as CSSProperties}>
            {children}
        </ul>
    </>)
}

function PageSectionFactory() {
    let index = 0
    return ({ name, children }: { name: string, children?: ReactNode }) => {
        return _PageSection({ name, index: index++, children })
    }
}

function _PageSection({ name, index, children }: { name: string, index: number, children?: ReactNode }) {
    const color = (() => {
        const x = index % 4
        const colors = [
            ["#11dfec", "#80f4ff"],
            ["#fb4485", "#ffaac8"],
            ["#fda333", "#ffd199"],
            ["#77993f", "#c7e36b"]
        ]
        return colors[x]
    })();

    const Name = () => {
        let triple = name.length <= 3 ? name : name.substring(0, 3)
        let rest = name.length <= 3 ? "" : name.substring(3)
        return (<h3 className="p-main__section__name"><span style={{ color: color[0] }}>{triple}</span>{rest}</h3>)
    }

    return (<li key={index} className="p-main__section" style={{ "--text-decoration-color": color[1] } as CSSProperties}>
        <Name />
        <div className="p-main__section__content">
            {children ?? ""}
        </div>
    </li>)
}

function PageSectionContent({ years, position, company, location, children }: { position: string, company: string, years: { bgn?: string, end: string }, location: string, children?: ReactNode }) {

    // set font to monospace, must preserve whitespace in css: white-space: pre-wrap or alike
    const yearsXpad = {
        bgn: years.bgn?.padEnd(8, " "),
        end: years.end.padEnd(8, " ")
    }

    return (<div className="p-main__section__content__grid">
        <div style={{ gridArea: "years", display: "flex", flexDirection: "column" }}>
            <span>{yearsXpad.end}</span>
            {!!children && !!years.bgn && <label></label>}
            {!!years.bgn && <span style={{ marginTop: "auto" }}>{yearsXpad.bgn}</span>}
        </div>
        <span style={{ gridArea: "position" }}>{position}</span>
        <span style={{ gridArea: "company" }}>{company}</span>
        <span style={{ gridArea: "location" }}>{location}</span>
        <div style={{ gridArea: "description", marginTop: (typeof (company) === "undefined" || company === "") ? "-4mm" : "" }}>{children}</div>
    </div>)
}


function Page() {
    return (ResumeTemplate({
        cssentry: "/css/resumeru.bundle.css",
        jsentry: "/js/resumeru.client.js",
        hydration: {},
        children: (<>
            <input className="displaynone" type="checkbox" id={uiState.checkboxesIDs.language} />
            <input className="displaynone" type="checkbox" id={uiState.checkboxesIDs.navigation} />
            <div className={style.backgroundRoot}></div>
            <div className={style.appRoot}>
                <ResumeHydratableApp hydration={{}} />
            </div>
        </>)
    }))
}

export default Page

export {
    ResumeHydratableApp
}