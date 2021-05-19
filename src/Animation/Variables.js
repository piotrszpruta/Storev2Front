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
        x: "-100vw",
        transition: {
            ease: "easeInOut",
            duration: 1
        }
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
        transition: {
            ease: "easeInOut",
            duration: 1
        }
    }
}

const slideBottom = {
    init: {
        opacity: 0,
        y: "-100vw"
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            mass: 0.8,
            damping: 10,
            when: "beforeChildren",
            delay: 0,
            duration: 1
        }
    },
    exit: {
        y: "-100vw",
        transition: {
            ease: "easeInOut",
            duration: 1
        }
    }
}

const opacity = {
    init: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: { delay: 0, duration: 1 }
    },
    exit: {
        x: "-100vw",
        transition: {
            duration: 0.7,
            ease: "easeInOut",
            when: "beforeChildren",
        }
    }
}

const opacityHome = {
    init: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: { delay: 1, duration: 1 }
    },
    exit: {
        x: "-100vw",
        transition: {
            duration: 0.7,
            ease: "easeInOut",
            when: "beforeChildren",
        }
    }
}

module.exports = {
    slideLeft,
    slideRight,
    slideBottom,
    opacity,
    opacityHome
}
