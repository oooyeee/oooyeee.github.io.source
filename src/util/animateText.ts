import delay from "./delay"
import { getDomPath } from "./DOMelements";

export type AnimateTextOptions = {
    times?: number,
    pauseBefore?: number,
    pauseAfter?: number,
    typeDelay?: number,
    addBeam?: boolean,
    beamAsPseudo?: boolean, // pseudo class spanElement::after that would animate beam (should have content: "|")
    keepBeamAfterAnimation?: boolean,
    decrementally?: boolean,
    onBeforeAnimationEnd?: (element: HTMLElement) => void,
    onAnimationEndTransformElement?: (element: HTMLElement) => void,
    callBack?: (element: HTMLElement) => void
}

async function AnimateText(element: HTMLElement, animationOptions?: AnimateTextOptions) {
    let defaultOptions: AnimateTextOptions = {
        times: 1000,
        pauseBefore: 500,
        pauseAfter: 1500,
        typeDelay: 100,
        addBeam: false,
        beamAsPseudo: undefined,
        keepBeamAfterAnimation: false,
        decrementally: undefined,
        onBeforeAnimationEnd: undefined,
        onAnimationEndTransformElement: undefined,
        callBack: undefined
    }
    let options = { ...defaultOptions, ...animationOptions }
    let beam: HTMLElement & { removeAnimation?: () => void };
    let beamAnimation: Animation = null;
    if (options.addBeam) {
        if (!options.beamAsPseudo) {
            element.style.position = "relative"
            beam = document.createElement("span");
            beam.style.position = "absolute"
            beam.style.fontWeight = "300"
            beam.innerText = "|";
            beam.style.color = "white"
            beam.style.width = "0px"

            beamAnimation = beam.animate([
                { opacity: "0" },
                { opacity: "1", offset: 0.4 },
                { opacity: "1", offset: 0.6 },
                { opacity: "0", offset: 1.0 }
            ], {
                direction: "normal",
                duration: 1250,
                iterations: Infinity,
                easing: "linear"
            })
            element.parentNode.insertBefore(beam, element.nextSibling);
            beam.removeAnimation = () => {
                beamAnimation.pause()
                beamAnimation.cancel()
                beam.remove()
            }

        } else {
            // element.classList.add(options.beamAsPseudo)
            // requires having in sass:
            // .adds-beam-after
            //     &:after
            //         content: "|"
            //         animation: animateBeam 1.25s linear forwards infinite
            //         color: #fff
            //         font-weight: 300



            const styleId = "__animateText__"
            const beamClassName = "__animateText__adds-beam-after"
            if (!document.querySelector("style#" + styleId)) {
                let style = document.createElement("style")
                style.id = styleId
                let css = [
                    `@keyframes ${styleId}animateBeam{`,
                    `0% {opacity: 0}`,
                    `40% {opacity: 1}`,
                    `60% {opacity: 1}`,
                    `100% {opacity: 0}`,
                    `}`,
                    `.${beamClassName}::after{`,
                    `content: "|";`,
                    `color: #fff;`,
                    `font-weight: 300;`,
                    `animation: ${styleId}animateBeam 1.25s linear forwards infinite;`,
                    `}`
                ].join("")
                style.innerHTML = css
                document.head.appendChild(style)
            }

            element.classList.add(beamClassName)

            beam = {} as HTMLElement
            beam.removeAnimation = () => {
                element.classList.remove(beamClassName)
            }
        }
    }
    console.log(":: LOGGING ELEMENT ::");
    console.log(element)
    let datatext = element.dataset["text"] ?? null;
    let texts = datatext ? datatext.split(";") : null;
    let currentText = element.innerText || null;
    texts = currentText ? (texts ? (texts.includes(currentText) ? (() => {
        texts.splice(texts.indexOf(currentText), 1);
        return [currentText, ...texts];
    })() : [currentText, ...texts]) : [currentText]) : texts;
    if (!texts) return;
    let isDecrementing = options.decrementally !== undefined ? options.decrementally : (currentText ? true : false)
    currentText = texts[0];
    let tdelay = options.typeDelay;
    let currentTextIndex = 0;

    if (typeof (options.times) === "number" && options.times >= 0) {
        const iteration = async () => {
            if (isDecrementing) {
                for (let i = currentText.length; i >= 0; i--) {
                    await delay(tdelay, () => {
                        element.innerText = currentText.slice(0, i)
                    });
                }
                await delay(options.pauseBefore);
                isDecrementing = false;
                if (currentTextIndex < texts.length - 1) {
                    currentTextIndex++;
                } else {
                    currentTextIndex = 0;
                }
                currentText = texts[currentTextIndex];
            } else {
                for (let i = 0; i <= currentText.length; i++) {
                    await delay(tdelay, () => {
                        element.innerText = currentText.slice(0, i)
                    });
                }
                await delay(options.pauseAfter);
                isDecrementing = true;
            }
        }

        if (options.times === Infinity) {
            while (true) {
                await iteration();
            }
        } else {
            for (let i = options.times; i > 0; i--) {
                await iteration();
            }
        }

        if(options.onBeforeAnimationEnd !== undefined) {
            options.onBeforeAnimationEnd(element)
        }

        if (!options.keepBeamAfterAnimation && options.addBeam) {
            beam.removeAnimation();
        }

        if (options.onAnimationEndTransformElement !== undefined) {
            options.onAnimationEndTransformElement(element)
        }

        if (options.callBack !== undefined) {
            options.callBack(element)
        }
    }
}

function MeasureText(DOM, text) {
    let context = DOM["canvas"].getContext("2d");
    context.font = "20px Orbitron"
    return context.measureText(text).width
}

export {
    AnimateText,
    MeasureText
}