import Throttler from "../../util/throttler";

type HTMLInputCheckbox = { checked: boolean } & HTMLElement

function canvasAnimation(canvas: HTMLCanvasElement, checkBoxSwitch: HTMLInputCheckbox = undefined, checkBoxFireworksSwitch: HTMLInputCheckbox = undefined, skip = false) {
    if (skip) return;
    let width = canvas.clientWidth
    let height = canvas.clientHeight
    canvas.setAttribute("width", width as unknown as string)
    canvas.setAttribute("height", height as unknown as string)
    console.log(["sizes", width, height, (Math.round(Math.sqrt(width * width + height * height)))])
    console.log(["device sizes", window.innerWidth, window.innerHeight]);
    //================================== setup
    let ctx = canvas.getContext("2d")
    let animationFrame: number;

    let STOP_ANIMATION = checkBoxSwitch ? (checkBoxSwitch.checked ? true : false) : false
    let mouseX = 0
    let mouseY = 0
    let isMouseInsideDoc = false;
    let lastTimeMoved = Date.now();

    ////===================== Trigonometry
    const pi = Math.PI
    const tupi = 2 * pi
    const rad = pi / 180

    function deg2rad(degree: number) {
        return degree * rad
    }
    function cos(degree: number) {
        return Math.cos(deg2rad(degree))
    }
    function sin(degree: number) {
        return Math.sin(deg2rad(degree))
    }
    function tan(degree: number) {
        return Math.tan(deg2rad(degree))
    }
    function cot(degree: number) {
        return (1 / Math.tan(deg2rad(degree)))
    }

    function drawshape(region: Path2D, fillStyle = "gray", fillRule: CanvasFillRule = "nonzero") {
        ctx.fillStyle = fillStyle;
        ctx.fill(region, fillRule);
    }

    type contextText = {
        text: string
        font: string
        x: number
        y: number
    }

    function drawtext(text: contextText, fillStyle = "gray") {
        ctx.font = text.font
        ctx.fillStyle = fillStyle
        ctx.fillText(text.text, text.x, text.y)
    }

    type PointXY = {
        x: number
        y: number
    }

    function p(x: number, y: number) {
        return {
            "x": x,
            "y": y
        }
    }
    function ctri(p1: PointXY, p2: PointXY, p3: PointXY) {
        let path = new Path2D()
        path.moveTo(p1.x, p1.y);
        path.lineTo(p2.x, p2.y);
        path.lineTo(p3.x, p3.y);
        path.closePath();
        return path;
    }
    function ccircle(radius: number, centerPoint: PointXY, startAngle = 0, endAngle = 360, counterclockwise = false) {
        let path = new Path2D()
        let a = deg2rad(startAngle)
        let b = deg2rad(endAngle)
        path.arc(centerPoint.x, centerPoint.y, radius, a, b, counterclockwise)
        return path
    }
    function crect(p, w, h) {
        let path = new Path2D()
        path.rect(p.x, p.y, w, h)
        return path
    }
    function crectpath(points: PointXY[], isClosed: boolean) {
        let path = new Path2D()
        path.moveTo(points[0].x, points[0].y)
        for (let i = 1; i < points.length; i++) {
            path.lineTo(points[i].x, points[i].y)
        }
        if (isClosed) {
            path.closePath()
        }
        return path
    }
    function createRhombus(diameter: number, point: PointXY) {
        return crectpath(
            [
                p(point.x, point.y - diameter / 2),
                p(point.x + diameter / 2, point.y),
                p(point.x, point.y + diameter / 2),
                p(point.x - diameter / 2, point.y)
            ],
            true
        )
    }
    function ctext(text: string, font: string = "24px Verdana", p = { "x": 0, "y": 0 }) {
        return {
            text,
            font,
            "x": p.x,
            "y": p.y
        }
    }

    //===================== global vars
    let frameTime: number;
    let previousFrameTimeStamp = 0;
    let fps = 0;
    const fpsColor = "#ffffff55";
    // const fpsColor = "#1b273555";
    let frameTimes = [];
    let fpsPoint: PointXY;

    //==================== explosions below
    let explosions = [];
    const explosions_sizes = [2, 2, 2, 2, 2, 4, 4, 4, 8];
    const explosions_per_move = 30;
    const explosions_idle = 8;
    const explosions_color = "white"
    const explosions_color_options = ["white", "white", "white", "yellow", "lime", "cyan", "cyan", "blue", "crimson", "magenta"];
    const explosions_color_options_total = explosions_color_options.length

    const colorPicker = () => {
        return explosions_color_options[Math.floor(Math.random() * (explosions_color_options_total))]
    }
    //==================== comets below
    let comets = [];
    const qComets = 5
    const comet_speed = 200;
    const comet_sizes = [1, 1, 2, 2, 4, 4, 4, 9, 9, 12];
    const comet_color = "#50b0ff"
    //==================== stars below
    let small = [];
    let medium = [];
    let big = [];
    const velocity = {
        "x": 10,
        "y": -10
    }
    const dBig = 10
    const dMedium = 4
    const dSmall = 2
    const stars_color = "white"

    let area: number;
    let qBig: number;
    let qMedium: number;
    let qSmall: number;

    const qBig_options = [6, 10, 14, 16, 20];
    const qMedium_options = [20, 30, 50, 70, 100];
    const qSmall_options = [40, 60, 80, 100, 140];

    //=================== variables
    function initPoints() {
        fpsPoint = p(width - 100, 64);
        for (let i = 0; i < qComets; i++) {
            let angle = Math.random() * 360
            let velocity = {
                "x": comet_speed * cos(angle),
                "y": comet_speed * sin(angle)
            }
            comets.push({
                "p": p(Math.floor(Math.random() * width), Math.floor(Math.random() * height)),
                "velocity": velocity,
                "chozenSize": comet_sizes[Math.floor(Math.random() * comet_sizes.length)]
            })
        }
        //======================================================
        small = [];
        medium = [];
        big = [];
        area = height * width;

        qBig = (area < 200000) ? qBig_options[0] : (area < 400000) ? qBig_options[1] : (area < 1200000) ? qBig_options[2] : (area < 2100000) ? qBig_options[3] : qBig_options[4];
        qMedium = (area < 200000) ? qMedium_options[0] : (area < 400000) ? qMedium_options[1] : (area < 1200000) ? qMedium_options[2] : (area < 2100000) ? qMedium_options[3] : qMedium_options[4];
        qSmall = (area < 200000) ? qSmall_options[0] : (area < 400000) ? qSmall_options[1] : (area < 1200000) ? qSmall_options[2] : (area < 2100000) ? qSmall_options[3] : qSmall_options[4];

        for (let i = 0; i < qSmall; i++) {
            small.push(p(Math.floor(Math.random() * width), Math.floor(Math.random() * height)));
        }
        for (let i = 0; i < qMedium; i++) {
            medium.push(p(Math.floor(Math.random() * width), Math.floor(Math.random() * height)));
        }
        for (let i = 0; i < qBig; i++) {
            big.push(p(Math.floor(Math.random() * width), Math.floor(Math.random() * height)));
        }
    }

    // will work properly only if stars go north-east!!!
    // for velocity vector: (x positive, y negative)!!!
    function moveRombs(points: PointXY[], size) {
        for (let i = 0; i < points.length; i++) {
            //draw
            drawshape(createRhombus(size, points[i]), stars_color)
            //update coordinates
            if (points[i].x > width + (size / 2)) {
                points[i].x = (-1) * size / 2;
                points[i].y = Math.floor(Math.random() * height)
            } else if (points[i].y < (-1) * size / 2) {
                points[i].y = height + size / 2;
                points[i].x = Math.floor(Math.random() * width)
            } else {
                points[i].x = points[i].x + velocity.x * frameTime;
                points[i].y = points[i].y + velocity.y * frameTime;
            }
        }
    }
    function updateRombs() {
        moveRombs(big, dBig)
        moveRombs(medium, dMedium)
        moveRombs(small, dSmall)
    }
    function updateComets() {
        for (let i = 0; i < qComets; i++) {
            drawshape(createRhombus(comets[i].chozenSize, comets[i].p), comet_color)
            if (comets[i].p.x < 0 - comets[i].chozenSize || comets[i].p.y < 0 - comets[i].chozenSize) {
                comets[i].chozenSize = comet_sizes[Math.floor(Math.random() * comet_sizes.length)];
                comets[i].p = p(Math.floor(Math.random() * width), Math.floor(Math.random() * height));
                let angle = Math.random() * 360
                comets[i].velocity = {
                    "x": comet_speed * cos(angle),
                    "y": comet_speed * sin(angle)
                }
            } else if (comets[i].p.x > width + comets[i].chozenSize || comets[i].p.y > height + comets[i].chozenSize) {
                comets[i].chozenSize = comet_sizes[Math.floor(Math.random() * comet_sizes.length)];
                comets[i].p = p(Math.floor(Math.random() * width), Math.floor(Math.random() * height));
                let angle = Math.random() * 360
                comets[i].velocity = {
                    "x": comet_speed * cos(angle),
                    "y": comet_speed * sin(angle)
                }
            } else {
                comets[i].p.x = comets[i].p.x + comets[i].velocity.x * frameTime;
                comets[i].p.y = comets[i].p.y + comets[i].velocity.y * frameTime;
            }
        }
    }
    function explosion() {
        for (let i = 0; i < explosions.length; i++) {
            drawshape(createRhombus(explosions[i].size, explosions[i].p), explosions[i].color)
            if (explosions[i].p.x < 0 - explosions[i].size || explosions[i].p.y < 0 - explosions[i].size) {
                explosions.splice(i, 1);
                i--;
            } else if (explosions[i].p.x > width + explosions[i].size || explosions[i].p.y > height + explosions[i].size) {
                explosions.splice(i, 1);
                i--;
            } else {
                explosions[i].p.x = explosions[i].p.x + explosions[i].velocity.x * frameTime;
                explosions[i].p.y = explosions[i].p.y + explosions[i].velocity.y * frameTime;
            }
        };
    }
    function draw() {
        updateRombs()
        updateComets()
        explosion()
    }
    function drawAverageFps(timeBetweenFrames: number) {
        frameTimes.push(timeBetweenFrames);
        let accurateSumFrameTimes = 0
        for (let sample of frameTimes) {
            accurateSumFrameTimes = accurateSumFrameTimes + sample
        }
        if (accurateSumFrameTimes >= 1) {
            // draw new fps
            // fps = Math.round(1 / timeBetweenFrames);
            fps = Math.round(1 / (accurateSumFrameTimes / frameTimes.length))
            // clearing array and resetting check
            frameTimes = []
        }
        // drawing fps
        drawtext(ctext(`FPS: ${fps}`, "16px Verdana", fpsPoint), fpsColor)
    }



    window.addEventListener("resize", function (event) {
        width = canvas.clientWidth
        height = canvas.clientHeight
        canvas.setAttribute("width", width as unknown as string)
        canvas.setAttribute("height", height as unknown as string)
        ctx = canvas.getContext("2d")
        initPoints();
    })

    let throttler = new Throttler(1000);



    const addExplosion = (x: number, y: number) => {
        let angle = Math.random() * 360
        explosions.push({
            "p": p(x, y),
            "velocity": {
                "x": comet_speed * cos(angle),
                "y": comet_speed * sin(angle)
            },
            "size": explosions_sizes[Math.floor(Math.random() * explosions_sizes.length)],
            "color": colorPicker()
        })
    }

    const trackMouseCoords = (x: number, y: number) => {
        mouseX = x
        mouseY = y
    }

    const moveAction = (x: number, y: number) => {
        trackMouseCoords(x, y)
        lastTimeMoved = Date.now();
        for (let i = 0; i < explosions_per_move; i++) {
            throttler.throttleByQty(explosions.length, () => {
                addExplosion(x, y)
            })
        }
    }

    const hMouseMove = (event: MouseEvent) => {
        moveAction(event.clientX, event.clientY)
    }

    const hTouchMove = (event: TouchEvent) => {
        moveAction(
            event.touches.item(0).pageX,
            event.touches.item(0).pageY - window.scrollY
        )
    }

    const hTouchStart = (event: TouchEvent) => {
        moveAction(
            event.touches.item(0).pageX,
            event.touches.item(0).pageY
        )
    }

    // canvas.addEventListener("mouseleave", () => {
    document.addEventListener("mouseleave", () => {
        isMouseInsideDoc = false
    });
    // canvas.addEventListener("mouseenter", () => {
    document.addEventListener("mouseenter", () => {
        isMouseInsideDoc = true
    });

    if (checkBoxFireworksSwitch && !checkBoxFireworksSwitch.checked) {
        document.addEventListener('mousemove', hMouseMove);
        document.addEventListener("touchmove", hTouchMove);
        document.addEventListener("touchstart", hTouchStart);
    }

    // THIS restarts points, comment this event to see the bug (minimize page and wait 1 min)
    document.addEventListener("visibilitychange", (event) => {
        if (checkBoxSwitch !== undefined && checkBoxSwitch.checked) {
            return;
        }
        if (document.visibilityState === "hidden") {
            // if (!checkBoxSwitch.checked) {
            // checkBoxSwitch.click()
            STOP_ANIMATION = true
            ctx.clearRect(0, 0, width, height);
            window.cancelAnimationFrame(animationFrame);
            // }

        } else if (document.visibilityState === "visible") {
            // if (!checkBoxSwitch.checked) {
            STOP_ANIMATION = false
            previousFrameTimeStamp = performance.now();
            initPoints();
            animationFrame = window.requestAnimationFrame(loop);
            // }
        }
    })
    // IDLE explosions, no need to throttle
    setInterval(() => {
        if (document.visibilityState === "visible" && isMouseInsideDoc && Date.now() - lastTimeMoved > 500) {
            for (let i = 0; i < explosions_idle; i++) {
                addExplosion(mouseX, mouseY)
            }
        }
    }, 1000);

    function loop(frameTimeStamp: number) {
        if (STOP_ANIMATION) {
            return;
        }

        ctx.clearRect(0, 0, width, height);
        frameTime = (frameTimeStamp - previousFrameTimeStamp) / 1000;
        previousFrameTimeStamp = frameTimeStamp;
        draw();
        drawAverageFps(frameTime);
        window.requestAnimationFrame(loop)
    }

    initPoints();
    animationFrame = window.requestAnimationFrame(loop);

    // checkBoxSwitch STOPS animation and removes listeners
    if (checkBoxSwitch !== undefined) {
        checkBoxSwitch.addEventListener("change", () => {
            if (checkBoxSwitch.checked) {
                STOP_ANIMATION = true
                //@TODO remove event onmousemove
                ctx.clearRect(0, 0, width, height);
                window.cancelAnimationFrame(animationFrame);

                // checkBoxFireworksSwitch
                document.removeEventListener("mousemove", hMouseMove)
                document.removeEventListener("touchmove", hTouchMove)
                document.removeEventListener("touchstart", hTouchStart);
            } else if (!checkBoxSwitch.checked) {
                STOP_ANIMATION = false
                //@TODO add back removed event onmousemove
                previousFrameTimeStamp = performance.now();
                // initPoints();
                animationFrame = window.requestAnimationFrame(loop);

                if (checkBoxFireworksSwitch !== undefined && !checkBoxFireworksSwitch.checked) {
                    document.addEventListener('mousemove', hMouseMove);
                    document.addEventListener("touchmove", hTouchMove);
                    document.addEventListener("touchstart", hTouchStart);
                }
            }
        });
    }

    if (checkBoxFireworksSwitch !== undefined) {
        checkBoxFireworksSwitch.addEventListener("change", (event) => {
            if (checkBoxFireworksSwitch.checked) {
                console.log("fireworks off")

                document.removeEventListener("mousemove", hMouseMove)
                document.removeEventListener("touchmove", hTouchMove)
                document.removeEventListener("touchstart", hTouchStart);
            } else if (!checkBoxFireworksSwitch.checked) {
                console.log("fireworks on")

                document.addEventListener('mousemove', hMouseMove);
                document.addEventListener("touchmove", hTouchMove);
                document.addEventListener("touchstart", hTouchStart);
            }

        })
    }
}

export {
    canvasAnimation
}

export type {
    HTMLInputCheckbox
}