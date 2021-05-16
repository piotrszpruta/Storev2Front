const slideLeft = {
    init: {
        opacity: 0,
        x: "100vw"
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            delay: 0.5,
            mass: 0.4,
            damping: 8,
            when: "beforeChildren",
            staggerChildren: 0.4
        }
    },
    exit: {
        x: "100vw",
        transition: { ease: "easeInOut" }
    }
}

const slideRight = {
    init: {
        opacity: 0,
        x: "-100vw"
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            delay: 0.5,
            mass: 0.4,
            damping: 8,
            when: "beforeChildren",
            staggerChildren: 0.4
        }
    },
    exit: {
        x: "-100vw",
        transition: { ease: "easeInOut" }
    }
}

const opacity = {
    init: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: { delay: 0.5, duration: 1 }
    },
    exit: {
        x: "-100vw",
        transition: { ease: "easeInOut" }
    }
}

module.exports = {
    slideLeft,
    slideRight,
    opacity
}
