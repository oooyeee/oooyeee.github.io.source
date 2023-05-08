
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

    const PageSection = PageSectionFactory()

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
                        <h1>Yaroslav Minakov</h1>
                        <h2>web developer</h2>
                    </div>
                </div>
                <div className="p-content">
                    <div className="p-aside">
                        <div className="p-aside__imageBox">
                            <div className="p-aside__imageBox__img"></div>
                        </div>
                        <h3><b style={{ color: "turquoise" }}>Con</b>tact info</h3>
                        <ul className="p-aside__contactsBox">
                            <li className="p-aside__contactsBox__location">
                                <label>
                                    <span>Famalicao, Portugal</span>
                                    <svg>
                                        <title>where am i?</title>
                                        <use xlinkHref="/assets/icons.svg#location"></use>
                                    </svg>
                                </label>
                            </li>
                            <li className="p-aside__contactsBox__email">
                                <a href="mailto:yaro@yaro.pt" target="_blank" rel="noopener noreferrer">
                                    <span>yaro@yaro.pt</span>
                                    <svg>
                                        <title>send me an email</title>
                                        <use xlinkHref="/assets/icons.svg#envelope"></use>
                                    </svg>
                                </a>
                            </li>
                            <li className="p-aside__contactsBox__linkedin">
                                <a href="https://in.yaro.pt" target="_blank" rel="noopener noreferrer">
                                    <span>https://in.yaro.pt</span>
                                    <svg>
                                        <title>my Linkedin</title>
                                        <use xlinkHref="/assets/icons.svg#linkedin"></use>
                                    </svg>
                                </a>
                            </li>
                            <li className="p-aside__contactsBox__phone">
                                <a href="tel:+351914059971" target="_blank" rel="noopener noreferrer">
                                    <span>+351 914-059-971</span>
                                    <svg>
                                        <title>my number</title>
                                        <use xlinkHref="/assets/icons.svg#whatsApp_bubble"></use>
                                    </svg>
                                </a>
                            </li>
                            <li className="p-aside__contactsBox__telegram">
                                <a href="https://t.me/optimusfine" target="_blank" rel="noopener noreferrer">
                                    <span>t.me/optimusfine</span>
                                    <svg>
                                        <title>PM me on telegram</title>
                                        <use xlinkHref="/assets/icons.svg#telegram"></use>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                        <h3><b style={{ color: "magenta" }}>Lan</b>guages</h3>
                        <ul className="p-aside__languageBox">
                            <li>Portuguese</li>
                            <li>English</li>
                            <li>Russian</li>
                        </ul>
                        <h3>
                            <span><b style={{ color: "orange" }}>Ski</b>lls</span>
                        </h3>
                        <h4>Programming languages</h4>
                        <ul className="p-aside__skillsBox">
                            <li>Typescript</li>
                            <li>Javascript</li>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>SASS</li>
                            <li>SQL</li>
                            <li>C</li>
                            <li>C#</li>
                            <li>java</li>
                        </ul>
                        <h4>Frameworks</h4>
                        <ul className="p-aside__skillsBox">
                            <li>Node.js</li>
                            <li>dotnet core</li>
                            <li>React.js</li>
                            <li>Nest.js</li>
                            <li>Express.js</li>
                        </ul>
                        <h4>DevOps</h4>
                        <ul className="p-aside__skillsBox">
                            <li>IaC</li>
                            <li>Ansible</li>
                            <li>Terraform</li>
                            <li>Linux</li>
                            <li>containers</li>
                            <li>bash</li>
                            <li>pwsh</li>
                            <li>git</li>
                        </ul>
                        <h4>Networking</h4>
                        <ul className="p-aside__skillsBox">
                            <li>Protocols</li>
                            <li>Routing</li>
                            <li>Firewalls</li>
                            <li>FTTx</li>
                        </ul>
                    </div>
                    <ul className="p-main">
                        <PageSection name="experience">
                            <PageSectionContent position="Self-directed Learning & Development"
                                company="Self-employed"
                                location="Portugal / France"
                                years={{ bgn: "2020 set", end: "Present day" }}
                            >
                                <span>Fully committed to grow professionally. Took the opportunity to further develop my skills in software development through self-directed learning, while having a career break due to caregiving. Acquired skills in crypto trading, writing software in <b style={{ textShadow: "0px 0.5px 0px #aaa", fontStyle: "italic" }}>typescript</b> ecosystem, IaC tools and server automation (terraform, ansible), explored cloud solutions (AWS, Azure)</span>
                            </PageSectionContent>
                            <PageSectionContent position="Caregiving"
                                company=""
                                location="Russia"
                                years={{ bgn: "2020 dec", end: "2022 aug" }}
                            >
                                <span>Took a voluntary career break to provide caregiving for a family member, during a challenging period (due to covid, health issues) in which appropriate facilities were unable to aid in the matters.</span>
                            </PageSectionContent>
                            <PageSectionContent position="Telecommunications technitian"
                                company="MMF, Lda"
                                location="Portugal / France"
                                years={{ bgn: "2017 apr", end: "2020 aug" }}
                            >
                                <span>Provided a service in fiber optic (FTTx) installation and maintenance</span>
                                <ul>
                                    <li>Installed fiber optic cable and terminal equipment, guaranteeing the best quality of service (QoS)</li>
                                    <li>Resolved end-client problems related to equipment, QoS, local and external network</li>
                                    <li>Ensured that clients were satisfied with the service provided</li>
                                </ul>
                            </PageSectionContent>
                            <PageSectionContent position="Software developer"
                                company="Shortcut - Consultadoria e Serviços de TI, Lda"
                                location="Matosinhos, Portugal"
                                years={{ bgn: "2015 apr", end: "2016 jan" }}
                            >
                                <span>Contributed in R&D and testing:</span>
                                <ul>
                                    <li>Learned about protocols and APIs, ISO-7816 and SAML</li>
                                    <li>Implemented an ABI driver for a biometric ID card, through USB interface</li>
                                    <li>Implemented 2FA (using API of Chave Móvel Digital)</li>
                                    <li>Documented the implemented solutions</li>
                                    <li>Executed and implemented automation tests for the WEB UI, using JavaScript, Java, and C# .Net with Selenium WebDriver</li>
                                </ul>
                            </PageSectionContent>
                            <PageSectionContent position="IT assistant, intership"
                                company="Shortcut"
                                location="Matosinhos, Portugal"
                                years={{ bgn: "2015 apr", end: "2016 jan" }}
                            >
                                <span>Provided workstations support and minor software development</span>
                                <ul>
                                    <li>Provided maintenance to laptops and servers</li>
                                    <li>Helped implementing of printing and stamping SDK in .Net</li>
                                    <li>Researched ABI for biometric ID smart cards</li>
                                </ul>
                            </PageSectionContent>
                        </PageSection>
                        <PageSection name="education">
                            <PageSectionContent position="Computer Networks and IT systems management"
                                company="Specialist Tecnician in IT Networks (level 5 EQF)"
                                location="Porto, Portugal"
                                years={{ bgn: "2013", end: "2014" }}
                            ></PageSectionContent>
                            <PageSectionContent position="Communications Engineering"
                                company="Integrated masters degree (unfinished)"
                                location="Guimarães, Portugal"
                                years={{ bgn: "2009", end: "2012" }}
                            ></PageSectionContent>
                        </PageSection>
                        <PageSection name="competitions">
                            <PageSectionContent position="EMEA CCNA Netriders"
                                company=""
                                location="Lisbon, Portugal"
                                years={{ end: "2014" }}
                            >
                                <span>International Cisco competition in computer networks, reached top 25 of EMEA region</span>
                            </PageSectionContent>
                        </PageSection>
                        <PageSection name="certificates">
                            <PageSectionContent position="Telecommunications Tecnician certificate"
                                company="NOS, Comunicações, s.a."
                                location="Porto, Portugal"
                                years={{ end: "2017" }}
                            >
                                <span>Certificate of competence in telecommunications networks</span>
                            </PageSectionContent>
                            <PageSectionContent position="AHK Certificate"
                                company="ATEC"
                                location="Porto, Portugal"
                                years={{ end: "2014" }}
                            >
                                <span>Certificate of competence in computer networks and IT systems management, given by the german Foreign Trade Chamber (AuslandsHandelsKammern)</span>
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
        cssentry: "/css/resume.bundle.css",
        jsentry: "/js/resume.client.js",
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