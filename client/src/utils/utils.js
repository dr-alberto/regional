// Allow adding tailwind classes on condition
export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}